# TON crypto primitives

[![Version npm](https://img.shields.io/npm/v/ton-crypto-primitives.svg?logo=npm)](https://www.npmjs.com/package/ton-crypto-primitives)

Cross-platform crypto primitives for building apps for TON blockchain. For internal imlementation of `ton-crypto`.

## Features

- 🦺 Crypto primitives: SHA-256, SHA-512, PBKDF2-SHA-256, HMAC-SHA-512
- 🚀 Promise-based API
- 🏎 Built on top of Buffer (polifil required in browsers)
- 🍰 No reimplemented crypto

## Install

```bash
yarn add ton-crypto-primitives buffer
```

#### Browser polifil

```js
// Add before using library
require("buffer");
```

## React Native
To make it work on react native `expo-random` module is required:
`
yarn install expo-random
`

# License

MIT
