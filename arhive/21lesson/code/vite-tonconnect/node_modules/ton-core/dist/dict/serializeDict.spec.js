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
const serializeDict_1 = require("./serializeDict");
describe('serializeDict', () => {
    it('should build prefix tree', () => {
        // From docs
        const map = new Map();
        map.set(13n, 169n);
        map.set(17n, 289n);
        map.set(239n, 57121n);
        // Test serialization
        let builder = (0, Builder_1.beginCell)();
        (0, serializeDict_1.serializeDict)(map, 16, (src, cell) => cell.storeUint(src, 16), builder);
        let root = builder.endCell();
        expect(root).toMatchSnapshot();
    });
});
