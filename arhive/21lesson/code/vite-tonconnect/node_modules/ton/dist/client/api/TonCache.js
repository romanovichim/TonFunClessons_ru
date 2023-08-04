"use strict";
/**
 * Copyright (c) Whales Corp.
 * All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemoryCache = void 0;
class InMemoryCache {
    constructor() {
        this.cache = new Map();
        this.set = async (namespace, key, value) => {
            if (value !== null) {
                this.cache.set(namespace + '$$' + key, value);
            }
            else {
                this.cache.delete(namespace + '$$' + key);
            }
        };
        this.get = async (namespace, key) => {
            let res = this.cache.get(namespace + '$$' + key);
            if (res !== undefined) {
                return res;
            }
            else {
                return null;
            }
        };
    }
}
exports.InMemoryCache = InMemoryCache;
