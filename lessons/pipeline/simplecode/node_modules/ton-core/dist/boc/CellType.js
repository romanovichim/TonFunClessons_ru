"use strict";
/**
 * Copyright (c) Whales Corp.
 * All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.CellType = void 0;
var CellType;
(function (CellType) {
    CellType[CellType["Ordinary"] = -1] = "Ordinary";
    CellType[CellType["PrunedBranch"] = 1] = "PrunedBranch";
    CellType[CellType["Library"] = 2] = "Library";
    CellType[CellType["MerkleProof"] = 3] = "MerkleProof";
    CellType[CellType["MerkleUpdate"] = 4] = "MerkleUpdate";
})(CellType = exports.CellType || (exports.CellType = {}));
