/**
 * Copyright (c) Whales Corp.
 * All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Builder } from "../boc/Builder";
import { Cell } from "../boc/Cell";
import { Slice } from "../boc/Slice";
import { Dictionary } from "../dict/Dictionary";
import { Maybe } from "../utils/maybe";
import { SimpleLibrary } from "./SimpleLibrary";
import { TickTock } from "./TickTock";
export interface StateInit {
    splitDepth?: Maybe<number>;
    special?: Maybe<TickTock>;
    code?: Maybe<Cell>;
    data?: Maybe<Cell>;
    libraries?: Maybe<Dictionary<bigint, SimpleLibrary>>;
}
export declare function loadStateInit(slice: Slice): StateInit;
export declare function storeStateInit(src: StateInit): (builder: Builder) => void;
