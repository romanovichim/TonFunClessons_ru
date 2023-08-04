/**
 * Copyright (c) Whales Corp. 
 * All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { beginCell, Builder } from "../boc/Builder";
import { Slice } from "../boc/Slice";
import { Dictionary } from "../dict/Dictionary";
import { Maybe } from "../utils/maybe";
import { AccountStatus, loadAccountStatus, storeAccountStatus } from "./AccountStatus";
import { CurrencyCollection, loadCurrencyCollection, storeCurrencyCollection } from "./CurrencyCollection";
import { HashUpdate, loadHashUpdate, storeHashUpdate } from "./HashUpdate";
import { loadMessage, Message, MessageValue, storeMessage } from "./Message";
import { loadTransactionDescription, storeTransactionDescription, TransactionDescription } from "./TransactionDescription";

// Source: https://github.com/ton-blockchain/ton/blob/24dc184a2ea67f9c47042b4104bbb4d82289fac1/crypto/block/block.tlb#L263
// transaction$0111 account_addr:bits256 lt:uint64 
//  prev_trans_hash:bits256 prev_trans_lt:uint64 now:uint32
//  outmsg_cnt:uint15
//  orig_status:AccountStatus end_status:AccountStatus
//  ^[ in_msg:(Maybe ^(Message Any)) out_msgs:(HashmapE 15 ^(Message Any)) ]
//  total_fees:CurrencyCollection state_update:^(HASH_UPDATE Account)
//  description:^TransactionDescr = Transaction;

export type Transaction = {
    address: bigint,
    lt: bigint,
    prevTransactionHash: bigint,
    prevTransactionLt: bigint,
    now: number,
    outMessagesCount: number,
    oldStatus: AccountStatus,
    endStatus: AccountStatus,
    inMessage?: Maybe<Message>,
    outMessages: Dictionary<number, Message>;
    totalFees: CurrencyCollection,
    stateUpdate: HashUpdate,
    description: TransactionDescription,
};

export function loadTransaction(slice: Slice) {

    if (slice.loadUint(4) !== 0x07) {
        throw Error('Invalid data');
    }

    let address = slice.loadUintBig(256);
    let lt = slice.loadUintBig(64);
    let prevTransactionHash = slice.loadUintBig(256);
    let prevTransactionLt = slice.loadUintBig(64);
    let now = slice.loadUint(32);
    let outMessagesCount = slice.loadUint(15);
    let oldStatus = loadAccountStatus(slice);
    let endStatus = loadAccountStatus(slice);

    let msgRef = slice.loadRef();
    let msgSlice = msgRef.beginParse();
    let inMessage = msgSlice.loadBit() ? loadMessage(msgSlice.loadRef().beginParse()) : undefined;
    let outMessages = msgSlice.loadDict(Dictionary.Keys.Uint(15), MessageValue);
    msgSlice.endParse();

    let totalFees = loadCurrencyCollection(slice);
    let stateUpdate = loadHashUpdate(slice.loadRef().beginParse());
    let description = loadTransactionDescription(slice.loadRef().beginParse());
    return {
        address,
        lt,
        prevTransactionHash,
        prevTransactionLt,
        now,
        outMessagesCount,
        oldStatus,
        endStatus,
        inMessage,
        outMessages,
        totalFees,
        stateUpdate,
        description,
    };
}

export function storeTransaction(src: Transaction) {
    return (builder: Builder) => {
        builder.storeUint(0x07, 4);
        builder.storeUint(src.address, 256);
        builder.storeUint(src.lt, 64);
        builder.storeUint(src.prevTransactionHash, 256);
        builder.storeUint(src.prevTransactionLt, 64);
        builder.storeUint(src.now, 32);
        builder.storeUint(src.outMessagesCount, 15);
        builder.store(storeAccountStatus(src.oldStatus));
        builder.store(storeAccountStatus(src.endStatus));

        let msgBuilder = beginCell();
        if (src.inMessage) {
            msgBuilder.storeBit(true);
            msgBuilder.storeRef(beginCell().store(storeMessage(src.inMessage)));
        } else {
            msgBuilder.storeBit(false);
        }
        msgBuilder.storeDict(src.outMessages);
        builder.storeRef(msgBuilder);

        builder.store(storeCurrencyCollection(src.totalFees));
        builder.storeRef(beginCell().store(storeHashUpdate(src.stateUpdate)));
        builder.storeRef(beginCell().store(storeTransactionDescription(src.description)));
    };
}