/**
 * Copyright (c) Whales Corp.
 * All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Builder } from "../boc/Builder";
import { Slice } from "../boc/Slice";
import { CurrencyCollection } from "./CurrencyCollection";
export type DepthBalanceInfo = {
    splitDepth: number;
    balance: CurrencyCollection;
};
export declare function loadDepthBalanceInfo(slice: Slice): DepthBalanceInfo;
export declare function storeDepthBalanceInfo(src: DepthBalanceInfo): (builder: Builder) => void;
