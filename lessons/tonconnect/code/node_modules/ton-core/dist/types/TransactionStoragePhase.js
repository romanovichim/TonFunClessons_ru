"use strict";
/**
 * Copyright (c) Whales Corp.
 * All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.storeTransactionsStoragePhase = exports.loadTransactionStoragePhase = void 0;
const AccountStatusChange_1 = require("./AccountStatusChange");
function loadTransactionStoragePhase(slice) {
    const storageFeesCollected = slice.loadCoins();
    let storageFeesDue = undefined;
    if (slice.loadBit()) {
        storageFeesDue = slice.loadCoins();
    }
    const statusChange = (0, AccountStatusChange_1.loadAccountStatusChange)(slice);
    return {
        storageFeesCollected,
        storageFeesDue,
        statusChange
    };
}
exports.loadTransactionStoragePhase = loadTransactionStoragePhase;
function storeTransactionsStoragePhase(src) {
    return (builder) => {
        builder.storeCoins(src.storageFeesCollected);
        if (src.storageFeesDue === null || src.storageFeesDue === undefined) {
            builder.storeBit(false);
        }
        else {
            builder.storeBit(true);
            builder.storeCoins(src.storageFeesDue);
        }
        builder.store((0, AccountStatusChange_1.storeAccountStatusChange)(src.statusChange));
    };
}
exports.storeTransactionsStoragePhase = storeTransactionsStoragePhase;
