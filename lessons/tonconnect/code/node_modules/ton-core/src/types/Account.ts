/**
 * Copyright (c) Whales Corp. 
 * All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Address } from "../address/Address"
import { Builder } from "../boc/Builder"
import { Slice } from "../boc/Slice"
import { AccountStorage, loadAccountStorage, storeAccountStorage } from "./AccountStorage"
import { loadStorageInfo, StorageInfo, storeStorageInfo } from "./StorageInto"

// Source: https://github.com/ton-blockchain/ton/blob/24dc184a2ea67f9c47042b4104bbb4d82289fac1/crypto/block/block.tlb#L231
// account_none$0 = Account;
// account$1 addr:MsgAddressInt storage_stat:StorageInfo storage:AccountStorage = Account;

export type Account = {
    addr: Address,
    storageStats: StorageInfo,
    storage: AccountStorage
}

export function loadAccount(slice: Slice): Account {
    return {
        addr: slice.loadAddress(),
        storageStats: loadStorageInfo(slice),
        storage: loadAccountStorage(slice)
    };
}

export function storeAccount(src: Account) {
    return (builder: Builder) => {
        builder.storeAddress(src.addr);
        builder.store(storeStorageInfo(src.storageStats));
        builder.store(storeAccountStorage(src.storage));
    };
}