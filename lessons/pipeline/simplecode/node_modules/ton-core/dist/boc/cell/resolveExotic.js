"use strict";
/**
 * Copyright (c) Whales Corp.
 * All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveExotic = void 0;
const BitReader_1 = require("../BitReader");
const CellType_1 = require("../CellType");
const exoticLibrary_1 = require("./exoticLibrary");
const exoticMerkleProof_1 = require("./exoticMerkleProof");
const exoticMerkleUpdate_1 = require("./exoticMerkleUpdate");
const exoticPruned_1 = require("./exoticPruned");
const LevelMask_1 = require("./LevelMask");
function resolvePruned(bits, refs) {
    // Parse pruned cell
    let pruned = (0, exoticPruned_1.exoticPruned)(bits, refs);
    // Calculate parameters
    let depths = [];
    let hashes = [];
    let mask = new LevelMask_1.LevelMask(pruned.mask);
    for (let i = 0; i < pruned.pruned.length; i++) {
        depths.push(pruned.pruned[i].depth);
        hashes.push(pruned.pruned[i].hash);
    }
    return {
        type: CellType_1.CellType.PrunedBranch,
        depths,
        hashes,
        mask
    };
}
function resolveLibrary(bits, refs) {
    // Parse library cell
    let pruned = (0, exoticLibrary_1.exoticLibrary)(bits, refs);
    // Calculate parameters
    let depths = [];
    let hashes = [];
    let mask = new LevelMask_1.LevelMask();
    return {
        type: CellType_1.CellType.Library,
        depths,
        hashes,
        mask
    };
}
function resolveMerkleProof(bits, refs) {
    // Parse merkle proof cell
    let merkleProof = (0, exoticMerkleProof_1.exoticMerkleProof)(bits, refs);
    // Calculate parameters
    let depths = [];
    let hashes = [];
    let mask = new LevelMask_1.LevelMask(refs[0].level() >> 1);
    return {
        type: CellType_1.CellType.MerkleProof,
        depths,
        hashes,
        mask
    };
}
function resolveMerkleUpdate(bits, refs) {
    // Parse merkle proof cell
    let merkleUpdate = (0, exoticMerkleUpdate_1.exoticMerkleUpdate)(bits, refs);
    // Calculate parameters
    let depths = [];
    let hashes = [];
    let mask = new LevelMask_1.LevelMask((refs[0].level() | refs[1].level()) >> 1);
    return {
        type: CellType_1.CellType.MerkleUpdate,
        depths,
        hashes,
        mask
    };
}
function resolveExotic(bits, refs) {
    let reader = new BitReader_1.BitReader(bits);
    let type = reader.preloadUint(8);
    if (type === 1) {
        return resolvePruned(bits, refs);
    }
    if (type === 2) {
        return resolveLibrary(bits, refs);
    }
    if (type === 3) {
        return resolveMerkleProof(bits, refs);
    }
    if (type === 4) {
        return resolveMerkleUpdate(bits, refs);
    }
    throw Error('Invalid exotic cell type: ' + type);
}
exports.resolveExotic = resolveExotic;
