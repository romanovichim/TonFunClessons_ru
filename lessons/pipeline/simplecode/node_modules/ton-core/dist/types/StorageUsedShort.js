"use strict";
/**
 * Copyright (c) Whales Corp.
 * All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.storeStorageUsedShort = exports.loadStorageUsedShort = void 0;
function loadStorageUsedShort(slice) {
    let cells = slice.loadVarUintBig(3);
    let bits = slice.loadVarUintBig(3);
    return {
        cells,
        bits
    };
}
exports.loadStorageUsedShort = loadStorageUsedShort;
function storeStorageUsedShort(src) {
    return (builder) => {
        builder.storeVarUint(src.cells, 3);
        builder.storeVarUint(src.bits, 3);
    };
}
exports.storeStorageUsedShort = storeStorageUsedShort;
