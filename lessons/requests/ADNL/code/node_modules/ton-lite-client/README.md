## ton-lite-client

ton-lite-client is a JS library that allows you to get information from TON Blockchain through it's native ADNL protocol.

To get servers list, use official urls:
- Mainnet: https://ton.org/global.config.json
- Testnet: https://ton.org/testnet-global.config.json

Example of getting account state:
```typescript
import { LiteClient, LiteRoundRobinEngine, LiteSingleEngine, LiteEngine } from "ton-lite-client";
import { Address } from "ton-core";

function intToIP(int: number) {
    var part1 = int & 255;
    var part2 = ((int >> 8) & 255);
    var part3 = ((int >> 16) & 255);
    var part4 = ((int >> 24) & 255);

    return part4 + "." + part3 + "." + part2 + "." + part1;
}

let server = {
    "ip": 1097649206,
    "port": 29296,
    "id": {
        "@type": "pub.ed25519",
        "key": "p2tSiaeSqX978BxE5zLxuTQM06WVDErf5/15QToxMYA="
    }
}

async function main() {
    const engines: LiteEngine[] = [];
    engines.push(new LiteSingleEngine({
        host: `tcp://${intToIP(server.ip)}:${server.port}`,
        publicKey: Buffer.from(server.id.key, 'base64'),
    }));
    const engine: LiteEngine = new LiteRoundRobinEngine(engines);
    const client = new LiteClient({ engine });
    console.log('get master info')
    const master = await client.getMasterchainInfo()
    console.log('master', master)

    const address = Address.parse('kQC2sf_Hy34aMM7n9f9_V-ThHDehjH71LWBETy_JrTirPIHa');
    const accountState = await client.getAccountState(address, master.last)
    console.log('Account state:', accountState)
}

main()
```

By default, LiteClient uses cache for 4 things: blocks, blockHeaders, shards, account states at given block. All caches are LRU maps with capacity of 1000 elements. If your use case needs different caching strategy - you can bring your own map.


For example, you can cap every map at 100 000 elements:
```typescript
const client = new LiteClient({
    engine,
    cacheMap: 100000,
});
```

Or you can cache only account states (not recommended, just example):
```typescript
const client = new LiteClient({
    engine, cacheMap: (kind) => {
        if (kind === 'accounts') {
            return new Map()
        }

        return {
            get(key) { },
            set(key, value) { },
            delete(key: any) { },
            clear() { },
        }
    }
});
```

