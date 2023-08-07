"use strict";
/**
 * Copyright (c) Whales Corp.
 * All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.contractAddress = void 0;
const Builder_1 = require("../boc/Builder");
const StateInit_1 = require("../types/StateInit");
const Address_1 = require("./Address");
function contractAddress(workchain, init) {
    let hash = (0, Builder_1.beginCell)()
        .store((0, StateInit_1.storeStateInit)(init))
        .endCell()
        .hash();
    return new Address_1.Address(workchain, hash);
}
exports.contractAddress = contractAddress;
