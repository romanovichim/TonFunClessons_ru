/**
 * Copyright (c) Whales Corp. 
 * All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { beginCell } from "../boc/Builder";
import { serializeDict } from "./serializeDict";

describe('serializeDict', () => {
    it('should build prefix tree', () => {

        // From docs
        const map = new Map<bigint, bigint>();
        map.set(13n, 169n);
        map.set(17n, 289n);
        map.set(239n, 57121n);

        // Test serialization
        let builder = beginCell();
        serializeDict(map, 16, (src, cell) => cell.storeUint(src, 16), builder);
        let root = builder.endCell();
        expect(root).toMatchSnapshot();
    });
});