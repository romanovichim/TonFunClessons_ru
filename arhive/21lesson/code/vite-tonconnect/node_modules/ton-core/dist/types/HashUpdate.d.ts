/**
 * Copyright (c) Whales Corp.
 * All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
/// <reference types="node" />
import { Builder } from "../boc/Builder";
import { Slice } from "../boc/Slice";
export type HashUpdate = {
    oldHash: Buffer;
    newHash: Buffer;
};
export declare function loadHashUpdate(slice: Slice): HashUpdate;
export declare function storeHashUpdate(src: HashUpdate): (builder: Builder) => void;
