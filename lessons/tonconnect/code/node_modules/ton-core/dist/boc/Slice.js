"use strict";
/**
 * Copyright (c) Whales Corp.
 * All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Slice = void 0;
const symbol_inspect_1 = __importDefault(require("symbol.inspect"));
const Dictionary_1 = require("../dict/Dictionary");
const Builder_1 = require("./Builder");
const strings_1 = require("./utils/strings");
/**
 * Slice is a class that allows to read cell data
 */
class Slice {
    constructor(reader, refs) {
        this[_a] = () => this.toString();
        this._reader = reader.clone();
        this._refs = [...refs];
        this._refsOffset = 0;
    }
    /**
     * Get remaining bits
     */
    get remainingBits() {
        return this._reader.remaining;
    }
    /**
     * Get offset bits
     */
    get offsetBits() {
        return this._reader.offset;
    }
    /**
     * Get remaining refs
     */
    get remainingRefs() {
        return this._refs.length - this._refsOffset;
    }
    /**
     * Get offset refs
     */
    get offsetRefs() {
        return this._refsOffset;
    }
    /**
     * Skip bits
     * @param bits
     */
    skip(bits) {
        this._reader.skip(bits);
        return this;
    }
    /**
     * Load a single bit
     * @returns true or false depending on the bit value
     */
    loadBit() {
        return this._reader.loadBit();
    }
    /**
     * Preload a signle bit
     * @returns true or false depending on the bit value
     */
    preloadBit() {
        return this._reader.preloadBit();
    }
    /**
     * Load a boolean
     * @returns true or false depending on the bit value
     */
    loadBoolean() {
        return this.loadBit();
    }
    /**
     * Load maybe boolean
     * @returns true or false depending on the bit value or null
     */
    loadMaybeBoolean() {
        if (this.loadBit()) {
            return this.loadBoolean();
        }
        else {
            return null;
        }
    }
    /**
     * Load bits as a new BitString
     * @param bits number of bits to read
     * @returns new BitString
     */
    loadBits(bits) {
        return this._reader.loadBits(bits);
    }
    /**
     * Preload bits as a new BitString
     * @param bits number of bits to read
     * @returns new BitString
     */
    preloadBits(bits) {
        return this._reader.preloadBits(bits);
    }
    /**
     * Load uint
     * @param bits number of bits to read
     * @returns uint value
     */
    loadUint(bits) {
        return this._reader.loadUint(bits);
    }
    /**
     * Load uint
     * @param bits number of bits to read
     * @returns uint value
     */
    loadUintBig(bits) {
        return this._reader.loadUintBig(bits);
    }
    /**
     * Preload uint
     * @param bits number of bits to read
     * @returns uint value
     */
    preloadUint(bits) {
        return this._reader.preloadUint(bits);
    }
    /**
     * Preload uint
     * @param bits number of bits to read
     * @returns uint value
     */
    preloadUintBig(bits) {
        return this._reader.preloadUintBig(bits);
    }
    /**
     * Load maybe uint
     * @param bits number of bits to read
     * @returns uint value or null
     */
    loadMaybeUint(bits) {
        if (this.loadBit()) {
            return this.loadUint(bits);
        }
        else {
            return null;
        }
    }
    /**
     * Load maybe uint
     * @param bits number of bits to read
     * @returns uint value or null
     */
    loadMaybeUintBig(bits) {
        if (this.loadBit()) {
            return this.loadUintBig(bits);
        }
        else {
            return null;
        }
    }
    /**
     * Load int
     * @param bits number of bits to read
     * @returns int value
     */
    loadInt(bits) {
        return this._reader.loadInt(bits);
    }
    /**
     * Load int
     * @param bits number of bits to read
     * @returns int value
     */
    loadIntBig(bits) {
        return this._reader.loadIntBig(bits);
    }
    /**
     * Preload int
     * @param bits number of bits to read
     * @returns int value
     */
    preloadInt(bits) {
        return this._reader.preloadInt(bits);
    }
    /**
     * Preload int
     * @param bits number of bits to read
     * @returns int value
     */
    preloadIntBig(bits) {
        return this._reader.preloadIntBig(bits);
    }
    /**
     * Load maybe uint
     * @param bits number of bits to read
     * @returns uint value or null
     */
    loadMaybeInt(bits) {
        if (this.loadBit()) {
            return this.loadInt(bits);
        }
        else {
            return null;
        }
    }
    /**
     * Load maybe uint
     * @param bits number of bits to read
     * @returns uint value or null
     */
    loadMaybeIntBig(bits) {
        if (this.loadBit()) {
            return this.loadIntBig(bits);
        }
        else {
            return null;
        }
    }
    /**
     * Load varuint
     * @param bits number of bits to read in header
     * @returns varuint value
     */
    loadVarUint(bits) {
        return this._reader.loadVarUint(bits);
    }
    /**
     * Load varuint
     * @param bits number of bits to read in header
     * @returns varuint value
     */
    loadVarUintBig(bits) {
        return this._reader.loadVarUintBig(bits);
    }
    /**
     * Preload varuint
     * @param bits number of bits to read in header
     * @returns varuint value
     */
    preloadVarUint(bits) {
        return this._reader.preloadVarUint(bits);
    }
    /**
     * Preload varuint
     * @param bits number of bits to read in header
     * @returns varuint value
     */
    preloadVarUintBig(bits) {
        return this._reader.preloadVarUintBig(bits);
    }
    /**
     * Load varint
     * @param bits number of bits to read in header
     * @returns varint value
     */
    loadVarInt(bits) {
        return this._reader.loadVarInt(bits);
    }
    /**
     * Load varint
     * @param bits number of bits to read in header
     * @returns varint value
     */
    loadVarIntBig(bits) {
        return this._reader.loadVarIntBig(bits);
    }
    /**
     * Preload varint
     * @param bits number of bits to read in header
     * @returns varint value
     */
    preloadVarInt(bits) {
        return this._reader.preloadVarInt(bits);
    }
    /**
     * Preload varint
     * @param bits number of bits to read in header
     * @returns varint value
     */
    preloadVarIntBig(bits) {
        return this._reader.preloadVarIntBig(bits);
    }
    /**
     * Load coins
     * @returns coins value
     */
    loadCoins() {
        return this._reader.loadCoins();
    }
    /**
     * Preload coins
     * @returns coins value
     */
    preloadCoins() {
        return this._reader.preloadCoins();
    }
    /**
     * Load maybe coins
     * @returns coins value or null
     */
    loadMaybeCoins() {
        if (this._reader.loadBit()) {
            return this._reader.loadCoins();
        }
        else {
            return null;
        }
    }
    /**
     * Load internal Address
     * @returns Address
     */
    loadAddress() {
        return this._reader.loadAddress();
    }
    /**
     * Load optional internal Address
     * @returns Address or null
     */
    loadMaybeAddress() {
        return this._reader.loadMaybeAddress();
    }
    /**
     * Load external address
     * @returns ExternalAddress
     */
    loadExternalAddress() {
        return this._reader.loadExternalAddress();
    }
    /**
     * Load optional external address
     * @returns ExternalAddress or null
     */
    loadMaybeExternalAddress() {
        return this._reader.loadMaybeExternalAddress();
    }
    /**
     * Load address
     * @returns Address, ExternalAddress or null
     */
    loadAddressAny() {
        return this._reader.loadAddressAny();
    }
    /**
     * Load reference
     * @returns Cell
     */
    loadRef() {
        if (this._refsOffset >= this._refs.length) {
            throw new Error("No more references");
        }
        return this._refs[this._refsOffset++];
    }
    /**
     * Preload reference
     * @returns Cell
     */
    preloadRef() {
        if (this._refsOffset >= this._refs.length) {
            throw new Error("No more references");
        }
        return this._refs[this._refsOffset];
    }
    /**
     * Load optional reference
     * @returns Cell or null
     */
    loadMaybeRef() {
        if (this.loadBit()) {
            return this.loadRef();
        }
        else {
            return null;
        }
    }
    /**
     * Preload optional reference
     * @returns Cell or null
     */
    preloadMaybeRef() {
        if (this.preloadBit()) {
            return this.preloadRef();
        }
        else {
            return null;
        }
    }
    /**
     * Load byte buffer
     * @param bytes number of bytes to load
     * @returns Buffer
     */
    loadBuffer(bytes) {
        return this._reader.loadBuffer(bytes);
    }
    /**
     * Load byte buffer
     * @param bytes number of bytes to load
     * @returns Buffer
     */
    preloadBuffer(bytes) {
        return this._reader.preloadBuffer(bytes);
    }
    /**
     * Load string tail
     */
    loadStringTail() {
        return (0, strings_1.readString)(this);
    }
    /**
     * Load maybe string tail
     * @returns string or null
     */
    loadMaybeStringTail() {
        if (this.loadBit()) {
            return (0, strings_1.readString)(this);
        }
        else {
            return null;
        }
    }
    /**
     * Load string tail from ref
     * @returns string
     */
    loadStringRefTail() {
        return (0, strings_1.readString)(this.loadRef().beginParse());
    }
    /**
     * Load maybe string tail from ref
     * @returns string or null
     */
    loadMaybeStringRefTail() {
        const ref = this.loadMaybeRef();
        if (ref) {
            return (0, strings_1.readString)(ref.beginParse());
        }
        else {
            return null;
        }
    }
    /**
     * Loads dictionary
     * @param key key description
     * @param value value description
     * @returns Dictionary<K, V>
     */
    loadDict(key, value) {
        return Dictionary_1.Dictionary.load(key, value, this);
    }
    /**
     * Loads dictionary directly from current slice
     * @param key key description
     * @param value value description
     * @returns Dictionary<K, V>
     */
    loadDictDirect(key, value) {
        return Dictionary_1.Dictionary.loadDirect(key, value, this);
    }
    /**
     * Checks if slice is empty
     */
    endParse() {
        if (this.remainingBits > 0 || this.remainingRefs > 0) {
            throw new Error("Slice is not empty");
        }
    }
    /**
     * Convert slice to cell
     */
    asCell() {
        return (0, Builder_1.beginCell)().storeSlice(this).endCell();
    }
    /**
     *
     * @returns
     */
    asBuilder() {
        return (0, Builder_1.beginCell)().storeSlice(this);
    }
    /**
     * Clone slice
     * @returns cloned slice
     */
    clone(fromStart = false) {
        if (fromStart) {
            let reader = this._reader.clone();
            reader.reset();
            return new Slice(reader, this._refs);
        }
        else {
            let res = new Slice(this._reader, this._refs);
            res._refsOffset = this._refsOffset;
            return res;
        }
    }
    /**
     * Print slice as string by converting it to cell
     * @returns string
     */
    toString() {
        return this.asCell().toString();
    }
}
exports.Slice = Slice;
_a = symbol_inspect_1.default;
