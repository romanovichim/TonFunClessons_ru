"use strict";
/**
 * Copyright (c) Whales Corp.
 * All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const gen_1 = require("ton-tl/dist/gen");
let source = fs_1.default.readFileSync(__dirname + '/schema.tl', 'utf-8');
let generated = (0, gen_1.generate)(source);
fs_1.default.writeFileSync(__dirname + '/schema.ts', generated);
