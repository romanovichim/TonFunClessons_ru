"use strict";
/**
 * Copyright (c) Whales Corp.
 * All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.storeStateInit = exports.loadStateInit = void 0;
const Dictionary_1 = require("../dict/Dictionary");
const SimpleLibrary_1 = require("./SimpleLibrary");
const TickTock_1 = require("./TickTock");
;
function loadStateInit(slice) {
    // Split Depth
    let splitDepth;
    if (slice.loadBit()) {
        splitDepth = slice.loadUint(5);
    }
    // TickTock
    let special;
    if (slice.loadBit()) {
        special = (0, TickTock_1.loadTickTock)(slice);
    }
    // Code and Data
    let code = slice.loadMaybeRef();
    let data = slice.loadMaybeRef();
    // Libs
    let libraries = slice.loadDict(Dictionary_1.Dictionary.Keys.BigUint(256), SimpleLibrary_1.SimpleLibraryValue);
    if (libraries.size === 0) {
        libraries = undefined;
    }
    return {
        splitDepth,
        special,
        code,
        data,
        libraries
    };
}
exports.loadStateInit = loadStateInit;
function storeStateInit(src) {
    return (builder) => {
        if (src.splitDepth !== null && src.splitDepth !== undefined) {
            builder.storeBit(true);
            builder.storeUint(src.splitDepth, 5);
        }
        else {
            builder.storeBit(false);
        }
        if (src.special !== null && src.special !== undefined) {
            builder.storeBit(true);
            builder.store((0, TickTock_1.storeTickTock)(src.special));
        }
        else {
            builder.storeBit(false);
        }
        builder.storeMaybeRef(src.code);
        builder.storeMaybeRef(src.data);
        builder.storeDict(src.libraries);
    };
}
exports.storeStateInit = storeStateInit;
