"use strict";
/**
 * Copyright (c) Whales Corp.
 * All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.SimpleLibraryValue = exports.storeSimpleLibrary = exports.loadSimpleLibrary = void 0;
function loadSimpleLibrary(slice) {
    return {
        public: slice.loadBit(),
        root: slice.loadRef()
    };
}
exports.loadSimpleLibrary = loadSimpleLibrary;
function storeSimpleLibrary(src) {
    return (builder) => {
        builder.storeBit(src.public);
        builder.storeRef(src.root);
    };
}
exports.storeSimpleLibrary = storeSimpleLibrary;
exports.SimpleLibraryValue = {
    serialize(src, builder) {
        storeSimpleLibrary(src)(builder);
    },
    parse(src) {
        return loadSimpleLibrary(src);
    },
};
