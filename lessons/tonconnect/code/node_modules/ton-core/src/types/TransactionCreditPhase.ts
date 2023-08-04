/**
 * Copyright (c) Whales Corp. 
 * All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Builder } from "../boc/Builder";
import { Slice } from "../boc/Slice";
import { Maybe } from "../utils/maybe";
import { CurrencyCollection, loadCurrencyCollection, storeCurrencyCollection } from "./CurrencyCollection";

// Source: https://github.com/ton-blockchain/ton/blob/24dc184a2ea67f9c47042b4104bbb4d82289fac1/crypto/block/block.tlb#L293
// tr_phase_credit$_ due_fees_collected:(Maybe Grams)
//   credit:CurrencyCollection = TrCreditPhase;

export type TransactionCreditPhase = {
    dueFeesColelcted?: Maybe<bigint>,
    credit: CurrencyCollection
};

export function loadTransactionCreditPhase(slice: Slice): TransactionCreditPhase {
    const dueFeesColelcted = slice.loadBit() ? slice.loadCoins() : undefined;
    const credit = loadCurrencyCollection(slice);
    return {
        dueFeesColelcted,
        credit
    };
}

export function storeTransactionCreditPhase(src: TransactionCreditPhase) {
    return (builder: Builder) => {
        if (src.dueFeesColelcted === null || src.dueFeesColelcted === undefined) {
            builder.storeBit(false);
        } else {
            builder.storeBit(true);
            builder.storeCoins(src.dueFeesColelcted);
        }
        builder.store(storeCurrencyCollection(src.credit));
    };
}