/**
 * Copyright (c) Whales Corp. 
 * All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Builder } from "../boc/Builder";
import { Slice } from "../boc/Slice";
import { CurrencyCollection, loadCurrencyCollection, storeCurrencyCollection } from "./CurrencyCollection"

// Source: https://github.com/ton-blockchain/ton/blob/24dc184a2ea67f9c47042b4104bbb4d82289fac1/crypto/block/block.tlb#L259
// depth_balance$_ split_depth:(#<= 30) balance:CurrencyCollection = DepthBalanceInfo;

export type DepthBalanceInfo = {
    splitDepth: number,
    balance: CurrencyCollection
};

export function loadDepthBalanceInfo(slice: Slice): DepthBalanceInfo {
    let splitDepth = slice.loadUint(5);
    return {
        splitDepth,
        balance: loadCurrencyCollection(slice)
    };
}

export function storeDepthBalanceInfo(src: DepthBalanceInfo) {
    return (builder: Builder) => {
        builder.storeUint(src.splitDepth, 5);
        builder.store(storeCurrencyCollection(src.balance));
    };
}