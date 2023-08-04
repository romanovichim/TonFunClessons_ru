"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.genCheckboxStyle = exports.default = void 0;
exports.getStyle = getStyle;
var _cssinjs = require("@ant-design/cssinjs");
var _internal = require("../../theme/internal");
var _style = require("../../style");
// ============================== Motion ==============================
const antCheckboxEffect = new _cssinjs.Keyframes('antCheckboxEffect', {
  '0%': {
    transform: 'scale(1)',
    opacity: 0.5
  },
  '100%': {
    transform: 'scale(1.6)',
    opacity: 0
  }
});
// ============================== Styles ==============================
const genCheckboxStyle = token => {
  const {
    checkboxCls
  } = token;
  const wrapperCls = `${checkboxCls}-wrapper`;
  return [
  // ===================== Basic =====================
  {
    // Group
    [`${checkboxCls}-group`]: Object.assign(Object.assign({}, (0, _style.resetComponent)(token)), {
      display: 'inline-flex'
    }),
    // Wrapper
    [wrapperCls]: Object.assign(Object.assign({}, (0, _style.resetComponent)(token)), {
      display: 'inline-flex',
      alignItems: 'baseline',
      cursor: 'pointer',
      // Fix checkbox & radio in flex align #30260
      '&:after': {
        display: 'inline-block',
        width: 0,
        overflow: 'hidden',
        content: "'\\a0'"
      },
      // Checkbox near checkbox
      [`& + ${wrapperCls}`]: {
        marginInlineStart: token.marginXS
      },
      [`&${wrapperCls}-in-form-item`]: {
        'input[type="checkbox"]': {
          width: 14,
          height: 14 // FIXME: magic
        }
      }
    }),

    // Wrapper > Checkbox
    [checkboxCls]: Object.assign(Object.assign({}, (0, _style.resetComponent)(token)), {
      top: '0.2em',
      position: 'relative',
      whiteSpace: 'nowrap',
      lineHeight: 1,
      cursor: 'pointer',
      // Wrapper > Checkbox > input
      [`${checkboxCls}-input`]: {
        position: 'absolute',
        inset: 0,
        zIndex: 1,
        width: '100%',
        height: '100%',
        cursor: 'pointer',
        opacity: 0,
        [`&:focus-visible + ${checkboxCls}-inner`]: Object.assign({}, (0, _style.genFocusOutline)(token))
      },
      // Wrapper > Checkbox > inner
      [`${checkboxCls}-inner`]: {
        boxSizing: 'border-box',
        position: 'relative',
        top: 0,
        insetInlineStart: 0,
        display: 'block',
        width: token.checkboxSize,
        height: token.checkboxSize,
        direction: 'ltr',
        backgroundColor: token.colorBgContainer,
        border: `${token.lineWidth}px ${token.lineType} ${token.colorBorder}`,
        borderRadius: token.borderRadiusSM,
        borderCollapse: 'separate',
        transition: `all ${token.motionDurationSlow}`,
        '&:after': {
          boxSizing: 'border-box',
          position: 'absolute',
          top: '50%',
          insetInlineStart: '21.5%',
          display: 'table',
          width: token.checkboxSize / 14 * 5,
          height: token.checkboxSize / 14 * 8,
          border: `${token.lineWidthBold}px solid ${token.colorWhite}`,
          borderTop: 0,
          borderInlineStart: 0,
          transform: 'rotate(45deg) scale(0) translate(-50%,-50%)',
          opacity: 0,
          content: '""',
          transition: `all ${token.motionDurationFast} ${token.motionEaseInBack}, opacity ${token.motionDurationFast}`
        }
      },
      // Wrapper > Checkbox + Text
      '& + span': {
        paddingInlineStart: token.paddingXS,
        paddingInlineEnd: token.paddingXS
      }
    })
  },
  // ================= Indeterminate =================
  {
    [checkboxCls]: {
      '&-indeterminate': {
        // Wrapper > Checkbox > inner
        [`${checkboxCls}-inner`]: {
          '&:after': {
            top: '50%',
            insetInlineStart: '50%',
            width: token.fontSizeLG / 2,
            height: token.fontSizeLG / 2,
            backgroundColor: token.colorPrimary,
            border: 0,
            transform: 'translate(-50%, -50%) scale(1)',
            opacity: 1,
            content: '""'
          }
        }
      }
    }
  },
  // ===================== Hover =====================
  {
    // Wrapper
    [`${wrapperCls}:hover ${checkboxCls}:after`]: {
      visibility: 'visible'
    },
    // Wrapper & Wrapper > Checkbox
    [`
        ${wrapperCls}:not(${wrapperCls}-disabled),
        ${checkboxCls}:not(${checkboxCls}-disabled)
      `]: {
      [`&:hover ${checkboxCls}-inner`]: {
        borderColor: token.colorPrimary
      }
    },
    [`${wrapperCls}:not(${wrapperCls}-disabled)`]: {
      [`&:hover ${checkboxCls}-checked:not(${checkboxCls}-disabled) ${checkboxCls}-inner`]: {
        backgroundColor: token.colorPrimaryHover,
        borderColor: 'transparent'
      },
      [`&:hover ${checkboxCls}-checked:not(${checkboxCls}-disabled):after`]: {
        borderColor: token.colorPrimaryHover
      }
    }
  },
  // ==================== Checked ====================
  {
    // Wrapper > Checkbox
    [`${checkboxCls}-checked`]: {
      [`${checkboxCls}-inner`]: {
        backgroundColor: token.colorPrimary,
        borderColor: token.colorPrimary,
        '&:after': {
          opacity: 1,
          transform: 'rotate(45deg) scale(1) translate(-50%,-50%)',
          transition: `all ${token.motionDurationMid} ${token.motionEaseOutBack} ${token.motionDurationFast}`
        }
      },
      // Checked Effect
      '&:after': {
        position: 'absolute',
        top: 0,
        insetInlineStart: 0,
        width: '100%',
        height: '100%',
        borderRadius: token.borderRadiusSM,
        visibility: 'hidden',
        border: `${token.lineWidthBold}px solid ${token.colorPrimary}`,
        animationName: antCheckboxEffect,
        animationDuration: token.motionDurationSlow,
        animationTimingFunction: 'ease-in-out',
        animationFillMode: 'backwards',
        content: '""',
        transition: `all ${token.motionDurationSlow}`
      }
    },
    [`
        ${wrapperCls}-checked:not(${wrapperCls}-disabled),
        ${checkboxCls}-checked:not(${checkboxCls}-disabled)
      `]: {
      [`&:hover ${checkboxCls}-inner`]: {
        backgroundColor: token.colorPrimaryHover,
        borderColor: 'transparent'
      },
      [`&:hover ${checkboxCls}:after`]: {
        borderColor: token.colorPrimaryHover
      }
    }
  },
  // ==================== Disable ====================
  {
    // Wrapper
    [`${wrapperCls}-disabled`]: {
      cursor: 'not-allowed'
    },
    // Wrapper > Checkbox
    [`${checkboxCls}-disabled`]: {
      // Wrapper > Checkbox > input
      [`&, ${checkboxCls}-input`]: {
        cursor: 'not-allowed',
        // Disabled for native input to enable Tooltip event handler
        // ref: https://github.com/ant-design/ant-design/issues/39822#issuecomment-1365075901
        pointerEvents: 'none'
      },
      // Wrapper > Checkbox > inner
      [`${checkboxCls}-inner`]: {
        background: token.colorBgContainerDisabled,
        borderColor: token.colorBorder,
        '&:after': {
          borderColor: token.colorTextDisabled
        }
      },
      '&:after': {
        display: 'none'
      },
      '& + span': {
        color: token.colorTextDisabled
      },
      [`&${checkboxCls}-indeterminate ${checkboxCls}-inner::after`]: {
        background: token.colorTextDisabled
      }
    }
  }];
};
// ============================== Export ==============================
exports.genCheckboxStyle = genCheckboxStyle;
function getStyle(prefixCls, token) {
  const checkboxToken = (0, _internal.mergeToken)(token, {
    checkboxCls: `.${prefixCls}`,
    checkboxSize: token.controlInteractiveSize
  });
  return [genCheckboxStyle(checkboxToken)];
}
var _default = (0, _internal.genComponentStyleHook)('Checkbox', (token, _ref) => {
  let {
    prefixCls
  } = _ref;
  return [getStyle(prefixCls, token)];
});
exports.default = _default;