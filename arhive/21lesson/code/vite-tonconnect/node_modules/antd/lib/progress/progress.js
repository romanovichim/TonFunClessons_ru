"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.ProgressTypes = void 0;
var _CheckCircleFilled = _interopRequireDefault(require("@ant-design/icons/CheckCircleFilled"));
var _CheckOutlined = _interopRequireDefault(require("@ant-design/icons/CheckOutlined"));
var _CloseCircleFilled = _interopRequireDefault(require("@ant-design/icons/CloseCircleFilled"));
var _CloseOutlined = _interopRequireDefault(require("@ant-design/icons/CloseOutlined"));
var _classnames = _interopRequireDefault(require("classnames"));
var _omit = _interopRequireDefault(require("rc-util/lib/omit"));
var React = _interopRequireWildcard(require("react"));
var _configProvider = require("../config-provider");
var _warning = _interopRequireDefault(require("../_util/warning"));
var _Circle = _interopRequireDefault(require("./Circle"));
var _Line = _interopRequireDefault(require("./Line"));
var _Steps = _interopRequireDefault(require("./Steps"));
var _style = _interopRequireDefault(require("./style"));
var _utils = require("./utils");
var __rest = void 0 && (void 0).__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
const ProgressTypes = ['line', 'circle', 'dashboard'];
exports.ProgressTypes = ProgressTypes;
const ProgressStatuses = ['normal', 'exception', 'active', 'success'];
const Progress = props => {
  const {
      prefixCls: customizePrefixCls,
      className,
      rootClassName,
      steps,
      strokeColor,
      percent = 0,
      size = 'default',
      showInfo = true,
      type = 'line',
      status,
      format
    } = props,
    restProps = __rest(props, ["prefixCls", "className", "rootClassName", "steps", "strokeColor", "percent", "size", "showInfo", "type", "status", "format"]);
  const percentNumber = React.useMemo(() => {
    var _a, _b;
    const successPercent = (0, _utils.getSuccessPercent)(props);
    return parseInt(successPercent !== undefined ? (_a = successPercent !== null && successPercent !== void 0 ? successPercent : 0) === null || _a === void 0 ? void 0 : _a.toString() : (_b = percent !== null && percent !== void 0 ? percent : 0) === null || _b === void 0 ? void 0 : _b.toString(), 10);
  }, [percent, props.success, props.successPercent]);
  const progressStatus = React.useMemo(() => {
    if (!ProgressStatuses.includes(status) && percentNumber >= 100) {
      return 'success';
    }
    return status || 'normal';
  }, [status, percentNumber]);
  const {
    getPrefixCls,
    direction
  } = React.useContext(_configProvider.ConfigContext);
  const prefixCls = getPrefixCls('progress', customizePrefixCls);
  const [wrapSSR, hashId] = (0, _style.default)(prefixCls);
  const progressInfo = React.useMemo(() => {
    if (!showInfo) {
      return null;
    }
    const successPercent = (0, _utils.getSuccessPercent)(props);
    let text;
    const textFormatter = format || (number => `${number}%`);
    const isLineType = type === 'line';
    if (format || progressStatus !== 'exception' && progressStatus !== 'success') {
      text = textFormatter((0, _utils.validProgress)(percent), (0, _utils.validProgress)(successPercent));
    } else if (progressStatus === 'exception') {
      text = isLineType ? /*#__PURE__*/React.createElement(_CloseCircleFilled.default, null) : /*#__PURE__*/React.createElement(_CloseOutlined.default, null);
    } else if (progressStatus === 'success') {
      text = isLineType ? /*#__PURE__*/React.createElement(_CheckCircleFilled.default, null) : /*#__PURE__*/React.createElement(_CheckOutlined.default, null);
    }
    return /*#__PURE__*/React.createElement("span", {
      className: `${prefixCls}-text`,
      title: typeof text === 'string' ? text : undefined
    }, text);
  }, [showInfo, percent, percentNumber, progressStatus, type, prefixCls, format]);
  if (process.env.NODE_ENV !== 'production') {
    process.env.NODE_ENV !== "production" ? (0, _warning.default)(!('successPercent' in props), 'Progress', '`successPercent` is deprecated. Please use `success.percent` instead.') : void 0;
    process.env.NODE_ENV !== "production" ? (0, _warning.default)(!('width' in props), 'Progress', '`width` is deprecated. Please use `size` instead.') : void 0;
  }
  const strokeColorNotArray = Array.isArray(strokeColor) ? strokeColor[0] : strokeColor;
  const strokeColorNotGradient = typeof strokeColor === 'string' || Array.isArray(strokeColor) ? strokeColor : undefined;
  let progress;
  // Render progress shape
  if (type === 'line') {
    progress = steps ? /*#__PURE__*/React.createElement(_Steps.default, Object.assign({}, props, {
      strokeColor: strokeColorNotGradient,
      prefixCls: prefixCls,
      steps: steps
    }), progressInfo) : /*#__PURE__*/React.createElement(_Line.default, Object.assign({}, props, {
      strokeColor: strokeColorNotArray,
      prefixCls: prefixCls,
      direction: direction
    }), progressInfo);
  } else if (type === 'circle' || type === 'dashboard') {
    progress = /*#__PURE__*/React.createElement(_Circle.default, Object.assign({}, props, {
      strokeColor: strokeColorNotArray,
      prefixCls: prefixCls,
      progressStatus: progressStatus
    }), progressInfo);
  }
  const classString = (0, _classnames.default)(prefixCls, {
    [`${prefixCls}-inline-circle`]: type === 'circle' && (0, _utils.getSize)(size, 'circle')[0] <= 20,
    [`${prefixCls}-${type === 'dashboard' && 'circle' || steps && 'steps' || type}`]: true,
    [`${prefixCls}-status-${progressStatus}`]: true,
    [`${prefixCls}-show-info`]: showInfo,
    [`${prefixCls}-${size}`]: typeof size === 'string',
    [`${prefixCls}-rtl`]: direction === 'rtl'
  }, className, rootClassName, hashId);
  return wrapSSR( /*#__PURE__*/React.createElement("div", Object.assign({
    className: classString,
    role: "progressbar"
  }, (0, _omit.default)(restProps, ['trailColor', 'strokeWidth', 'width', 'gapDegree', 'gapPosition', 'strokeLinecap', 'success', 'successPercent'])), progress));
};
if (process.env.NODE_ENV !== 'production') {
  Progress.displayName = 'Progress';
}
var _default = Progress;
exports.default = _default;