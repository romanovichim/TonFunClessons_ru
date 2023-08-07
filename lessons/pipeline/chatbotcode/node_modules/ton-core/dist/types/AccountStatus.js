"use strict";
/**
 * Copyright (c) Whales Corp.
 * All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.storeAccountStatus = exports.loadAccountStatus = void 0;
/**
 * Load account state from slice
 * @param slice
 * @returns AccountState
 */
function loadAccountStatus(slice) {
    const status = slice.loadUint(2);
    if (status === 0x00) {
        return 'uninitialized';
    }
    if (status === 0x01) {
        return 'frozen';
    }
    if (status === 0x02) {
        return 'active';
    }
    if (status === 0x03) {
        return 'non-existing';
    }
    throw Error('Invalid data');
}
exports.loadAccountStatus = loadAccountStatus;
/**
 * Store account state to builder
 * @param src account state
 * @param builder buidler
 */
function storeAccountStatus(src) {
    return (builder) => {
        if (src === 'uninitialized') {
            builder.storeUint(0x00, 2);
        }
        else if (src === 'frozen') {
            builder.storeUint(0x01, 2);
        }
        else if (src === 'active') {
            builder.storeUint(0x02, 2);
        }
        else if (src === 'non-existing') {
            builder.storeUint(0x03, 2);
        }
        else {
            throw Error('Invalid data');
        }
        return builder;
    };
}
exports.storeAccountStatus = storeAccountStatus;
