/**
 * Copyright (c) Whales Corp.
 * All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
export declare class LevelMask {
    private _mask;
    private _hashIndex;
    private _hashCount;
    constructor(mask?: number);
    get value(): number;
    get level(): number;
    get hashIndex(): number;
    get hashCount(): number;
    apply(level: number): LevelMask;
    isSignificant(level: number): boolean;
}
