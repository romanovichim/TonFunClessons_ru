/**
 * Copyright (c) Whales Corp.
 * All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
/// <reference types="node" />
import { BitString } from "../BitString";
import { CellType } from "../CellType";
import { Cell } from '../Cell';
import { LevelMask } from "./LevelMask";
export declare function wonderCalculator(type: CellType, bits: BitString, refs: Cell[]): {
    mask: LevelMask;
    hashes: Buffer[];
    depths: number[];
};
