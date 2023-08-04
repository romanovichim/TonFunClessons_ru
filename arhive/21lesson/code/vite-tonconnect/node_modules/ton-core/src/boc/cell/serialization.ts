/**
 * Copyright (c) Whales Corp. 
 * All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { BitReader } from "../BitReader";
import { BitString } from "../BitString";
import { Cell } from "../Cell";
import { topologicalSort } from "./utils/topologicalSort";
import { bitsForNumber } from "../../utils/bitsForNumber";
import { BitBuilder } from "../BitBuilder";
import { getBitsDescriptor, getRefsDescriptor } from "./descriptor";
import { bitsToPaddedBuffer } from "../utils/paddedBits";
import { crc32c } from "../../utils/crc32c";

function readCell(reader: BitReader, sizeBytes: number) {

    // D1
    const d1 = reader.loadUint(8);
    const refsCount = d1 % 8;
    const exotic = !!(d1 & 8);

    // D2
    const d2 = reader.loadUint(8);
    const dataBytesize = Math.ceil(d2 / 2);
    const paddingAdded = !!(d2 % 2);

    // Bits
    let bits = BitString.EMPTY;
    if (dataBytesize > 0) {
        if (paddingAdded) {
            bits = reader.loadPaddedBits(dataBytesize * 8);
        } else {
            bits = reader.loadBits(dataBytesize * 8);
        }
    }

    // Refs
    let refs: number[] = [];
    for (let i = 0; i < refsCount; i++) {
        refs.push(reader.loadUint(sizeBytes * 8));
    }

    // Result
    return {
        bits,
        refs,
        exotic
    };
}

function calcCellSize(cell: Cell, sizeBytes: number) {
    return 2 /* D1+D2 */ + Math.ceil(cell.bits.length / 8) + cell.refs.length * sizeBytes;
}

export function parseBoc(src: Buffer) {
    let reader = new BitReader(new BitString(src, 0, src.length * 8));
    let magic = reader.loadUint(32);
    if (magic === 0x68ff65f3) {
        let size = reader.loadUint(8);
        let offBytes = reader.loadUint(8);
        let cells = reader.loadUint(size * 8);
        let roots = reader.loadUint(size * 8); // Must be 1
        let absent = reader.loadUint(size * 8);
        let totalCellSize = reader.loadUint(offBytes * 8);
        let index = reader.loadBuffer(cells * offBytes);
        let cellData = reader.loadBuffer(totalCellSize);
        return {
            size,
            offBytes,
            cells,
            roots,
            absent,
            totalCellSize,
            index,
            cellData,
            root: [0]
        };
    } else if (magic === 0xacc3a728) {
        let size = reader.loadUint(8);
        let offBytes = reader.loadUint(8);
        let cells = reader.loadUint(size * 8);
        let roots = reader.loadUint(size * 8); // Must be 1
        let absent = reader.loadUint(size * 8);
        let totalCellSize = reader.loadUint(offBytes * 8);
        let index = reader.loadBuffer(cells * offBytes);
        let cellData = reader.loadBuffer(totalCellSize);
        let crc32 = reader.loadBuffer(4);
        if (!crc32c(src.subarray(0, src.length - 4)).equals(crc32)) {
            throw Error('Invalid CRC32C');
        }
        return {
            size,
            offBytes,
            cells,
            roots,
            absent,
            totalCellSize,
            index,
            cellData,
            root: [0]
        };
    } else if (magic === 0xb5ee9c72) {
        let hasIdx = reader.loadUint(1);
        let hasCrc32c = reader.loadUint(1);
        let hasCacheBits = reader.loadUint(1);
        let flags = reader.loadUint(2); // Must be 0
        let size = reader.loadUint(3);
        let offBytes = reader.loadUint(8);
        let cells = reader.loadUint(size * 8);
        let roots = reader.loadUint(size * 8);
        let absent = reader.loadUint(size * 8);
        let totalCellSize = reader.loadUint(offBytes * 8);
        let root: number[] = [];
        for (let i = 0; i < roots; i++) {
            root.push(reader.loadUint(size * 8));
        }
        let index: Buffer | null = null;
        if (hasIdx) {
            index = reader.loadBuffer(cells * offBytes);
        }
        let cellData = reader.loadBuffer(totalCellSize);
        if (hasCrc32c) {
            let crc32 = reader.loadBuffer(4);
            if (!crc32c(src.subarray(0, src.length - 4)).equals(crc32)) {
                throw Error('Invalid CRC32C');
            }
        }
        return {
            size,
            offBytes,
            cells,
            roots,
            absent,
            totalCellSize,
            index,
            cellData,
            root
        };
    } else {
        throw Error('Invalid magic');
    }
}

