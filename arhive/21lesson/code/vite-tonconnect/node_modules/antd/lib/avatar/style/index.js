"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _internal = require("../../theme/internal");
var _style = require("../../style");
const genBaseStyle = token => {
  const {
    antCls,
    componentCls,
    iconCls,
    avatarBg,
    avatarColor,
    avatarSizeBase,
    avatarSizeLG,
    avatarSizeSM,
    avatarFontSizeBase,
    avatarFontSizeLG,
    avatarFontSizeSM,
    borderRadius,
    borderRadiusLG,
    borderRadiusSM,
    lineWidth,
    lineType
  } = token;
  // Avatar size style
  const avatarSizeStyle = (size, fontSize, radius) => ({
    width: size,
    height: size,
    lineHeight: `${size - lineWidth * 2}px`,
    borderRadius: '50%',
    [`&${componentCls}-square`]: {
      borderRadius: radius
    },
    [`${componentCls}-string`]: {
      position: 'absolute',
      left: {
        _skip_check_: true,
        value: '50%'
      },
      transformOrigin: '0 center'
    },
    [`&${componentCls}-icon`]: {
      fontSize,
      [`> ${iconCls}`]: {
        margin: 0
      }
    }
  });
  return {
    [componentCls]: Object.assign(Object.assign(Object.assign(Object.assign({}, (0, _style.resetComponent)(token)), {
      position: 'relative',
      display: 'inline-block',
      overflow: 'hidden',
      color: avatarColor,
      whiteSpace: 'nowrap',
      textAlign: 'center',
      verticalAlign: 'middle',
      background: avatarBg,
      border: `${lineWidth}px ${lineType} transparent`,
      [`&-image`]: {
        background: 'transparent'
      },
      [`${antCls}-image-img`]: {
        display: 'block'
      }
    }), avatarSizeStyle(avatarSizeBase, avatarFontSizeBase, borderRadius)), {
      [`&-lg`]: Object.assign({}, avatarSizeStyle(avatarSizeLG, avatarFontSizeLG, borderRadiusLG)),
      [`&-sm`]: Object.assign({}, avatarSizeStyle(avatarSizeSM, avatarFontSizeSM, borderRadiusSM)),
      '> img': {
        display: 'block',
        width: '100%',
        height: '100%',
        objectFit: 'cover'
      }
    })
  };
};
const genGroupStyle = token => {
  const {
    componentCls,
    avatarGroupBorderColor,
    avatarGroupSpace
  } = token;
  return {
    [`${componentCls}-group`]: {
      display: 'inline-flex',
      [`${componentCls}`]: {
        borderColor: avatarGroupBorderColor
      },
      [`> *:not(:first-child)`]: {
        marginInlineStart: avatarGroupSpace
      }
    }
  };
};
var _default = (0, _internal.genComponentStyleHook)('Avatar', token => {
  const {
    colorTextLightSolid,
    controlHeight,
    controlHeightLG,
    controlHeightSM,
    fontSize,
    fontSizeLG,
    fontSizeXL,
    fontSizeHeading3,
    marginXS,
    colorBorderBg,
    colorTextPlaceholder
  } = token;
  const avatarToken = (0, _internal.mergeToken)(token, {
    avatarBg: colorTextPlaceholder,
    avatarColor: colorTextLightSolid,
    avatarSizeBase: controlHeight,
    avatarSizeLG: controlHeightLG,
    avatarSizeSM: controlHeightSM,
    avatarFontSizeBase: Math.round((fontSizeLG + fontSizeXL) / 2),
    avatarFontSizeLG: fontSizeHeading3,
    avatarFontSizeSM: fontSize,
    avatarGroupSpace: -marginXS,
    avatarGroupBorderColor: colorBorderBg
  });
  return [genBaseStyle(avatarToken), genGroupStyle(avatarToken)];
});
exports.default = _default;