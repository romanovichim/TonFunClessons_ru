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
import { beginCell } from "../boc/Builder";
import { toNano } from "../utils/convert";
import { MessageRelaxed } from "./MessageRelaxed";
import { Message } from "./Message";

export function internal(src: {
    to: Address | string,
    value: bigint | string,
    bounce?: Maybe<boolean>,
    init?: Maybe<{ code?: Maybe<Cell>, data?: Maybe<Cell> }>,
    body?: Maybe<Cell | string>
}): MessageRelaxed {

    // Resolve bounce
    let bounce = true;
    if (src.bounce !== null && src.bounce !== undefined) {
        bounce = src.bounce;
    }

    // Resolve address
    let to: Address;
    if (typeof src.to === 'string') {
        to = Address.parse(src.to);
    } else if (Address.isAddress(src.to)) {
        to = src.to;
    } else {
        throw new Error(`Invalid address ${src.to}`);
    }

    // Resolve value
    let value: bigint;
    if (typeof src.value === 'string') {
        value = toNano(src.value);
    } else {
        value = src.value;
    }

    // Resolve body
    let body: Cell = Cell.EMPTY;
    if (typeof src.body === 'string') {
        body = beginCell().storeUint(0, 32).storeStringTail(src.body).endCell();
    } else if (src.body) {
        body = src.body;
    }

    // Create message
    return {
        info: {
            type: 'internal',
            dest: to,
            value: { coins: value },
            bounce,
            ihrDisabled: true,
            bounced: false,
            ihrFee: 0n,
            forwardFee: 0n,
            createdAt: 0,
            createdLt: 0n
        },
        init: src.init ? { code: src.init.code, data: src.init.data } : undefined,
        body: body
    };
}

export function external(src: {
    to: Address | string,
    init?: Maybe<{ code?: Maybe<Cell>, data?: Maybe<Cell> }>,
    body?: Maybe<Cell>
}): Message {

    // Resolve address
    let to: Address;
    if (typeof src.to === 'string') {
        to = Address.parse(src.to);
    } else if (Address.isAddress(src.to)) {
        to = src.to;
    } else {
        throw new Error(`Invalid address ${src.to}`);
    }

    return {
        info: {
            type: 'external-in',
            dest: to,
            importFee: 0n
        },
        init: src.init ? { code: src.init.code, data: src.init.data } : undefined,
        body: src.body || Cell.EMPTY
    };
}

export function comment(src: string) {
    return beginCell()
        .storeUint(0, 32)
        .storeStringTail(src)
        .endCell();
}