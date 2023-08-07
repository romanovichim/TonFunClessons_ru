/**
 * Copyright (c) Whales Corp.
 * All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Builder } from "../Builder";
import { Cell } from "../Cell";
import { Slice } from "../Slice";
export declare function readString(slice: Slice): string;
export declare function stringToCell(src: string): Cell;
export declare function writeString(src: string, builder: Builder): void;
