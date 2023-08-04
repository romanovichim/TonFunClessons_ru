"use strict";
/**
 * Copyright (c) Whales Corp.
 * All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const findCommonPrefix_1 = require("./findCommonPrefix");
describe('findCommonPrefix', () => {
    it('should find common prefix', () => {
        expect((0, findCommonPrefix_1.findCommonPrefix)([
            '0000111',
            '0101111',
            '0001111'
        ])).toEqual('0');
        expect((0, findCommonPrefix_1.findCommonPrefix)([
            '0000111',
            '0001111',
            '0000101'
        ])).toEqual('000');
        expect((0, findCommonPrefix_1.findCommonPrefix)([
            '0000111',
            '1001111',
            '0000101'
        ])).toEqual('');
    });
});
