"use strict";
/**
 * Copyright (c) Whales Corp.
 * All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTestClient4 = void 0;
const TonClient4_1 = require("../client/TonClient4");
function createTestClient4(net) {
    return new TonClient4_1.TonClient4({ endpoint: net === 'mainnet' ? 'https://mainnet-v4.tonhubapi.com' : 'https://testnet-v4.tonhubapi.com' });
}
exports.createTestClient4 = createTestClient4;
