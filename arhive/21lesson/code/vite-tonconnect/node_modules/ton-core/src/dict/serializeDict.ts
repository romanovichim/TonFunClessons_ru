/**
 * Copyright (c) Whales Corp. 
 * All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { beginCell, Builder } from "../boc/Builder";
import { findCommonPrefix } from "./utils/findCommonPrefix";

//
// Tree Build
//

function pad(src: string, size: number) {
    while (src.length < size) {
        src = '0' + src;
    }
    return src;
}

type Node<T> =
    | {
        type: 'fork',
        left: Edge<T>,
        right: Edge<T>
    }
    | {
        type: 'leaf',
        value: T
    }

type Edge<T> = {
    label: string,
    node: Node<T>
};

function removePrefixMap<T>(src: Map<string, T>, length: number) {
    if (length === 0) {
        return src;
    } else {
        let res = new Map<string, T>();
        for (let k of src.keys()) {
            let d = src.get(k)!;
            res.set(k.slice(length), d);
        }
        return res;
    }
}

function forkMap<T>(src: Map<string, T>) {
    if (src.size === 0) {
        throw Error('Internal inconsistency');
    }
    let left = new Map<string, T>();
    let right = new Map<string, T>();
    for (let k of src.keys()) {
        let d = src.get(k)!;
        if (k.startsWith('0')) {
            left.set(k.substr(1), d);
        } else {
            right.set(k.substr(1), d);
        }
    }
    if (left.size === 0) {
        throw Error('Internal inconsistency. Left emtpy.')
    }
    if (right.size === 0) {
        throw Error('Internal inconsistency. Right emtpy.')
    }
    return { left, right };
}

function buildNode<T>(src: Map<string, T>): Node<T> {
    if (src.size === 0) {
        throw Error('Internal inconsistency');
    }
    if (src.size === 1) {
        return { type: 'leaf', value: Array.from(src.values())[0] };
    }
    let { left, right } = forkMap(src);
    return {
        type: 'fork',
        left: buildEdge(left),
        right: buildEdge(right)
    }
}

function buildEdge<T>(src: Map<string, T>): Edge<T> {
    if (src.size === 0) {
        throw Error('Internal inconsistency');
    }
    const label = findCommonPrefix(Array.from(src.keys()));
    return { label, node: buildNode(removePrefixMap(src, label.length)) };
}

export function buildTree<T>(src: Map<bigint, T>, keyLength: number) {

    // Convert map keys
    let converted = new Map<string, T>();
    for (let k of Array.from(src.keys())) {
        const padded = pad(k.toString(2), keyLength);
        converted.set(padded, src.get(k)!);
    }

    // Calculate root label
    return buildEdge(converted);
}

//
// Serialization
//

export function writeLabelShort(src: string, to: Builder) {
    // Header
    to.storeBit(0);

    // Unary length
    for (let i = 0; i < src.length; i++) {
        to.storeBit(1);
    }
    to.storeBit(0);

    // Value
    for (let i = 0; i < src.length; i++) {
        to.storeBit(src[i] === '1');
    }
    return to;
}

function labelShortLength(src: string) {
    return 1 + src.length + 1 + src.length;
}

export function writeLabelLong(src: string, keyLength: number, to: Builder) {
    // Header
    to.storeBit(1);
    to.storeBit(0);

    // Length
    let length = Math.ceil(Math.log2(keyLength + 1));
    to.storeUint(src.length, length);

    // Value
    for (let i = 0; i < src.length; i++) {
        to.storeBit(src[i] === '1');
    }
    return to;
}

function labelLongLength(src: string, keyLength: number) {
    return 1 + 1 + Math.ceil(Math.log2(keyLength + 1)) + src.length;
}

export function writeLabelSame(value: number | boolean, length: number, keyLength: number, to: Builder) {
    // Header
    to.storeBit(1);
    to.storeBit(1);

    // Value
    to.storeBit(value);

    // Length
    let lenLen = Math.ceil(Math.log2(keyLength + 1));
    to.storeUint(length, lenLen);
}

function labelSameLength(keyLength: number) {
    return 1 + 1 + 1 + Math.ceil(Math.log2(keyLength + 1));
}

function isSame(src: string) {
    if (src.length === 0 || src.length === 1) {
        return true;
    }
    for (let i = 1; i < src.length; i++) {
        if (src[i] !== src[0]) {
            return false;
        }
    }
    return true;
}

export function detectLabelType(src: string, keyLength: number) {
    let kind: 'short' | 'long' | 'same' = 'short';
    let kindLength = labelShortLength(src);

    let longLength = labelLongLength(src, keyLength);
    if (longLength < kindLength) {
        kindLength = longLength;
        kind = 'long';
    }

    if (isSame(src)) {
        let sameLength = labelSameLength(keyLength);
        if (sameLength < kindLength) {
            kindLength = sameLength;
            kind = 'same';
        }
    }

    return kind;
}

function writeLabel(src: string, keyLength: number, to: Builder) {
    let type = detectLabelType(src, keyLength);
    if (type === 'short') {
        writeLabelShort(src, to);
    }
    if (type === 'long') {
        writeLabelLong(src, keyLength, to);
    }
    if (type === 'same') {
        writeLabelSame(src[0] === '1', src.length, keyLength, to);
    }
}
function writeNode<T>(src: Node<T>, keyLength: number, serializer: (src: T, cell: Builder) => void, to: Builder) {
    if (src.type === 'leaf') {
        serializer(src.value, to);
    }
    if (src.type === 'fork') {
        const leftCell = beginCell();
        const rightCell = beginCell();
        writeEdge(src.left, keyLength - 1, serializer, leftCell);
        writeEdge(src.right, keyLength - 1, serializer, rightCell);
        to.storeRef(leftCell);
        to.storeRef(rightCell);
    }
}

function writeEdge<T>(src: Edge<T>, keyLength: number, serializer: (src: T, cell: Builder) => void, to: Builder) {
    writeLabel(src.label, keyLength, to);
    writeNode(src.node, keyLength - src.label.length, serializer, to);
}

export function serializeDict<T>(src: Map<bigint, T>, keyLength: number, serializer: (src: T, cell: Builder) => void, to: Builder) {
    const tree = buildTree<T>(src, keyLength);
    writeEdge(tree, keyLength, serializer, to);
}