"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _classnames = _interopRequireDefault(require("classnames"));
var React = _interopRequireWildcard(require("react"));
var _PanelContext = _interopRequireDefault(require("../../PanelContext"));
var _RangeContext = _interopRequireDefault(require("../../RangeContext"));
var _dateUtil = require("../../utils/dateUtil");
var _DatePanel = _interopRequireDefault(require("../DatePanel"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function WeekPanel(props) {
  var prefixCls = props.prefixCls,
    generateConfig = props.generateConfig,
    locale = props.locale,
    value = props.value,
    disabledDate = props.disabledDate,
    onSelect = props.onSelect;
  var _React$useContext = React.useContext(_RangeContext.default),
    rangedValue = _React$useContext.rangedValue,
    hoverRangedValue = _React$useContext.hoverRangedValue;
  var _React$useContext2 = React.useContext(_PanelContext.default),
    onDateMouseEnter = _React$useContext2.onDateMouseEnter,
    onDateMouseLeave = _React$useContext2.onDateMouseLeave;
  var rangeStart = (hoverRangedValue === null || hoverRangedValue === void 0 ? void 0 : hoverRangedValue[0]) || (rangedValue === null || rangedValue === void 0 ? void 0 : rangedValue[0]);
  var rangeEnd = (hoverRangedValue === null || hoverRangedValue === void 0 ? void 0 : hoverRangedValue[1]) || (rangedValue === null || rangedValue === void 0 ? void 0 : rangedValue[1]);

  // Render additional column
  var cellPrefixCls = "".concat(prefixCls, "-cell");
  var prefixColumn = function prefixColumn(date) {
    // >>> Additional check for disabled
    var disabled = (0, _dateUtil.getCellDateDisabled)({
      cellDate: date,
      mode: 'week',
      disabledDate: disabledDate,
      generateConfig: generateConfig
    });
    return /*#__PURE__*/React.createElement("td", {
      key: "week",
      className: (0, _classnames.default)(cellPrefixCls, "".concat(cellPrefixCls, "-week"))
      // Operation: Same as code in PanelBody
      ,
      onClick: function onClick() {
        if (!disabled) {
          onSelect(date, 'mouse');
        }
      },
      onMouseEnter: function onMouseEnter() {
        if (!disabled && onDateMouseEnter) {
          onDateMouseEnter(date);
        }
      },
      onMouseLeave: function onMouseLeave() {
        if (!disabled && onDateMouseLeave) {
          onDateMouseLeave(date);
        }
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "".concat(cellPrefixCls, "-inner")
    }, generateConfig.locale.getWeek(locale.locale, date)));
  };

  // Add row className
  var rowPrefixCls = "".concat(prefixCls, "-week-panel-row");
  var rowClassName = function rowClassName(date) {
    var _classNames;
    var isRangeStart = (0, _dateUtil.isSameWeek)(generateConfig, locale.locale, rangeStart, date);
    var isRangeEnd = (0, _dateUtil.isSameWeek)(generateConfig, locale.locale, rangeEnd, date);
    return (0, _classnames.default)(rowPrefixCls, (_classNames = {}, (0, _defineProperty2.default)(_classNames, "".concat(rowPrefixCls, "-selected"), !rangedValue && (0, _dateUtil.isSameWeek)(generateConfig, locale.locale, value, date)), (0, _defineProperty2.default)(_classNames, "".concat(rowPrefixCls, "-range-start"), isRangeStart), (0, _defineProperty2.default)(_classNames, "".concat(rowPrefixCls, "-range-end"), isRangeEnd), (0, _defineProperty2.default)(_classNames, "".concat(rowPrefixCls, "-range-hover"), !isRangeStart && !isRangeEnd && (0, _dateUtil.isInRange)(generateConfig, rangeStart, rangeEnd, date)), _classNames));
  };
  return /*#__PURE__*/React.createElement(_DatePanel.default, (0, _extends2.default)({}, props, {
    panelName: "week",
    prefixColumn: prefixColumn,
    rowClassName: rowClassName,
    keyboardConfig: {
      onLeftRight: null
    }
    // No need check cell level
    ,
    isSameCell: function isSameCell() {
      return false;
    }
  }));
}
var _default = WeekPanel;
exports.default = _default;