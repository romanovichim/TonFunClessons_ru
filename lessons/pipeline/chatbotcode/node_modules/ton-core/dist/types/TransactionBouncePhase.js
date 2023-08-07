"use strict";
/**
 * Copyright (c) Whales Corp.
 * All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.storeTransactionBouncePhase = exports.loadTransactionBouncePhase = void 0;
const StorageUsedShort_1 = require("./StorageUsedShort");
function loadTransactionBouncePhase(slice) {
    // Ok
    if (slice.loadBit()) {
        let messageSize = (0, StorageUsedShort_1.loadStorageUsedShort)(slice);
        let messageFees = slice.loadCoins();
        let forwardFees = slice.loadCoins();
        return {
            type: "ok",
            messageSize,
            messageFees,
            forwardFees,
        };
    }
    // No funds
    if (slice.loadBit()) {
        let messageSize = (0, StorageUsedShort_1.loadStorageUsedShort)(slice);
        let requiredForwardFees = slice.loadCoins();
        return {
            type: "no-funds",
            messageSize,
            requiredForwardFees,
        };
    }
    // Negative funds
    return {
        type: "negative-funds",
    };
}
exports.loadTransactionBouncePhase = loadTransactionBouncePhase;
function storeTransactionBouncePhase(src) {
    return (builder) => {
        if (src.type === 'ok') {
            builder.storeBit(true);
            builder.store((0, StorageUsedShort_1.storeStorageUsedShort)(src.messageSize));
            builder.storeCoins(src.messageFees);
            builder.storeCoins(src.forwardFees);
        }
        else if (src.type === 'negative-funds') {
            builder.storeBit(false);
            builder.storeBit(false);
        }
        else if (src.type === 'no-funds') {
            builder.storeBit(false);
            builder.storeBit(true);
            builder.store((0, StorageUsedShort_1.storeStorageUsedShort)(src.messageSize));
            builder.storeCoins(src.requiredForwardFees);
        }
        else {
            throw new Error("Invalid TransactionBouncePhase type");
        }
    };
}
exports.storeTransactionBouncePhase = storeTransactionBouncePhase;
