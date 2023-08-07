"use strict";
/**
 * Copyright (c) Whales Corp.
 * All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.storeComputeSkipReason = exports.loadComputeSkipReason = void 0;
function loadComputeSkipReason(slice) {
    let reason = slice.loadUint(2);
    if (reason === 0x00) {
        return 'no-state';
    }
    else if (reason === 0x01) {
        return 'bad-state';
    }
    else if (reason === 0x02) {
        return 'no-gas';
    }
    throw new Error(`Unknown ComputeSkipReason: ${reason}`);
}
exports.loadComputeSkipReason = loadComputeSkipReason;
function storeComputeSkipReason(src) {
    return (builder) => {
        if (src === 'no-state') {
            builder.storeUint(0x00, 2);
        }
        else if (src === 'bad-state') {
            builder.storeUint(0x01, 2);
        }
        else if (src === 'no-gas') {
            builder.storeUint(0x02, 2);
        }
        else {
            throw new Error(`Unknown ComputeSkipReason: ${src}`);
        }
    };
}
exports.storeComputeSkipReason = storeComputeSkipReason;
