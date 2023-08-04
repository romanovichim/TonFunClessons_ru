"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _internal = require("./internal");
var _default2 = _interopRequireDefault(require("./themes/default"));
var _dark = _interopRequireDefault(require("./themes/dark"));
var _compact = _interopRequireDefault(require("./themes/compact"));
/* eslint-disable import/prefer-default-export */

// ZombieJ: We export as object to user but array in internal.
// This is used to minimize the bundle size for antd package but safe to refactor as object also.
// Please do not export internal `useToken` directly to avoid something export unexpected.
/** Get current context Design Token. Will be different if you are using nest theme config. */
function useToken() {
  const [theme, token, hashId] = (0, _internal.useToken)();
  return {
    theme,
    token,
    hashId
  };
}
var _default = {
  /** @private Test Usage. Do not use in production. */
  defaultConfig: _internal.defaultConfig,
  /** Default seedToken */
  defaultSeed: _internal.defaultConfig.token,
  useToken,
  defaultAlgorithm: _default2.default,
  darkAlgorithm: _dark.default,
  compactAlgorithm: _compact.default
};
exports.default = _default;