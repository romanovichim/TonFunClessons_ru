/**
 * Copyright (c) Whales Corp.
 * All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
/// <reference types="node" />
import inspectSymbol from 'symbol.inspect';
import { Dictionary, DictionaryKey, DictionaryKeyTypes, DictionaryValue } from '../dict/Dictionary';
import { BitReader } from "./BitReader";
import { Cell } from "./Cell";
/**
 * Slice is a class that allows to read cell data
 */
export declare class Slice {
    private _reader;
    private _refs;
    private _refsOffset;
    constructor(reader: BitReader, refs: Cell[]);
    /**
     * Get remaining bits
     */
    get remainingBits(): number;
    /**
     * Get offset bits
     */
    get offsetBits(): number;
    /**
     * Get remaining refs
     */
    get remainingRefs(): number;
    /**
     * Get offset refs
     */
    get offsetRefs(): number;
    /**
     * Skip bits
     * @param bits
     */
    skip(bits: number): this;
    /**
     * Load a single bit
     * @returns true or false depending on the bit value
     */
    loadBit(): boolean;
    /**
     * Preload a signle bit
     * @returns true or false depending on the bit value
     */
    preloadBit(): boolean;
    /**
     * Load a boolean
     * @returns true or false depending on the bit value
     */
    loadBoolean(): boolean;
    /**
     * Load maybe boolean
     * @returns true or false depending on the bit value or null
     */
    loadMaybeBoolean(): boolean | null;
    /**
     * Load bits as a new BitString
     * @param bits number of bits to read
     * @returns new BitString
     */
    loadBits(bits: number): import("./BitString").BitString;
    /**
     * Preload bits as a new BitString
     * @param bits number of bits to read
     * @returns new BitString
     */
    preloadBits(bits: number): import("./BitString").BitString;
    /**
     * Load uint
     * @param bits number of bits to read
     * @returns uint value
     */
    loadUint(bits: number): number;
    /**
     * Load uint
     * @param bits number of bits to read
     * @returns uint value
     */
    loadUintBig(bits: number): bigint;
    /**
     * Preload uint
     * @param bits number of bits to read
     * @returns uint value
     */
    preloadUint(bits: number): number;
    /**
     * Preload uint
     * @param bits number of bits to read
     * @returns uint value
     */
    preloadUintBig(bits: number): bigint;
    /**
     * Load maybe uint
     * @param bits number of bits to read
     * @returns uint value or null
     */
    loadMaybeUint(bits: number): number | null;
    /**
     * Load maybe uint
     * @param bits number of bits to read
     * @returns uint value or null
     */
    loadMaybeUintBig(bits: number): bigint | null;
    /**
     * Load int
     * @param bits number of bits to read
     * @returns int value
     */
    loadInt(bits: number): number;
    /**
     * Load int
     * @param bits number of bits to read
     * @returns int value
     */
    loadIntBig(bits: number): bigint;
    /**
     * Preload int
     * @param bits number of bits to read
     * @returns int value
     */
    preloadInt(bits: number): number;
    /**
     * Preload int
     * @param bits number of bits to read
     * @returns int value
     */
    preloadIntBig(bits: number): bigint;
    /**
     * Load maybe uint
     * @param bits number of bits to read
     * @returns uint value or null
     */
    loadMaybeInt(bits: number): number | null;
    /**
     * Load maybe uint
     * @param bits number of bits to read
     * @returns uint value or null
     */
    loadMaybeIntBig(bits: number): bigint | null;
    /**
     * Load varuint
     * @param bits number of bits to read in header
     * @returns varuint value
     */
    loadVarUint(bits: number): number;
    /**
     * Load varuint
     * @param bits number of bits to read in header
     * @returns varuint value
     */
    loadVarUintBig(bits: number): bigint;
    /**
     * Preload varuint
     * @param bits number of bits to read in header
     * @returns varuint value
     */
    preloadVarUint(bits: number): number;
    /**
     * Preload varuint
     * @param bits number of bits to read in header
     * @returns varuint value
     */
    preloadVarUintBig(bits: number): bigint;
    /**
     * Load varint
     * @param bits number of bits to read in header
     * @returns varint value
     */
    loadVarInt(bits: number): number;
    /**
     * Load varint
     * @param bits number of bits to read in header
     * @returns varint value
     */
    loadVarIntBig(bits: number): bigint;
    /**
     * Preload varint
     * @param bits number of bits to read in header
     * @returns varint value
     */
    preloadVarInt(bits: number): number;
    /**
     * Preload varint
     * @param bits number of bits to read in header
     * @returns varint value
     */
    preloadVarIntBig(bits: number): bigint;
    /**
     * Load coins
     * @returns coins value
     */
    loadCoins(): bigint;
    /**
     * Preload coins
     * @returns coins value
     */
    preloadCoins(): bigint;
    /**
     * Load maybe coins
     * @returns coins value or null
     */
    loadMaybeCoins(): bigint | null;
    /**
     * Load internal Address
     * @returns Address
     */
    loadAddress(): import("..").Address;
    /**
     * Load optional internal Address
     * @returns Address or null
     */
    loadMaybeAddress(): import("..").Address | null;
    /**
     * Load external address
     * @returns ExternalAddress
     */
    loadExternalAddress(): import("..").ExternalAddress;
    /**
     * Load optional external address
     * @returns ExternalAddress or null
     */
    loadMaybeExternalAddress(): import("..").ExternalAddress | null;
    /**
     * Load address
     * @returns Address, ExternalAddress or null
     */
    loadAddressAny(): import("..").Address | import("..").ExternalAddress | null;
    /**
     * Load reference
     * @returns Cell
     */
    loadRef(): Cell;
    /**
     * Preload reference
     * @returns Cell
     */
    preloadRef(): Cell;
    /**
     * Load optional reference
     * @returns Cell or null
     */
    loadMaybeRef(): Cell | null;
    /**
     * Preload optional reference
     * @returns Cell or null
     */
    preloadMaybeRef(): Cell | null;
    /**
     * Load byte buffer
     * @param bytes number of bytes to load
     * @returns Buffer
     */
    loadBuffer(bytes: number): Buffer;
    /**
     * Load byte buffer
     * @param bytes number of bytes to load
     * @returns Buffer
     */
    preloadBuffer(bytes: number): Buffer;
    /**
     * Load string tail
     */
    loadStringTail(): string;
    /**
     * Load maybe string tail
     * @returns string or null
     */
    loadMaybeStringTail(): string | null;
    /**
     * Load string tail from ref
     * @returns string
     */
    loadStringRefTail(): string;
    /**
     * Load maybe string tail from ref
     * @returns string or null
     */
    loadMaybeStringRefTail(): string | null;
    /**
     * Loads dictionary
     * @param key key description
     * @param value value description
     * @returns Dictionary<K, V>
     */
    loadDict<K extends DictionaryKeyTypes, V>(key: DictionaryKey<K>, value: DictionaryValue<V>): Dictionary<K, V>;
    /**
     * Loads dictionary directly from current slice
     * @param key key description
     * @param value value description
     * @returns Dictionary<K, V>
     */
    loadDictDirect<K extends DictionaryKeyTypes, V>(key: DictionaryKey<K>, value: DictionaryValue<V>): Dictionary<K, V>;
    /**
     * Checks if slice is empty
     */
    endParse(): void;
    /**
     * Convert slice to cell
     */
    asCell(): Cell;
    /**
     *
     * @returns
     */
    asBuilder(): import("./Builder").Builder;
    /**
     * Clone slice
     * @returns cloned slice
     */
    clone(fromStart?: boolean): Slice;
    /**
     * Print slice as string by converting it to cell
     * @returns string
     */
    toString(): string;
    [inspectSymbol]: () => string;
}
