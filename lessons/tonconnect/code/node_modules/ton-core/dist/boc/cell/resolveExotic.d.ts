/**
 * Copyright (c) Whales Corp.
 * All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
/// <reference types="node" />
import { BitString } from "../BitString";
import { Cell } from "../Cell";
import { CellType } from "../CellType";
import { LevelMask } from "./LevelMask";
export declare function resolveExotic(bits: BitString, refs: Cell[]): {
    type: CellType;
    depths: number[];
    hashes: Buffer[];
    mask: LevelMask;
};
