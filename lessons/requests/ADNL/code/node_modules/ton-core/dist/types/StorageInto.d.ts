/**
 * Copyright (c) Whales Corp.
 * All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Builder } from "../boc/Builder";
import { Slice } from "../boc/Slice";
import { Maybe } from "../utils/maybe";
import { StorageUsed } from "./StorageUsed";
export type StorageInfo = {
    used: StorageUsed;
    lastPaid: number;
    duePayment?: Maybe<bigint>;
};
export declare function loadStorageInfo(slice: Slice): StorageInfo;
export declare function storeStorageInfo(src: StorageInfo): (builder: Builder) => void;
