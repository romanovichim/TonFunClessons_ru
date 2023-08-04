"use strict";
/**
 * Copyright (c) Whales Corp.
 * All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadMasterchainStateExtra = void 0;
const Dictionary_1 = require("../dict/Dictionary");
const CurrencyCollection_1 = require("./CurrencyCollection");
function loadMasterchainStateExtra(cs) {
    // Check magic
    if (cs.loadUint(16) !== 0xcc26) {
        throw Error('Invalid data');
    }
    // Skip shard_hashes
    if (cs.loadBit()) {
        cs.loadRef();
    }
    // Read config
    let configAddress = cs.loadUintBig(256);
    let config = Dictionary_1.Dictionary.load(Dictionary_1.Dictionary.Keys.Int(32), Dictionary_1.Dictionary.Values.Cell(), cs);
    // Rad global balance
    const globalBalance = (0, CurrencyCollection_1.loadCurrencyCollection)(cs);
    return {
        config,
        configAddress,
        globalBalance
    };
}
exports.loadMasterchainStateExtra = loadMasterchainStateExtra;
