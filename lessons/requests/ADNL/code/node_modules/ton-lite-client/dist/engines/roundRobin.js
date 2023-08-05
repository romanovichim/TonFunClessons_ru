"use strict";
/**
 * Copyright
 *  (c) 2022 Whales Corp.
 *  (c) 2023 TrueCarry <truecarry@gmail.com>
 * All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _LiteRoundRobinEngine_closed, _LiteRoundRobinEngine_counter;
Object.defineProperty(exports, "__esModule", { value: true });
exports.LiteRoundRobinEngine = void 0;
const events_1 = __importDefault(require("events"));
class LiteRoundRobinEngine extends events_1.default {
    constructor(engines) {
        super();
        this.allEngines = [];
        this.readyEngines = [];
        _LiteRoundRobinEngine_closed.set(this, false);
        _LiteRoundRobinEngine_counter.set(this, 0);
        for (const engine of engines) {
            this.addSingleEngine(engine);
        }
    }
    addSingleEngine(engine) {
        const existing = this.allEngines.find(e => e === engine);
        if (existing) {
            throw new Error('Engine already exists');
        }
        this.allEngines.push(engine);
        engine.on('ready', () => {
            this.readyEngines.push(engine);
        });
        engine.on('close', () => {
            this.readyEngines = this.readyEngines.filter(e => e !== engine);
        });
        engine.on('error', () => {
            this.readyEngines = this.readyEngines.filter(e => e !== engine);
        });
        if (engine.isReady()) {
            this.readyEngines.push(engine);
        }
    }
    async query(f, req, args) {
        var _a, _b;
        if (__classPrivateFieldGet(this, _LiteRoundRobinEngine_closed, "f")) {
            throw new Error('Engine is closed');
        }
        let attempts = 0;
        let id = ((__classPrivateFieldSet(this, _LiteRoundRobinEngine_counter, (_b = __classPrivateFieldGet(this, _LiteRoundRobinEngine_counter, "f"), _a = _b++, _b), "f"), _a) % this.readyEngines.length) || 0;
        let errorsCount = 0;
        while (true) {
            if (!this.readyEngines[id]?.isReady()) {
                id = ((id + 1) % this.readyEngines.length) || 0;
                attempts++;
                if (attempts >= this.readyEngines.length) {
                    await delay(100);
                }
                if (attempts > 200) {
                    throw new Error('No engines are available');
                }
                continue;
            }
            try {
                const res = await this.readyEngines[id].query(f, req, args);
                return res;
            }
            catch (e) {
                id = ((id + 1) % this.readyEngines.length) || 0;
                if (e instanceof Error && e.message === 'Timeout') {
                    continue;
                }
                errorsCount++;
                if (errorsCount > 20) {
                    throw e;
                }
                await delay(100);
            }
        }
    }
    close() {
        for (let q of this.allEngines) {
            q.close();
        }
        __classPrivateFieldSet(this, _LiteRoundRobinEngine_closed, true, "f");
    }
    isClosed() {
        return __classPrivateFieldGet(this, _LiteRoundRobinEngine_closed, "f");
    }
    isReady() {
        return !__classPrivateFieldGet(this, _LiteRoundRobinEngine_closed, "f");
    }
}
exports.LiteRoundRobinEngine = LiteRoundRobinEngine;
_LiteRoundRobinEngine_closed = new WeakMap(), _LiteRoundRobinEngine_counter = new WeakMap();
function delay(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}
