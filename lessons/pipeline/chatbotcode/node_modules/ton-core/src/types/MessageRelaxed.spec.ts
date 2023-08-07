/**
 * Copyright (c) Whales Corp. 
 * All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { beginCell } from "../boc/Builder";
import { Cell } from "../boc/Cell";
import { loadMessageRelaxed, storeMessageRelaxed } from "./MessageRelaxed";

describe('MessageRelaxed', () => {
    it('should parse message relaxed', () => {
        const state = 'te6ccsEBAgEAkQA3kQFoYgBgSQkXjXbkhpC1sju4zUJsLIAoavunKbfNsPFbk9jXL6BfXhAAAAAAAAAAAAAAAAAAAQEAsA+KfqUAAAAAAAAAAEO5rKAIAboVCXedy2J0RCseg4yfdNFtU8/BfiaHVEPkH/ze1W+fABicYUqh1j9Lnqv9ZhECm0XNPaB7/HcwoBb3AJnYYfqByAvrwgCqR2XE';
        const cell = Cell.fromBoc(Buffer.from(state, 'base64'))[0];
        const relaxed = loadMessageRelaxed(cell.beginParse());
        let stored = beginCell()
            .store(storeMessageRelaxed(relaxed))
            .endCell();
        expect(stored.equals(cell)).toBe(true);
    });
});