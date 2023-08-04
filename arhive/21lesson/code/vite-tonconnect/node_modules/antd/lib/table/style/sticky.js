"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const genStickyStyle = token => {
  const {
    componentCls,
    opacityLoading,
    tableScrollThumbBg,
    tableScrollThumbBgHover,
    tableScrollThumbSize,
    tableScrollBg,
    zIndexTableSticky
  } = token;
  const tableBorder = `${token.lineWidth}px ${token.lineType} ${token.tableBorderColor}`;
  return {
    [`${componentCls}-wrapper`]: {
      [`${componentCls}-sticky`]: {
        '&-holder': {
          position: 'sticky',
          zIndex: zIndexTableSticky,
          background: token.colorBgContainer
        },
        '&-scroll': {
          position: 'sticky',
          bottom: 0,
          height: `${tableScrollThumbSize}px !important`,
          zIndex: zIndexTableSticky,
          display: 'flex',
          alignItems: 'center',
          background: tableScrollBg,
          borderTop: tableBorder,
          opacity: opacityLoading,
          '&:hover': {
            transformOrigin: 'center bottom'
          },
          // fake scrollbar style of sticky
          '&-bar': {
            height: tableScrollThumbSize,
            backgroundColor: tableScrollThumbBg,
            borderRadius: 100,
            transition: `all ${token.motionDurationSlow}, transform none`,
            position: 'absolute',
            bottom: 0,
            '&:hover, &-active': {
              backgroundColor: tableScrollThumbBgHover
            }
          }
        }
      }
    }
  };
};
var _default = genStickyStyle;
exports.default = _default;