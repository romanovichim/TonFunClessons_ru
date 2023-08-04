/**
 * Copyright (c) Whales Corp. 
 * All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Address } from "../address/Address";
import { beginCell, Builder } from "../boc/Builder";
import { Cell } from "../boc/Cell";
import { Slice } from "../boc/Slice";
import { Maybe } from "../utils/maybe";
import { parseDict } from "./parseDict";
import { serializeDict } from "./serializeDict";
import { deserializeInternalKey, serializeInternalKey } from "./utils/internalKeySerializer";

export type DictionaryKeyTypes = Address | number | bigint | Buffer;

export type DictionaryKey<K extends DictionaryKeyTypes> = {
    bits: number;
    serialize(src: K): bigint;
    parse(src: bigint): K;
}

export type DictionaryValue<V> = {
    serialize(src: V, builder: Builder): void;
    parse(src: Slice): V;
}

export class Dictionary<K extends DictionaryKeyTypes, V> {
    static Keys = {

        /**
         * Standard address key
         * @returns DictionaryKey<Address> 
         */
        Address: () => {
            return createAddressKey();
        },

        /**
         * Create standard big integer key
         * @param bits number of bits
         * @returns DictionaryKey<bigint>
         */
        BigInt: (bits: number) => {
            return createBigIntKey(bits);
        },

        /**
         * Create integer key
         * @param bits bits of integer
         * @returns DictionaryKey<number>
         */
        Int: (bits: number) => {
            return createIntKey(bits);
        },

        /**
         * Create standard unsigned big integer key
         * @param bits number of bits
         * @returns DictionaryKey<bigint>
         */
        BigUint: (bits: number) => {
            return createBigUintKey(bits);
        },

        /**
         * Create standard unsigned integer key
         * @param bits number of bits
         * @returns DictionaryKey<number>
         */
        Uint: (bits: number) => {
            return createUintKey(bits);
        },

        /**
         * Create standard buffer key
         * @param bytes number of bytes of a buffer
         * @returns DictionaryKey<Buffer>
         */
        Buffer: (bytes: number) => {
            return createBufferKey(bytes);
        }
    }

    static Values = {

        /**
         * Create standard integer value
         * @returns DictionaryValue<bigint>
         */
        BigInt: (bits: number) => {
            return createBigIntValue(bits);
        },

        /**
         * Create standard integer value
         * @returns DictionaryValue<number>
         */
        Int: (bits: number) => {
            return createIntValue(bits);
        },

        /**
         * Create big var int
         * @param bits nubmer of header bits
         * @returns DictionaryValue<bigint>
         */
        BigVarInt: (bits: number) => {
            return createBigVarIntValue(bits);
        },

        /**
         * Create standard unsigned integer value
         * @param bits number of bits
         * @returns DictionaryValue<bigint>
         */
        BigUint: (bits: number) => {
            return createBigUintValue(bits);
        },

        /**
         * Create standard unsigned integer value
         * @param bits number of bits
         * @returns DictionaryValue<bigint>
         */
        Uint: (bits: number) => {
            return createUintValue(bits);
        },

        /**
         * Create big var int
         * @param bits nubmer of header bits
         * @returns DictionaryValue<bigint>
         */
        BigVarUint: (bits: number) => {
            return createBigVarUintValue(bits);
        },

        /**
         * Create standard boolean value
         * @returns DictionaryValue<boolean>
         */
        Bool: () => {
            return createBooleanValue();
        },

        /**
         * Create standard address value
         * @returns DictionaryValue<Address>
         */
        Address: () => {
            return createAddressValue();
        },

        /**
         * Create standard cell value
         * @returns DictionaryValue<Cell>
         */
        Cell: () => {
            return createCellValue();
        },

        /**
         * Create Builder value
         * @param bytes number of bytes of a buffer
         * @returns DictionaryValue<Builder>
         */
        Buffer: (bytes: number) => {
            return createBufferValue(bytes);
        },

        /**
         * Create dictionary value
         * @param key 
         * @param value 
         */
        Dictionary: <K extends DictionaryKeyTypes, V>(key: DictionaryKey<K>, value: DictionaryValue<V>) => {
            return createDictionaryValue(key, value);
        }
    };

    /**
     * Create an empty map
     * @param key key type
     * @param value value type
     * @returns Dictionary<K, V>
     */
    static empty<K extends DictionaryKeyTypes, V>(key?: Maybe<DictionaryKey<K>>, value?: Maybe<DictionaryValue<V>>): Dictionary<K, V> {
        if (key && value) {
            return new Dictionary<K, V>(new Map(), key, value);
        } else {
            return new Dictionary<K, V>(new Map(), null, null);
        }
    }

    /**
     * Load dictionary from slice
     * @param key key description
     * @param value value description
     * @param src slice
     * @returns Dictionary<K, V>
     */
    static load<K extends DictionaryKeyTypes, V>(key: DictionaryKey<K>, value: DictionaryValue<V>, sc: Slice | Cell): Dictionary<K, V> {
        let slice: Slice;
        if (sc instanceof Cell) {
            if (sc.isExotic) {
                return Dictionary.empty<K, V>(key, value);
            }
            slice = sc.beginParse();
        } else {
            slice = sc;
        }
        let cell = slice.loadMaybeRef();
        if (cell && !cell.isExotic) {
            return Dictionary.loadDirect<K, V>(key, value, cell.beginParse());
        } else {
            return Dictionary.empty<K, V>(key, value);
        }
    }

    /**
     * Low level method for rare dictionaries from system contracts. 
     * Loads dictionary from slice directly without going to the ref.
     * 
     * @param key key description
     * @param value value description
     * @param sc slice
     * @returns Dictionary<K, V>
     */
    static loadDirect<K extends DictionaryKeyTypes, V>(key: DictionaryKey<K>, value: DictionaryValue<V>, sc: Slice | Cell | null): Dictionary<K, V> {
        if (!sc) {
            return Dictionary.empty<K, V>(key, value);
        }
        let slice: Slice;
        if (sc instanceof Cell) {
            slice = sc.beginParse();
        } else {
            slice = sc;
        }
        let values = parseDict(slice, key.bits, value.parse);
        let prepare = new Map<string, V>();
        for (let [k, v] of values) {
            prepare.set(serializeInternalKey(key.parse(k)), v);
        }
        return new Dictionary(prepare, key, value);
    }

    private readonly _key: DictionaryKey<K> | null;
    private readonly _value: DictionaryValue<V> | null;
    private readonly _map: Map<string, V>;

    private constructor(values: Map<string, V>, key: DictionaryKey<K> | null, value: DictionaryValue<V> | null) {
        this._key = key;
        this._value = value;
        this._map = values;
    }

    get size() {
        return this._map.size;
    }

    get(key: K): V | undefined {
        return this._map.get(serializeInternalKey(key));
    }

    has(key: K): boolean {
        return this._map.has(serializeInternalKey(key));
    }

    set(key: K, value: V): this {
        this._map.set(serializeInternalKey(key), value)
        return this;
    }

    delete(key: K) {
        const k = serializeInternalKey(key);
        return this._map.delete(k)
    }

    clear() {
        this._map.clear();
    }

    *[Symbol.iterator](): IterableIterator<[K, V]> {
        for (const [k, v] of this._map) {
            const key = deserializeInternalKey(k) as K;
            yield [key, v]
        }
    }

    keys() {
        return Array.from(this._map.keys()).map((v) => deserializeInternalKey(v) as K);
    }

    values() {
        return Array.from(this._map.values());
    }

    store(builder: Builder, key?: Maybe<DictionaryKey<K>>, value?: Maybe<DictionaryValue<V>>) {
        if (this._map.size === 0) {
            builder.storeBit(0);
        } else {

            // Resolve serializer
            let resolvedKey = this._key;
            if (key !== null && key !== undefined) {
                resolvedKey = key;
            }
            let resolvedValue = this._value;
            if (value !== null && value !== undefined) {
                resolvedValue = value;
            }
            if (!resolvedKey) {
                throw Error('Key serializer is not defined');
            }
            if (!resolvedValue) {
                throw Error('Value serializer is not defined');
            }

            // Prepare map
            let prepared = new Map<bigint, V>();
            for (const [k, v] of this._map) {
                prepared.set(resolvedKey.serialize(deserializeInternalKey(k)), v);
            }

            // Store
            builder.storeBit(1);
            let dd = beginCell();
            serializeDict(prepared, resolvedKey.bits, resolvedValue.serialize, dd);
            builder.storeRef(dd.endCell());
        }
    }

    storeDirect(builder: Builder, key?: Maybe<DictionaryKey<K>>, value?: Maybe<DictionaryValue<V>>) {
        if (this._map.size === 0) {
            throw Error('Cannot store empty dictionary directly');
        }

        // Resolve serializer
        let resolvedKey = this._key;
        if (key !== null && key !== undefined) {
            resolvedKey = key;
        }
        let resolvedValue = this._value;
        if (value !== null && value !== undefined) {
            resolvedValue = value;
        }
        if (!resolvedKey) {
            throw Error('Key serializer is not defined');
        }
        if (!resolvedValue) {
            throw Error('Value serializer is not defined');
        }

        // Prepare map
        let prepared = new Map<bigint, V>();
        for (const [k, v] of this._map) {
            prepared.set(resolvedKey.serialize(deserializeInternalKey(k)), v);
        }

        // Store
        serializeDict(prepared, resolvedKey.bits, resolvedValue.serialize, builder);
    }
}

