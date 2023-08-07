/**
 * Copyright (c) Whales Corp. 
 * All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Address } from "../../address/Address";

export function serializeInternalKey(value: any): string {
    if (typeof value === 'number') {
        if (!Number.isSafeInteger(value)) {
            throw Error('Invalid key type: not a safe integer: ' + value);
        }
        return 'n:' + value.toString(10);
    } else if (typeof value === 'bigint') {
        return 'b:' + value.toString(10);
    } else if (Address.isAddress(value)) {
        return 'a:' + value.toString();
    } else if (Buffer.isBuffer(value)) {
        return 'f:' + value.toString('hex');
    } else {
        throw Error('Invalid key type');
    }
}

export function deserializeInternalKey(value: string): any {
    let k = value.slice(0, 2);
    let v = value.slice(2);
    if (k === 'n:') {
        return parseInt(v, 10);
    } else if (k === 'b:') {
        return BigInt(v);
    } else if (k === 'a:') {
        return Address.parse(v);
    } else if (k === 'f:') {
        return Buffer.from(v, 'hex');
    }
    throw Error('Invalid key type: ' + k);
}