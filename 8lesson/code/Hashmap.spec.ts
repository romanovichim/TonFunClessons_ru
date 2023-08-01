import {
    Blockchain,
    SandboxContract,
    TreasuryContract,
} from '@ton-community/sandbox';
import { Address, Cell, beginCell, toNano } from 'ton-core';
import { Test } from '../wrappers/Test';
import '@ton-community/test-utils';
import { compile } from '@ton-community/blueprint';
import { randomAddress } from '@ton-community/test-utils';

describe('Test', () => {
    let code: Cell;

    beforeAll(async () => {
        code = await compile('Test');
    });

    let blockchain: Blockchain;
    let test: SandboxContract<Test>;
    let deployer: SandboxContract<TreasuryContract>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        blockchain.now = 500;

        deployer = await blockchain.treasury('deployer');

        test = blockchain.openContract(
            Test.createFromConfig(
                {
                    manager: deployer.address,
                },
                code
            )
        );

        const deployResult = await test.sendDeploy(
            deployer.getSender(),
            toNano('0.01')
        );

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: test.address,
            deploy: true,
        });

        await test.sendSet(deployer.getSender(), toNano('0.05'), {
            queryId: 123n,
            key: 1n,
            validUntil: 1000n,
            value: beginCell().storeUint(123, 16).endCell().asSlice(),
        });

        await test.sendSet(deployer.getSender(), toNano('0.05'), {
            queryId: 123n,
            key: 2n,
            validUntil: 2000n,
            value: beginCell().storeUint(234, 16).endCell().asSlice(),
        });

        await test.sendSet(deployer.getSender(), toNano('0.05'), {
            queryId: 123n,
            key: 3n,
            validUntil: 3000n,
            value: beginCell().storeUint(345, 16).endCell().asSlice(),
        });
    });

    it('should store and retrieve values', async () => {
        let [validUntil, value] = await test.getByKey(1n);
        expect(validUntil).toEqual(1000n);
        expect(value).toEqualSlice(
            beginCell().storeUint(123, 16).endCell().asSlice()
        );

        [validUntil, value] = await test.getByKey(2n);
        expect(validUntil).toEqual(2000n);
        expect(value).toEqualSlice(
            beginCell().storeUint(234, 16).endCell().asSlice()
        );

        [validUntil, value] = await test.getByKey(3n);
        expect(validUntil).toEqual(3000n);
        expect(value).toEqualSlice(
            beginCell().storeUint(345, 16).endCell().asSlice()
        );
    });

    it('should throw on not found key', async () => {
        await expect(test.getByKey(123n)).rejects.toThrow();
    });

    it('should clear old values', async () => {
        await test.sendClearOldValues(deployer.getSender(), toNano('0.05'), {
            queryId: 123n,
        });

        let [validUntil, value] = await test.getByKey(1n);
        expect(validUntil).toEqual(1000n);
        expect(value).toEqualSlice(
            beginCell().storeUint(123, 16).endCell().asSlice()
        );

        blockchain.now = 1001;

        await test.sendClearOldValues(deployer.getSender(), toNano('0.05'), {
            queryId: 123n,
        });

        await expect(test.getByKey(1n)).rejects.toThrow();

        [validUntil, value] = await test.getByKey(2n);
        expect(validUntil).toEqual(2000n);
        expect(value).toEqualSlice(
            beginCell().storeUint(234, 16).endCell().asSlice()
        );

        [validUntil, value] = await test.getByKey(3n);
        expect(validUntil).toEqual(3000n);
        expect(value).toEqualSlice(
            beginCell().storeUint(345, 16).endCell().asSlice()
        );

        blockchain.now = 3001;

        await test.sendClearOldValues(deployer.getSender(), toNano('0.05'), {
            queryId: 123n,
        });

        await expect(test.getByKey(2n)).rejects.toThrow();
        await expect(test.getByKey(3n)).rejects.toThrow();
    });

    it('should throw on wrong opcode', async () => {
        const result = await deployer.send({
            to: test.address,
            value: toNano('0.05'),
            body: beginCell().storeUint(123, 32).storeUint(123, 64).endCell(),
        });
        expect(result.transactions).toHaveTransaction({
            from: deployer.address,
            to: test.address,
            exitCode: 12,
        });
    });

    it('should throw on bad query', async () => {
        const result = await deployer.send({
            to: test.address,
            value: toNano('0.05'),
            body: beginCell()
                .storeUint(2, 32)
                .storeUint(123, 64)
                .storeStringTail('This string should not be here!')
                .endCell(),
        });
        expect(result.transactions).toHaveTransaction({
            from: deployer.address,
            to: test.address,
            success: false,
        });
    });
});