//
// Keys and Values
//

function createAddressKey(): DictionaryKey<Address> {
    return {
        bits: 267,
        serialize: (src) => {
            if (!Address.isAddress(src)) {
                throw Error('Key is not an address');
            }
            return beginCell().storeAddress(src).endCell().beginParse().preloadUintBig(267);
        },
        parse: (src) => {
            return beginCell().storeUint(src, 267).endCell().beginParse().loadAddress();
        }
    }
}

function createBigIntKey(bits: number): DictionaryKey<bigint> {
    return {
        bits,
        serialize: (src) => {
            if (typeof src !== 'bigint') {
                throw Error('Key is not a bigint');
            }
            return beginCell().storeInt(src, bits).endCell().beginParse().loadUintBig(bits);
        },
        parse: (src) => {
            return beginCell().storeUint(src, bits).endCell().beginParse().loadIntBig(bits);
        }
    }
}

function createIntKey(bits: number): DictionaryKey<number> {
    return {
        bits: bits,
        serialize: (src) => {
            if (typeof src !== 'number') {
                throw Error('Key is not a number');
            }
            if (!Number.isSafeInteger(src)) {
                throw Error('Key is not a safe integer: ' + src);
            }
            return beginCell().storeInt(src, bits).endCell().beginParse().loadUintBig(bits);
        },
        parse: (src) => {
            return beginCell().storeUint(src, bits).endCell().beginParse().loadInt(bits);
        }
    }
}

