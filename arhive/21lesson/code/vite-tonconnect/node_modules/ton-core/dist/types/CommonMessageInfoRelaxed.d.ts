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
export type CommonMessageInfoRelaxed = CommonMessageInfoRelaxedInternal | CommonMessageInfoRelaxedExternalOut;
export type CommonMessageInfoRelaxedInternal = {
    type: 'internal';
    ihrDisabled: boolean;
    bounce: boolean;
    bounced: boolean;
    src?: Maybe<Address>;
    dest: Address;
    value: CurrencyCollection;
    ihrFee: bigint;
    forwardFee: bigint;
    createdLt: bigint;
    createdAt: number;
};
export type CommonMessageInfoRelaxedExternalOut = {
    type: 'external-out';
    src?: Maybe<Address>;
    dest?: Maybe<ExternalAddress>;
    createdLt: bigint;
    createdAt: number;
};
export declare function loadCommonMessageInfoRelaxed(slice: Slice): CommonMessageInfoRelaxed;
export declare function storeCommonMessageInfoRelaxed(source: CommonMessageInfoRelaxed): (builder: Builder) => void;
