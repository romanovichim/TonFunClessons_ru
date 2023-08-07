# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.11.0] - 2023-05-11

### Added

- Added the ability to emulate ticktock transactions. There are 3 ways to do that: `blockchain.runTickTock(Address | Address[], TickOrTock, MessageParams?)`, `smartContract.runTickTock(TickOrTock, MessageParams?)`, or you can change `ContractProvider` in your wrapper classes to be `SandboxContractProvider` and invoke `tickTock(TickOrTock)` on it. `TickOrTock` is a union type `'tick' | 'tock'`
- Added new verbosity levels: `'vm_logs_location'` (same as `'vm_logs'` but also display code cell hash and offset), `'vm_logs_gas'` (same as `'vm_logs_location'` but also display gas remaining), `'vm_logs_verbose'` (same as `'vm_logs_full'` but display stack values in a more verbose way)

## [0.10.0] - 2023-05-04

### Changed

- Changed emulator WASM binary
- Changed treasury code

### Fixed

- Fixed certain interactions between snapshots and treasuries

## [0.9.0] - 2023-04-27

### Added

- Added `printTransactionFees` helper for easier calculation of fees of different operations
- Added `blockchain.snapshot`, `blockchain.loadFrom`, `smartContract.snapshot`, `smartContract.loadFrom` methods to create state snapshots of the respective objects and restore from them at a later point in time. They return and accept new types, `BlockchainSnapshot` and `SmartContractSnapshot`

## [0.8.0] - 2023-04-07

This release contains a breaking change.

### Added

- Added `blockchain.createWallets` method which accepts a number `n` and optional `TreasuryParams`. It creates `n` treasuries and returns them as an array

### Changed

- `RemoteBlockchainStorage` now requires a `RemoteBlockchainStorageClient` instead of `TonClient4`. There is a helper function, `wrapTonClient4ForRemote`, to wrap a `TonClient4` into `RemoteBlockchainStorageClient`. This is a breaking change
- Updated default config
- `Blockchain.create` now accepts an optional `BlockchainConfig = Cell | 'default' | 'slim'` as the config. If nothing or `'default'` is specified, the default config is used, if `'slim'` is specified, the slim config is used (it is much smaller than the default config, which improves performance), if a `Cell` is passed, then it is used as the config

### Removed

- Removed ton as a peer dependency

## [0.7.0] - 2023-03-27

### Added

- Added `externals: ExternalOut[]` field to `BlockchainTransaction` and `SendMessageResult`. `ExternalOut` is a specialized type for external out messages compatible with `Message` from ton-core

### Changed

- Get methods now throw a specialized error type `GetMethodError` when exit code is not 0
- Smart contracts now throw a specialized error type `TimeError` when trying to run a transaction at a unix timestamp that is less than the unix timestamp of the last transaction
- Get methods now return `gasUsed` and `logs` from the `ContractProvider` on opened contracts

### Other

- Consecutive transaction emulations have been optimized

## [0.6.1] - 2023-03-16

### Fixed

- Fixed `blockchain.now` override for get methods in opened contracts

## [0.6.0] - 2023-03-13

### Added

- Added `treasury.getBalance` method
- Added `blockchain.now` getter and setter to override current unix time as seen during contract execution (both transactions and get methods). Note that this is unix timestamp, not JS timestamp, so you need to use `Math.floor(Date.now() / 1000)` instead of `Date.now()` to set current time

### Changed

- `RemoteBlockchainStorage` constructor now accepts a second optional parameter, `blockSeqno?: number`. If passed, all accounts will be pulled from that block number instead of the latest one

## [0.5.1] - 2023-03-02

### Changed

- Changed ton and ton-core dev and peer dependencies to versions 13.4.1 and 0.48.0 respectively

### Fixed

- Fixed typos in `SendMode.PAY_GAS_SEPARATLY` (missing E) from ton-core

## [0.5.0] - 2023-02-22

This release contains multiple breaking changes.

### Added

- Added `blockchain.libs: Cell | undefined` getter and setter for global libraries dictionary (as a `Cell`)

### Changed

