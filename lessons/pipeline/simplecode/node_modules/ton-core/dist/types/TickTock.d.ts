/**
 * Copyright (c) Whales Corp.
 * All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Builder } from "../boc/Builder";
import { Slice } from "../boc/Slice";
export type TickTock = {
    tick: boolean;
    tock: boolean;
};
export declare function loadTickTock(slice: Slice): TickTock;
export declare function storeTickTock(src: TickTock): (builder: Builder) => void;
