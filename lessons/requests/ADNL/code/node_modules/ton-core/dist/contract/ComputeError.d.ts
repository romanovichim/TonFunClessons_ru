/**
 * Copyright (c) Whales Corp.
 * All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Maybe } from "../utils/maybe";
export declare class ComputeError extends Error {
    exitCode: number;
    debugLogs: string | null;
    logs: string | null;
    constructor(message: string, exitCode: number, opts?: {
        debugLogs?: Maybe<string>;
        logs?: Maybe<string>;
    });
}
