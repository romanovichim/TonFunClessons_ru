"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _motion = require("../../style/motion");
var _style = require("../../style");
const genItemStyle = token => {
  const {
    controlPaddingHorizontal
  } = token;
  return {
    position: 'relative',
    display: 'block',
    minHeight: token.controlHeight,
    padding: `${(token.controlHeight - token.fontSize * token.lineHeight) / 2}px ${controlPaddingHorizontal}px`,
    color: token.colorText,
    fontWeight: 'normal',
    fontSize: token.fontSize,
    lineHeight: token.lineHeight,
    boxSizing: 'border-box'
  };
};
const genSingleStyle = token => {
  const {
    antCls,
    componentCls
  } = token;
  const selectItemCls = `${componentCls}-item`;
  return [{
    [`${componentCls}-dropdown`]: Object.assign(Object.assign({}, (0, _style.resetComponent)(token)), {
      position: 'absolute',
      top: -9999,
      zIndex: token.zIndexPopup,
      boxSizing: 'border-box',
      padding: token.paddingXXS,
      overflow: 'hidden',
      fontSize: token.fontSize,
      // Fix select render lag of long text in chrome
      // https://github.com/ant-design/ant-design/issues/11456
      // https://github.com/ant-design/ant-design/issues/11843
      fontVariant: 'initial',
      backgroundColor: token.colorBgElevated,
      borderRadius: token.borderRadiusLG,
      outline: 'none',
      boxShadow: token.boxShadowSecondary,
      [`
            &${antCls}-slide-up-enter${antCls}-slide-up-enter-active${componentCls}-dropdown-placement-bottomLeft,
            &${antCls}-slide-up-appear${antCls}-slide-up-appear-active${componentCls}-dropdown-placement-bottomLeft
          `]: {
        animationName: _motion.slideUpIn
      },
      [`
            &${antCls}-slide-up-enter${antCls}-slide-up-enter-active${componentCls}-dropdown-placement-topLeft,
            &${antCls}-slide-up-appear${antCls}-slide-up-appear-active${componentCls}-dropdown-placement-topLeft
          `]: {
        animationName: _motion.slideDownIn
      },
      [`&${antCls}-slide-up-leave${antCls}-slide-up-leave-active${componentCls}-dropdown-placement-bottomLeft`]: {
        animationName: _motion.slideUpOut
      },
      [`&${antCls}-slide-up-leave${antCls}-slide-up-leave-active${componentCls}-dropdown-placement-topLeft`]: {
        animationName: _motion.slideDownOut
      },
      '&-hidden': {
        display: 'none'
      },
      '&-empty': {
        color: token.colorTextDisabled
      },
      // ========================= Options =========================
      [`${selectItemCls}-empty`]: Object.assign(Object.assign({}, genItemStyle(token)), {
        color: token.colorTextDisabled
      }),
      [`${selectItemCls}`]: Object.assign(Object.assign({}, genItemStyle(token)), {
        cursor: 'pointer',
        transition: `background ${token.motionDurationSlow} ease`,
        borderRadius: token.borderRadiusSM,
        // =========== Group ============
        '&-group': {
          color: token.colorTextDescription,
          fontSize: token.fontSizeSM,
          cursor: 'default'
        },
        // =========== Option ===========
        '&-option': {
          display: 'flex',
          '&-content': Object.assign(Object.assign({
            flex: 'auto'
          }, _style.textEllipsis), {
            '> *': Object.assign({}, _style.textEllipsis)
          }),
          '&-state': {
            flex: 'none'
          },
          [`&-active:not(${selectItemCls}-option-disabled)`]: {
            backgroundColor: token.controlItemBgHover
          },
          [`&-selected:not(${selectItemCls}-option-disabled)`]: {
            color: token.colorText,
            fontWeight: token.fontWeightStrong,
            backgroundColor: token.controlItemBgActive,
            [`${selectItemCls}-option-state`]: {
              color: token.colorPrimary
            }
          },
          '&-disabled': {
            [`&${selectItemCls}-option-selected`]: {
              backgroundColor: token.colorBgContainerDisabled
            },
            color: token.colorTextDisabled,
            cursor: 'not-allowed'
          },
          '&-grouped': {
            paddingInlineStart: token.controlPaddingHorizontal * 2
          }
        }
      }),
      // =========================== RTL ===========================
      '&-rtl': {
        direction: 'rtl'
      }
    })
  },
  // Follow code may reuse in other components
  (0, _motion.initSlideMotion)(token, 'slide-up'), (0, _motion.initSlideMotion)(token, 'slide-down'), (0, _motion.initMoveMotion)(token, 'move-up'), (0, _motion.initMoveMotion)(token, 'move-down')];
};
var _default = genSingleStyle;
exports.default = _default;