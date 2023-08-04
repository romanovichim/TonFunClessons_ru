/**
 * Copyright (c) Whales Corp. 
 * All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { beginCell, Builder } from "../boc/Builder";
import { Slice } from "../boc/Slice";
import { Maybe } from "../utils/maybe";
import { Account, loadAccount, storeAccount } from "./Account";

// Source: https://github.com/ton-blockchain/ton/blob/24dc184a2ea67f9c47042b4104bbb4d82289fac1/crypto/block/block.tlb#L256
// account_descr$_ account:^Account last_trans_hash:bits256 
//  last_trans_lt:uint64 = ShardAccount;

export type ShardAccount = {
    account?: Maybe<Account>;
    lastTransactionHash: bigint;
    lastTransactionLt: bigint;
};

export function loadShardAccount(slice: Slice): ShardAccount {
    let accountRef = slice.loadRef();
    let account: Account | undefined = undefined;
    if (!accountRef.isExotic) {
        let accountSlice = accountRef.beginParse();
        if (accountSlice.loadBit()) {
            account = loadAccount(accountSlice);
        }
    }

    return {
        account,
        lastTransactionHash: slice.loadUintBig(256),
        lastTransactionLt: slice.loadUintBig(64)
    };
}

export function storeShardAccount(src: ShardAccount) {
    return (builder: Builder) => {
        if (src.account) {
            builder.storeRef(beginCell()
                .storeBit(true)
                .store(storeAccount(src.account))
            );
        } else {
            builder.storeRef(beginCell()
                .storeBit(false)
            );
        }
        builder.storeUint(src.lastTransactionHash, 256);
        builder.storeUint(src.lastTransactionLt, 64);
    };
}