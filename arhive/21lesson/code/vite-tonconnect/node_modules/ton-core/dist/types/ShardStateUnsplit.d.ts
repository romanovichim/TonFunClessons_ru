/**
 * Copyright (c) Whales Corp.
 * All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Slice } from "../boc/Slice";
import { Dictionary } from "../dict/Dictionary";
import { Maybe } from "../utils/maybe";
import { MasterchainStateExtra } from "./MasterchainStateExtra";
import { ShardAccountRef } from "./ShardAccounts";
import { ShardIdent } from "./ShardIdent";
export type ShardStateUnsplit = {
    globalId: number;
    shardId: ShardIdent;
    seqno: number;
    vertSeqNo: number;
    genUtime: number;
    genLt: bigint;
    minRefMcSeqno: number;
    beforeSplit: boolean;
    accounts?: Maybe<Dictionary<bigint, ShardAccountRef>>;
    extras?: Maybe<MasterchainStateExtra>;
};
export declare function loadShardStateUnsplit(cs: Slice): ShardStateUnsplit;
