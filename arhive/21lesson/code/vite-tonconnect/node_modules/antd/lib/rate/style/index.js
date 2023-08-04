"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _internal = require("../../theme/internal");
var _style = require("../../style");
const genRateStarStyle = token => {
  const {
    componentCls
  } = token;
  return {
    [`${componentCls}-star`]: {
      position: 'relative',
      display: 'inline-block',
      color: 'inherit',
      cursor: 'pointer',
      '&:not(:last-child)': {
        marginInlineEnd: token.marginXS
      },
      '> div': {
        transition: `all ${token.motionDurationMid}, outline 0s`,
        '&:hover': {
          transform: token.rateStarHoverScale
        },
        '&:focus': {
          outline: 0
        },
        '&:focus-visible': {
          outline: `${token.lineWidth}px dashed ${token.rateStarColor}`,
          transform: token.rateStarHoverScale
        }
      },
      '&-first, &-second': {
        color: token.defaultColor,
        transition: `all ${token.motionDurationMid}`,
        userSelect: 'none',
        [token.iconCls]: {
          verticalAlign: 'middle'
        }
      },
      '&-first': {
        position: 'absolute',
        top: 0,
        insetInlineStart: 0,
        width: '50%',
        height: '100%',
        overflow: 'hidden',
        opacity: 0
      },
      [`&-half ${componentCls}-star-first, &-half ${componentCls}-star-second`]: {
        opacity: 1
      },
      [`&-half ${componentCls}-star-first, &-full ${componentCls}-star-second`]: {
        color: 'inherit'
      }
    }
  };
};
const genRateRtlStyle = token => ({
  [`&-rtl${token.componentCls}`]: {
    direction: 'rtl'
  }
});
const genRateStyle = token => {
  const {
    componentCls
  } = token;
  return {
    [componentCls]: Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, (0, _style.resetComponent)(token)), {
      display: 'inline-block',
      margin: 0,
      padding: 0,
      color: token.rateStarColor,
      fontSize: token.rateStarSize,
      lineHeight: 'unset',
      listStyle: 'none',
      outline: 'none',
      // disable styles
      [`&-disabled${componentCls} ${componentCls}-star`]: {
        cursor: 'default',
        '> div:hover': {
          transform: 'scale(1)'
        }
      }
    }), genRateStarStyle(token)), {
      // text styles
      [`+ ${componentCls}-text`]: {
        display: 'inline-block',
        marginInlineStart: token.marginXS,
        fontSize: token.fontSize
      }
    }), genRateRtlStyle(token))
  };
};
// ============================== Export ==============================
var _default = (0, _internal.genComponentStyleHook)('Rate', token => {
  const {
    colorFillContent
  } = token;
  const rateToken = (0, _internal.mergeToken)(token, {
    rateStarColor: token.yellow6,
    rateStarSize: token.controlHeightLG * 0.5,
    rateStarHoverScale: 'scale(1.1)',
    defaultColor: colorFillContent
  });
  return [genRateStyle(rateToken)];
});
exports.default = _default;