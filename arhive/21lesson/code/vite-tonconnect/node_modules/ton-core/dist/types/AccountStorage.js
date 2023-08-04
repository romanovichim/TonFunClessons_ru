"use strict";
/**
 * Copyright (c) Whales Corp.
 * All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.storeAccountStorage = exports.loadAccountStorage = void 0;
const AccountState_1 = require("./AccountState");
const CurrencyCollection_1 = require("./CurrencyCollection");
function loadAccountStorage(slice) {
    return {
        lastTransLt: slice.loadUintBig(64),
        balance: (0, CurrencyCollection_1.loadCurrencyCollection)(slice),
        state: (0, AccountState_1.loadAccountState)(slice)
    };
}
exports.loadAccountStorage = loadAccountStorage;
function storeAccountStorage(src) {
    return (builder) => {
        builder.storeUint(src.lastTransLt, 64);
        builder.store((0, CurrencyCollection_1.storeCurrencyCollection)(src.balance));
        builder.store((0, AccountState_1.storeAccountState)(src.state));
    };
}
exports.storeAccountStorage = storeAccountStorage;
