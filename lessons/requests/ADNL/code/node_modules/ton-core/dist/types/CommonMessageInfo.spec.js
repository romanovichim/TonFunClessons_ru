"use strict";
/**
 * Copyright (c) Whales Corp.
 * All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const Builder_1 = require("../boc/Builder");
const testAddress_1 = require("../utils/testAddress");
const CommonMessageInfo_1 = require("./CommonMessageInfo");
describe('CommonMessageInfo', () => {
    it('should serialize external-in messages', () => {
        let msg = {
            type: 'external-in',
            src: (0, testAddress_1.testExternalAddress)('addr-2'),
            dest: (0, testAddress_1.testAddress)(0, 'addr-1'),
            importFee: 0n
        };
        let cell = (0, Builder_1.beginCell)().store((0, CommonMessageInfo_1.storeCommonMessageInfo)(msg)).endCell();
        let msg2 = (0, CommonMessageInfo_1.loadCommonMessageInfo)(cell.beginParse());
        let cell2 = (0, Builder_1.beginCell)().store((0, CommonMessageInfo_1.storeCommonMessageInfo)(msg2)).endCell();
        expect(cell.equals(cell2)).toBe(true);
    });
});
