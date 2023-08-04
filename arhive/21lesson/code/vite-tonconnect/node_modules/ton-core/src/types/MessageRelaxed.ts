/**
 * Copyright (c) Whales Corp. 
 * All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { beginCell, Builder } from "../boc/Builder";
import { Cell } from "../boc/Cell";
import { Slice } from "../boc/Slice";
import { Maybe } from "../utils/maybe";
import { CommonMessageInfoRelaxed, loadCommonMessageInfoRelaxed, storeCommonMessageInfoRelaxed } from "./CommonMessageInfoRelaxed";
import { loadStateInit, StateInit, storeStateInit } from "./StateInit";

// Source: https://github.com/ton-blockchain/ton/blob/24dc184a2ea67f9c47042b4104bbb4d82289fac1/crypto/block/block.tlb#L151
// message$_ {X:Type} info:CommonMsgInfoRelaxed
//  init:(Maybe (Either StateInit ^StateInit))
//  body:(Either X ^X) = MessageRelaxed X;

export type MessageRelaxed = {
    info: CommonMessageInfoRelaxed,
    init?: Maybe<StateInit>,
    body: Cell
};

export function loadMessageRelaxed(slice: Slice): MessageRelaxed {
    const info = loadCommonMessageInfoRelaxed(slice);
    let init: StateInit | null = null;
    if (slice.loadBit()) {
        if (!slice.loadBit()) {
            init = loadStateInit(slice);
        } else {
            init = loadStateInit(slice.loadRef().beginParse());
        }
    }
    const body = slice.loadBit() ? slice.loadRef() : slice.asCell();

    return {
        info,
        init,
        body
    };
}

export function storeMessageRelaxed(message: MessageRelaxed, opts?: { forceRef?: boolean }) {
    return (builder: Builder) => {

        // Store CommonMsgInfo
        builder.store(storeCommonMessageInfoRelaxed(message.info));

        // Store init
        if (message.init) {
            builder.storeBit(true);
            let initCell = beginCell().store(storeStateInit(message.init));

            // Check if ref is needed
            let needRef = false;
            if (opts && opts.forceRef) {
                needRef = true;
            } else {
                if (builder.availableBits - 2 /* At least on byte for ref flag */ >= initCell.bits) {
                    needRef = false;
                } else {
                    needRef = true;
                }
            }

            // Store ref
            if (needRef) {
                builder.storeBit(true);
                builder.storeRef(initCell);
            } else {
                builder.storeBit(false);
                builder.storeBuilder(initCell);
            }
        } else {
            builder.storeBit(false);
        }

        // Store body
        let needRef = false;
        if (opts && opts.forceRef) {
            needRef = true;
        } else {
            if (builder.availableBits - 1 /* At least on byte for ref flag */ >= message.body.bits.length &&
                builder.refs + message.body.refs.length <= 4) {
                needRef = false;
            } else {
                needRef = true;
            }
        }
        if (needRef) {
            builder.storeBit(true);
            builder.storeRef(message.body);
        } else {
            builder.storeBit(false);
            builder.storeBuilder(message.body.asBuilder());
        }
    };
}