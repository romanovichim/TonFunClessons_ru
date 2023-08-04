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
import { AccountStatusChange, loadAccountStatusChange, storeAccountStatusChange } from "./AccountStatusChange";
import { loadStorageUsedShort, StorageUsedShort, storeStorageUsedShort } from "./StorageUsedShort";

// Source: https://github.com/ton-blockchain/ton/blob/24dc184a2ea67f9c47042b4104bbb4d82289fac1/crypto/block/block.tlb#L310
// tr_phase_action$_ success:Bool valid:Bool no_funds:Bool
//   status_change:AccStatusChange
//   total_fwd_fees:(Maybe Grams) total_action_fees:(Maybe Grams)
//   result_code:int32 result_arg:(Maybe int32) tot_actions:uint16
//   spec_actions:uint16 skipped_actions:uint16 msgs_created:uint16 
//   action_list_hash:bits256 tot_msg_size:StorageUsedShort 
//   = TrActionPhase;

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
}

export function loadTransactionActionPhase(slice: Slice): TransactionActionPhase {
    let success = slice.loadBit();
    let valid = slice.loadBit();
    let noFunds = slice.loadBit();
    let statusChange = loadAccountStatusChange(slice);
    let totalFwdFees = slice.loadBit() ? slice.loadCoins() : undefined;
    let totalActionFees = slice.loadBit() ? slice.loadCoins() : undefined;
    let resultCode = slice.loadInt(32);
    let resultArg = slice.loadBit() ? slice.loadInt(32) : undefined;
    let totalActions = slice.loadUint(16);
    let specActions = slice.loadUint(16);
    let skippedActions = slice.loadUint(16);
    let messagesCreated = slice.loadUint(16);
    let actionListHash = slice.loadUintBig(256);
    let totalMessageSize = loadStorageUsedShort(slice);
    return {
        success,
        valid,
        noFunds,
        statusChange,
        totalFwdFees,
        totalActionFees,
        resultCode,
        resultArg,
        totalActions,
        specActions,
        skippedActions,
        messagesCreated,
        actionListHash,
        totalMessageSize
    };
}

export function storeTransactionActionPhase(src: TransactionActionPhase) {
    return (builder: Builder) => {
        builder.storeBit(src.success);
        builder.storeBit(src.valid);
        builder.storeBit(src.noFunds);
        builder.store(storeAccountStatusChange(src.statusChange));
        builder.storeMaybeCoins(src.totalFwdFees);
        builder.storeMaybeCoins(src.totalActionFees);
        builder.storeInt(src.resultCode, 32);
        builder.storeMaybeInt(src.resultArg, 32);
        builder.storeUint(src.totalActions, 16);
        builder.storeUint(src.specActions, 16);
        builder.storeUint(src.skippedActions, 16);
        builder.storeUint(src.messagesCreated, 16);
        builder.storeUint(src.actionListHash, 256);
        builder.store(storeStorageUsedShort(src.totalMessageSize));
    };
}