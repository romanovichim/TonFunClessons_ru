"use strict";
/**
 * Copyright (c) Whales Corp.
 * All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.exoticPruned = void 0;
const BitReader_1 = require("../BitReader");
const LevelMask_1 = require("./LevelMask");
function exoticPruned(bits, refs) {
    let reader = new BitReader_1.BitReader(bits);
    // Check type
    let type = reader.loadUint(8);
    if (type !== 1) {
        throw new Error(`Pruned branch cell must have type 1, got "${type}"`);
    }
    // Check refs
    if (refs.length !== 0) {
        throw new Error(`Pruned Branch cell can't has refs, got "${refs.length}"`);
    }
    // Resolve cell
    let mask;
    if (bits.length === 280) {
        // Special case for config proof
        // This test proof is generated in the moment of voting for a slashing
        // it seems that tools generate it incorrectly and therefore doesn't have mask in it
        // so we need to hardcode it equal to 1
        mask = new LevelMask_1.LevelMask(1);
    }
    else {
        // Check level
        mask = new LevelMask_1.LevelMask(reader.loadUint(8));
        if (mask.level < 1 || mask.level > 3) {
            throw new Error(`Pruned Branch cell level must be >= 1 and <= 3, got "${mask.level}/${mask.value}"`);
        }
        // Read pruned
        const size = 8 + 8 + (mask.apply(mask.level - 1).hashCount * (256 /* Hash */ + 16 /* Depth */));
        if (bits.length !== size) {
            throw new Error(`Pruned branch cell must have exactly ${size} bits, got "${bits.length}"`);
        }
    }
    // Read pruned
    let pruned = [];
    let hashes = [];
    let depths = [];
    for (let i = 0; i < mask.level; i++) {
        hashes.push(reader.loadBuffer(32));
    }
    for (let i = 0; i < mask.level; i++) {
        depths.push(reader.loadUint(16));
    }
    for (let i = 0; i < mask.level; i++) {
        pruned.push({
            depth: depths[i],
            hash: hashes[i]
        });
    }
    return {
        mask: mask.value,
        pruned
    };
}
exports.exoticPruned = exoticPruned;
