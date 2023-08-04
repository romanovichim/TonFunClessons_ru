"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.MONTH_COL_COUNT = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var React = _interopRequireWildcard(require("react"));
var _dateUtil = require("../../utils/dateUtil");
var _RangeContext = _interopRequireDefault(require("../../RangeContext"));
var _useCellClassName = _interopRequireDefault(require("../../hooks/useCellClassName"));
var _PanelBody = _interopRequireDefault(require("../PanelBody"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var MONTH_COL_COUNT = 3;
exports.MONTH_COL_COUNT = MONTH_COL_COUNT;
var MONTH_ROW_COUNT = 4;
function MonthBody(props) {
  var prefixCls = props.prefixCls,
    locale = props.locale,
    value = props.value,
    viewDate = props.viewDate,
    generateConfig = props.generateConfig,
    monthCellRender = props.monthCellRender;
  var _React$useContext = React.useContext(_RangeContext.default),
    rangedValue = _React$useContext.rangedValue,
    hoverRangedValue = _React$useContext.hoverRangedValue;
  var cellPrefixCls = "".concat(prefixCls, "-cell");
  var getCellClassName = (0, _useCellClassName.default)({
    cellPrefixCls: cellPrefixCls,
    value: value,
    generateConfig: generateConfig,
    rangedValue: rangedValue,
    hoverRangedValue: hoverRangedValue,
    isSameCell: function isSameCell(current, target) {
      return (0, _dateUtil.isSameMonth)(generateConfig, current, target);
    },
    isInView: function isInView() {
      return true;
    },
    offsetCell: function offsetCell(date, offset) {
      return generateConfig.addMonth(date, offset);
    }
  });
  var monthsLocale = locale.shortMonths || (generateConfig.locale.getShortMonths ? generateConfig.locale.getShortMonths(locale.locale) : []);
  var baseMonth = generateConfig.setMonth(viewDate, 0);
  var getCellNode = monthCellRender ? function (date) {
    return monthCellRender(date, locale);
  } : undefined;
  return /*#__PURE__*/React.createElement(_PanelBody.default, (0, _extends2.default)({}, props, {
    rowNum: MONTH_ROW_COUNT,
    colNum: MONTH_COL_COUNT,
    baseDate: baseMonth,
    getCellNode: getCellNode,
    getCellText: function getCellText(date) {
      return locale.monthFormat ? (0, _dateUtil.formatValue)(date, {
        locale: locale,
        format: locale.monthFormat,
        generateConfig: generateConfig
      }) : monthsLocale[generateConfig.getMonth(date)];
    },
    getCellClassName: getCellClassName,
    getCellDate: generateConfig.addMonth,
    titleCell: function titleCell(date) {
      return (0, _dateUtil.formatValue)(date, {
        locale: locale,
        format: 'YYYY-MM',
        generateConfig: generateConfig
      });
    }
  }));
}
var _default = MonthBody;
exports.default = _default;