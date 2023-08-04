"use strict";
/**
 * Copyright (c) Whales Corp.
 * All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.LevelMask = void 0;
class LevelMask {
    constructor(mask = 0) {
        this._mask = 0;
        this._mask = mask;
        this._hashIndex = countSetBits(this._mask);
        this._hashCount = this._hashIndex + 1;
    }
    get value() {
        return this._mask;
    }
    get level() {
        return 32 - Math.clz32(this._mask);
    }
    get hashIndex() {
        return this._hashIndex;
    }
    get hashCount() {
        return this._hashCount;
    }
    apply(level) {
        return new LevelMask(this._mask & ((1 << level) - 1));
    }
    isSignificant(level) {
        let res = level === 0 || (this._mask >> (level - 1)) % 2 !== 0;
        return res;
        // bool res = level == 0 | | ( (mask_ >> (level -1)) % 2 != 0);
    }
}
exports.LevelMask = LevelMask;
function countSetBits(n) {
    n = n - ((n >> 1) & 0x55555555);
    n = (n & 0x33333333) + ((n >> 2) & 0x33333333);
    return ((n + (n >> 4) & 0xF0F0F0F) * 0x1010101) >> 24;
}
