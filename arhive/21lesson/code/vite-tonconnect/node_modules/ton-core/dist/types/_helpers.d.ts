/**
 * Copyright (c) Whales Corp.
 * All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Address } from "../address/Address";
import { Cell } from "../boc/Cell";
import { Maybe } from "../utils/maybe";
import { MessageRelaxed } from "./MessageRelaxed";
import { Message } from "./Message";
export declare function internal(src: {
    to: Address | string;
    value: bigint | string;
    bounce?: Maybe<boolean>;
    init?: Maybe<{
        code?: Maybe<Cell>;
        data?: Maybe<Cell>;
    }>;
    body?: Maybe<Cell | string>;
}): MessageRelaxed;
export declare function external(src: {
    to: Address | string;
    init?: Maybe<{
        code?: Maybe<Cell>;
        data?: Maybe<Cell>;
    }>;
    body?: Maybe<Cell>;
}): Message;
export declare function comment(src: string): Cell;
