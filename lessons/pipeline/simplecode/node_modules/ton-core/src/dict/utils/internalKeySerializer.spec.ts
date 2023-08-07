/**
 * Copyright (c) Whales Corp. 
 * All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Address } from "../../address/Address";
import { testAddress } from "../../utils/testAddress";
import { deserializeInternalKey, serializeInternalKey } from "./internalKeySerializer";

describe('internalKeySerializer', () => {
    it('should serialize numbers', () => {
        let cs = [0, -1, 1, 123123123, -123123123];
        for (let c of cs) {
            expect(deserializeInternalKey(serializeInternalKey(c))).toBe(c);
        }
    });
    it('should serialize bignumbers', () => {
        let cs = [0n, -1n, 1n, 123123123n, -123123123n, 1231231231231237812683128376123n, -1231273612873681263871263871263n];
        for (let c of cs) {
            expect(deserializeInternalKey(serializeInternalKey(c))).toBe(c);
        }
    });
    it('should serialize addresses', () => {
        let cs = [testAddress(0, '1'), testAddress(-1, '1'), testAddress(0, '2'), testAddress(0, '4')];
        for (let c of cs) {
            expect((deserializeInternalKey(serializeInternalKey(c)) as Address).equals(c)).toBe(true);
        }
    });
    it('should serialize buffers', () => {
        let cs = [Buffer.from('00', 'hex'), Buffer.from('ff', 'hex'), Buffer.from('0f', 'hex'), Buffer.from('0f000011002233456611', 'hex')];
        for (let c of cs) {
            expect((deserializeInternalKey(serializeInternalKey(c)) as Buffer).equals(c)).toBe(true);
        }
    });
});