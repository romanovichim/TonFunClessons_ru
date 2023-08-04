"use strict";
/**
 * Copyright (c) Whales Corp.
 * All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const bitsForNumber_1 = require("./bitsForNumber");
describe('bitsForNumber', () => {
    it('should work', () => {
        expect((0, bitsForNumber_1.bitsForNumber)(0, 'int')).toBe(1);
        expect((0, bitsForNumber_1.bitsForNumber)(1, 'int')).toBe(2);
        expect((0, bitsForNumber_1.bitsForNumber)(-1, 'int')).toBe(1);
        expect((0, bitsForNumber_1.bitsForNumber)(-2, 'int')).toBe(3);
    });
});
