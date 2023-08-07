"use strict";
/**
 * Copyright (c) Whales Corp.
 * All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.storeTransactionDescription = exports.loadTransactionDescription = void 0;
const Builder_1 = require("../boc/Builder");
const SplitMergeInfo_1 = require("./SplitMergeInfo");
const Transaction_1 = require("./Transaction");
const TransactionActionPhase_1 = require("./TransactionActionPhase");
const TransactionBouncePhase_1 = require("./TransactionBouncePhase");
const TransactionComputePhase_1 = require("./TransactionComputePhase");
const TransactionCreditPhase_1 = require("./TransactionCreditPhase");
const TransactionStoragePhase_1 = require("./TransactionStoragePhase");
function loadTransactionDescription(slice) {
    let type = slice.loadUint(4);
    if (type === 0x00) {
        const creditFirst = slice.loadBit();
        let storagePhase = undefined;
        if (slice.loadBit()) {
            storagePhase = (0, TransactionStoragePhase_1.loadTransactionStoragePhase)(slice);
        }
        let creditPhase = undefined;
        if (slice.loadBit()) {
            creditPhase = (0, TransactionCreditPhase_1.loadTransactionCreditPhase)(slice);
        }
        let computePhase = (0, TransactionComputePhase_1.loadTransactionComputePhase)(slice);
        let actionPhase = undefined;
        if (slice.loadBit()) {
            actionPhase = (0, TransactionActionPhase_1.loadTransactionActionPhase)(slice.loadRef().beginParse());
        }
        let aborted = slice.loadBit();
        let bouncePhase = undefined;
        if (slice.loadBit()) {
            bouncePhase = (0, TransactionBouncePhase_1.loadTransactionBouncePhase)(slice);
        }
        const destroyed = slice.loadBit();
        return {
            type: 'generic',
            creditFirst,
            storagePhase,
            creditPhase,
            computePhase,
            actionPhase,
            bouncePhase,
            aborted,
            destroyed
        };
    }
    if (type === 0x01) {
        return {
            type: 'storage',
            storagePhase: (0, TransactionStoragePhase_1.loadTransactionStoragePhase)(slice)
        };
    }
    if (type === 0x2 || type === 0x03) {
        const isTock = type === 0x03;
        let storagePhase = (0, TransactionStoragePhase_1.loadTransactionStoragePhase)(slice);
        let computePhase = (0, TransactionComputePhase_1.loadTransactionComputePhase)(slice);
        let actionPhase = undefined;
        if (slice.loadBit()) {
            actionPhase = (0, TransactionActionPhase_1.loadTransactionActionPhase)(slice.loadRef().beginParse());
        }
        const aborted = slice.loadBit();
        const destroyed = slice.loadBit();
        return {
            type: 'tick-tock',
            isTock,
            storagePhase,
            computePhase,
            actionPhase,
            aborted,
            destroyed
        };
    }
    if (type === 0x04) {
        let splitInfo = (0, SplitMergeInfo_1.loadSplitMergeInfo)(slice);
        let storagePhase = undefined;
        if (slice.loadBit()) {
            storagePhase = (0, TransactionStoragePhase_1.loadTransactionStoragePhase)(slice);
        }
        let computePhase = (0, TransactionComputePhase_1.loadTransactionComputePhase)(slice);
        let actionPhase = undefined;
        if (slice.loadBit()) {
            actionPhase = (0, TransactionActionPhase_1.loadTransactionActionPhase)(slice.loadRef().beginParse());
        }
        const aborted = slice.loadBit();
        const destroyed = slice.loadBit();
        return {
            type: 'split-prepare',
            splitInfo,
            storagePhase,
            computePhase,
            actionPhase,
            aborted,
            destroyed
        };
    }
    if (type === 0x05) {
        let splitInfo = (0, SplitMergeInfo_1.loadSplitMergeInfo)(slice);
        let prepareTransaction = (0, Transaction_1.loadTransaction)(slice.loadRef().beginParse());
        const installed = slice.loadBit();
        return {
            type: 'split-install',
            splitInfo,
            prepareTransaction,
            installed
        };
    }
    throw Error(`Unsupported transaction description type ${type}`);
}
exports.loadTransactionDescription = loadTransactionDescription;
function storeTransactionDescription(src) {
    return (builder) => {
        if (src.type === 'generic') {
            builder.storeUint(0x00, 4);
            builder.storeBit(src.creditFirst);
            if (src.storagePhase) {
                builder.storeBit(true);
                builder.store((0, TransactionStoragePhase_1.storeTransactionsStoragePhase)(src.storagePhase));
            }
            else {
                builder.storeBit(false);
            }
            if (src.creditPhase) {
                builder.storeBit(true);
                builder.store((0, TransactionCreditPhase_1.storeTransactionCreditPhase)(src.creditPhase));
            }
            else {
                builder.storeBit(false);
            }
            builder.store((0, TransactionComputePhase_1.storeTransactionComputePhase)(src.computePhase));
            if (src.actionPhase) {
                builder.storeBit(true);
                builder.storeRef((0, Builder_1.beginCell)().store((0, TransactionActionPhase_1.storeTransactionActionPhase)(src.actionPhase)));
            }
            else {
                builder.storeBit(false);
            }
            builder.storeBit(src.aborted);
            if (src.bouncePhase) {
                builder.storeBit(true);
                builder.store((0, TransactionBouncePhase_1.storeTransactionBouncePhase)(src.bouncePhase));
            }
            else {
                builder.storeBit(false);
            }
            builder.storeBit(src.destroyed);
        }
        else if (src.type === 'storage') {
            builder.storeUint(0x01, 4);
            builder.store((0, TransactionStoragePhase_1.storeTransactionsStoragePhase)(src.storagePhase));
        }
        else if (src.type === 'tick-tock') {
            builder.storeUint(src.isTock ? 0x03 : 0x02, 4);
            builder.store((0, TransactionStoragePhase_1.storeTransactionsStoragePhase)(src.storagePhase));
            builder.store((0, TransactionComputePhase_1.storeTransactionComputePhase)(src.computePhase));
            if (src.actionPhase) {
                builder.storeBit(true);
                builder.storeRef((0, Builder_1.beginCell)().store((0, TransactionActionPhase_1.storeTransactionActionPhase)(src.actionPhase)));
            }
            else {
                builder.storeBit(false);
            }
            builder.storeBit(src.aborted);
            builder.storeBit(src.destroyed);
        }
        else if (src.type === 'split-prepare') {
            builder.storeUint(0x04, 4);
            builder.store((0, SplitMergeInfo_1.storeSplitMergeInfo)(src.splitInfo));
            if (src.storagePhase) {
                builder.storeBit(true);
                builder.store((0, TransactionStoragePhase_1.storeTransactionsStoragePhase)(src.storagePhase));
            }
            else {
                builder.storeBit(false);
            }
            builder.store((0, TransactionComputePhase_1.storeTransactionComputePhase)(src.computePhase));
            if (src.actionPhase) {
                builder.storeBit(true);
                builder.store((0, TransactionActionPhase_1.storeTransactionActionPhase)(src.actionPhase));
            }
            else {
                builder.storeBit(false);
            }
            builder.storeBit(src.aborted);
            builder.storeBit(src.destroyed);
        }
        else if (src.type === 'split-install') {
            builder.storeUint(0x05, 4);
            builder.store((0, SplitMergeInfo_1.storeSplitMergeInfo)(src.splitInfo));
            builder.storeRef((0, Builder_1.beginCell)().store((0, Transaction_1.storeTransaction)(src.prepareTransaction)));
            builder.storeBit(src.installed);
        }
        else {
            throw Error(`Unsupported transaction description type ${src.type}`);
        }
    };
}
exports.storeTransactionDescription = storeTransactionDescription;
