"use strict";
/**
 * Copyright (c) Whales Corp.
 * All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTestClient = void 0;
const TonClient_1 = require("../client/TonClient");
function createTestClient(net) {
    return new TonClient_1.TonClient({
        endpoint: net === 'mainnet' ? 'https://mainnet.tonhubapi.com/jsonRPC' : 'https://testnet.toncenter.com/api/v2/jsonRPC',
        apiKey: net !== 'mainnet' ? '32df40f4ffc11053334bcdf09c7d3a9e6487ee0cb715edf8cf667c543edb10ca' : undefined
    });
}
exports.createTestClient = createTestClient;
