"use strict";
/**
 * Copyright (c) Whales Corp.
 * All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.storeTransactionActionPhase = exports.loadTransactionActionPhase = void 0;
const AccountStatusChange_1 = require("./AccountStatusChange");
const StorageUsedShort_1 = require("./StorageUsedShort");
function loadTransactionActionPhase(slice) {
    let success = slice.loadBit();
    let valid = slice.loadBit();
    let noFunds = slice.loadBit();
    let statusChange = (0, AccountStatusChange_1.loadAccountStatusChange)(slice);
    let totalFwdFees = slice.loadBit() ? slice.loadCoins() : undefined;
    let totalActionFees = slice.loadBit() ? slice.loadCoins() : undefined;
    let resultCode = slice.loadInt(32);
    let resultArg = slice.loadBit() ? slice.loadInt(32) : undefined;
    let totalActions = slice.loadUint(16);
    let specActions = slice.loadUint(16);
    let skippedActions = slice.loadUint(16);
    let messagesCreated = slice.loadUint(16);
    let actionListHash = slice.loadUintBig(256);
    let totalMessageSize = (0, StorageUsedShort_1.loadStorageUsedShort)(slice);
    return {
        success,
        valid,
        noFunds,
        statusChange,
        totalFwdFees,
        totalActionFees,
        resultCode,
        resultArg,
        totalActions,
        specActions,
        skippedActions,
        messagesCreated,
        actionListHash,
        totalMessageSize
    };
}
exports.loadTransactionActionPhase = loadTransactionActionPhase;
function storeTransactionActionPhase(src) {
    return (builder) => {
        builder.storeBit(src.success);
        builder.storeBit(src.valid);
        builder.storeBit(src.noFunds);
        builder.store((0, AccountStatusChange_1.storeAccountStatusChange)(src.statusChange));
        builder.storeMaybeCoins(src.totalFwdFees);
        builder.storeMaybeCoins(src.totalActionFees);
        builder.storeInt(src.resultCode, 32);
        builder.storeMaybeInt(src.resultArg, 32);
        builder.storeUint(src.totalActions, 16);
        builder.storeUint(src.specActions, 16);
        builder.storeUint(src.skippedActions, 16);
        builder.storeUint(src.messagesCreated, 16);
        builder.storeUint(src.actionListHash, 256);
        builder.store((0, StorageUsedShort_1.storeStorageUsedShort)(src.totalMessageSize));
    };
}
exports.storeTransactionActionPhase = storeTransactionActionPhase;
