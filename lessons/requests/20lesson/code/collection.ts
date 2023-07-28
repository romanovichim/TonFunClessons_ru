// Ton Center HTTP API

import { TonClient } from 'ton';
import { Address } from 'ton-core';


export const toncenter = new TonClient({
    endpoint: 'https://toncenter.com/api/v2/jsonRPC',
});


export const nftCollectionAddress = Address.parse('UQApA79Qt8VEOeTfHu9yKRPdJ_dADvspqh5BqV87PgWD998f');


(async () => {
    let { stack } = await toncenter.callGetMethod(
        nftCollectionAddress, 
        'get_collection_data'
    );
    let nextItemIndex = stack.readBigNumber();
    let contentRoot = stack.readCell();
    let owner = stack.readAddress();

    console.log('nextItemIndex', nextItemIndex.toString());
    console.log('contentRoot', contentRoot);
    console.log('owner', owner);
})().catch(e => console.error(e));



