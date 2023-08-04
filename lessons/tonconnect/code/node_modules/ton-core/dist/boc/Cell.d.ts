/**
 * Copyright (c) Whales Corp.
 * All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
/// <reference types="node" />
import inspectSymbol from 'symbol.inspect';
import { BitString } from "./BitString";
import { CellType } from "./CellType";
import { Slice } from "./Slice";
import { LevelMask } from './cell/LevelMask';
/**
 * Cell as described in TVM spec
 */
export declare class Cell {
    static readonly EMPTY: Cell;
    /**
     * Deserialize cells from BOC
     * @param src source buffer
     * @returns array of cells
     */
    static fromBoc(src: Buffer): Cell[];
    /**
     * Helper class that deserializes a single cell from BOC in base64
     * @param src source string
     */
    static fromBase64(src: string): Cell;
    readonly type: CellType;
    readonly bits: BitString;
    readonly refs: Cell[];
    readonly mask: LevelMask;
    private _hashes;
    private _depths;
    constructor(opts?: {
        exotic?: boolean;
        bits?: BitString;
        refs?: Cell[];
    });
    /**
     * Check if cell is exotic
     */
    get isExotic(): boolean;
    /**
     * Beging cell parsing
     * @returns a new slice
     */
    beginParse: (allowExotic?: boolean) => Slice;
    /**
     * Get cell hash
     * @param level level
     * @returns cell hash
     */
    hash: (level?: number) => Buffer;
    /**
     * Get cell depth
     * @param level level
     * @returns cell depth
     */
    depth: (level?: number) => number;
    /**
     * Get cell level
     * @returns cell level
     */
    level: () => number;
    /**
     * Checks cell to be euqal to another cell
     * @param other other cell
     * @returns true if cells are equal
     */
    equals: (other: Cell) => boolean;
    /**
     * Serializes cell to BOC
     * @param opts options
     */
    toBoc(opts?: {
        idx?: boolean | null | undefined;
        crc32?: boolean | null | undefined;
    }): Buffer;
    /**
     * Format cell to string
     * @param indent indentation
     * @returns string representation
     */
    toString(indent?: string): string;
    /**
     * Covnert cell to slice
     * @returns slice
     */
    asSlice(): Slice;
    /**
     * Convert cell to a builder that has this cell stored
     * @returns builder
     */
    asBuilder(): import("./Builder").Builder;
    [inspectSymbol]: () => string;
}
