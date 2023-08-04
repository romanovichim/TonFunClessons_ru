"use strict";
/**
 * Copyright (c) Whales Corp.
 * All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.storeShardIdent = exports.loadShardIdent = void 0;
function loadShardIdent(slice) {
    if (slice.loadUint(2) !== 0) {
        throw Error('Invalid data');
    }
    return {
        shardPrefixBits: slice.loadUint(6),
        workchainId: slice.loadInt(32),
        shardPrefix: slice.loadUintBig(64)
    };
}
exports.loadShardIdent = loadShardIdent;
function storeShardIdent(src) {
    return (builder) => {
        builder.storeUint(0, 2);
        builder.storeUint(src.shardPrefixBits, 6);
        builder.storeInt(src.workchainId, 32);
        builder.storeUint(src.shardPrefix, 64);
    };
}
exports.storeShardIdent = storeShardIdent;
