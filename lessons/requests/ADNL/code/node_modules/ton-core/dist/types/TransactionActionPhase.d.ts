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
import { StorageUsedShort } from "./StorageUsedShort";
export type TransactionActionPhase = {
    success: boolean;
    valid: boolean;
    noFunds: boolean;
    statusChange: AccountStatusChange;
    totalFwdFees?: Maybe<bigint>;
    totalActionFees?: Maybe<bigint>;
    resultCode: number;
    resultArg?: Maybe<number>;
    totalActions: number;
    specActions: number;
    skippedActions: number;
    messagesCreated: number;
    actionListHash: bigint;
    totalMessageSize: StorageUsedShort;
};
export declare function loadTransactionActionPhase(slice: Slice): TransactionActionPhase;
export declare function storeTransactionActionPhase(src: TransactionActionPhase): (builder: Builder) => void;
