"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.slideUpOut = exports.slideUpIn = exports.slideRightOut = exports.slideRightIn = exports.slideLeftOut = exports.slideLeftIn = exports.slideDownOut = exports.slideDownIn = exports.initSlideMotion = void 0;
var _cssinjs = require("@ant-design/cssinjs");
var _motion = require("./motion");
const slideUpIn = new _cssinjs.Keyframes('antSlideUpIn', {
  '0%': {
    transform: 'scaleY(0.8)',
    transformOrigin: '0% 0%',
    opacity: 0
  },
  '100%': {
    transform: 'scaleY(1)',
    transformOrigin: '0% 0%',
    opacity: 1
  }
});
exports.slideUpIn = slideUpIn;
const slideUpOut = new _cssinjs.Keyframes('antSlideUpOut', {
  '0%': {
    transform: 'scaleY(1)',
    transformOrigin: '0% 0%',
    opacity: 1
  },
  '100%': {
    transform: 'scaleY(0.8)',
    transformOrigin: '0% 0%',
    opacity: 0
  }
});
exports.slideUpOut = slideUpOut;
const slideDownIn = new _cssinjs.Keyframes('antSlideDownIn', {
  '0%': {
    transform: 'scaleY(0.8)',
    transformOrigin: '100% 100%',
    opacity: 0
  },
  '100%': {
    transform: 'scaleY(1)',
    transformOrigin: '100% 100%',
    opacity: 1
  }
});
exports.slideDownIn = slideDownIn;
const slideDownOut = new _cssinjs.Keyframes('antSlideDownOut', {
  '0%': {
    transform: 'scaleY(1)',
    transformOrigin: '100% 100%',
    opacity: 1
  },
  '100%': {
    transform: 'scaleY(0.8)',
    transformOrigin: '100% 100%',
    opacity: 0
  }
});
exports.slideDownOut = slideDownOut;
const slideLeftIn = new _cssinjs.Keyframes('antSlideLeftIn', {
  '0%': {
    transform: 'scaleX(0.8)',
    transformOrigin: '0% 0%',
    opacity: 0
  },
  '100%': {
    transform: 'scaleX(1)',
    transformOrigin: '0% 0%',
    opacity: 1
  }
});
exports.slideLeftIn = slideLeftIn;
const slideLeftOut = new _cssinjs.Keyframes('antSlideLeftOut', {
  '0%': {
    transform: 'scaleX(1)',
    transformOrigin: '0% 0%',
    opacity: 1
  },
  '100%': {
    transform: 'scaleX(0.8)',
    transformOrigin: '0% 0%',
    opacity: 0
  }
});
exports.slideLeftOut = slideLeftOut;
const slideRightIn = new _cssinjs.Keyframes('antSlideRightIn', {
  '0%': {
    transform: 'scaleX(0.8)',
    transformOrigin: '100% 0%',
    opacity: 0
  },
  '100%': {
    transform: 'scaleX(1)',
    transformOrigin: '100% 0%',
    opacity: 1
  }
});
exports.slideRightIn = slideRightIn;
const slideRightOut = new _cssinjs.Keyframes('antSlideRightOut', {
  '0%': {
    transform: 'scaleX(1)',
    transformOrigin: '100% 0%',
    opacity: 1
  },
  '100%': {
    transform: 'scaleX(0.8)',
    transformOrigin: '100% 0%',
    opacity: 0
  }
});
exports.slideRightOut = slideRightOut;
const slideMotion = {
  'slide-up': {
    inKeyframes: slideUpIn,
    outKeyframes: slideUpOut
  },
  'slide-down': {
    inKeyframes: slideDownIn,
    outKeyframes: slideDownOut
  },
  'slide-left': {
    inKeyframes: slideLeftIn,
    outKeyframes: slideLeftOut
  },
  'slide-right': {
    inKeyframes: slideRightIn,
    outKeyframes: slideRightOut
  }
};
const initSlideMotion = (token, motionName) => {
  const {
    antCls
  } = token;
  const motionCls = `${antCls}-${motionName}`;
  const {
    inKeyframes,
    outKeyframes
  } = slideMotion[motionName];
  return [(0, _motion.initMotion)(motionCls, inKeyframes, outKeyframes, token.motionDurationMid), {
    [`
      ${motionCls}-enter,
      ${motionCls}-appear
    `]: {
      transform: 'scale(0)',
      transformOrigin: '0% 0%',
      opacity: 0,
      animationTimingFunction: token.motionEaseOutQuint,
      [`&-prepare`]: {
        transform: 'scale(1)'
      }
    },
    [`${motionCls}-leave`]: {
      animationTimingFunction: token.motionEaseInQuint
    }
  }];
};
exports.initSlideMotion = initSlideMotion;