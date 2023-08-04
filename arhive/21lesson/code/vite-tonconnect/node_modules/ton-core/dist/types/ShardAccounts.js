"use strict";
/**
 * Copyright (c) Whales Corp.
 * All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.storeShardAccounts = exports.loadShardAccounts = exports.ShardAccountRefValue = void 0;
const Dictionary_1 = require("../dict/Dictionary");
const DepthBalanceInfo_1 = require("./DepthBalanceInfo");
const ShardAccount_1 = require("./ShardAccount");
exports.ShardAccountRefValue = {
    parse: (cs) => {
        let depthBalanceInfo = (0, DepthBalanceInfo_1.loadDepthBalanceInfo)(cs);
        let shardAccount = (0, ShardAccount_1.loadShardAccount)(cs);
        return {
            depthBalanceInfo,
            shardAccount
        };
    },
    serialize(src, builder) {
        builder.store((0, DepthBalanceInfo_1.storeDepthBalanceInfo)(src.depthBalanceInfo));
        builder.store((0, ShardAccount_1.storeShardAccount)(src.shardAccount));
    },
};
function loadShardAccounts(cs) {
    return Dictionary_1.Dictionary.load(Dictionary_1.Dictionary.Keys.BigUint(256), exports.ShardAccountRefValue, cs);
}
exports.loadShardAccounts = loadShardAccounts;
function storeShardAccounts(src) {
    return (Builder) => {
        Builder.storeDict(src);
    };
}
exports.storeShardAccounts = storeShardAccounts;
