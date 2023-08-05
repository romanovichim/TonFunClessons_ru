"use strict";
/**
 * Copyright (c) Whales Corp.
 * All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.storeShardAccount = exports.loadShardAccount = void 0;
const Builder_1 = require("../boc/Builder");
const Account_1 = require("./Account");
function loadShardAccount(slice) {
    let accountRef = slice.loadRef();
    let account = undefined;
    if (!accountRef.isExotic) {
        let accountSlice = accountRef.beginParse();
        if (accountSlice.loadBit()) {
            account = (0, Account_1.loadAccount)(accountSlice);
        }
    }
    return {
        account,
        lastTransactionHash: slice.loadUintBig(256),
        lastTransactionLt: slice.loadUintBig(64)
    };
}
exports.loadShardAccount = loadShardAccount;
function storeShardAccount(src) {
    return (builder) => {
        if (src.account) {
            builder.storeRef((0, Builder_1.beginCell)()
                .storeBit(true)
                .store((0, Account_1.storeAccount)(src.account)));
        }
        else {
            builder.storeRef((0, Builder_1.beginCell)()
                .storeBit(false));
        }
        builder.storeUint(src.lastTransactionHash, 256);
        builder.storeUint(src.lastTransactionLt, 64);
    };
}
exports.storeShardAccount = storeShardAccount;
