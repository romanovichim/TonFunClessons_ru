/**
 * Copyright (c) Whales Corp.
 * All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
/// <reference types="node" />
import inspectSymbol from 'symbol.inspect';
export declare class ADNLAddress {
    static parseFriendly(src: string): ADNLAddress;
    static parseRaw(src: string): ADNLAddress;
    readonly address: Buffer;
    constructor(address: Buffer);
    equals(b: ADNLAddress): boolean;
    toRaw: () => string;
    toString: () => string;
    [inspectSymbol]: () => string;
}
