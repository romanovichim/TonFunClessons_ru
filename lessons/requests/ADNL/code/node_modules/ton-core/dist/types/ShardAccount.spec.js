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
const Cell_1 = require("../boc/Cell");
const ShardAccount_1 = require("./ShardAccount");
describe('ShardAccount', () => {
    it('should parse tonkite cell', () => {
        const boc = Buffer.from('te6cckEBBAEA7wABUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEBAnfACD39VS5jcptHL8vMjEXrzGaRcCVYto7HUn4bpAOg8xqCAkCIGAAAACAAAAAAAAAAGgN4Lazp2QAAE0ACAwCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAjPUU3w=', 'base64');
        const cell = Cell_1.Cell.fromBoc(boc)[0];
        const shardAccount = (0, ShardAccount_1.loadShardAccount)(cell.beginParse());
        const stored = (0, Builder_1.beginCell)().store((0, ShardAccount_1.storeShardAccount)(shardAccount)).endCell();
        expect(cell.equals(stored)).toBe(true);
    });
});
