"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.genPreviewSwitchStyle = exports.genPreviewOperationsStyle = exports.genImagePreviewStyle = exports.genImageMaskStyle = exports.genBoxStyle = exports.default = void 0;
var _tinycolor = require("@ctrl/tinycolor");
var _style = require("../../modal/style");
var _motion = require("../../style/motion");
var _internal = require("../../theme/internal");
var _style2 = require("../../style");
const genBoxStyle = position => ({
  position: position || 'absolute',
  inset: 0
});
exports.genBoxStyle = genBoxStyle;
const genImageMaskStyle = token => {
  const {
    iconCls,
    motionDurationSlow,
    paddingXXS,
    marginXXS,
    prefixCls
  } = token;
  return {
    position: 'absolute',
    inset: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
    background: new _tinycolor.TinyColor('#000').setAlpha(0.5).toRgbString(),
    cursor: 'pointer',
    opacity: 0,
    transition: `opacity ${motionDurationSlow}`,
    [`.${prefixCls}-mask-info`]: Object.assign(Object.assign({}, _style2.textEllipsis), {
      padding: `0 ${paddingXXS}px`,
      [iconCls]: {
        marginInlineEnd: marginXXS,
        svg: {
          verticalAlign: 'baseline'
        }
      }
    })
  };
};
exports.genImageMaskStyle = genImageMaskStyle;
const genPreviewOperationsStyle = token => {
  const {
    previewCls,
    modalMaskBg,
    paddingSM,
    imagePreviewOperationDisabledColor,
    motionDurationSlow
  } = token;
  const operationBg = new _tinycolor.TinyColor(modalMaskBg).setAlpha(0.1);
  const operationBgHover = operationBg.clone().setAlpha(0.2);
  return {
    [`${previewCls}-operations`]: Object.assign(Object.assign({}, (0, _style2.resetComponent)(token)), {
      display: 'flex',
      flexDirection: 'row-reverse',
      alignItems: 'center',
      color: token.imagePreviewOperationColor,
      listStyle: 'none',
      background: operationBg.toRgbString(),
      pointerEvents: 'auto',
      '&-operation': {
        marginInlineStart: paddingSM,
        padding: paddingSM,
        cursor: 'pointer',
        transition: `all ${motionDurationSlow}`,
        '&:hover': {
          background: operationBgHover.toRgbString()
        },
        '&-disabled': {
          color: imagePreviewOperationDisabledColor,
          pointerEvents: 'none'
        },
        '&:last-of-type': {
          marginInlineStart: 0
        }
      },
      '&-progress': {
        position: 'absolute',
        left: {
          _skip_check_: true,
          value: '50%'
        },
        transform: 'translateX(-50%)'
      },
      '&-icon': {
        fontSize: token.imagePreviewOperationSize
      }
    })
  };
};
exports.genPreviewOperationsStyle = genPreviewOperationsStyle;
const genPreviewSwitchStyle = token => {
  const {
    modalMaskBg,
    iconCls,
    imagePreviewOperationDisabledColor,
    previewCls,
    zIndexPopup,
    motionDurationSlow
  } = token;
  const operationBg = new _tinycolor.TinyColor(modalMaskBg).setAlpha(0.1);
  const operationBgHover = operationBg.clone().setAlpha(0.2);
  return {
    [`${previewCls}-switch-left, ${previewCls}-switch-right`]: {
      position: 'fixed',
      insetBlockStart: '50%',
      zIndex: zIndexPopup + 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: token.imagePreviewSwitchSize,
      height: token.imagePreviewSwitchSize,
      marginTop: -token.imagePreviewSwitchSize / 2,
      color: token.imagePreviewOperationColor,
      background: operationBg.toRgbString(),
      borderRadius: '50%',
      transform: `translateY(-50%)`,
      cursor: 'pointer',
      transition: `all ${motionDurationSlow}`,
      pointerEvents: 'auto',
      '&:hover': {
        background: operationBgHover.toRgbString()
      },
      [`&-disabled`]: {
        '&, &:hover': {
          color: imagePreviewOperationDisabledColor,
          background: 'transparent',
          cursor: 'not-allowed',
          [`> ${iconCls}`]: {
            cursor: 'not-allowed'
          }
        }
      },
      [`> ${iconCls}`]: {
        fontSize: token.imagePreviewOperationSize
      }
    },
    [`${previewCls}-switch-left`]: {
      insetInlineStart: token.marginSM
    },
    [`${previewCls}-switch-right`]: {
      insetInlineEnd: token.marginSM
    }
  };
};
exports.genPreviewSwitchStyle = genPreviewSwitchStyle;
const genImagePreviewStyle = token => {
  const {
    motionEaseOut,
    previewCls,
    motionDurationSlow,
    componentCls
  } = token;
  return [{
    [`${componentCls}-preview-root`]: {
      [previewCls]: {
        height: '100%',
        textAlign: 'center',
        pointerEvents: 'none'
      },
      [`${previewCls}-body`]: Object.assign(Object.assign({}, genBoxStyle()), {
        overflow: 'hidden'
      }),
      [`${previewCls}-img`]: {
        maxWidth: '100%',
        maxHeight: '100%',
        verticalAlign: 'middle',
        transform: 'scale3d(1, 1, 1)',
        cursor: 'grab',
        transition: `transform ${motionDurationSlow} ${motionEaseOut} 0s`,
        userSelect: 'none',
        pointerEvents: 'auto',
        '&-wrapper': Object.assign(Object.assign({}, genBoxStyle()), {
          transition: `transform ${motionDurationSlow} ${motionEaseOut} 0s`,
          // https://github.com/ant-design/ant-design/issues/39913
          // TailwindCSS will reset img default style.
          // Let's set back.
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          '&::before': {
            display: 'inline-block',
            width: 1,
            height: '50%',
            marginInlineEnd: -1,
            content: '""'
          }
        })
      },
      [`${previewCls}-moving`]: {
        [`${previewCls}-preview-img`]: {
          cursor: 'grabbing',
          '&-wrapper': {
            transitionDuration: '0s'
          }
        }
      }
    }
  },
  // Override
  {
    [`${componentCls}-preview-root`]: {
      [`${previewCls}-wrap`]: {
        zIndex: token.zIndexPopup
      }
    }
  },
  // Preview operations & switch
  {
    [`${componentCls}-preview-operations-wrapper`]: {
      position: 'fixed',
      insetBlockStart: 0,
      insetInlineEnd: 0,
      zIndex: token.zIndexPopup + 1,
      width: '100%'
    },
    '&': [genPreviewOperationsStyle(token), genPreviewSwitchStyle(token)]
  }];
};
exports.genImagePreviewStyle = genImagePreviewStyle;
const genImageStyle = token => {
  const {
    componentCls
  } = token;
  return {
    // ============================== image ==============================
    [componentCls]: {
      position: 'relative',
      display: 'inline-block',
      [`${componentCls}-img`]: {
        width: '100%',
        height: 'auto',
        verticalAlign: 'middle'
      },
      [`${componentCls}-img-placeholder`]: {
        backgroundColor: token.colorBgContainerDisabled,
        backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTQuNSAyLjVoLTEzQS41LjUgMCAwIDAgMSAzdjEwYS41LjUgMCAwIDAgLjUuNWgxM2EuNS41IDAgMCAwIC41LS41VjNhLjUuNSAwIDAgMC0uNS0uNXpNNS4yODEgNC43NWExIDEgMCAwIDEgMCAyIDEgMSAwIDAgMSAwLTJ6bTguMDMgNi44M2EuMTI3LjEyNyAwIDAgMS0uMDgxLjAzSDIuNzY5YS4xMjUuMTI1IDAgMCAxLS4wOTYtLjIwN2wyLjY2MS0zLjE1NmEuMTI2LjEyNiAwIDAgMSAuMTc3LS4wMTZsLjAxNi4wMTZMNy4wOCAxMC4wOWwyLjQ3LTIuOTNhLjEyNi4xMjYgMCAwIDEgLjE3Ny0uMDE2bC4wMTUuMDE2IDMuNTg4IDQuMjQ0YS4xMjcuMTI3IDAgMCAxLS4wMi4xNzV6IiBmaWxsPSIjOEM4QzhDIiBmaWxsLXJ1bGU9Im5vbnplcm8iLz48L3N2Zz4=')",
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
        backgroundSize: '30%'
      },
      [`${componentCls}-mask`]: Object.assign({}, genImageMaskStyle(token)),
      [`${componentCls}-mask:hover`]: {
        opacity: 1
      },
      [`${componentCls}-placeholder`]: Object.assign({}, genBoxStyle())
    }
  };
};
const genPreviewMotion = token => {
  const {
    previewCls
  } = token;
  return {
    [`${previewCls}-root`]: (0, _motion.initZoomMotion)(token, 'zoom'),
    [`&`]: (0, _motion.initFadeMotion)(token, true)
  };
};
// ============================== Export ==============================
var _default = (0, _internal.genComponentStyleHook)('Image', token => {
  const imagePreviewOperationColor = new _tinycolor.TinyColor(token.colorTextLightSolid);
  const previewCls = `${token.componentCls}-preview`;
  const imageToken = (0, _internal.mergeToken)(token, {
    previewCls,
    imagePreviewOperationColor: imagePreviewOperationColor.toRgbString(),
    imagePreviewOperationDisabledColor: new _tinycolor.TinyColor(imagePreviewOperationColor).setAlpha(0.25).toRgbString(),
    modalMaskBg: new _tinycolor.TinyColor('#000').setAlpha(0.45).toRgbString(),
    imagePreviewOperationSize: token.fontSizeIcon * 1.5,
    imagePreviewSwitchSize: token.controlHeightLG
  });
  return [genImageStyle(imageToken), genImagePreviewStyle(imageToken), (0, _style.genModalMaskStyle)((0, _internal.mergeToken)(imageToken, {
    componentCls: previewCls
  })), genPreviewMotion(imageToken)];
}, token => ({
  zIndexPopup: token.zIndexPopupBase + 80
}));
exports.default = _default;