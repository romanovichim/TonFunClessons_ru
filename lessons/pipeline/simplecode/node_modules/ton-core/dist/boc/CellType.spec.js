"use strict";
/**
 * Copyright (c) Whales Corp.
 * All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const CellType_1 = require("./CellType");
describe('CellType', () => {
    it('should match values in c++ code', () => {
        expect(CellType_1.CellType.Ordinary).toBe(-1);
        expect(CellType_1.CellType.PrunedBranch).toBe(1);
        expect(CellType_1.CellType.Library).toBe(2);
        expect(CellType_1.CellType.MerkleProof).toBe(3);
        expect(CellType_1.CellType.MerkleUpdate).toBe(4);
    });
});
