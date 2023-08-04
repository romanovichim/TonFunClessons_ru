"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const genSummaryStyle = token => {
  const {
    componentCls,
    lineWidth,
    tableBorderColor
  } = token;
  const tableBorder = `${lineWidth}px ${token.lineType} ${tableBorderColor}`;
  return {
    [`${componentCls}-wrapper`]: {
      [`${componentCls}-summary`]: {
        position: 'relative',
        zIndex: token.zIndexTableFixed,
        background: token.tableBg,
        '> tr': {
          '> th, > td': {
            borderBottom: tableBorder
          }
        }
      },
      [`div${componentCls}-summary`]: {
        boxShadow: `0 -${lineWidth}px 0 ${tableBorderColor}`
      }
    }
  };
};
var _default = genSummaryStyle;
exports.default = _default;