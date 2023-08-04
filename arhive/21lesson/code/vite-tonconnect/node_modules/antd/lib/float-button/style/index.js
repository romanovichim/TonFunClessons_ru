"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _cssinjs = require("@ant-design/cssinjs");
var _internal = require("../../theme/internal");
var _fade = require("../../style/motion/fade");
var _style = require("../../style");
var _motion = require("../../style/motion/motion");
const initFloatButtonGroupMotion = token => {
  const {
    componentCls,
    floatButtonSize,
    motionDurationSlow,
    motionEaseInOutCirc
  } = token;
  const groupPrefixCls = `${componentCls}-group`;
  const moveDownIn = new _cssinjs.Keyframes('antFloatButtonMoveDownIn', {
    '0%': {
      transform: `translate3d(0, ${floatButtonSize}px, 0)`,
      transformOrigin: '0 0',
      opacity: 0
    },
    '100%': {
      transform: 'translate3d(0, 0, 0)',
      transformOrigin: '0 0',
      opacity: 1
    }
  });
  const moveDownOut = new _cssinjs.Keyframes('antFloatButtonMoveDownOut', {
    '0%': {
      transform: 'translate3d(0, 0, 0)',
      transformOrigin: '0 0',
      opacity: 1
    },
    '100%': {
      transform: `translate3d(0, ${floatButtonSize}px, 0)`,
      transformOrigin: '0 0',
      opacity: 0
    }
  });
  return [{
    [`${groupPrefixCls}-wrap`]: Object.assign({}, (0, _motion.initMotion)(`${groupPrefixCls}-wrap`, moveDownIn, moveDownOut, motionDurationSlow, true))
  }, {
    [`${groupPrefixCls}-wrap`]: {
      [`
          &${groupPrefixCls}-wrap-enter,
          &${groupPrefixCls}-wrap-appear
        `]: {
        opacity: 0,
        animationTimingFunction: motionEaseInOutCirc
      },
      [`&${groupPrefixCls}-wrap-leave`]: {
        animationTimingFunction: motionEaseInOutCirc
      }
    }
  }];
};
// ============================== Group ==============================
const floatButtonGroupStyle = token => {
  const {
    componentCls,
    floatButtonSize,
    margin,
    borderRadiusLG
  } = token;
  const groupPrefixCls = `${componentCls}-group`;
  return {
    [groupPrefixCls]: Object.assign(Object.assign({}, (0, _style.resetComponent)(token)), {
      zIndex: 99,
      display: 'block',
      border: 'none',
      position: 'fixed',
      width: floatButtonSize,
      height: 'auto',
      boxShadow: 'none',
      minHeight: floatButtonSize,
      insetInlineEnd: token.floatButtonInsetInlineEnd,
      insetBlockEnd: token.floatButtonInsetBlockEnd,
      borderRadius: borderRadiusLG,
      [`${groupPrefixCls}-wrap`]: {
        zIndex: -1,
        display: 'block',
        position: 'relative',
        marginBottom: margin
      },
      [`&${groupPrefixCls}-rtl`]: {
        direction: 'rtl'
      },
      [componentCls]: {
        position: 'static'
      }
    }),
    [`${groupPrefixCls}-circle`]: {
      [`${componentCls}-circle:not(:last-child)`]: {
        marginBottom: token.margin,
        [`${componentCls}-body`]: {
          width: floatButtonSize,
          height: floatButtonSize
        }
      }
    },
    [`${groupPrefixCls}-square`]: {
      [`${componentCls}-square`]: {
        borderRadius: 0,
        padding: 0,
        '&:first-child': {
          borderStartStartRadius: borderRadiusLG,
          borderStartEndRadius: borderRadiusLG
        },
        '&:last-child': {
          borderEndStartRadius: borderRadiusLG,
          borderEndEndRadius: borderRadiusLG
        },
        '&:not(:last-child)': {
          borderBottom: `${token.lineWidth}px ${token.lineType} ${token.colorSplit}`
        }
      },
      [`${groupPrefixCls}-wrap`]: {
        display: 'block',
        borderRadius: borderRadiusLG,
        boxShadow: token.boxShadowSecondary,
        overflow: 'hidden',
        [`${componentCls}-square`]: {
          boxShadow: 'none',
          marginTop: 0,
          borderRadius: 0,
          padding: token.paddingXXS,
          '&:first-child': {
            borderStartStartRadius: borderRadiusLG,
            borderStartEndRadius: borderRadiusLG
          },
          '&:last-child': {
            borderEndStartRadius: borderRadiusLG,
            borderEndEndRadius: borderRadiusLG
          },
          '&:not(:last-child)': {
            borderBottom: `${token.lineWidth}px ${token.lineType} ${token.colorSplit}`
          },
          [`${componentCls}-body`]: {
            width: floatButtonSize - token.paddingXXS * 2,
            height: floatButtonSize - token.paddingXXS * 2
          }
        }
      }
    },
    [`${groupPrefixCls}-circle-shadow`]: {
      boxShadow: 'none'
    },
    [`${groupPrefixCls}-square-shadow`]: {
      boxShadow: token.boxShadowSecondary,
      [`${componentCls}-square`]: {
        boxShadow: 'none',
        padding: token.paddingXXS,
        [`${componentCls}-body`]: {
          width: floatButtonSize - token.paddingXXS * 2,
          height: floatButtonSize - token.paddingXXS * 2
        }
      }
    }
  };
};
// ============================== Shared ==============================
const sharedFloatButtonStyle = token => {
  const {
    componentCls,
    floatButtonIconSize,
    floatButtonSize,
    borderRadiusLG
  } = token;
  return {
    [componentCls]: Object.assign(Object.assign({}, (0, _style.resetComponent)(token)), {
      border: 'none',
      position: 'fixed',
      cursor: 'pointer',
      overflow: 'hidden',
      zIndex: 99,
      display: 'block',
      justifyContent: 'center',
      alignItems: 'center',
      width: floatButtonSize,
      height: floatButtonSize,
      insetInlineEnd: token.floatButtonInsetInlineEnd,
      insetBlockEnd: token.floatButtonInsetBlockEnd,
      boxShadow: token.boxShadowSecondary,
      // Pure Panel
      '&-pure': {
        position: 'relative',
        inset: 'auto'
      },
      '&:empty': {
        display: 'none'
      },
      [`${componentCls}-body`]: {
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        transition: `all ${token.motionDurationMid}`,
        [`${componentCls}-content`]: {
          overflow: 'hidden',
          textAlign: 'center',
          minHeight: floatButtonSize,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: `2px 4px`,
          [`${componentCls}-icon`]: {
            textAlign: 'center',
            margin: 'auto',
            width: floatButtonIconSize,
            fontSize: floatButtonIconSize,
            lineHeight: 1
          }
        }
      }
    }),
    [`${componentCls}-rtl`]: {
      direction: 'rtl'
    },
    [`${componentCls}-circle`]: {
      height: floatButtonSize,
      borderRadius: '50%',
      [`${componentCls}-body`]: {
        borderRadius: '50%'
      }
    },
    [`${componentCls}-square`]: {
      height: 'auto',
      minHeight: floatButtonSize,
      borderRadius: borderRadiusLG,
      [`${componentCls}-body`]: {
        height: 'auto',
        borderRadius: token.borderRadiusSM
      }
    },
    [`${componentCls}-default`]: {
      backgroundColor: token.floatButtonBackgroundColor,
      transition: `background-color ${token.motionDurationMid}`,
      [`${componentCls}-body`]: {
        backgroundColor: token.floatButtonBackgroundColor,
        transition: `background-color ${token.motionDurationMid}`,
        '&:hover': {
          backgroundColor: token.colorFillContent
        },
        [`${componentCls}-content`]: {
          [`${componentCls}-icon`]: {
            color: token.colorText
          },
          [`${componentCls}-description`]: {
            display: 'flex',
            alignItems: 'center',
            lineHeight: `${token.fontSizeLG}px`,
            color: token.colorText,
            fontSize: token.fontSizeSM
          }
        }
      }
    },
    [`${componentCls}-primary`]: {
      backgroundColor: token.colorPrimary,
      [`${componentCls}-body`]: {
        backgroundColor: token.colorPrimary,
        transition: `background-color ${token.motionDurationMid}`,
        '&:hover': {
          backgroundColor: token.colorPrimaryHover
        },
        [`${componentCls}-content`]: {
          [`${componentCls}-icon`]: {
            color: token.colorTextLightSolid
          },
          [`${componentCls}-description`]: {
            display: 'flex',
            alignItems: 'center',
            lineHeight: `${token.fontSizeLG}px`,
            color: token.colorTextLightSolid,
            fontSize: token.fontSizeSM
          }
        }
      }
    }
  };
};
// ============================== Export ==============================
var _default = (0, _internal.genComponentStyleHook)('FloatButton', token => {
  const {
    colorTextLightSolid,
    colorBgElevated,
    controlHeightLG,
    marginXXL,
    marginLG,
    fontSize,
    fontSizeIcon,
    controlItemBgHover
  } = token;
  const floatButtonToken = (0, _internal.mergeToken)(token, {
    floatButtonBackgroundColor: colorBgElevated,
    floatButtonColor: colorTextLightSolid,
    floatButtonHoverBackgroundColor: controlItemBgHover,
    floatButtonFontSize: fontSize,
    floatButtonIconSize: fontSizeIcon * 1.5,
    floatButtonSize: controlHeightLG,
    floatButtonInsetBlockEnd: marginXXL,
    floatButtonInsetInlineEnd: marginLG
  });
  return [floatButtonGroupStyle(floatButtonToken), sharedFloatButtonStyle(floatButtonToken), (0, _fade.initFadeMotion)(token), initFloatButtonGroupMotion(floatButtonToken)];
});
exports.default = _default;