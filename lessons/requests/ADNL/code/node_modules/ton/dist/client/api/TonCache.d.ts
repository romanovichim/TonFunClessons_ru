/**
 * Copyright (c) Whales Corp.
 * All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
export interface TonCache {
    set(namespace: string, key: string, value: string | null): Promise<void>;
    get(namespace: string, key: string): Promise<string | null>;
}
export declare class InMemoryCache implements TonCache {
    private cache;
    set: (namespace: string, key: string, value: string | null) => Promise<void>;
    get: (namespace: string, key: string) => Promise<string | null>;
}
