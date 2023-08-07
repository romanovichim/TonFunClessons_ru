"use strict";
/**
 * Copyright (c) Whales Corp.
 * All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendMode = void 0;
var SendMode;
(function (SendMode) {
    SendMode[SendMode["CARRY_ALL_REMAINING_BALANCE"] = 128] = "CARRY_ALL_REMAINING_BALANCE";
    SendMode[SendMode["CARRY_ALL_REMAINING_INCOMING_VALUE"] = 64] = "CARRY_ALL_REMAINING_INCOMING_VALUE";
    SendMode[SendMode["DESTROY_ACCOUNT_IF_ZERO"] = 32] = "DESTROY_ACCOUNT_IF_ZERO";
    SendMode[SendMode["PAY_GAS_SEPARATELY"] = 1] = "PAY_GAS_SEPARATELY";
    SendMode[SendMode["IGNORE_ERRORS"] = 2] = "IGNORE_ERRORS";
    SendMode[SendMode["NONE"] = 0] = "NONE";
})(SendMode = exports.SendMode || (exports.SendMode = {}));
