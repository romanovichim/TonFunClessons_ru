"use strict";
/**
 * Copyright (c) Whales Corp.
 * All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.backoff = exports.forever = exports.delayBreakable = exports.delay = exports.exponentialBackoffDelay = void 0;
function exponentialBackoffDelay(currentFailureCount, minDelay, maxDelay, maxFailureCount) {
    let maxDelayRet = minDelay + ((maxDelay - minDelay) / maxFailureCount) * Math.max(currentFailureCount, maxFailureCount);
    return Math.round(Math.random() * maxDelayRet);
}
exports.exponentialBackoffDelay = exponentialBackoffDelay;
async function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
exports.delay = delay;
function delayBreakable(ms) {
    // We can cancel delay from outer code
    let promiseResolver = null;
    let resolver = () => {
        if (promiseResolver) {
            promiseResolver();
        }
    };
    let promise = new Promise(resolve => {
        promiseResolver = resolve;
        setTimeout(resolve, ms);
    });
    return { promise, resolver };
}
exports.delayBreakable = delayBreakable;
const promise = new Promise(() => { });
function forever() {
    return promise;
}
exports.forever = forever;
async function backoff(callback, log) {
    let currentFailureCount = 0;
    const minDelay = 500;
    const maxDelay = 15000;
    const maxFailureCount = 50;
    while (true) {
        try {
            return await callback();
        }
        catch (e) {
            if (currentFailureCount > 3) {
                if (log) {
                    console.warn(e);
                }
            }
            if (currentFailureCount < maxFailureCount) {
                currentFailureCount++;
            }
            let waitForRequest = exponentialBackoffDelay(currentFailureCount, minDelay, maxDelay, maxFailureCount);
            await delay(waitForRequest);
        }
    }
}
exports.backoff = backoff;
