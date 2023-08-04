import { toNano } from 'ton-core';
import { Counter } from '../wrappers/Counter';
import { compile, NetworkProvider } from '@ton-community/blueprint';

export async function run(provider: NetworkProvider) {
    const counter = provider.open(
        Counter.createFromConfig({}, await compile('Counter'))
    );

    console.log('Total:', await counter.getTotal());
}
