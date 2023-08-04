"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseWidthHeight = parseWidthHeight;
exports.warnCheck = warnCheck;
var _warning = _interopRequireDefault(require("rc-util/lib/warning"));
function parseWidthHeight(value) {
  if (typeof value === 'string' && String(Number(value)) === value) {
    (0, _warning.default)(false, 'Invalid value type of `width` or `height` which should be number type instead.');
    return Number(value);
  }
  return value;
}
function warnCheck(props) {
  (0, _warning.default)(!('wrapperClassName' in props), "'wrapperClassName' is removed. Please use 'rootClassName' instead.");
}