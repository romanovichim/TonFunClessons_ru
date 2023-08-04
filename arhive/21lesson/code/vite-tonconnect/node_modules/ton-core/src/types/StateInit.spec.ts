/**
 * Copyright (c) Whales Corp. 
 * All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { beginCell } from "../boc/Builder";
import { Cell } from "../boc/Cell";
import { loadStateInit, storeStateInit } from "./StateInit";

describe('StateInit', () => {
    it('shoild serialize to match golden-1', () => {

        // Serialize
        let boc = beginCell()
            .store(storeStateInit({
                code: beginCell().storeUint(1, 8).endCell(),
                data: beginCell().storeUint(2, 8).endCell()
            }))
            .endCell()
            .toBoc({ idx: false, crc32: true });
        expect(boc.toString('base64')).toEqual('te6cckEBAwEACwACATQCAQACAgACAX/38hg=')

        // Parse
        let parsed = loadStateInit(Cell.fromBoc(boc)[0].beginParse());
        expect(parsed.libraries).toBeUndefined();
        expect(parsed.special).toBeUndefined();
        expect(parsed.splitDepth).toBeUndefined();
        let codeSlice = parsed.code!.beginParse();
        let a = codeSlice.loadUint(8);
        expect(a).toBe(1);
        codeSlice.endParse();
        let dataSlice = parsed.data!.beginParse();
        let b = dataSlice.loadUint(8);
        expect(b).toBe(2);
        dataSlice.endParse();
    });
});