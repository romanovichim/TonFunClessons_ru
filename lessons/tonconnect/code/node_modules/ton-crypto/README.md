# TON crypto

[![Version npm](https://img.shields.io/npm/v/ton-crypto.svg?logo=npm)](https://www.npmjs.com/package/ton-crypto)

Cross-platform crypto primitives for building apps for TON blockchain. Uses native crypto available in NodeJS or in browser.

## Features

- 🦺 All required crypto for TON and apps
- 💪 Works everywhere: Browser, NodeJS and React Native
- 🚀 Promise-based API
- 🏎 Built on top of Buffer (polifil required in browsers)
- 🍰 No reimplemented crypto

## Imlemented

- SHA-256
- SHA-512
- HMAC-SHA-512
- PBKDF2-SHA-512
- TON Mnemonics
- NaCL sign/verify for signing (used by TON blockchain)
- NaCL sealBox/openBox for symmetric encryption
- SLIP-10 Ed25519 HD Keys (for hierarchical keys)

## Install

```bash
yarn add ton-crypto buffer
```

#### Browser polifil

```js
// Add before using library
require("buffer");
```

## React Native
To make it work on react native `expo-random` native module is required:
`
expo install expo-random
`

## Secure random
```js
import { getSecureRandomBytes, getSecureRandomWords, getSecureRandomNumber, newSecureWords, newSecurePassphrase } from 'ton-crypto';
const randomBytes: Buffer = await getSecureRandomBytes(32); // 32 random bytes
const randomWords: Uint16Array = await getSecureRandomBytes(32); // 64 random bytes packaed into words
const randomNumber: number = await getSecureRandomNumber(0, 10); // Random number from 0 (inclusive) to 10 (exclusive)
const secureWords: string[] = await newSecureWords(12); // Random 12 words from BIP-13 wordlist
const securePassptrase: string = await newSecurePassphrase(10); // Random 10 words that connected by dashes to make it look like password
```

## SHA-256 and SHA-512
All methods accept strings or Buffers as arguments.

```js
import { sha256, sha512, pbkdf2_sha512, hmac_sha512, sha256_sync, sha512_sync } from 'ton-crypto';

// Async methods
const hash1: Buffer = await sha256('hello-world');
const hash2: Buffer = await sha512(Buffer.from('hello-world', 'utf-8'));

// Sync methods
const hash1Sync: Buffer = await sha256_sync('hello-world');
const hash2Sync: Buffer = await sha512_sync('hello-world');
```

## HMAC-SHA-512
```js
const hmac: Buffer = await hmac_sha512('hmac-key', 'data');
```

## PBKDF2-SHA-512
```js
const key: Buffer = await pbkdf2_sha512('password', 'salt', 10000, 64);
```

## TON mnemonics
TON uses BIP-39 styled english mnemonics with custom key deriviation and built-in checksums.

```js
import { mnemonicNew, mnemonicValidate, mnemonicToPrivateKey, mnemonicToWalletKey, mnemonicToSeed, mnemonicWordList, KeyPair, mnemonicToHDSeed } from 'ton-crypto';
const password: string | null | undefined = null; // Optional password
const mnemonics: string[] = await mnemonicNew(24, password); // Generate new menemonics
const mnemonicsValid: boolean = await mnemonicValidate(mnemonics, password); // Validate mnemonics
const keypair1: KeyPair = await mnemonicToPrivateKey(mnemonics, password); // Generates KeyPair from mnemonics
const keypair2: KeyPair = await mnemonicToWalletKey(mnemonics, password); // Generates KeyPair from mnemonics (results are SEEMS TO BE same as above)
const mnemonicsSeed: Buffer = await mnemonicToSeed(mnemonics, 'Seed text', password); // Generates 64 bytes of seed from mnemonics and seed text.
const mnemonicHDSeed: Buffer = await mnemonicToHDSeed(mnemonics, password); // Generates 64 bytes of seed for HD Keys
const wordlist = mnemonicWordList; // BIP39 word list
```

## NaCL-compatible Ed25519 signing
Ed25519 is used by TON in contracts to check signatures.

```js
import { keyPairFromSeed, keyPairFromSecretKey, sign, signVerify, KeyPair } from 'ton-crypto';

const data = Buffer.from('Hello wordl!');

// Create Keypair
const seed: Buffer = await getSecureRandomBytes(32); // Seed is always 32 bytes
const keypair: KeyPair = keyPairFromSeed(seed); // Creates keypair from random seed
const keypair2: KeyPair = keyPairFromSecretKey(keypair.secret); // Creates keypair from secret key

// Sign
const signature = sign(data, keypair.secret); // Creates signature for arbitrary data (it is recommended to get hash from data first)

// Check
const valid: boolean = signVerify(data, signature, keypair.public);

```

## NaCL-compatible symmetrict encryption

```js
import { sealBox, openBox, getSecureRandomBytes } from 'ton-crypto';

const data = Buffer.from('Hello wordl!');

// Encryption
const key: Buffer = await getSecureRandomBytes(32); // Key is always 32 bytes and secret
const nonce: Buffer = await getSecureRandomBytes(24); // Nonce is always 24 bytes and public
const sealed: Buffer = sealBox(data, nonce, key); // Sealed box

// Decryption
const decrypted: Buffer | null = openBox(sealed, nonce, key); // Decrypted with integrity check. null if failed.
```

## SLIP-10 Ed25519 HD Keys

Generates SLIP-10 compatible hierarchy of keys

```js
import { newMnemonics, mnemonicToHDSeed, deriveEd25519Path, KeyPair } from 'ton-crypto';

// Generate HD seed
// You can just generate 64-128 random bytes, but this way you will be able to 
// create it from mnemonics that you already have for a wallet
const mnemonics: string[] = await newMnemonics();
const seed: Buffer = await mnemonicToHDSeed(mnemonics);

// Derive secret key from path m/0'/1'/2'/3'
const derivedSeed: Buffer = await deriveEd25519Path(seed, [0, 1, 2, 3]);

// Create key pair
const keyPair: KeyPair = keyPairFromSeed(derivedSeed);

```

## SLIP-21 Symmetric HD Keys

Generates SLIP-21 compatible hierarchy of keys for symmetric encryption.

```js
import { newMnemonics, mnemonicToHDSeed, deriveSymmetricPath, KeyPair } from 'ton-crypto';

// Generate HD seed
// You can just generate 64-128 random bytes, but this way you will be able to 
// create it from mnemonics that you already have for a wallet
const mnemonics: string[] = await newMnemonics();
const seed: Buffer = await mnemonicToHDSeed(mnemonics);

// Derive secret key from path m/0'/1'/2'/3'
const derivedKey: Buffer = await deriveSymmetricPath(seed, ['ton-seed', 'some-key', 'some-key2']);

```

# License

MIT
