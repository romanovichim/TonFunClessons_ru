import {
    Blockchain,
    SandboxContract,
    TreasuryContract,
} from '@ton-community/sandbox';
import { Address, Cell, beginCell, toNano } from 'ton-core';
import { Counter } from '../wrappers/Counter';
import '@ton-community/test-utils';
import { compile } from '@ton-community/blueprint';
import { randomAddress } from '@ton-community/test-utils';

describe('Counter', () => {
    let code: Cell;

    beforeAll(async () => {
        code = await compile('Counter');
    });

    let blockchain: Blockchain;
    let counter: SandboxContract<Counter>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        let deployer = await blockchain.treasury('deployer');

        counter = blockchain.openContract(
            Counter.createFromConfig(
                {
                    manager: deployer.address,
                },
                code
            )
        );

        const deployResult = await counter.sendDeploy(
            deployer.getSender(),
            toNano('0.01')
        );

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: counter.address,
            deploy: true,
        });
    });

    it('should deploy', async () => {});

    it('should update the number', async () => {
        const caller = await blockchain.treasury('caller');

        await counter.sendNumber(caller.getSender(), toNano('0.01'), 10n);
        expect(await counter.getTotal()).toEqual(10n);

        await counter.sendNumber(caller.getSender(), toNano('0.01'), 5n);
        expect(await counter.getTotal()).toEqual(15n);

        await counter.sendNumber(caller.getSender(), toNano('0.01'), 1000n);
        expect(await counter.getTotal()).toEqual(1015n);
    });

    it('should throw error when number is not 32 bits', async () => {
        const caller = await blockchain.treasury('caller');

        const result = await counter.sendDeploy(
            caller.getSender(),
            toNano('0.01')
        );
        expect(result.transactions).toHaveTransaction({
            from: caller.address,
            to: counter.address,
            success: false,
            exitCode: 35,
        });
    });
});
