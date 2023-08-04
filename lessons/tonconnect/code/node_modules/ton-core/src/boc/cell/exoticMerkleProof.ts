/**
 * Copyright (c) Whales Corp. 
 * All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { BitReader } from "../BitReader";
import { BitString } from "../BitString";
import { Cell } from "../Cell";

export function exoticMerkleProof(bits: BitString, refs: Cell[]) {
    const reader = new BitReader(bits);

    // type + hash + depth
    const size = 8 + 256 + 16;

    if (bits.length !== size) {
        throw new Error(`Merkle Proof cell must have exactly (8 + 256 + 16) bits, got "${bits.length}"`);
    }

    if (refs.length !== 1) {
        throw new Error(`Merkle Proof cell must have exactly 1 ref, got "${refs.length}"`);
    }

    // Check type
    let type = reader.loadUint(8);
    if (type !== 3) {
        throw new Error(`Merkle Proof cell must have type 3, got "${type}"`);
    }

    // Check data
    const proofHash = reader.loadBuffer(32);
    const proofDepth = reader.loadUint(16);
    const refHash = refs[0].hash(0)
    const refDepth = refs[0].depth(0);

    if (proofDepth !== refDepth) {
        throw new Error(`Merkle Proof cell ref depth must be exactly "${proofDepth}", got "${refDepth}"`);
    }

    if (!proofHash.equals(refHash)) {
        throw new Error(`Merkle Proof cell ref hash must be exactly "${proofHash.toString('hex')}", got "${refHash.toString('hex')}"`);
    }

    return {
        proofDepth,
        proofHash
    };
}