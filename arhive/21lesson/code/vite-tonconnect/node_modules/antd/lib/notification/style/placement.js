"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _cssinjs = require("@ant-design/cssinjs");
const genNotificationPlacementStyle = token => {
  const {
    componentCls,
    width,
    notificationMarginEdge
  } = token;
  const notificationTopFadeIn = new _cssinjs.Keyframes('antNotificationTopFadeIn', {
    '0%': {
      marginTop: '-100%',
      opacity: 0
    },
    '100%': {
      marginTop: 0,
      opacity: 1
    }
  });
  const notificationBottomFadeIn = new _cssinjs.Keyframes('antNotificationBottomFadeIn', {
    '0%': {
      marginBottom: '-100%',
      opacity: 0
    },
    '100%': {
      marginBottom: 0,
      opacity: 1
    }
  });
  const notificationLeftFadeIn = new _cssinjs.Keyframes('antNotificationLeftFadeIn', {
    '0%': {
      right: {
        _skip_check_: true,
        value: width
      },
      opacity: 0
    },
    '100%': {
      right: {
        _skip_check_: true,
        value: 0
      },
      opacity: 1
    }
  });
  return {
    [`&${componentCls}-top, &${componentCls}-bottom`]: {
      marginInline: 0
    },
    [`&${componentCls}-top`]: {
      [`${componentCls}-fade-enter${componentCls}-fade-enter-active, ${componentCls}-fade-appear${componentCls}-fade-appear-active`]: {
        animationName: notificationTopFadeIn
      }
    },
    [`&${componentCls}-bottom`]: {
      [`${componentCls}-fade-enter${componentCls}-fade-enter-active, ${componentCls}-fade-appear${componentCls}-fade-appear-active`]: {
        animationName: notificationBottomFadeIn
      }
    },
    [`&${componentCls}-topLeft, &${componentCls}-bottomLeft`]: {
      marginInlineEnd: 0,
      marginInlineStart: notificationMarginEdge,
      [`${componentCls}-fade-enter${componentCls}-fade-enter-active, ${componentCls}-fade-appear${componentCls}-fade-appear-active`]: {
        animationName: notificationLeftFadeIn
      }
    }
  };
};
var _default = genNotificationPlacementStyle;
exports.default = _default;