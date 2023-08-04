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
import { AccountStatusChange } from "./AccountStatusChange";
export type TransactionStoragePhase = {
    storageFeesCollected: bigint;
    storageFeesDue?: Maybe<bigint>;
    statusChange: AccountStatusChange;
};
export declare function loadTransactionStoragePhase(slice: Slice): TransactionStoragePhase;
export declare function storeTransactionsStoragePhase(src: TransactionStoragePhase): (builder: Builder) => void;
