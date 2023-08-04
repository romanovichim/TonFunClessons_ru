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
import { DepthBalanceInfo } from "./DepthBalanceInfo";
import { ShardAccount } from "./ShardAccount";
export type ShardAccountRef = {
    shardAccount: ShardAccount;
    depthBalanceInfo: DepthBalanceInfo;
};
export declare const ShardAccountRefValue: DictionaryValue<ShardAccountRef>;
export declare function loadShardAccounts(cs: Slice): Dictionary<bigint, ShardAccountRef>;
export declare function storeShardAccounts(src: Dictionary<bigint, ShardAccountRef>): (Builder: Builder) => void;
