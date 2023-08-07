"use strict";
/**
 * Copyright (c) Whales Corp.
 * All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const crc32c_1 = require("./crc32c");
describe('src32c', () => {
    it('should match test vector', () => {
        expect((0, crc32c_1.crc32c)(Buffer.from('123456789'))).toEqual(Buffer.from('839206e3', 'hex'));
    });
});
