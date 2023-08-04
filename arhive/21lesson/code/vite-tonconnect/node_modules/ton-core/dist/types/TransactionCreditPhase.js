"use strict";
/**
 * Copyright (c) Whales Corp.
 * All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.storeTransactionCreditPhase = exports.loadTransactionCreditPhase = void 0;
const CurrencyCollection_1 = require("./CurrencyCollection");
function loadTransactionCreditPhase(slice) {
    const dueFeesColelcted = slice.loadBit() ? slice.loadCoins() : undefined;
    const credit = (0, CurrencyCollection_1.loadCurrencyCollection)(slice);
    return {
        dueFeesColelcted,
        credit
    };
}
exports.loadTransactionCreditPhase = loadTransactionCreditPhase;
function storeTransactionCreditPhase(src) {
    return (builder) => {
        if (src.dueFeesColelcted === null || src.dueFeesColelcted === undefined) {
            builder.storeBit(false);
        }
        else {
            builder.storeBit(true);
            builder.storeCoins(src.dueFeesColelcted);
        }
        builder.store((0, CurrencyCollection_1.storeCurrencyCollection)(src.credit));
    };
}
exports.storeTransactionCreditPhase = storeTransactionCreditPhase;
