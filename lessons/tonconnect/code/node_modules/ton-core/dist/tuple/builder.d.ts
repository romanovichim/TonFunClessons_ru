/**
 * Copyright (c) Whales Corp.
 * All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
/// <reference types="node" />
import { Address } from "../address/Address";
import { Cell } from "../boc/Cell";
import { Slice } from "../boc/Slice";
import { Maybe } from "../utils/maybe";
import { TupleItem } from "./tuple";
export declare class TupleBuilder {
    private _tuple;
    writeNumber(v?: Maybe<bigint | number>): void;
    writeBoolean(v?: Maybe<boolean>): void;
    writeBuffer(v?: Maybe<Buffer | null | undefined>): void;
    writeString(v?: Maybe<string>): void;
    writeCell(v?: Maybe<Cell | Slice>): void;
    writeSlice(v?: Maybe<Cell | Slice>): void;
    writeBuilder(v?: Maybe<Cell | Slice>): void;
    writeTuple(v?: Maybe<TupleItem[]>): void;
    writeAddress(v?: Maybe<Address>): void;
    build(): TupleItem[];
}
