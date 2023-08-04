/**
 * Copyright (c) Whales Corp.
 * All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Builder } from "../boc/Builder";
import { Slice } from "../boc/Slice";
export type AccountStatus = 'uninitialized' | 'frozen' | 'active' | 'non-existing';
/**
 * Load account state from slice
 * @param slice
 * @returns AccountState
 */
export declare function loadAccountStatus(slice: Slice): AccountStatus;
/**
 * Store account state to builder
 * @param src account state
 * @param builder buidler
 */
export declare function storeAccountStatus(src: AccountStatus): (builder: Builder) => Builder;
