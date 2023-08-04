/**
 * Copyright (c) Whales Corp.
 * All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
/// <reference types="node" />
import { Cell } from "../boc/Cell";
export declare function safeSign(cell: Cell, secretKey: Buffer, seed?: string): Buffer;
export declare function safeSignVerify(cell: Cell, signature: Buffer, publicKey: Buffer, seed?: string): boolean;
