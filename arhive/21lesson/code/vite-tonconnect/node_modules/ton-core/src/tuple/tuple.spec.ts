/**
 * Copyright (c) Whales Corp. 
 * All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Address } from "../address/Address";
import { beginCell } from "../boc/Builder";
import { Cell } from "../boc/Cell";
import { parseTuple, serializeTuple } from "./tuple";

describe('tuple', () => {
    it('should serialize tuple with numbers', () => {
        let serialized = serializeTuple([{
            "type": "int", "value": BigInt("-1")
        }, {
            "type": "int", "value": BigInt("-1")
        }, {
            "type": "int", "value": BigInt("49800000000")
        }, {
            "type": "int", "value": BigInt("100000000")
        }, {
            "type": "int", "value": BigInt("100000000")
        }, {
            "type": "int", "value": BigInt("2500")
        }, {
            "type": "int", "value": BigInt("100000000")
        }]);
        expect(serialized.toBoc({ idx: false, crc32: false }).toString('base64')).toEqual('te6ccgEBCAEAWQABGAAABwEAAAAABfXhAAEBEgEAAAAAAAAJxAIBEgEAAAAABfXhAAMBEgEAAAAABfXhAAQBEgEAAAALmE+yAAUBEgH//////////wYBEgH//////////wcAAA==');
    });

    it('should serialize tuple long numbers', () => {
        const golden = 'te6ccgEBAgEAKgABSgAAAQIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAqt4e0IsLXV0BAAA=';
        let serialized = serializeTuple([
            {
                "type": "int", "value": BigInt("12312312312312323421")
            }
        ]);
        expect(serialized.toBoc({ idx: false, crc32: false }).toString('base64')).toEqual(golden);
    });

    it('should serialize slices', () => {
        const golden = 'te6ccgEBAwEAHwACDwAAAQQAB0AgAgEAHeBhIIRGeIhda/QFs8ibOAAA';
        let serialized = serializeTuple([
            {
                "type": "slice", "cell": beginCell().storeCoins(BigInt("123123123123123234211234123123123")).endCell()
            }
        ]);
        expect(serialized.toBoc({ idx: false, crc32: false }).toString('base64')).toEqual(golden);
    });

    it('should serialize address', () => {
        const golden = 'te6ccgEBAwEAMgACDwAAAQQAELAgAgEAQ5_5N0I0swMbwhQMZdlgFyGLyjnRvwQ_TZTRvL8db8NQtNAAAA';
        let serialized = serializeTuple([
            {
                "type": "slice", "cell": beginCell().storeAddress(Address.parse('kf_JuhGlmBjeEKBjLssAuQxeUc6N-CH6bKaN5fjrfhqFpqVQ')).endCell()
            }
        ]);
        expect(serialized.toBoc({ idx: false, crc32: false }).toString('base64url')).toEqual(golden);
    });

    it('should serialize int', () => {
        const golden = 'te6ccgEBAgEAKgABSgAAAQIAyboRpZgY3hCgYy7LALkMXlHOjfgh+mymjeX4634ahaYBAAA=';
        let serialized = serializeTuple([
            {
                "type": "int", "value": BigInt('91243637913382117273357363328745502088904016167292989471764554225637796775334')
            }
        ]);
        expect(serialized.toBoc({ idx: false, crc32: false }).toString('base64')).toEqual(golden);
    });

    it('should serialize tuples', () => {
        let golden = 'te6ccgEBEAEAjgADDAAABwcABAkDAQEGBwABAgEJBAAHQCAFAgAGBAECAwUAHeBhIIRGeIhda/QFs8ibOAIACAcAEgEAAAAAAAHimQASAQAAAAAAAAB7ARIB//////////8KARIBAAAAAAAAAAMLARIBAAAAAAAAAAIMARIBAAAAAAAAAAENAQIADgESAQAAAAAAAAABDwAA';
        const st = parseTuple(Cell.fromBoc(Buffer.from(golden, 'base64'))[0]);
        let gs = serializeTuple(st);
        // console.warn(inspect(parseStack(gs), false, null, true));
        // console.warn(inspect(st, false, null, true));
        expect(gs.toBoc({ idx: false, crc32: false }).toString('base64')).toEqual(golden);
        // let serialized = serializeStack([
        //     {
        //         type: 'int', value: new BN(1)
        //     },
        //     {
        //         type: 'null'
        //     },
        //     {
        //         type: 'int', value: new BN(1)
        //     },
        //     {
        //         type: 'int', value: new BN(2)
        //     },
        //     {
        //         type: 'int', value: new BN(3)
        //     },
        //     {
        //         type: 'int', value: new BN(-1)
        //     },
        // ]);
        // expect(serialized.toBoc({ idx: false, crc32: false }).toString('base64')).toEqual(golden);
    })

    it('should parse large tuple from emulator', () => {
        let boc = 'te6cckECCAEAAwgAAg8AAAEEAD+AYAECAAAB/tC/0YDQuNCy0LXRgiDQvNC40YAg8J+RgCDQv9GA0LjQstC10YIg0LzQuNGAIPCfkYDQv9GA0LjQstC10YIg0LzQuNGAIPCfkYDQv9GA0LjQstC10YIg0LzQuNGAIPCfkYDQv9GA0LjQstC10YIg0LzQuNGAIPCfkYDQv9GA0LgDAf7QstC10YIg0LzQuNGAIPCfkYDQv9GA0LjQstC10YIg0LzQuNGAIPCfkYDQv9GA0LjQstC10YIg0LzQuNGAIPCfkYDQv9GA0LjQstC10YIg0LzQuNGAIPCfkYDQv9GA0LjQstC10YIg0LzQuNGAIPCfkYDQv9GA0LjQstC10YIgBAH+0LzQuNGAIPCfkYDQv9GA0LjQstC10YIg0LzQuNGAIPCfkYDQv9GA0LjQstC10YIg0LzQuNGAIPCfkYDQv9GA0LjQstC10YIg0LzQuNGAIPCfkYDQv9GA0LjQstC10YIg0LzQuNGAIPCfkYDQv9GA0LjQstC10YIg0LzQuNGAIAUB/vCfkYDQv9GA0LjQstC10YIg0LzQuNGAIPCfkYDQv9GA0LjQstC10YIg0LzQuNGAIPCfkYDQv9GA0LjQstC10YIg0LzQuNGAIPCfkYDQv9GA0LjQstC10YIg0LzQuNGAIPCfkYDQv9GA0LjQstC10YIg0LzQuNGAIPCfkYDQv9EGAf6A0LjQstC10YIg0LzQuNGAIPCfkYDQv9GA0LjQstC10YIg0LzQuNGAIPCfkYDQv9GA0LjQstC10YIg0LzQuNGAIPCfkYDQv9GA0LjQstC10YIg0LzQuNGAIPCfkYDQv9GA0LjQstC10YIg0LzQuNGAIPCfkYDQv9GA0LjQstC1BwDc0YIg0LzQuNGAIPCfkYDQv9GA0LjQstC10YIg0LzQuNGAIPCfkYDQv9GA0LjQstC10YIg0LzQuNGAIPCfkYDQv9GA0LjQstC10YIg0LzQuNGAIPCfkYDQv9GA0LjQstC10YIg0LzQuNGAIPCfkYBG2Y9A';
        let cell = Cell.fromBase64(boc);
        parseTuple(cell);
    });
});