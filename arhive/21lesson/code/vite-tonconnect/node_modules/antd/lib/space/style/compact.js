"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const genSpaceCompactStyle = token => {
  const {
    componentCls
  } = token;
  return {
    [componentCls]: {
      display: 'inline-flex',
      '&-block': {
        display: 'flex',
        width: '100%'
      },
      '&-vertical': {
        flexDirection: 'column'
      }
    }
  };
};
// ============================== Export ==============================
var _default = genSpaceCompactStyle;
exports.default = _default;