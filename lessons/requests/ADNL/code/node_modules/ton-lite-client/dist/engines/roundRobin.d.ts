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
import EventEmitter from "events";
import { TLFunction } from "ton-tl";
import { LiteEngine } from "./engine";
export declare class LiteRoundRobinEngine extends EventEmitter implements LiteEngine {
    #private;
    private allEngines;
    private readyEngines;
    constructor(engines: LiteEngine[]);
    addSingleEngine(engine: LiteEngine): void;
    query<REQ, RES>(f: TLFunction<REQ, RES>, req: REQ, args?: {
        timeout?: number;
        awaitSeqno?: number;
    }): Promise<RES>;
    close(): void;
    isClosed(): boolean;
    isReady(): boolean;
}