export function deserializeBoc(src: Buffer) {

    //
    // Parse BOC
    //

    let boc = parseBoc(src);
    let reader = new BitReader(new BitString(boc.cellData, 0, boc.cellData.length * 8));

    //
    // Load cells
    //

    let cells: { bits: BitString, refs: number[], exotic: boolean, result: Cell | null }[] = [];
    for (let i = 0; i < boc.cells; i++) {
        let cll = readCell(reader, boc.size);
        cells.push({ ...cll, result: null });
    }

    //
    // Build cells
    //

    for (let i = cells.length - 1; i >= 0; i--) {
        if (cells[i].result) {
            throw Error('Impossible');
        }
        let refs: Cell[] = [];
        for (let r of cells[i].refs) {
            if (!cells[r].result) {
                throw Error('Invalid BOC file');
            }
            refs.push(cells[r].result!);
        }
        cells[i].result = new Cell({ bits: cells[i].bits, refs, exotic: cells[i].exotic });
    }

    //
    // Load roots
    //

    let roots: Cell[] = [];
    for (let i = 0; i < boc.root.length; i++) {
        roots.push(cells[boc.root[i]].result!);
    }

    //
    // Return
    //

    return roots;
}

function writeCellToBuilder(cell: Cell, refs: number[], sizeBytes: number, to: BitBuilder) {
    let d1 = getRefsDescriptor(cell.refs, cell.level(), cell.type);
    let d2 = getBitsDescriptor(cell.bits);
    to.writeUint(d1, 8);
    to.writeUint(d2, 8);
    to.writeBuffer(bitsToPaddedBuffer(cell.bits));
    for (let r of refs) {
        to.writeUint(r, sizeBytes * 8);
    }
}

export function serializeBoc(root: Cell, opts: { idx: boolean, crc32: boolean }) {

    // Sort cells
    let allCells = topologicalSort(root);

    // Calculcate parameters
    let cellsNum = allCells.length;
    let has_idx = opts.idx;
    let has_crc32c = opts.crc32;
    let has_cache_bits = false;
    let flags = 0;
    let sizeBytes = Math.max(Math.ceil(bitsForNumber(cellsNum, 'uint') / 8), 1);
    let totalCellSize: number = 0;
    let index: number[] = [];
    for (let c of allCells) {
        let sz = calcCellSize(c.cell, sizeBytes);
        index.push(totalCellSize);
        totalCellSize += sz;
    }
    let offsetBytes = Math.max(Math.ceil(bitsForNumber(totalCellSize, 'uint') / 8), 1);
    let totalSize = (
        4 + // magic
        1 + // flags and s_bytes
        1 + // offset_bytes
        3 * sizeBytes + // cells_num, roots, complete
        offsetBytes + // full_size
        1 * sizeBytes + // root_idx
        (has_idx ? cellsNum * offsetBytes : 0) +
        totalCellSize +
        (has_crc32c ? 4 : 0)
    ) * 8;

    // Serialize
    let builder = new BitBuilder(totalSize);
    builder.writeUint(0xb5ee9c72, 32); // Magic
    builder.writeBit(has_idx); // Has index
    builder.writeBit(has_crc32c); // Has crc32c
    builder.writeBit(has_cache_bits); // Has cache bits
    builder.writeUint(flags, 2); // Flags
    builder.writeUint(sizeBytes, 3); // Size bytes
    builder.writeUint(offsetBytes, 8); // Offset bytes
    builder.writeUint(cellsNum, sizeBytes * 8); // Cells num
    builder.writeUint(1, sizeBytes * 8); // Roots num
    builder.writeUint(0, sizeBytes * 8); // Absent num
    builder.writeUint(totalCellSize, offsetBytes * 8); // Total cell size
    builder.writeUint(0, sizeBytes * 8); // Root id == 0
    if (has_idx) { // Index
        for (let i = 0; i < cellsNum; i++) {
            builder.writeUint(index[i], offsetBytes * 8);
        }
    }
    for (let i = 0; i < cellsNum; i++) { // Cells
        writeCellToBuilder(allCells[i].cell, allCells[i].refs, sizeBytes, builder);
    }
    if (has_crc32c) {
        let crc32 = crc32c(builder.buffer()) // builder.buffer() is fast since it doesn't allocate new memory
        builder.writeBuffer(crc32);
    }

    // Sanity Check
    let res = builder.buffer();
    if (res.length !== totalSize / 8) {
        throw Error('Internal error');
    }
    return res;
}