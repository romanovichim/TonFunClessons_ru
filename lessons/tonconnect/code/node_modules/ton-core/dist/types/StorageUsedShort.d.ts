/**
 * Copyright (c) Whales Corp.
 * All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Builder } from "../boc/Builder";
import { Slice } from "../boc/Slice";
export type StorageUsedShort = {
    cells: bigint;
    bits: bigint;
};
export declare function loadStorageUsedShort(slice: Slice): StorageUsedShort;
export declare function storeStorageUsedShort(src: StorageUsedShort): (builder: Builder) => void;
