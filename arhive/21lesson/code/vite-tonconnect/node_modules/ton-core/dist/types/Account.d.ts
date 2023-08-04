/**
 * Copyright (c) Whales Corp.
 * All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Address } from "../address/Address";
import { Builder } from "../boc/Builder";
import { Slice } from "../boc/Slice";
import { AccountStorage } from "./AccountStorage";
import { StorageInfo } from "./StorageInto";
export type Account = {
    addr: Address;
    storageStats: StorageInfo;
    storage: AccountStorage;
};
export declare function loadAccount(slice: Slice): Account;
export declare function storeAccount(src: Account): (builder: Builder) => void;