- `blockchain.treasury` now accepts an optional `TreasuryParams` argument (see below for definition) instead of the old optional `workchain?: number` argument. This is a breaking change
```typescript
export type TreasuryParams = Partial<{
    workchain: number
    predeploy: boolean
    balance: bigint
    resetBalanceIfZero: boolean
}>
```
- `OpenedContract` was renamed to `SandboxContract`. This is a breaking change
- `LogsVerbosity` now has a new field, `print: boolean` (defaults to `true` on the `Blockchain` instance), which controls whether to `console.log` any logs at all (both from transactions and get methods). This is a breaking change
- `smartContract.get` and `blockchain.runGetMethod` now return `GetMethodResult` (see below for definition). The differences from the previous return type are as follows:
    - `logs` renamed to `vmLogs`. This is a breaking change
    - `gasUsed` is now of type `bigint`. This is a breaking change
    - `blockchainLogs: string` and `debugLogs: string` were added
```typescript
export type GetMethodResult = {
    stack: TupleItem[]
    stackReader: TupleReader
    exitCode: number
    gasUsed: bigint
    blockchainLogs: string
    vmLogs: string
    debugLogs: string
}
```
- Properties `storage` and `messageQueue` on `Blockchain` are now protected. This is a breaking change
- All properties and methods of `Blockchain` that were private are now protected to improve extensibility. Note that any invariants expected by `Blockchain` must be upheld
- `blockchain.sendMessage` and `smartContract.receiveMessage` now accept an optional `MessageParams` argument (see below for definition). These parameters are used for every transaction in the chain in case of `blockchain.sendMessage`
```typescript
export type MessageParams = Partial<{
    now: number
    randomSeed: Buffer
    ignoreChksig: boolean
}>
```
- `blockchain.runGetMethod` and `smartContract.get` now accept an optional `GetMethodParams` argument (see below for definition)
```typescript
export type GetMethodParams = Partial<{
    now: number
    randomSeed: Buffer
    gasLimit: bigint
}>
```
- `SendMessageResult` now has `transactions: BlockchainTransaction[]` instead of `transactions: Transaction[]`. Definition of `BlockchainTransaction`:
```typescript
export type BlockchainTransaction = Transaction & {
    blockchainLogs: string
    vmLogs: string
    debugLogs: string
    events: Event[]
    parent?: BlockchainTransaction
    children: BlockchainTransaction[]
}
```
- `smartContract.receiveMessage` now returns `SmartContractTransaction` (see below for definition)
```typescript
export type SmartContractTransaction = Transaction & {
    blockchainLogs: string
    vmLogs: string
    debugLogs: string
}
```
- Emulator WASM binary has been updated

### Fixed

- Fixed empty message bodies in bounced messages. This fix is contained in the emulator WASM binary

## [0.4.0] - 2023-02-09

### Changed

- Treasuries obtained by `blockchain.treasury` calls are now initialized during this call and will no longer produce an extra transaction when first sending a message
- Transaction processing loop now prefetches contracts, which should provide a performance boost in some scenarios

## [0.3.0] - 2023-02-05

### Changed

- `Blockchain` and `SmartContract` now use `LogsVerbosity` (see below for definition) as the verbosity type, which allows for more control over what kinds of logs are printed. Logs from TVM debug primitives are now enabled by default, again. (You can disable them globally by setting verbosity with `debugLogs: false` on the `Blockchain` instance)

Definition of `LogsVerbosity`:
```typescript
type LogsVerbosity = {
    blockchainLogs: boolean
    vmLogs: Verbosity
    debugLogs: boolean
}
```

## [0.2.2] - 2023-02-03

### Added 

- Added `blockchain.runGetMethod(address, method, stack)` to run a get method on the specified address
- Added `blockchain.setShardAccount(address, account)` to directly set the state of smart contracts
- Added `account: ShardAccount` getter and setter to `SmartContract`
- Exported helper methods `createEmptyShardAccount`, `createShardAccount` for use with `blockchain.setShardAccount` and `smartContract.account` setter
- Added the ability to pass `Cell`s into `blockchain.sendMessage`

### Changed

- Removed unnecessary `async` modifiers from `smartContract.receiveMessage` and `smartContract.get`
- Logs from TVM debug primitives (for example, `DUMP` and `STRDUMP` with corresponding FunC functions `~dump()` and `~strdump()`) now respect the `verbosity` parameter and will only work when it is not `none`
- Logs from TVM debug primitives are now printed using a single `console.log` call per one TVM execution to avoid cluttering the terminal during unit tests

### Fixed

- Fixed potential race conditions between execution of different transaction chains on the same `Blockchain` instance by use of an `AsyncLock`

### Removed

- Changed `blockchain.pushMessage`, `blockchain.processQueue`, `blockchain.runQueue` to be private