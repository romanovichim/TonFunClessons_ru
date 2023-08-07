"use strict";
/**
 * Copyright (c) Whales Corp.
 * All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.TupleBuilder = void 0;
const Builder_1 = require("../boc/Builder");
const Cell_1 = require("../boc/Cell");
const Slice_1 = require("../boc/Slice");
class TupleBuilder {
    constructor() {
        this._tuple = [];
    }
    writeNumber(v) {
        if (v === null || v === undefined) {
            this._tuple.push({ type: 'null' });
        }
        else {
            this._tuple.push({ type: 'int', value: BigInt(v) });
        }
    }
    writeBoolean(v) {
        if (v === null || v === undefined) {
            this._tuple.push({ type: 'null' });
        }
        else {
            this._tuple.push({ type: 'int', value: v ? -1n : 0n });
        }
    }
    writeBuffer(v) {
        if (v === null || v === undefined) {
            this._tuple.push({ type: 'null' });
        }
        else {
            this._tuple.push({ type: 'slice', cell: (0, Builder_1.beginCell)().storeBuffer(v).endCell() });
        }
    }
    writeString(v) {
        if (v === null || v === undefined) {
            this._tuple.push({ type: 'null' });
        }
        else {
            this._tuple.push({ type: 'slice', cell: (0, Builder_1.beginCell)().storeStringTail(v).endCell() });
        }
    }
    writeCell(v) {
        if (v === null || v === undefined) {
            this._tuple.push({ type: 'null' });
        }
        else {
            if (v instanceof Cell_1.Cell) {
                this._tuple.push({ type: 'cell', cell: v });
            }
            else if (v instanceof Slice_1.Slice) {
                this._tuple.push({ type: 'cell', cell: v.asCell() });
            }
        }
    }
    writeSlice(v) {
        if (v === null || v === undefined) {
            this._tuple.push({ type: 'null' });
        }
        else {
            if (v instanceof Cell_1.Cell) {
                this._tuple.push({ type: 'slice', cell: v });
            }
            else if (v instanceof Slice_1.Slice) {
                this._tuple.push({ type: 'slice', cell: v.asCell() });
            }
        }
    }
    writeBuilder(v) {
        if (v === null || v === undefined) {
            this._tuple.push({ type: 'null' });
        }
        else {
            if (v instanceof Cell_1.Cell) {
                this._tuple.push({ type: 'builder', cell: v });
            }
            else if (v instanceof Slice_1.Slice) {
                this._tuple.push({ type: 'builder', cell: v.asCell() });
            }
        }
    }
    writeTuple(v) {
        if (v === null || v === undefined) {
            this._tuple.push({ type: 'null' });
        }
        else {
            this._tuple.push({ type: 'tuple', items: v });
        }
    }
    writeAddress(v) {
        if (v === null || v === undefined) {
            this._tuple.push({ type: 'null' });
        }
        else {
            this._tuple.push({ type: 'slice', cell: (0, Builder_1.beginCell)().storeAddress(v).endCell() });
        }
    }
    build() {
        return [...this._tuple];
    }
}
exports.TupleBuilder = TupleBuilder;
