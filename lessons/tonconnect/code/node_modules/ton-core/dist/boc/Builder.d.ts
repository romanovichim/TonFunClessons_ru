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
import { BitString } from "./BitString";
import { Writable } from "./Writable";
import { Cell } from "./Cell";
import { Slice } from "./Slice";
import { Dictionary, DictionaryKey, DictionaryKeyTypes, DictionaryValue } from "../dict/Dictionary";
import { Maybe } from "../utils/maybe";
/**
 * Start building a cell
 * @returns a new builder
 */
export declare function beginCell(): Builder;
/**
 * Builder for Cells
 */
export declare class Builder {
    private _bits;
    private _refs;
    constructor();
    /**
     * Bits written so far
     */
    get bits(): number;
    /**
     * References written so far
     */
    get refs(): number;
    /**
     * Available bits
     */
    get availableBits(): number;
    /**
     * Available references
     */
    get availableRefs(): number;
    /**
     * Write a single bit
     * @param value bit to write, true or positive number for 1, false or zero or negative for 0
     * @returns this builder
     */
    storeBit(value: boolean | number): this;
    /**
     * Write bits from BitString
     * @param src source bits
     * @returns this builder
     */
    storeBits(src: BitString): this;
    /**
     * Store Buffer
     * @param src source buffer
     * @param bytes optional number of bytes to write
     * @returns this builder
     */
    storeBuffer(src: Buffer, bytes?: Maybe<number>): this;
    /**
     * Store Maybe Buffer
     * @param src source buffer or null
     * @param bytes optional number of bytes to write
     * @returns this builder
     */
    storeMaybeBuffer(src: Buffer | null, bytes?: Maybe<number>): this;
    /**
     * Store uint value
     * @param value value as bigint or number
     * @param bits number of bits to write
     * @returns this builder
     */
    storeUint(value: bigint | number, bits: number): this;
    /**
     * Store maybe uint value
     * @param value value as bigint or number, null or undefined
     * @param bits number of bits to write
     * @returns this builder
     */
    storeMaybeUint(value: Maybe<number | bigint>, bits: number): this;
    /**
     * Store int value
     * @param value value as bigint or number
     * @param bits number of bits to write
     * @returns this builder
     */
    storeInt(value: bigint | number, bits: number): this;
    /**
     * Store maybe int value
     * @param value value as bigint or number, null or undefined
     * @param bits number of bits to write
     * @returns this builder
     */
    storeMaybeInt(value: Maybe<number | bigint>, bits: number): this;
    /**
     * Store varuint value
     * @param value value as bigint or number
     * @param bits number of bits to write to header
     * @returns this builder
     */
    storeVarUint(value: number | bigint, bits: number): this;
    /**
     * Store maybe varuint value
     * @param value value as bigint or number, null or undefined
     * @param bits number of bits to write to header
     * @returns this builder
     */
    storeMaybeVarUint(value: Maybe<number | bigint>, bits: number): this;
    /**
     * Store varint value
     * @param value value as bigint or number
     * @param bits number of bits to write to header
     * @returns this builder
     */
    storeVarInt(value: number | bigint, bits: number): this;
    /**
     * Store maybe varint value
     * @param value value as bigint or number, null or undefined
     * @param bits number of bits to write to header
     * @returns this builder
     */
    storeMaybeVarInt(value: Maybe<number | bigint>, bits: number): this;
    /**
     * Store coins value
     * @param amount amount of coins
     * @returns this builder
     */
    storeCoins(amount: number | bigint): this;
    /**
     * Store maybe coins value
     * @param amount amount of coins, null or undefined
     * @returns this builder
     */
    storeMaybeCoins(amount: Maybe<number | bigint>): this;
    /**
     * Store address
     * @param addres address to store
     * @returns this builder
     */
    storeAddress(address: Maybe<Address | ExternalAddress>): this;
    /**
     * Store reference
     * @param cell cell or builder to store
     * @returns this builder
     */
    storeRef(cell: Cell | Builder): this;
    /**
     * Store reference if not null
     * @param cell cell or builder to store
     * @returns this builder
     */
    storeMaybeRef(cell?: Maybe<Cell | Builder>): this;
    /**
     * Store slice it in this builder
     * @param src source slice
     */
    storeSlice(src: Slice): this;
    /**
     * Store slice in this builder if not null
     * @param src source slice
     */
    storeMaybeSlice(src?: Maybe<Slice>): this;
    /**
     * Store builder
     * @param src builder to store
     * @returns this builder
     */
    storeBuilder(src: Builder): this;
    /**
     * Store builder if not null
     * @param src builder to store
     * @returns this builder
     */
    storeMaybeBuilder(src?: Maybe<Builder>): this;
    /**
     * Store writer or builder
     * @param writer writer or builder to store
     * @returns this builder
     */
    storeWritable(writer: ((builder: Builder) => void) | Writable): this;
    /**
     * Store writer or builder if not null
     * @param writer writer or builder to store
     * @returns this builder
     */
    storeMaybeWritable(writer?: Maybe<((builder: Builder) => void) | Writable>): this;
    /**
     * Store object in this builder
     * @param writer Writable or writer functuin
     */
    store(writer: ((builder: Builder) => void) | Writable): this;
    /**
     * Store string tail
     * @param src source string
     * @returns this builder
     */
    storeStringTail(src: string): this;
    /**
     * Store string tail
     * @param src source string
     * @returns this builder
     */
    storeMaybeStringTail(src?: Maybe<string>): this;
    /**
     * Store string tail in ref
     * @param src source string
     * @returns this builder
     */
    storeStringRefTail(src: string): this;
    /**
     * Store maybe string tail in ref
     * @param src source string
     * @returns this builder
     */
    storeMaybeStringRefTail(src?: Maybe<string | null>): this;
    /**
     * Store dictionary in this builder
     * @param dict dictionary to store
     * @returns this builder
     */
    storeDict<K extends DictionaryKeyTypes, V>(dict?: Maybe<Dictionary<K, V>>, key?: Maybe<DictionaryKey<K>>, value?: Maybe<DictionaryValue<V>>): this;
    /**
     * Store dictionary in this builder directly
     * @param dict dictionary to store
     * @returns this builder
     */
    storeDictDirect<K extends DictionaryKeyTypes, V>(dict: Dictionary<K, V>, key?: Maybe<DictionaryKey<K>>, value?: Maybe<DictionaryValue<V>>): this;
    /**
     * Complete cell
     * @returns cell
     */
    endCell(): Cell;
    /**
     * Convert to cell
     * @returns cell
     */
    asCell(): Cell;
    /**
     * Convert to slice
     * @returns slice
     */
    asSlice(): Slice;
}
