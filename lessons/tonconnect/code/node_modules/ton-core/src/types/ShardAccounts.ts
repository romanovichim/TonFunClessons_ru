/**
 * Copyright (c) Whales Corp. 
 * All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Builder } from "../boc/Builder";
import { Slice } from "../boc/Slice";
import { Dictionary, DictionaryValue } from "../dict/Dictionary";
import { DepthBalanceInfo, loadDepthBalanceInfo, storeDepthBalanceInfo } from "./DepthBalanceInfo";
import { loadShardAccount, ShardAccount, storeShardAccount } from "./ShardAccount";

// Source: https://github.com/ton-blockchain/ton/blob/24dc184a2ea67f9c47042b4104bbb4d82289fac1/crypto/block/block.tlb#L261
// _ (HashmapAugE 256 ShardAccount DepthBalanceInfo) = ShardAccounts;

export type ShardAccountRef = {
    shardAccount: ShardAccount
    depthBalanceInfo: DepthBalanceInfo
};

export const ShardAccountRefValue: DictionaryValue<ShardAccountRef> = {
    parse: (cs: Slice) => {
        let depthBalanceInfo = loadDepthBalanceInfo(cs);
        let shardAccount = loadShardAccount(cs);
        return {
            depthBalanceInfo,
            shardAccount
        }
    },
    serialize(src, builder) {
        builder.store(storeDepthBalanceInfo(src.depthBalanceInfo));
        builder.store(storeShardAccount(src.shardAccount));
    },
};

export function loadShardAccounts(cs: Slice): Dictionary<bigint, ShardAccountRef> {
    return Dictionary.load(Dictionary.Keys.BigUint(256), ShardAccountRefValue, cs);
}

export function storeShardAccounts(src: Dictionary<bigint, ShardAccountRef>) {
    return (Builder: Builder) => {
        Builder.storeDict(src);
    }
}
