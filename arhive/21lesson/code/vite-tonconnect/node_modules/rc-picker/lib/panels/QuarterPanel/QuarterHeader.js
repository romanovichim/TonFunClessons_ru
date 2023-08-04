"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var React = _interopRequireWildcard(require("react"));
var _Header = _interopRequireDefault(require("../Header"));
var _PanelContext = _interopRequireDefault(require("../../PanelContext"));
var _dateUtil = require("../../utils/dateUtil");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function QuarterHeader(props) {
  var prefixCls = props.prefixCls,
    generateConfig = props.generateConfig,
    locale = props.locale,
    viewDate = props.viewDate,
    onNextYear = props.onNextYear,
    onPrevYear = props.onPrevYear,
    onYearClick = props.onYearClick;
  var _React$useContext = React.useContext(_PanelContext.default),
    hideHeader = _React$useContext.hideHeader;
  if (hideHeader) {
    return null;
  }
  var headerPrefixCls = "".concat(prefixCls, "-header");
  return /*#__PURE__*/React.createElement(_Header.default, (0, _extends2.default)({}, props, {
    prefixCls: headerPrefixCls,
    onSuperPrev: onPrevYear,
    onSuperNext: onNextYear
  }), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onYearClick,
    className: "".concat(prefixCls, "-year-btn")
  }, (0, _dateUtil.formatValue)(viewDate, {
    locale: locale,
    format: locale.yearFormat,
    generateConfig: generateConfig
  })));
}
var _default = QuarterHeader;
exports.default = _default;