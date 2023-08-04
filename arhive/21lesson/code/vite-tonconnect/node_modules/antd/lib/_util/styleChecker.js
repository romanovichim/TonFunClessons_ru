"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.detectFlexGapSupported = exports.canUseDocElement = void 0;
Object.defineProperty(exports, "isStyleSupport", {
  enumerable: true,
  get: function () {
    return _styleChecker.isStyleSupport;
  }
});
var _canUseDom = _interopRequireDefault(require("rc-util/lib/Dom/canUseDom"));
var _styleChecker = require("rc-util/lib/Dom/styleChecker");
const canUseDocElement = () => (0, _canUseDom.default)() && window.document.documentElement;
exports.canUseDocElement = canUseDocElement;
let flexGapSupported;
const detectFlexGapSupported = () => {
  if (!canUseDocElement()) {
    return false;
  }
  if (flexGapSupported !== undefined) {
    return flexGapSupported;
  }
  // create flex container with row-gap set
  const flex = document.createElement('div');
  flex.style.display = 'flex';
  flex.style.flexDirection = 'column';
  flex.style.rowGap = '1px';
  // create two, elements inside it
  flex.appendChild(document.createElement('div'));
  flex.appendChild(document.createElement('div'));
  // append to the DOM (needed to obtain scrollHeight)
  document.body.appendChild(flex);
  flexGapSupported = flex.scrollHeight === 1; // flex container should be 1px high from the row-gap
  document.body.removeChild(flex);
  return flexGapSupported;
};
exports.detectFlexGapSupported = detectFlexGapSupported;