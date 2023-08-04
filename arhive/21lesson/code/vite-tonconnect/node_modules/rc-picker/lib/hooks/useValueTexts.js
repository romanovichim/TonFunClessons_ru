"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useValueTexts;
var _useMemo = _interopRequireDefault(require("rc-util/lib/hooks/useMemo"));
var _isEqual = _interopRequireDefault(require("rc-util/lib/isEqual"));
var _dateUtil = require("../utils/dateUtil");
function useValueTexts(value, _ref) {
  var formatList = _ref.formatList,
    generateConfig = _ref.generateConfig,
    locale = _ref.locale;
  return (0, _useMemo.default)(function () {
    if (!value) {
      return [[''], ''];
    }

    // We will convert data format back to first format
    var firstValueText = '';
    var fullValueTexts = [];
    for (var i = 0; i < formatList.length; i += 1) {
      var format = formatList[i];
      var formatStr = (0, _dateUtil.formatValue)(value, {
        generateConfig: generateConfig,
        locale: locale,
        format: format
      });
      fullValueTexts.push(formatStr);
      if (i === 0) {
        firstValueText = formatStr;
      }
    }
    return [fullValueTexts, firstValueText];
  }, [value, formatList], function (prev, next) {
    return (
      // Not Same Date
      !(0, _dateUtil.isEqual)(generateConfig, prev[0], next[0]) ||
      // Not Same format
      !(0, _isEqual.default)(prev[1], next[1], true)
    );
  });
}