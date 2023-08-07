"use strict";
/**
 * Copyright (c) Whales Corp.
 * All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.storeAccountState = exports.loadAccountState = void 0;
const StateInit_1 = require("./StateInit");
function loadAccountState(cs) {
    if (cs.loadBit()) {
        return { type: 'active', state: (0, StateInit_1.loadStateInit)(cs) };
    }
    else if (cs.loadBit()) {
        return { type: 'frozen', stateHash: cs.loadUintBig(256) };
    }
    else {
        return { type: 'uninit' };
    }
}
exports.loadAccountState = loadAccountState;
function storeAccountState(src) {
    return (builder) => {
        if (src.type === 'active') {
            builder.storeBit(true);
            builder.store((0, StateInit_1.storeStateInit)(src.state));
        }
        else if (src.type === 'frozen') {
            builder.storeBit(false);
            builder.storeBit(true);
            builder.storeUint(src.stateHash, 256);
        }
        else if (src.type === 'uninit') {
            builder.storeBit(false);
            builder.storeBit(false);
        }
    };
}
exports.storeAccountState = storeAccountState;
