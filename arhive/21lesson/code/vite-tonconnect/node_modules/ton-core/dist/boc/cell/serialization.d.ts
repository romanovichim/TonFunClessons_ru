/**
 * Copyright (c) Whales Corp.
 * All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
/// <reference types="node" />
import { Cell } from "../Cell";
export declare function parseBoc(src: Buffer): {
    size: number;
    offBytes: number;
    cells: number;
    roots: number;
    absent: number;
    totalCellSize: number;
    index: Buffer | null;
    cellData: Buffer;
    root: number[];
};
export declare function deserializeBoc(src: Buffer): Cell[];
export declare function serializeBoc(root: Cell, opts: {
    idx: boolean;
    crc32: boolean;
}): Buffer;
