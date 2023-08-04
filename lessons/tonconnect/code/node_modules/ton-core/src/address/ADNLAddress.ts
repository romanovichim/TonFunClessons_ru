/**
 * Copyright (c) Whales Corp. 
 * All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import inspectSymbol from 'symbol.inspect';
import { base32Decode, base32Encode } from '../utils/base32';
import { crc16 } from '../utils/crc16';

export class ADNLAddress {

    static parseFriendly(src: string) {

        if (src.length !== 55) {
            throw Error('Invalid address');
        }

        // Decoding
        src = 'f' + src;
        let decoded = base32Decode(src);
        if (decoded[0] !== 0x2d) {
            throw Error('Invalid address');
        }
        let gotHash = decoded.slice(33);
        let hash = crc16(decoded.slice(0, 33));
        if (!hash.equals(gotHash)) {
            throw Error('Invalid address');
        }
        return new ADNLAddress(decoded.slice(1, 33));
    }

    static parseRaw(src: string) {
        const data = Buffer.from(src, 'base64');
        return new ADNLAddress(data);
    }

    readonly address: Buffer;

    constructor(address: Buffer) {
        if (address.length !== 32) {
            throw Error('Invalid address');
        }
        this.address = address;
    }

    equals(b: ADNLAddress) {
        return this.address.equals(b.address);
    }

    toRaw = () => {
        return this.address.toString('hex').toUpperCase();
    }

    toString = () => {
        let data = Buffer.concat([Buffer.from([0x2D]), this.address]);
        let hash = crc16(data);
        data = Buffer.concat([data, hash]);
        return base32Encode(data).slice(1);
    }

    [inspectSymbol] = () => this.toString();
}