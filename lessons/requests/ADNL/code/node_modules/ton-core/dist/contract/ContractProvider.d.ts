/**
 * Copyright (c) Whales Corp.
 * All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Cell } from "../boc/Cell";
import { SendMode } from "../types/SendMode";
import { TupleReader } from "../tuple/reader";
import { TupleItem } from "../tuple/tuple";
import { Maybe } from "../utils/maybe";
import { ContractState } from "./ContractState";
import { Sender } from './Sender';
export type ContractGetMethodResult = {
    stack: TupleReader;
    gasUsed?: Maybe<bigint>;
    logs?: Maybe<string>;
};
export interface ContractProvider {
    getState(): Promise<ContractState>;
    get(name: string, args: TupleItem[]): Promise<ContractGetMethodResult>;
    external(message: Cell): Promise<void>;
    internal(via: Sender, args: {
        value: bigint | string;
        bounce?: Maybe<boolean>;
        sendMode?: SendMode;
        body?: Maybe<Cell | string>;
    }): Promise<void>;
}
