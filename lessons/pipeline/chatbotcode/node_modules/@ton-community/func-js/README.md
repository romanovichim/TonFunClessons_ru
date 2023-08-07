# TON FunC compiler

[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](https://makeapullrequest.com)
[![Version npm](https://img.shields.io/npm/v/@ton-community/func-js.svg?logo=npm)](https://www.npmjs.com/package/@ton-community/func-js)

Cross-platform bindings and CLI for TON FunC compiler.

## Features

- 🚀 No need to compile of download FunC binaries
- 📦 Works both in Node.js & WEB (WASM support is required)
- ⚙️ Compiles straight to BOC with code Cell
- ⚙️ Assembly is returned for debugging purposes
- 📁 Does not depend on filesystem

## How it works

Internally this package uses both FunC compiler and Fift interpreter combined to single lib compiled to WASM.

Simple schema:
```
(your code) -> WASM(FunC -> Fift -> BOC)
```

Sources for the internal lib could be found [here](https://github.com/ton-blockchain/ton/tree/testnet/crypto/funcfiftlib).

## Install

```bash
yarn add @ton-community/func-js
```

or 

```bash
npm i @ton-community/func-js
```

## CLI
Usage: `npx func-js ./stdlib.fc ./wallet.fc --boc ./output.boc`

See more output options by running `npx func-js -h`

## Usage example

```typescript
import {compileFunc, compilerVersion} from '@ton-community/func-js';
import {Cell} from 'ton';

async function main() {
    // You can get compiler version 
    let version = await compilerVersion();
    
    let result = await compileFunc({
        // Targets of your project
        targets: ['main.fc'],
        // Sources
        sources: {
            "stdlib.fc": "<stdlibCode>",
            "main.fc": "<contractCode>",
            // The rest of the files which are included in main.fc if any
        }
    });

    if (result.status === 'error') {
        console.error(result.message)
        return;
    }

    // result.codeBoc contains base64 encoded BOC with code cell 
    let codeCell = Cell.fromBoc(Buffer.from(result.codeBoc, "base64"))[0];
    
    // result.fiftCode contains assembly version of your code (for debug purposes)
    console.log(result.fiftCode)
}
```

Instead of a source map, you can also use a source array, like so:
```typescript
let result = await compileFunc({
    // Sources
    sources: [
        {
            filename: "stdlib.fc",
            content: "<stdlibCode>",
        },
        {
            filename: "main.fc",
            content: "<contractCode>",
        },
        // The rest of the files which are included in main.fc if any
    ]
});
```
Notice that passing a sources *array* makes `targets` optional (if not passed, `targets` will be set to `filename`s of `sources` in the order they were given).

You can also pass a resolver (a function of type `(path: string) => string`) into `sources` instead of a source map object or array, for example if `main.fc` and all contracts used by it (such as `stdlib.fc`) are located in the same directory as the compiling .ts/.js file, you can use the following:
```typescript
import { readFileSync } from "fs";
import { compileFunc } from "@ton-community/func-js";

let result = await compileFunc({
    // Targets of your project
    targets: ['main.fc'],
    // Sources
    sources: (path) => readFileSync(__dirname + '/' + path).toString()
});
```
And the resolver will be called for each required source file (including the targets) using the same name as in the `#include` statement. Note however that the resolver must be synchronous and must return a string; if you need the resolver to get files from the network, you can repeatedly run the compiler with the known sources, check if the compilation failed, download the required sources and rerun the compiler until compilation succeeds.

Note that all FunC source files contents used in your project should be passed to `sources` (if it is a source map or array) or be resolvable by it (if it is a resolver), including:
- targets
- stdlib.fc (if you use it)
- all files included in targets

## License

This package is released under the [MIT License](LICENSE).