function createBigUintKey(bits: number): DictionaryKey<bigint> {
    return {
        bits,
        serialize: (src) => {
            if (typeof src !== 'bigint') {
                throw Error('Key is not a bigint');
            }
            if (src < 0) {
                throw Error('Key is negative: ' + src);
            }
            return beginCell().storeUint(src, bits).endCell().beginParse().loadUintBig(bits);
        },
        parse: (src) => {
            return beginCell().storeUint(src, bits).endCell().beginParse().loadUintBig(bits);
        }
    }
}

function createUintKey(bits: number): DictionaryKey<number> {
    return {
        bits,
        serialize: (src) => {
            if (typeof src !== 'number') {
                throw Error('Key is not a number');
            }
            if (!Number.isSafeInteger(src)) {
                throw Error('Key is not a safe integer: ' + src);
            }
            if (src < 0) {
                throw Error('Key is negative: ' + src);
            }
            return beginCell().storeUint(src, bits).endCell().beginParse().loadUintBig(bits);
        },
        parse: (src) => {
            return Number(beginCell().storeUint(src, bits).endCell().beginParse().loadUint(bits));
        }
    }
}

function createBufferKey(bytes: number): DictionaryKey<Buffer> {
    return {
        bits: bytes * 8,
        serialize: (src) => {
            if (!Buffer.isBuffer(src)) {
                throw Error('Key is not a buffer');
            }
            return beginCell().storeBuffer(src).endCell().beginParse().loadUintBig(bytes * 8);
        },
        parse: (src) => {
            return beginCell().storeUint(src, bytes * 8).endCell().beginParse().loadBuffer(bytes);
        }
    }
}

function createIntValue(bits: number): DictionaryValue<number> {
    return {
        serialize: (src, buidler) => {
            buidler.storeInt(src, bits);
        },
        parse: (src) => {
            return src.loadInt(bits);
        }
    }
}

function createBigIntValue(bits: number): DictionaryValue<bigint> {
    return {
        serialize: (src, buidler) => {
            buidler.storeInt(src, bits);
        },
        parse: (src) => {
            return src.loadIntBig(bits);
        }
    }
}

function createBigVarIntValue(bits: number): DictionaryValue<bigint> {
    return {
        serialize: (src, buidler) => {
            buidler.storeVarInt(src, bits);
        },
        parse: (src) => {
            return src.loadVarIntBig(bits);
        }
    }
}

function createBigVarUintValue(bits: number): DictionaryValue<bigint> {
    return {
        serialize: (src, buidler) => {
            buidler.storeVarUint(src, bits);
        },
        parse: (src) => {
            return src.loadVarUintBig(bits);
        }
    }
}

function createUintValue(bits: number): DictionaryValue<number> {
    return {
        serialize: (src, buidler) => {
            buidler.storeUint(src, bits);
        },
        parse: (src) => {
            return src.loadUint(bits);
        }
    }
}

function createBigUintValue(bits: number): DictionaryValue<bigint> {
    return {
        serialize: (src, buidler) => {
            buidler.storeUint(src, bits);
        },
        parse: (src) => {
            return src.loadUintBig(bits);
        }
    }
}

function createBooleanValue(): DictionaryValue<boolean> {
    return {
        serialize: (src, buidler) => {
            buidler.storeBit(src);
        },
        parse: (src) => {
            return src.loadBit();
        }
    }
}

function createAddressValue(): DictionaryValue<Address> {
    return {
        serialize: (src, buidler) => {
            buidler.storeAddress(src);
        },
        parse: (src) => {
            return src.loadAddress();
        }
    }
}

function createCellValue(): DictionaryValue<Cell> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(src);
        },
        parse: (src) => {
            return src.loadRef();
        }
    }
}

function createDictionaryValue<K extends DictionaryKeyTypes, V>(key: DictionaryKey<K>, value: DictionaryValue<V>): DictionaryValue<Dictionary<K, V>> {
    return {
        serialize: (src, buidler) => {
            src.store(buidler);
        },
        parse: (src) => {
            return Dictionary.load(key, value, src);
        }
    }
}

function createBufferValue(size: number): DictionaryValue<Buffer> {
    return {
        serialize: (src, buidler) => {
            if (src.length !== size) {
                throw Error('Invalid buffer size');
            }
            buidler.storeBuffer(src);
        },
        parse: (src) => {
            return src.loadBuffer(size);
        }
    }
}