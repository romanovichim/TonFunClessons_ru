/**
 * Copyright (c) Whales Corp. 
 * All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Slice } from "../boc/Slice"
import { Dictionary } from "../dict/Dictionary"
import { Maybe } from "../utils/maybe"
import { loadMasterchainStateExtra, MasterchainStateExtra } from "./MasterchainStateExtra"
import { ShardAccount } from "./ShardAccount"
import { loadShardAccounts, ShardAccountRef } from "./ShardAccounts"
import { loadShardIdent, ShardIdent } from "./ShardIdent"

// Source: https://github.com/ton-blockchain/ton/blob/24dc184a2ea67f9c47042b4104bbb4d82289fac1/crypto/block/block.tlb#L396
// shard_state#9023afe2 global_id:int32
//  shard_id:ShardIdent 
//  seq_no:uint32 vert_seq_no:#
//  gen_utime:uint32 gen_lt:uint64
//  min_ref_mc_seqno:uint32
//  out_msg_queue_info:^OutMsgQueueInfo
//  before_split:(## 1)
//  accounts:^ShardAccounts
//  ^[ overload_history:uint64 underload_history:uint64
//  total_balance:CurrencyCollection
//  total_validator_fees:CurrencyCollection
//  libraries:(HashmapE 256 LibDescr)
//  master_ref:(Maybe BlkMasterInfo) ]
//  custom:(Maybe ^McStateExtra)
//  = ShardStateUnsplit;

export type ShardStateUnsplit = {
    globalId: number,
    shardId: ShardIdent,
    seqno: number,
    vertSeqNo: number,
    genUtime: number,
    genLt: bigint,
    minRefMcSeqno: number,
    beforeSplit: boolean,
    accounts?: Maybe<Dictionary<bigint, ShardAccountRef>>,
    extras?: Maybe<MasterchainStateExtra>
}

export function loadShardStateUnsplit(cs: Slice): ShardStateUnsplit {
    if (cs.loadUint(32) !== 0x9023afe2) {
        throw Error('Invalid data');
    }
    let globalId = cs.loadInt(32);
    let shardId = loadShardIdent(cs);
    let seqno = cs.loadUint(32);
    let vertSeqNo = cs.loadUint(32);
    let genUtime = cs.loadUint(32);
    let genLt = cs.loadUintBig(64);
    let minRefMcSeqno = cs.loadUint(32);

    // Skip OutMsgQueueInfo: usually exotic
    cs.loadRef();

    let beforeSplit = cs.loadBit();

    // Parse accounts
    let shardAccountsRef = cs.loadRef();
    let accounts: Dictionary<bigint, ShardAccountRef> | undefined = undefined;
    if (!shardAccountsRef.isExotic) {
        accounts = loadShardAccounts(shardAccountsRef.beginParse());
    }

    // Skip (not used by apps)
    cs.loadRef();

    // Parse extras
    let mcStateExtra = cs.loadBit();
    let extras: MasterchainStateExtra | null = null;
    if (mcStateExtra) {
        let cell = cs.loadRef();
        if (!cell.isExotic) {
            extras = loadMasterchainStateExtra(cell.beginParse());
        }
    };

    return {
        globalId,
        shardId,
        seqno,
        vertSeqNo,
        genUtime,
        genLt,
        minRefMcSeqno,
        beforeSplit,
        accounts,
        extras
    }
}