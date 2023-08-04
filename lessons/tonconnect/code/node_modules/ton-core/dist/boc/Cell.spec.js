"use strict";
/**
 * Copyright (c) Whales Corp.
 * All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const BitString_1 = require("./BitString");
const Cell_1 = require("./Cell");
const CellType_1 = require("./CellType");
describe('Cell', () => {
    it('should construct', () => {
        let cell = new Cell_1.Cell();
        expect(cell.type).toBe(CellType_1.CellType.Ordinary);
        expect(cell.bits.equals(new BitString_1.BitString(Buffer.alloc(0), 0, 0))).toEqual(true);
        expect(cell.refs).toEqual([]);
    });
});
