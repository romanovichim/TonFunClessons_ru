# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.2.0] - 2023-03-17

### Added

- Added `inMessageBounced`, `inMessageBounceable` fields on `FlatTransaction`
- Added `actionResultCode` field on `FlatTransaction`

## [0.1.0] - 2023-03-16

### Added

- Added `toEqualCell`/`equalCell`, `toEqualAddress`/`equalAddress`, `toEqualSlice`/`equalSlice` (jest/chai) matchers
- Added `on` field (alias for `to`) on `FlatTransaction`
- Added `op` field on `FlatTransaction`
