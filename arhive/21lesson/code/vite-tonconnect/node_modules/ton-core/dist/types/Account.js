"use strict";
/**
 * Copyright (c) Whales Corp.
 * All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.storeAccount = exports.loadAccount = void 0;
const AccountStorage_1 = require("./AccountStorage");
const StorageInto_1 = require("./StorageInto");
function loadAccount(slice) {
    return {
        addr: slice.loadAddress(),
        storageStats: (0, StorageInto_1.loadStorageInfo)(slice),
        storage: (0, AccountStorage_1.loadAccountStorage)(slice)
    };
}
exports.loadAccount = loadAccount;
function storeAccount(src) {
    return (builder) => {
        builder.storeAddress(src.addr);
        builder.store((0, StorageInto_1.storeStorageInfo)(src.storageStats));
        builder.store((0, AccountStorage_1.storeAccountStorage)(src.storage));
    };
}
exports.storeAccount = storeAccount;
