/**
 * Copyright (c) Whales Corp.
 * All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
/// <reference types="node" />
import { Address } from "../address/Address";
import { ExternalAddress } from "../address/ExternalAddress";
import { Maybe } from "../utils/maybe";
import { BitString } from "./BitString";
/**
 * Class for building bit strings
 */
export declare class BitBuilder {
    private _buffer;
    private _length;
    constructor(size?: number);
    /**
     * Current number of bits written
     */
    get length(): number;
    /**
     * Write a single bit
     * @param value bit to write, true or positive number for 1, false or zero or negative for 0
     */
    writeBit(value: boolean | number): void;
    /**
     * Copy bits from BitString
     * @param src source bits
     */
    writeBits(src: BitString): void;
    /**
     * Write bits from buffer
     * @param src source buffer
     */
    writeBuffer(src: Buffer): void;
    /**
     * Write uint value
     * @param value value as bigint or number
     * @param bits number of bits to write
     */
    writeUint(value: bigint | number, bits: number): void;
    /**
     * Write int value
     * @param value value as bigint or number
     * @param bits number of bits to write
     */
    writeInt(value: bigint | number, bits: number): void;
    /**
     * Wrtie var uint value, used for serializing coins
     * @param value value to write as bigint or number
     * @param bits header bits to write size
     */
    writeVarUint(value: number | bigint, bits: number): void;
    /**
     * Wrtie var int value, used for serializing coins
     * @param value value to write as bigint or number
     * @param bits header bits to write size
     */
    writeVarInt(value: number | bigint, bits: number): void;
    /**
     * Write coins in var uint format
     * @param amount amount to write
     */
    writeCoins(amount: number | bigint): void;
    /**
     * Write address
     * @param address write address or address external
     */
    writeAddress(address: Maybe<Address | ExternalAddress>): void;
    /**
     * Build BitString
     * @returns result bit string
     */
    build(): BitString;
    /**
     * Build into Buffer
     * @returns result buffer
     */
    buffer(): Buffer;
}
