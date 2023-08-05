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
import { Maybe } from "../utils/maybe";
import { CommonMessageInfoRelaxed } from "./CommonMessageInfoRelaxed";
import { StateInit } from "./StateInit";
export type MessageRelaxed = {
    info: CommonMessageInfoRelaxed;
    init?: Maybe<StateInit>;
    body: Cell;
};
export declare function loadMessageRelaxed(slice: Slice): MessageRelaxed;
export declare function storeMessageRelaxed(message: MessageRelaxed, opts?: {
    forceRef?: boolean;
}): (builder: Builder) => void;
