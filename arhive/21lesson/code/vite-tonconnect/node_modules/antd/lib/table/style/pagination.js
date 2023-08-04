"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const genPaginationStyle = token => {
  const {
    componentCls,
    antCls
  } = token;
  return {
    [`${componentCls}-wrapper`]: {
      // ========================== Pagination ==========================
      [`${componentCls}-pagination${antCls}-pagination`]: {
        margin: `${token.margin}px 0`
      },
      [`${componentCls}-pagination`]: {
        display: 'flex',
        flexWrap: 'wrap',
        rowGap: token.paddingXS,
        '> *': {
          flex: 'none'
        },
        '&-left': {
          justifyContent: 'flex-start'
        },
        '&-center': {
          justifyContent: 'center'
        },
        '&-right': {
          justifyContent: 'flex-end'
        }
      }
    }
  };
};
var _default = genPaginationStyle;
exports.default = _default;