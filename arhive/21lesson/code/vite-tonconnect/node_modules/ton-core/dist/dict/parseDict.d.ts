/**
 * Copyright (c) Whales Corp.
 * All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Slice } from "../boc/Slice";
export declare function parseDict<V>(sc: Slice | null, keySize: number, extractor: (src: Slice) => V): Map<bigint, V>;
