/**
 * Copyright (c) Whales Corp.
 * All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Builder } from "../boc/Builder";
import { Slice } from "../boc/Slice";
export type AccountStatusChange = 'unchanged' | 'frozen' | 'deleted';
export declare function loadAccountStatusChange(slice: Slice): AccountStatusChange;
export declare function storeAccountStatusChange(src: AccountStatusChange): (builder: Builder) => void;
