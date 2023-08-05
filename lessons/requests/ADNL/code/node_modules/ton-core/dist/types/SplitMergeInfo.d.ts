/**
 * Copyright (c) Whales Corp.
 * All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Builder } from "../boc/Builder";
import { Slice } from "../boc/Slice";
export type SplitMergeInfo = {
    currentShardPrefixLength: number;
    accountSplitDepth: number;
    thisAddress: bigint;
    siblingAddress: bigint;
};
export declare function loadSplitMergeInfo(slice: Slice): SplitMergeInfo;
export declare function storeSplitMergeInfo(src: SplitMergeInfo): (builder: Builder) => void;
