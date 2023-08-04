/**
 * Copyright (c) Whales Corp.
 * All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
export declare function exponentialBackoffDelay(currentFailureCount: number, minDelay: number, maxDelay: number, maxFailureCount: number): number;
export declare function delay(ms: number): Promise<unknown>;
export declare function delayBreakable(ms: number): {
    promise: Promise<unknown>;
    resolver: () => void;
};
export declare function forever(): Promise<unknown>;
export declare function backoff<T>(callback: () => Promise<T>, log: boolean): Promise<T>;
