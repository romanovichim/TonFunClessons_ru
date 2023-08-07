/**
 * Copyright (c) Whales Corp. 
 * All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import inspectSymbol from 'symbol.inspect';
import { BitString } from "./BitString";
import { CellType } from "./CellType";
import { Slice } from "./Slice";
import { LevelMask } from './cell/LevelMask';
import { resolveExotic } from './cell/resolveExotic';
import { wonderCalculator } from './cell/wonderCalculator';
import { deserializeBoc, serializeBoc } from './cell/serialization';
import { BitReader } from './BitReader';
import { beginCell } from './Builder';

/**
 * Cell as described in TVM spec
 */
export class Cell {

    static readonly EMPTY = new Cell();

    /**
     * Deserialize cells from BOC
     * @param src source buffer
     * @returns array of cells
     */
    static fromBoc(src: Buffer) {
        return deserializeBoc(src);
    }

    /**
     * Helper class that deserializes a single cell from BOC in base64
     * @param src source string
     */
    static fromBase64(src: string): Cell {
        let parsed = Cell.fromBoc(Buffer.from(src, 'base64'));
        if (parsed.length !== 1) {
            throw new Error("Deserialized more than one cell");
        }
        return parsed[0];
    }

    // Public properties
    readonly type: CellType;
    readonly bits: BitString;
    readonly refs: Cell[];
    readonly mask: LevelMask;

    // Level and depth information
    private _hashes: Buffer[] = [];
    private _depths: number[] = [];

    constructor(opts?: { exotic?: boolean, bits?: BitString, refs?: Cell[] }) {

        // Resolve bits
        let bits = BitString.EMPTY;
        if (opts && opts.bits) {
            bits = opts.bits;
        }

        // Resolve refs
        let refs: Cell[] = [];
        if (opts && opts.refs) {
            refs = [...opts.refs];
        }

        // Resolve type
        let hashes: Buffer[];
        let depths: number[];
        let mask: LevelMask;
        let type = CellType.Ordinary;
        if (opts && opts.exotic) {

            // Resolve exotic cell
            let resolved = resolveExotic(bits, refs);

            // Perform wonders
            let wonders = wonderCalculator(resolved.type, bits, refs);

            // Copy results
            mask = wonders.mask;
            depths = wonders.depths;
            hashes = wonders.hashes;
            type = resolved.type;

        } else {

            // Check correctness
            if (refs.length > 4) {
                throw new Error("Invalid number of references");
            }
            if (bits.length > 1023) {
                throw new Error(`Bits overflow: ${bits.length} > 1023`);
            }

            // Perform wonders
            let wonders = wonderCalculator(CellType.Ordinary, bits, refs);

            // Copy results
            mask = wonders.mask;
            depths = wonders.depths;
            hashes = wonders.hashes;
            type = CellType.Ordinary;
        }

        // Set fields
        this.type = type;
        this.bits = bits;
        this.refs = refs;
        this.mask = mask;
        this._depths = depths;
        this._hashes = hashes;

        Object.freeze(this);
        Object.freeze(this.refs);
        Object.freeze(this.bits);
        Object.freeze(this.mask);
        Object.freeze(this._depths);
        Object.freeze(this._hashes);
    }

    /**
     * Check if cell is exotic
     */
    get isExotic() {
        return this.type !== CellType.Ordinary;
    }

    /**
     * Beging cell parsing
     * @returns a new slice
     */
    beginParse = (allowExotic: boolean = false) => {
        if (this.isExotic && !allowExotic) {
            throw new Error("Exotic cells cannot be parsed");
        }
        return new Slice(new BitReader(this.bits), this.refs);
    }

    /**
     * Get cell hash
     * @param level level
     * @returns cell hash
     */
    hash = (level: number = 3): Buffer => {
        return this._hashes[Math.min(this._hashes.length - 1, level)];
    }

    /**
     * Get cell depth
     * @param level level
     * @returns cell depth
     */
    depth = (level: number = 3): number => {
        return this._depths[Math.min(this._depths.length - 1, level)];
    }

    /**
     * Get cell level
     * @returns cell level
     */
    level = (): number => {
        return this.mask.level;
    }

    /**
     * Checks cell to be euqal to another cell
     * @param other other cell
     * @returns true if cells are equal
     */
    equals = (other: Cell): boolean => {
        return this.hash().equals(other.hash());
    }

    /**
     * Serializes cell to BOC
     * @param opts options
     */
    toBoc(opts?: { idx?: boolean | null | undefined, crc32?: boolean | null | undefined }): Buffer {
        let idx = (opts && opts.idx !== null && opts.idx !== undefined) ? opts.idx : false;
        let crc32 = (opts && opts.crc32 !== null && opts.crc32 !== undefined) ? opts.crc32 : true;
        return serializeBoc(this, { idx, crc32 });
    }

    /**
     * Format cell to string
     * @param indent indentation
     * @returns string representation
     */
    toString(indent?: string): string {
        let id = indent || '';
        let t = 'x';
        if (this.isExotic) {
            if (this.type === CellType.MerkleProof) {
                t = 'p';
            } else if (this.type === CellType.MerkleUpdate) {
                t = 'u';
            } else if (this.type === CellType.PrunedBranch) {
                t = 'p';
            }
        }
        let s = id + (this.isExotic ? t : 'x') + '{' + this.bits.toString() + '}';
        for (let k in this.refs) {
            const i = this.refs[k];
            s += '\n' + i.toString(id + ' ');
        }
        return s;
    }

    /**
     * Covnert cell to slice
     * @returns slice
     */
    asSlice() {
        return this.beginParse();
    }

    /**
     * Convert cell to a builder that has this cell stored
     * @returns builder
     */
    asBuilder() {
        return beginCell().storeSlice(this.asSlice());
    }

    [inspectSymbol] = () => this.toString();
}