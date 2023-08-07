/**
 * Copyright (c) Whales Corp.
 * All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Address } from "../address/Address";
import { ExternalAddress } from "../address/ExternalAddress";
import { Builder } from "../boc/Builder";
import { Slice } from "../boc/Slice";
import { Maybe } from "../utils/maybe";
import { CurrencyCollection } from "./CurrencyCollection";
export type CommonMessageInfo = CommonMessageInfoInternal | CommonMessageInfoExternalOut | CommonMessageInfoExternalIn;
export type CommonMessageInfoInternal = {
    type: 'internal';
    ihrDisabled: boolean;
    bounce: boolean;
    bounced: boolean;
    src: Address;
    dest: Address;
    value: CurrencyCollection;
    ihrFee: bigint;
    forwardFee: bigint;
    createdLt: bigint;
    createdAt: number;
};
export type CommonMessageInfoExternalIn = {
    type: 'external-in';
    src?: Maybe<ExternalAddress>;
    dest: Address;
    importFee: bigint;
};
export type CommonMessageInfoExternalOut = {
    type: 'external-out';
    src: Address;
    dest?: Maybe<ExternalAddress>;
    createdLt: bigint;
    createdAt: number;
};
export declare function loadCommonMessageInfo(slice: Slice): CommonMessageInfo;
export declare function storeCommonMessageInfo(source: CommonMessageInfo): (builder: Builder) => void;
