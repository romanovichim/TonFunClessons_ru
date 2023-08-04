/**
 * Copyright (c) Whales Corp.
 * All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Cell } from "../boc/Cell";
import { Slice } from "../boc/Slice";
import { Dictionary } from "../dict/Dictionary";
import { CurrencyCollection } from "./CurrencyCollection";
export type MasterchainStateExtra = {
    configAddress: bigint;
    config: Dictionary<number, Cell>;
    globalBalance: CurrencyCollection;
};
export declare function loadMasterchainStateExtra(cs: Slice): MasterchainStateExtra;
