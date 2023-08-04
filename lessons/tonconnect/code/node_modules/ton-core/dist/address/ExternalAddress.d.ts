/**
 * Copyright (c) Whales Corp.
 * All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import inspectSymbol from 'symbol.inspect';
export declare class ExternalAddress {
    static isAddress(src: any): src is ExternalAddress;
    readonly value: bigint;
    readonly bits: number;
    constructor(value: bigint, bits: number);
    toString(): string;
    [inspectSymbol]: () => string;
}
