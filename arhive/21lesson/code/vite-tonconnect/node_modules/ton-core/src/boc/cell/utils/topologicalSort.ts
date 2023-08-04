/**
 * Copyright (c) Whales Corp. 
 * All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Cell } from "../../Cell";

export function topologicalSort(src: Cell) {
    let pending: Cell[] = [src];
    let allCells = new Map<string, { cell: Cell, refs: string[] }>();
    let notPermCells = new Set<string>();
    let sorted: string[] = [];
    while (pending.length > 0) {
        const cells = [...pending];
        pending = [];
        for (let cell of cells) {
            const hash = cell.hash().toString('hex');
            if (allCells.has(hash)) {
                continue;
            }
            notPermCells.add(hash);
            allCells.set(hash, { cell: cell, refs: cell.refs.map((v) => v.hash().toString('hex')) });
            for (let r of cell.refs) {
                pending.push(r);
            }
        }
    }
    let tempMark = new Set<string>();
    function visit(hash: string) {
        if (!notPermCells.has(hash)) {
            return;
        }
        if (tempMark.has(hash)) {
            throw Error('Not a DAG');
        }
        tempMark.add(hash);
        for (let c of allCells.get(hash)!.refs) {
            visit(c);
        }
        sorted.unshift(hash);
        tempMark.delete(hash);
        notPermCells.delete(hash);
    }
    while (notPermCells.size > 0) {
        const id = Array.from(notPermCells)[0];
        visit(id);
    }

    let indexes = new Map<string, number>();
    for (let i = 0; i < sorted.length; i++) {
        indexes.set(sorted[i], i);
    }

    let result: { cell: Cell, refs: number[] }[] = [];
    for (let ent of sorted) {
        const rrr = allCells.get(ent)!;
        result.push({ cell: rrr.cell, refs: rrr.refs.map((v) => indexes.get(v)!) });
    }

    return result;
}