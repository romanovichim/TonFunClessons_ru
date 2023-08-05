/**
 * Copyright
 *  (c) 2022 Whales Corp.
 *  (c) 2023 TrueCarry <truecarry@gmail.com>
 * All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
/// <reference types="node" />
/// <reference types="node" />
import { TLFunction } from "ton-tl";
import { LiteEngine } from "./engine";
import EventEmitter from "events";
export declare class LiteSingleEngine extends EventEmitter implements LiteEngine {
    #private;
    readonly host: string;
    readonly publicKey: Buffer;
    constructor(args: {
        host: string;
        publicKey: Buffer;
        client?: 'tcp' | 'ws';
        reconnectTimeout?: number;
    });
    isClosed(): boolean;
    isReady(): boolean;
    query<REQ, RES>(f: TLFunction<REQ, RES>, req: REQ, queryArgs?: {
        timeout?: number;
        awaitSeqno?: number;
    }): Promise<RES>;
    close(): void;
    private connect;
    private onConencted;
    private onReady;
    private onData;
    private onClosed;
}
