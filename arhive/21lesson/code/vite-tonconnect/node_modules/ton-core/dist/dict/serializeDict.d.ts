/**
 * Copyright (c) Whales Corp.
 * All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Builder } from "../boc/Builder";
type Node<T> = {
    type: 'fork';
    left: Edge<T>;
    right: Edge<T>;
} | {
    type: 'leaf';
    value: T;
};
type Edge<T> = {
    label: string;
    node: Node<T>;
};
export declare function buildTree<T>(src: Map<bigint, T>, keyLength: number): Edge<T>;
export declare function writeLabelShort(src: string, to: Builder): Builder;
export declare function writeLabelLong(src: string, keyLength: number, to: Builder): Builder;
export declare function writeLabelSame(value: number | boolean, length: number, keyLength: number, to: Builder): void;
export declare function detectLabelType(src: string, keyLength: number): "short" | "long" | "same";
export declare function serializeDict<T>(src: Map<bigint, T>, keyLength: number, serializer: (src: T, cell: Builder) => void, to: Builder): void;
export {};
