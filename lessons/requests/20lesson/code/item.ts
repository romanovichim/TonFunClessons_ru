// Ton Center HTTP API

import { TonClient } from 'ton';
import { Address } from 'ton-core';
import { TupleBuilder } from 'ton';

export const toncenter = new TonClient({
    endpoint: 'https://toncenter.com/api/v2/jsonRPC',
});

export const nftCollectionAddress = Address.parse('EQDvRFMYLdxmvY3Tk-cfWMLqDnXF_EclO2Fp4wwj33WhlNFT');

(async () => {
    let args = new TupleBuilder();
    args.writeNumber(0);
    
    let { stack } = await toncenter.callGetMethod(
        nftCollectionAddress, 
        'get_nft_address_by_index',
        args.build(),
    );
    let nftAddress = stack.readAddress();

    console.log('nftAddress', nftAddress.toString());
})().catch(e => console.error(e));

