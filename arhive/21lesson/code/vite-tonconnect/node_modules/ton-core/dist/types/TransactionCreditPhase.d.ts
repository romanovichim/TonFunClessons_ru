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
import { CurrencyCollection } from "./CurrencyCollection";
export type TransactionCreditPhase = {
    dueFeesColelcted?: Maybe<bigint>;
    credit: CurrencyCollection;
};
export declare function loadTransactionCreditPhase(slice: Slice): TransactionCreditPhase;
export declare function storeTransactionCreditPhase(src: TransactionCreditPhase): (builder: Builder) => void;
