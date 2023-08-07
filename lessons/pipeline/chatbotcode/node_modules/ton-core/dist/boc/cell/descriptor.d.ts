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
export declare function getRefsDescriptor(refs: Cell[], level: number, type: CellType): number;
export declare function getBitsDescriptor(bits: BitString): number;
export declare function getRepr(originalBits: BitString, bits: BitString, refs: Cell[], level: number, type: CellType): Buffer;
