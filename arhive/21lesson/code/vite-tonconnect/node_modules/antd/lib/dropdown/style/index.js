"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _style = require("../../style");
var _motion = require("../../style/motion");
var _placementArrow = _interopRequireWildcard(require("../../style/placementArrow"));
var _internal = require("../../theme/internal");
var _button = _interopRequireDefault(require("./button"));
var _status = _interopRequireDefault(require("./status"));
// =============================== Base ===============================
const genBaseStyle = token => {
  const {
    componentCls,
    menuCls,
    zIndexPopup,
    dropdownArrowDistance,
    sizePopupArrow,
    antCls,
    iconCls,
    motionDurationMid,
    dropdownPaddingVertical,
    fontSize,
    dropdownEdgeChildPadding,
    colorTextDisabled,
    fontSizeIcon,
    controlPaddingHorizontal,
    colorBgElevated
  } = token;
  return [{
    [componentCls]: Object.assign(Object.assign({}, (0, _style.resetComponent)(token)), {
      position: 'absolute',
      top: -9999,
      left: {
        _skip_check_: true,
        value: -9999
      },
      zIndex: zIndexPopup,
      display: 'block',
      // A placeholder out of dropdown visible range to avoid close when user moving
      '&::before': {
        position: 'absolute',
        insetBlock: -dropdownArrowDistance + sizePopupArrow / 2,
        // insetInlineStart: -7, // FIXME: Seems not work for hidden element
        zIndex: -9999,
        opacity: 0.0001,
        content: '""'
      },
      [`${componentCls}-wrap`]: {
        position: 'relative',
        [`${antCls}-btn > ${iconCls}-down`]: {
          fontSize: fontSizeIcon
        },
        [`${iconCls}-down::before`]: {
          transition: `transform ${motionDurationMid}`
        }
      },
      [`${componentCls}-wrap-open`]: {
        [`${iconCls}-down::before`]: {
          transform: `rotate(180deg)`
        }
      },
      [`
        &-hidden,
        &-menu-hidden,
        &-menu-submenu-hidden
      `]: {
        display: 'none'
      },
      // =============================================================
      // ==                         Motion                          ==
      // =============================================================
      // When position is not enough for dropdown, the placement will revert.
      // We will handle this with revert motion name.
      [`&${antCls}-slide-down-enter${antCls}-slide-down-enter-active${componentCls}-placement-bottomLeft,
          &${antCls}-slide-down-appear${antCls}-slide-down-appear-active${componentCls}-placement-bottomLeft,
          &${antCls}-slide-down-enter${antCls}-slide-down-enter-active${componentCls}-placement-bottom,
          &${antCls}-slide-down-appear${antCls}-slide-down-appear-active${componentCls}-placement-bottom,
          &${antCls}-slide-down-enter${antCls}-slide-down-enter-active${componentCls}-placement-bottomRight,
          &${antCls}-slide-down-appear${antCls}-slide-down-appear-active${componentCls}-placement-bottomRight`]: {
        animationName: _motion.slideUpIn
      },
      [`&${antCls}-slide-up-enter${antCls}-slide-up-enter-active${componentCls}-placement-topLeft,
          &${antCls}-slide-up-appear${antCls}-slide-up-appear-active${componentCls}-placement-topLeft,
          &${antCls}-slide-up-enter${antCls}-slide-up-enter-active${componentCls}-placement-top,
          &${antCls}-slide-up-appear${antCls}-slide-up-appear-active${componentCls}-placement-top,
          &${antCls}-slide-up-enter${antCls}-slide-up-enter-active${componentCls}-placement-topRight,
          &${antCls}-slide-up-appear${antCls}-slide-up-appear-active${componentCls}-placement-topRight`]: {
        animationName: _motion.slideDownIn
      },
      [`&${antCls}-slide-down-leave${antCls}-slide-down-leave-active${componentCls}-placement-bottomLeft,
          &${antCls}-slide-down-leave${antCls}-slide-down-leave-active${componentCls}-placement-bottom,
          &${antCls}-slide-down-leave${antCls}-slide-down-leave-active${componentCls}-placement-bottomRight`]: {
        animationName: _motion.slideUpOut
      },
      [`&${antCls}-slide-up-leave${antCls}-slide-up-leave-active${componentCls}-placement-topLeft,
          &${antCls}-slide-up-leave${antCls}-slide-up-leave-active${componentCls}-placement-top,
          &${antCls}-slide-up-leave${antCls}-slide-up-leave-active${componentCls}-placement-topRight`]: {
        animationName: _motion.slideDownOut
      }
    })
  },
  // =============================================================
  // ==                        Arrow style                      ==
  // =============================================================
  (0, _placementArrow.default)(token, {
    colorBg: colorBgElevated,
    limitVerticalRadius: true,
    arrowPlacement: {
      top: true,
      bottom: true
    }
  }), {
    // =============================================================
    // ==                          Menu                           ==
    // =============================================================
    [`${componentCls} ${menuCls}`]: {
      position: 'relative',
      margin: 0
    },
    [`${menuCls}-submenu-popup`]: {
      position: 'absolute',
      zIndex: zIndexPopup,
      background: 'transparent',
      boxShadow: 'none',
      transformOrigin: '0 0',
      'ul, li': {
        listStyle: 'none',
        margin: 0
      }
    },
    [`${componentCls}, ${componentCls}-menu-submenu`]: {
      [menuCls]: Object.assign(Object.assign({
        padding: dropdownEdgeChildPadding,
        listStyleType: 'none',
        backgroundColor: colorBgElevated,
        backgroundClip: 'padding-box',
        borderRadius: token.borderRadiusLG,
        outline: 'none',
        boxShadow: token.boxShadowSecondary
      }, (0, _style.genFocusStyle)(token)), {
        [`${menuCls}-item-group-title`]: {
          padding: `${dropdownPaddingVertical}px ${controlPaddingHorizontal}px`,
          color: token.colorTextDescription,
          transition: `all ${motionDurationMid}`
        },
        // ======================= Item Content =======================
        [`${menuCls}-item`]: {
          position: 'relative',
          display: 'flex',
          alignItems: 'center'
        },
        [`${menuCls}-item-icon`]: {
          minWidth: fontSize,
          marginInlineEnd: token.marginXS,
          fontSize: token.fontSizeSM
        },
        [`${menuCls}-title-content`]: {
          flex: 'auto',
          '> a': {
            color: 'inherit',
            transition: `all ${motionDurationMid}`,
            '&:hover': {
              color: 'inherit'
            },
            '&::after': {
              position: 'absolute',
              inset: 0,
              content: '""'
            }
          }
        },
        // =========================== Item ===========================
        [`${menuCls}-item, ${menuCls}-submenu-title`]: Object.assign(Object.assign({
          clear: 'both',
          margin: 0,
          padding: `${dropdownPaddingVertical}px ${controlPaddingHorizontal}px`,
          color: token.colorText,
          fontWeight: 'normal',
          fontSize,
          lineHeight: token.lineHeight,
          cursor: 'pointer',
          transition: `all ${motionDurationMid}`,
          borderRadius: token.borderRadiusSM,
          [`&:hover, &-active`]: {
            backgroundColor: token.controlItemBgHover
          }
        }, (0, _style.genFocusStyle)(token)), {
          '&-selected': {
            color: token.colorPrimary,
            backgroundColor: token.controlItemBgActive,
            '&:hover, &-active': {
              backgroundColor: token.controlItemBgActiveHover
            }
          },
          '&-disabled': {
            color: colorTextDisabled,
            cursor: 'not-allowed',
            '&:hover': {
              color: colorTextDisabled,
              backgroundColor: colorBgElevated,
              cursor: 'not-allowed'
            },
            a: {
              pointerEvents: 'none'
            }
          },
          '&-divider': {
            height: 1,
            margin: `${token.marginXXS}px 0`,
            overflow: 'hidden',
            lineHeight: 0,
            backgroundColor: token.colorSplit
          },
          [`${componentCls}-menu-submenu-expand-icon`]: {
            position: 'absolute',
            insetInlineEnd: token.paddingXS,
            [`${componentCls}-menu-submenu-arrow-icon`]: {
              marginInlineEnd: '0 !important',
              color: token.colorTextDescription,
              fontSize: fontSizeIcon,
              fontStyle: 'normal'
            }
          }
        }),
        [`${menuCls}-item-group-list`]: {
          margin: `0 ${token.marginXS}px`,
          padding: 0,
          listStyle: 'none'
        },
        [`${menuCls}-submenu-title`]: {
          paddingInlineEnd: controlPaddingHorizontal + token.fontSizeSM
        },
        [`${menuCls}-submenu-vertical`]: {
          position: 'relative'
        },
        [`${menuCls}-submenu${menuCls}-submenu-disabled ${componentCls}-menu-submenu-title`]: {
          [`&, ${componentCls}-menu-submenu-arrow-icon`]: {
            color: colorTextDisabled,
            backgroundColor: colorBgElevated,
            cursor: 'not-allowed'
          }
        },
        // https://github.com/ant-design/ant-design/issues/19264
        [`${menuCls}-submenu-selected ${componentCls}-menu-submenu-title`]: {
          color: token.colorPrimary
        }
      })
    }
  },
  // Follow code may reuse in other components
  [(0, _motion.initSlideMotion)(token, 'slide-up'), (0, _motion.initSlideMotion)(token, 'slide-down'), (0, _motion.initMoveMotion)(token, 'move-up'), (0, _motion.initMoveMotion)(token, 'move-down'), (0, _motion.initZoomMotion)(token, 'zoom-big')]];
};
// ============================== Export ==============================
var _default = (0, _internal.genComponentStyleHook)('Dropdown', (token, _ref) => {
  let {
    rootPrefixCls
  } = _ref;
  const {
    marginXXS,
    sizePopupArrow,
    controlHeight,
    fontSize,
    lineHeight,
    paddingXXS,
    componentCls,
    borderRadiusLG
  } = token;
  const dropdownPaddingVertical = (controlHeight - fontSize * lineHeight) / 2;
  const {
    dropdownArrowOffset
  } = (0, _placementArrow.getArrowOffset)({
    contentRadius: borderRadiusLG
  });
  const dropdownToken = (0, _internal.mergeToken)(token, {
    menuCls: `${componentCls}-menu`,
    rootPrefixCls,
    dropdownArrowDistance: sizePopupArrow / 2 + marginXXS,
    dropdownArrowOffset,
    dropdownPaddingVertical,
    dropdownEdgeChildPadding: paddingXXS
  });
  return [genBaseStyle(dropdownToken), (0, _button.default)(dropdownToken), (0, _status.default)(dropdownToken)];
}, token => ({
  zIndexPopup: token.zIndexPopupBase + 50
}));
exports.default = _default;