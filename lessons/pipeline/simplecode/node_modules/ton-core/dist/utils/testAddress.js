"use strict";
/**
 * Copyright (c) Whales Corp.
 * All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.testExternalAddress = exports.testAddress = void 0;
const prando_1 = __importDefault(require("prando"));
const Address_1 = require("../address/Address");
const ExternalAddress_1 = require("../address/ExternalAddress");
const bitsForNumber_1 = require("./bitsForNumber");
function testAddress(workchain, seed) {
    const random = new prando_1.default(seed);
    const hash = Buffer.alloc(32);
    for (let i = 0; i < hash.length; i++) {
        hash[i] = random.nextInt(0, 255);
    }
    return new Address_1.Address(workchain, hash);
}
exports.testAddress = testAddress;
function testExternalAddress(seed) {
    const random = new prando_1.default(seed);
    const hash = Buffer.alloc(32);
    for (let i = 0; i < hash.length; i++) {
        hash[i] = random.nextInt(0, 255);
    }
    let v = BigInt('0x' + hash.toString('hex'));
    return new ExternalAddress_1.ExternalAddress(v, (0, bitsForNumber_1.bitsForNumber)(v, 'uint'));
}
exports.testExternalAddress = testExternalAddress;
