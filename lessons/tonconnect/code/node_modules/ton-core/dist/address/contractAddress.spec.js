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
const Address_1 = require("./Address");
const contractAddress_1 = require("./contractAddress");
describe('contractAddress', () => {
    it('should resolve address correctly', () => {
        let addr = (0, contractAddress_1.contractAddress)(0, { code: (0, Builder_1.beginCell)().storeUint(1, 8).endCell(), data: (0, Builder_1.beginCell)().storeUint(2, 8).endCell() });
        expect(addr.equals(Address_1.Address.parse('EQCSY_vTjwGrlvTvkfwhinJ60T2oiwgGn3U7Tpw24kupIhHz')));
    });
});
