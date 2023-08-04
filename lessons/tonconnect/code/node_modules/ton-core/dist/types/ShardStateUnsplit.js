"use strict";
/**
 * Copyright (c) Whales Corp.
 * All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadShardStateUnsplit = void 0;
const MasterchainStateExtra_1 = require("./MasterchainStateExtra");
const ShardAccounts_1 = require("./ShardAccounts");
const ShardIdent_1 = require("./ShardIdent");
function loadShardStateUnsplit(cs) {
    if (cs.loadUint(32) !== 0x9023afe2) {
        throw Error('Invalid data');
    }
    let globalId = cs.loadInt(32);
    let shardId = (0, ShardIdent_1.loadShardIdent)(cs);
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
    let accounts = undefined;
    if (!shardAccountsRef.isExotic) {
        accounts = (0, ShardAccounts_1.loadShardAccounts)(shardAccountsRef.beginParse());
    }
    // Skip (not used by apps)
    cs.loadRef();
    // Parse extras
    let mcStateExtra = cs.loadBit();
    let extras = null;
    if (mcStateExtra) {
        let cell = cs.loadRef();
        if (!cell.isExotic) {
            extras = (0, MasterchainStateExtra_1.loadMasterchainStateExtra)(cell.beginParse());
        }
    }
    ;
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
    };
}
exports.loadShardStateUnsplit = loadShardStateUnsplit;
