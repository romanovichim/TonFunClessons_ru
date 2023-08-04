"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _internal = require("../../theme/internal");
// =============================== Base ===============================
const genBaseStyle = token => {
  const {
    componentCls,
    iconCls,
    zIndexPopup,
    colorText,
    colorWarning,
    marginXS,
    fontSize,
    fontWeightStrong,
    lineHeight
  } = token;
  return {
    [componentCls]: {
      zIndex: zIndexPopup,
      [`${componentCls}-inner-content`]: {
        color: colorText
      },
      [`${componentCls}-message`]: {
        position: 'relative',
        marginBottom: marginXS,
        color: colorText,
        fontSize,
        display: 'flex',
        flexWrap: 'nowrap',
        alignItems: 'start',
        [`> ${componentCls}-message-icon ${iconCls}`]: {
          color: colorWarning,
          fontSize,
          flex: 'none',
          lineHeight: 1,
          paddingTop: (Math.round(fontSize * lineHeight) - fontSize) / 2
        },
        '&-title': {
          flex: 'auto',
          marginInlineStart: marginXS
        },
        '&-title-only': {
          fontWeight: fontWeightStrong
        }
      },
      [`${componentCls}-description`]: {
        position: 'relative',
        marginInlineStart: fontSize + marginXS,
        marginBottom: marginXS,
        color: colorText,
        fontSize
      },
      [`${componentCls}-buttons`]: {
        textAlign: 'end',
        button: {
          marginInlineStart: marginXS
        }
      }
    }
  };
};
// ============================== Export ==============================
var _default = (0, _internal.genComponentStyleHook)('Popconfirm', token => genBaseStyle(token), token => {
  const {
    zIndexPopupBase
  } = token;
  return {
    zIndexPopup: zIndexPopupBase + 60
  };
});
exports.default = _default;