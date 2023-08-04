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
const ExternalAddress_1 = require("../address/ExternalAddress");
const testAddress_1 = require("../utils/testAddress");
const BitBuilder_1 = require("./BitBuilder");
const BitReader_1 = require("./BitReader");
describe('BitReader', () => {
    it('should read uints from builder', () => {
        let prando = new prando_1.default('test-1');
        for (let i = 0; i < 1000; i++) {
            let a = prando.nextInt(0, 281474976710655);
            let b = prando.nextInt(0, 281474976710655);
            let builder = new BitBuilder_1.BitBuilder();
            builder.writeUint(a, 48);
            builder.writeUint(b, 48);
            let bits = builder.build();
            {
                let reader = new BitReader_1.BitReader(bits);
                expect(reader.preloadUint(48)).toEqual(a);
                expect(reader.loadUint(48)).toEqual(a);
                expect(reader.preloadUint(48)).toEqual(b);
                expect(reader.loadUint(48)).toEqual(b);
            }
            {
                let reader = new BitReader_1.BitReader(bits);
                expect(Number(reader.preloadUintBig(48))).toEqual(a);
                expect(Number(reader.loadUintBig(48))).toEqual(a);
                expect(Number(reader.preloadUintBig(48))).toEqual(b);
                expect(Number(reader.loadUintBig(48))).toEqual(b);
            }
        }
    });
    it('should read ints from builder', () => {
        let prando = new prando_1.default('test-2');
        for (let i = 0; i < 1000; i++) {
            let a = prando.nextInt(-281474976710655, 281474976710655);
            let b = prando.nextInt(-281474976710655, 281474976710655);
            let builder = new BitBuilder_1.BitBuilder();
            builder.writeInt(a, 49);
            builder.writeInt(b, 49);
            let bits = builder.build();
            {
                let reader = new BitReader_1.BitReader(bits);
                expect(reader.preloadInt(49)).toEqual(a);
                expect(reader.loadInt(49)).toEqual(a);
                expect(reader.preloadInt(49)).toEqual(b);
                expect(reader.loadInt(49)).toEqual(b);
            }
            {
                let reader = new BitReader_1.BitReader(bits);
                expect(Number(reader.preloadIntBig(49))).toEqual(a);
                expect(Number(reader.loadIntBig(49))).toEqual(a);
                expect(Number(reader.preloadIntBig(49))).toEqual(b);
                expect(Number(reader.loadIntBig(49))).toEqual(b);
            }
        }
    });
    it('should read var uints from builder', () => {
        let prando = new prando_1.default('test-3');
        for (let i = 0; i < 1000; i++) {
            let sizeBits = prando.nextInt(4, 8);
            let a = prando.nextInt(0, 281474976710655);
            let b = prando.nextInt(0, 281474976710655);
            let builder = new BitBuilder_1.BitBuilder();
            builder.writeVarUint(a, sizeBits);
            builder.writeVarUint(b, sizeBits);
            let bits = builder.build();
            {
                let reader = new BitReader_1.BitReader(bits);
                expect(reader.preloadVarUint(sizeBits)).toEqual(a);
                expect(reader.loadVarUint(sizeBits)).toEqual(a);
                expect(reader.preloadVarUint(sizeBits)).toEqual(b);
                expect(reader.loadVarUint(sizeBits)).toEqual(b);
            }
            {
                let reader = new BitReader_1.BitReader(bits);
                expect(Number(reader.preloadVarUintBig(sizeBits))).toEqual(a);
                expect(Number(reader.loadVarUintBig(sizeBits))).toEqual(a);
                expect(Number(reader.preloadVarUintBig(sizeBits))).toEqual(b);
                expect(Number(reader.loadVarUintBig(sizeBits))).toEqual(b);
            }
        }
    });
    it('should read var ints from builder', () => {
        let prando = new prando_1.default('test-4');
        for (let i = 0; i < 1000; i++) {
            let sizeBits = prando.nextInt(4, 8);
            let a = prando.nextInt(-281474976710655, 281474976710655);
            let b = prando.nextInt(-281474976710655, 281474976710655);
            let builder = new BitBuilder_1.BitBuilder();
            builder.writeVarInt(a, sizeBits);
            builder.writeVarInt(b, sizeBits);
            let bits = builder.build();
            {
                let reader = new BitReader_1.BitReader(bits);
                expect(reader.preloadVarInt(sizeBits)).toEqual(a);
                expect(reader.loadVarInt(sizeBits)).toEqual(a);
                expect(reader.preloadVarInt(sizeBits)).toEqual(b);
                expect(reader.loadVarInt(sizeBits)).toEqual(b);
            }
            {
                let reader = new BitReader_1.BitReader(bits);
                expect(Number(reader.preloadVarIntBig(sizeBits))).toEqual(a);
                expect(Number(reader.loadVarIntBig(sizeBits))).toEqual(a);
                expect(Number(reader.preloadVarIntBig(sizeBits))).toEqual(b);
                expect(Number(reader.loadVarIntBig(sizeBits))).toEqual(b);
            }
        }
    });
    it('should read coins from builder', () => {
        let prando = new prando_1.default('test-5');
        for (let i = 0; i < 1000; i++) {
            let a = prando.nextInt(0, 281474976710655);
            let b = prando.nextInt(0, 281474976710655);
            let builder = new BitBuilder_1.BitBuilder();
            builder.writeCoins(a);
            builder.writeCoins(b);
            let bits = builder.build();
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
            let builder = new BitBuilder_1.BitBuilder();
            builder.writeAddress(a);
            builder.writeAddress(b);
            let bits = builder.build();
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
    it('should read external address from builder', () => {
        for (let i = 0; i < 1000; i++) {
            let a = (0, crypto_1.randomInt)(20) === 0 ? new ExternalAddress_1.ExternalAddress(BigInt((0, crypto_1.randomInt)(10000000000)), 48) : null;
            let b = new ExternalAddress_1.ExternalAddress(BigInt((0, crypto_1.randomInt)(10000000000)), 48);
            let builder = new BitBuilder_1.BitBuilder();
            builder.writeAddress(a);
            builder.writeAddress(b);
            let bits = builder.build();
            let reader = new BitReader_1.BitReader(bits);
            if (a) {
                expect(reader.loadMaybeExternalAddress().toString()).toEqual(a.toString());
            }
            else {
                expect(reader.loadMaybeExternalAddress()).toBeNull();
            }
            expect(reader.loadExternalAddress().toString()).toEqual(b.toString());
        }
    });
});
