/**
 * Copyright (c) Whales Corp.
 * All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Builder } from "../boc/Builder";
import { Slice } from "../boc/Slice";
export type ComputeSkipReason = 'no-state' | 'bad-state' | 'no-gas';
export declare function loadComputeSkipReason(slice: Slice): ComputeSkipReason;
export declare function storeComputeSkipReason(src: ComputeSkipReason): (builder: Builder) => void;
