/**
 * Copyright (c) Whales Corp.
 * All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
/// <reference types="node" />
import { BitString } from "../BitString";
import { Cell } from "../Cell";
export declare function exoticMerkleUpdate(bits: BitString, refs: Cell[]): {
    proofDepth1: number;
    proofDepth2: number;
    proofHash1: Buffer;
    proofHash2: Buffer;
};
