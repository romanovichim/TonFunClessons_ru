"use strict";
/**
 * Copyright (c) Whales Corp.
 * All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = require("crypto");
const prando_1 = __importDefault(require("prando"));
const testAddress_1 = require("../utils/testAddress");
const BitReader_1 = require("./BitReader");
const Builder_1 = require("./Builder");
describe('BitReader', () => {
    it('should read uints from builder', () => {
        let prando = new prando_1.default('test-1');
        for (let i = 0; i < 1000; i++) {
            let a = prando.nextInt(0, 281474976710655);
            let b = prando.nextInt(0, 281474976710655);
            let builder = (0, Builder_1.beginCell)();
            builder.storeUint(a, 48);
            builder.storeUint(b, 48);
            let bits = builder.endCell().bits;
            let reader = new BitReader_1.BitReader(bits);
            expect(Number(reader.preloadUint(48))).toEqual(a);
            expect(Number(reader.loadUint(48))).toEqual(a);
            expect(Number(reader.preloadUint(48))).toEqual(b);
            expect(Number(reader.loadUint(48))).toEqual(b);
        }
    });
    it('should read ints from builder', () => {
        let prando = new prando_1.default('test-2');
        for (let i = 0; i < 1000; i++) {
            let a = prando.nextInt(-281474976710655, 281474976710655);
            let b = prando.nextInt(-281474976710655, 281474976710655);
            let builder = (0, Builder_1.beginCell)();
            builder.storeInt(a, 49);
            builder.storeInt(b, 49);
            let bits = builder.endCell().bits;
            let reader = new BitReader_1.BitReader(bits);
            expect(Number(reader.preloadInt(49))).toEqual(a);
            expect(Number(reader.loadInt(49))).toEqual(a);
            expect(Number(reader.preloadInt(49))).toEqual(b);
            expect(Number(reader.loadInt(49))).toEqual(b);
        }
    });
    it('should read var uints from builder', () => {
        let prando = new prando_1.default('test-3');
        for (let i = 0; i < 1000; i++) {
            let sizeBits = prando.nextInt(4, 8);
            let a = prando.nextInt(0, 281474976710655);
            let b = prando.nextInt(0, 281474976710655);
            let builder = (0, Builder_1.beginCell)();
            builder.storeVarUint(a, sizeBits);
            builder.storeVarUint(b, sizeBits);
            let bits = builder.endCell().bits;
            let reader = new BitReader_1.BitReader(bits);
            expect(Number(reader.preloadVarUint(sizeBits))).toEqual(a);
            expect(Number(reader.loadVarUint(sizeBits))).toEqual(a);
            expect(Number(reader.preloadVarUint(sizeBits))).toEqual(b);
            expect(Number(reader.loadVarUint(sizeBits))).toEqual(b);
        }
    });
    it('should read var ints from builder', () => {
        let prando = new prando_1.default('test-4');
        for (let i = 0; i < 1000; i++) {
            let sizeBits = prando.nextInt(4, 8);
            let a = prando.nextInt(-281474976710655, 281474976710655);
            let b = prando.nextInt(-281474976710655, 281474976710655);
            let builder = (0, Builder_1.beginCell)();
            builder.storeVarInt(a, sizeBits);
            builder.storeVarInt(b, sizeBits);
            let bits = builder.endCell().bits;
            let reader = new BitReader_1.BitReader(bits);
            expect(Number(reader.preloadVarInt(sizeBits))).toEqual(a);
            expect(Number(reader.loadVarInt(sizeBits))).toEqual(a);
            expect(Number(reader.preloadVarInt(sizeBits))).toEqual(b);
            expect(Number(reader.loadVarInt(sizeBits))).toEqual(b);
        }
    });
    it('should read coins from builder', () => {
        let prando = new prando_1.default('test-5');
        for (let i = 0; i < 1000; i++) {
            let a = prando.nextInt(0, 281474976710655);
            let b = prando.nextInt(0, 281474976710655);
            let builder = (0, Builder_1.beginCell)();
            builder.storeCoins(a);
            builder.storeCoins(b);
            let bits = builder.endCell().bits;
            let reader = new BitReader_1.BitReader(bits);
            expect(Number(reader.preloadCoins())).toEqual(a);
            expect(Number(reader.loadCoins())).toEqual(a);
            expect(Number(reader.preloadCoins())).toEqual(b);
            expect(Number(reader.loadCoins())).toEqual(b);
        }
    });
    it('should read address from builder', () => {
        for (let i = 0; i < 1000; i++) {
            let a = (0, crypto_1.randomInt)(20) === 0 ? (0, testAddress_1.testAddress)(-1, 'test-1-' + i) : null;
            let b = (0, testAddress_1.testAddress)(0, 'test-2-' + i);
            let builder = (0, Builder_1.beginCell)();
            builder.storeAddress(a);
            builder.storeAddress(b);
            let bits = builder.endCell().bits;
            let reader = new BitReader_1.BitReader(bits);
            if (a) {
                expect(reader.loadMaybeAddress().toString()).toEqual(a.toString());
            }
            else {
                expect(reader.loadMaybeAddress()).toBeNull();
            }
            expect(reader.loadAddress().toString()).toEqual(b.toString());
        }
    });
    it('should read string tails from builder', () => {
        let prando = new prando_1.default('test-6');
        for (let i = 0; i < 1000; i++) {
            let a = prando.nextString(prando.nextInt(0, 1024));
            let b = prando.nextString(prando.nextInt(0, 1024));
            let builder = (0, Builder_1.beginCell)();
            builder.storeStringRefTail(a);
            builder.storeStringTail(b);
            let sc = builder.endCell().beginParse();
            expect(sc.loadStringRefTail()).toEqual(a);
            expect(sc.loadStringTail()).toEqual(b);
        }
    });
});
