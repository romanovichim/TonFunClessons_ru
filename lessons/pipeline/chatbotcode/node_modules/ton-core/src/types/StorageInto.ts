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
import { loadStorageUsed, StorageUsed, storeStorageUsed } from "./StorageUsed"

// Source: https://github.com/ton-blockchain/ton/blob/24dc184a2ea67f9c47042b4104bbb4d82289fac1/crypto/block/block.tlb#L228
// storage_info$_ used:StorageUsed last_paid:uint32
//  due_payment:(Maybe Grams) = StorageInfo;

export type StorageInfo = {
    used: StorageUsed;
    lastPaid: number;
    duePayment?: Maybe<bigint>;
}

export function loadStorageInfo(slice: Slice): StorageInfo {
    return {
        used: loadStorageUsed(slice),
        lastPaid: slice.loadUint(32),
        duePayment: slice.loadMaybeCoins()
    };
}

export function storeStorageInfo(src: StorageInfo) {
    return (builder: Builder) => {
        builder.store(storeStorageUsed(src.used));
        builder.storeUint(src.lastPaid, 32);
        builder.storeMaybeCoins(src.duePayment);
    };
}