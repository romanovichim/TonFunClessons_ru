import {
    Address,
    beginCell,
    Cell,
    Contract,
    contractAddress,
    ContractProvider,
    Sender,
    SendMode,
    Slice,
} from 'ton-core';
import { TupleItemSlice } from 'ton-core/dist/tuple/tuple';

export type HashmapConfig = {};

export function hashmapConfigToCell(config: HashmapConfig): Cell {
    return beginCell().endCell();
}

export class Hashmap implements Contract {
    constructor(readonly address: Address, readonly init?: { code: Cell; data: Cell }) {}

    static createFromAddress(address: Address) {
        return new Hashmap(address);
    }

    static createFromConfig(config: HashmapConfig, code: Cell, workchain = 0) {
        const data = hashmapConfigToCell(config);
        const init = { code, data };
        return new Hashmap(contractAddress(workchain, init), init);
    }

    async sendDeploy(provider: ContractProvider, via: Sender, value: bigint) {
        await provider.internal(via, {
            value,
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: beginCell().endCell(),
        });
    }

    async sendSet(
        provider: ContractProvider,
        via: Sender,
        value: bigint,
        opts: {
            queryId: bigint;
            key: bigint;
            value: Slice;
            validUntil: bigint;
        }
    ) {
        await provider.internal(via, {
            value,
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: beginCell()
                .storeUint(1, 32)
                .storeUint(opts.queryId, 64)
                .storeUint(opts.key, 256)
                .storeUint(opts.validUntil, 64)
                .storeSlice(opts.value)
                .endCell(),
        });
    }

    async sendClearOldValues(
        provider: ContractProvider,
        via: Sender,
        value: bigint,
        opts: {
            queryId: bigint;
        }
    ) {
        await provider.internal(via, {
            value,
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: beginCell().storeUint(2, 32).storeUint(opts.queryId, 64).endCell(),
        });
    }

    async getByKey(provider: ContractProvider, key: bigint): Promise<[bigint, Slice]> {
        const result = (await provider.get('get_key', [{ type: 'int', value: key }])).stack;
        return [result.readBigNumber(), (result.peek() as TupleItemSlice).cell.asSlice()];
    }
}
