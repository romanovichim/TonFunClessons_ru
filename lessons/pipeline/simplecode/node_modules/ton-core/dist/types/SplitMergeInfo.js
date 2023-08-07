"use strict";
/**
 * Copyright (c) Whales Corp.
 * All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.storeSplitMergeInfo = exports.loadSplitMergeInfo = void 0;
function loadSplitMergeInfo(slice) {
    let currentShardPrefixLength = slice.loadUint(6);
    let accountSplitDepth = slice.loadUint(6);
    let thisAddress = slice.loadUintBig(256);
    let siblingAddress = slice.loadUintBig(256);
    return {
        currentShardPrefixLength,
        accountSplitDepth,
        thisAddress,
        siblingAddress
    };
}
exports.loadSplitMergeInfo = loadSplitMergeInfo;
function storeSplitMergeInfo(src) {
    return (builder) => {
        builder.storeUint(src.currentShardPrefixLength, 6);
        builder.storeUint(src.accountSplitDepth, 6);
        builder.storeUint(src.thisAddress, 256);
        builder.storeUint(src.siblingAddress, 256);
    };
}
exports.storeSplitMergeInfo = storeSplitMergeInfo;
