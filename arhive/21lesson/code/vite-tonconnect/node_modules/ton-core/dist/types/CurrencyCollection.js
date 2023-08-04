"use strict";
/**
 * Copyright (c) Whales Corp.
 * All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.storeCurrencyCollection = exports.loadCurrencyCollection = void 0;
const Dictionary_1 = require("../dict/Dictionary");
;
function loadCurrencyCollection(slice) {
    const coins = slice.loadCoins();
    const other = slice.loadDict(Dictionary_1.Dictionary.Keys.Uint(32), Dictionary_1.Dictionary.Values.BigVarUint(5 /* log2(32) */));
    if (other.size === 0) {
        return { coins };
    }
    else {
        return { other, coins };
    }
}
exports.loadCurrencyCollection = loadCurrencyCollection;
function storeCurrencyCollection(collection) {
    return (builder) => {
        builder.storeCoins(collection.coins);
        if (collection.other) {
            builder.storeDict(collection.other);
        }
        else {
            builder.storeBit(0);
        }
    };
}
exports.storeCurrencyCollection = storeCurrencyCollection;
