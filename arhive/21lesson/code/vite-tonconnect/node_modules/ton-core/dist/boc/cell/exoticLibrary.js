"use strict";
/**
 * Copyright (c) Whales Corp.
 * All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.exoticLibrary = void 0;
const BitReader_1 = require("../BitReader");
function exoticLibrary(bits, refs) {
    const reader = new BitReader_1.BitReader(bits);
    // type + hash
    const size = 8 + 256;
    if (bits.length !== size) {
        throw new Error(`Library cell must have exactly (8 + 256) bits, got "${bits.length}"`);
    }
    // Check type
    let type = reader.loadUint(8);
    if (type !== 2) {
        throw new Error(`Library cell must have type 2, got "${type}"`);
    }
    return {};
}
exports.exoticLibrary = exoticLibrary;
