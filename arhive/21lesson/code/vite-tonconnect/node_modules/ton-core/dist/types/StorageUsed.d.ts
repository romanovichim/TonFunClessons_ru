/**
 * Copyright (c) Whales Corp.
 * All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Builder } from "../boc/Builder";
import { Slice } from "../boc/Slice";
export type StorageUsed = {
    cells: bigint;
    bits: bigint;
    publicCells: bigint;
};
export declare function loadStorageUsed(cs: Slice): StorageUsed;
export declare function storeStorageUsed(src: StorageUsed): (builder: Builder) => void;
