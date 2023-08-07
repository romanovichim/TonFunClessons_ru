/**
 * Copyright (c) Whales Corp. 
 * All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { BitString } from "../BitString";
import { CellType } from "../CellType";
import { Cell } from '../Cell';
import { LevelMask } from "./LevelMask";
import { ExoticPruned, exoticPruned } from "./exoticPruned";
import { exoticMerkleProof } from "./exoticMerkleProof";
import { getRepr } from "./descriptor";
import { sha256_sync } from "ton-crypto";
import { exoticMerkleUpdate } from "./exoticMerkleUpdate";
import { exoticLibrary } from "./exoticLibrary";

//
// This function replicates unknown logic of resolving cell data
// https://github.com/ton-blockchain/ton/blob/24dc184a2ea67f9c47042b4104bbb4d82289fac1/crypto/vm/cells/DataCell.cpp#L214
//
export function wonderCalculator(type: CellType, bits: BitString, refs: Cell[]): { mask: LevelMask, hashes: Buffer[], depths: number[] } {

    //
    // Resolving level mask
    //

    let levelMask: LevelMask;
    let pruned: ExoticPruned | null = null;
    if (type === CellType.Ordinary) {
        let mask = 0;
        for (let r of refs) {
            mask = mask | r.mask.value;
        }
        levelMask = new LevelMask(mask);
    } else if (type === CellType.PrunedBranch) {

        // Parse pruned
        pruned = exoticPruned(bits, refs);

        // Load level
        levelMask = new LevelMask(pruned.mask);

    } else if (type === CellType.MerkleProof) {

        // Parse proof
        let loaded = exoticMerkleProof(bits, refs);

        // Load level
        levelMask = new LevelMask(refs[0].mask.value >> 1);
    } else if (type === CellType.MerkleUpdate) {

        // Parse update
        let loaded = exoticMerkleUpdate(bits, refs);

        // Load level
        levelMask = new LevelMask((refs[0].mask.value | refs[1].mask.value) >> 1);
    } else if (type === CellType.Library) {

        // Parse library
        let loaded = exoticLibrary(bits, refs);

        // Load level
        levelMask = new LevelMask();
    } else {
        throw new Error("Unsupported exotic type");
    }

    //
    // Calculate hashes and depths
    // NOTE: https://github.com/ton-blockchain/ton/blob/24dc184a2ea67f9c47042b4104bbb4d82289fac1/crypto/vm/cells/DataCell.cpp#L214
    //

    let depths: number[] = [];
    let hashes: Buffer[] = [];

    let hashCount = type === CellType.PrunedBranch ? 1 : levelMask.hashCount;
    let totalHashCount = levelMask.hashCount;
    let hashIOffset = totalHashCount - hashCount;
    for (let levelI = 0, hashI = 0; levelI <= levelMask.level; levelI++) {

        if (!levelMask.isSignificant(levelI)) {
            continue;
        }

        if (hashI < hashIOffset) {
            hashI++;
            continue;
        }

        //
        // Bits
        //

        let currentBits: BitString;
        if (hashI === hashIOffset) {
            if (!(levelI === 0 || type === CellType.PrunedBranch)) {
                throw Error('Invalid');
            }
            currentBits = bits;
        } else {
            if (!(levelI !== 0 && type !== CellType.PrunedBranch)) {
                throw Error('Invalid: ' + levelI + ', ' + type);
            }
            currentBits = new BitString(hashes[hashI - hashIOffset - 1], 0, 256);
        }

        //
        // Depth
        //

        let currentDepth = 0;
        for (let c of refs) {
            let childDepth: number;
            if (type == CellType.MerkleProof || type == CellType.MerkleUpdate) {
                childDepth = c.depth(levelI + 1);
            } else {
                childDepth = c.depth(levelI);
            }
            currentDepth = Math.max(currentDepth, childDepth);
        }
        if (refs.length > 0) {
            currentDepth++;
        }

        //
        // Hash
        //

        let repr = getRepr(bits, currentBits, refs, levelI, type);
        let hash = sha256_sync(repr);

        //
        // Persist next
        //

        let destI = hashI - hashIOffset;
        depths[destI] = currentDepth;
        hashes[destI] = hash;

        //
        // Next
        //

        hashI++;
    }

    //
    // Calculate hash and depth for all levels
    //

    let resolvedHashes: Buffer[] = [];
    let resolvedDepths: number[] = [];
    if (pruned) {
        for (let i = 0; i < 4; i++) {
            const { hashIndex } = levelMask.apply(i);
            const { hashIndex: thisHashIndex } = levelMask;
            if (hashIndex !== thisHashIndex) {
                resolvedHashes.push(pruned.pruned[hashIndex].hash);
                resolvedDepths.push(pruned.pruned[hashIndex].depth);
            } else {
                resolvedHashes.push(hashes[0]);
                resolvedDepths.push(depths[0]);
            }
        }
    } else {
        for (let i = 0; i < 4; i++) {
            resolvedHashes.push(hashes[levelMask.apply(i).hashIndex]);
            resolvedDepths.push(depths[levelMask.apply(i).hashIndex]);
        }
    }

    //
    // Result
    //

    return {
        mask: levelMask,
        hashes: resolvedHashes,
        depths: resolvedDepths
    };
}