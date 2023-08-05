"use strict";
/**
 * Copyright (c) Whales Corp.
 * All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.bitsForNumber = void 0;
function bitsForNumber(src, mode) {
    let v = BigInt(src);
    // Handle negative values
    if (mode === 'int') {
        // Corner case for zero or -1 value
        if (v === 0n || v === -1n) {
            return 1;
        }
        let v2 = v > 0 ? v : -v;
        return (v2.toString(2).length + 1 /* Sign bit */);
    }
    else if (mode === 'uint') {
        if (v < 0) {
            throw Error(`value is negative. Got ${src}`);
        }
        return (v.toString(2).length);
    }
    else {
        throw Error(`invalid mode. Got ${mode}`);
    }
}
exports.bitsForNumber = bitsForNumber;
