/*
  @license
	Rollup.js v3.20.0
	Mon, 20 Mar 2023 06:08:57 GMT - commit eb9777c1a8a9923951037294b56ceccb1921a5c0

	https://github.com/rollup/rollup

	Released under the MIT License.
*/
'use strict';

Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

const rollup = require('./shared/rollup.js');
const watchProxy = require('./shared/watch-proxy.js');
require('node:process');
require('tty');
require('node:path');
require('path');
require('node:perf_hooks');
require('node:crypto');
require('node:fs/promises');
require('node:events');
require('./shared/fsevents-importer.js');



exports.VERSION = rollup.version;
exports.defineConfig = rollup.defineConfig;
exports.rollup = rollup.rollup;
exports.watch = watchProxy.watch;
//# sourceMappingURL=rollup.js.map
