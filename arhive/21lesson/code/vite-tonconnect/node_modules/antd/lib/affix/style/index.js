"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _internal = require("../../theme/internal");
// ============================== Shared ==============================
const genSharedAffixStyle = token => {
  const {
    componentCls
  } = token;
  return {
    [componentCls]: {
      position: 'fixed',
      zIndex: token.zIndexPopup
    }
  };
};
// ============================== Export ==============================
var _default = (0, _internal.genComponentStyleHook)('Affix', token => {
  const affixToken = (0, _internal.mergeToken)(token, {
    zIndexPopup: token.zIndexBase + 10
  });
  return [genSharedAffixStyle(affixToken)];
});
exports.default = _default;