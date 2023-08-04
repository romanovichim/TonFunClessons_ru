/**
 * Copyright (c) Whales Corp.
 * All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Cell } from "../boc/Cell";
export type Tuple = {
    type: 'tuple';
    items: TupleItem[];
};
export type TupleItemNull = {
    type: 'null';
};
export type TupleItemInt = {
    type: 'int';
    value: bigint;
};
export type TupleItemNaN = {
    type: 'nan';
};
export type TupleItemCell = {
    type: 'cell';
    cell: Cell;
};
export type TupleItemSlice = {
    type: 'slice';
    cell: Cell;
};
export type TupleItemBuilder = {
    type: 'builder';
    cell: Cell;
};
export type TupleItem = TupleItemNull | TupleItemInt | TupleItemNaN | TupleItemCell | TupleItemSlice | TupleItemBuilder | Tuple;
export declare function serializeTuple(src: TupleItem[]): Cell;
export declare function parseTuple(src: Cell): TupleItem[];
