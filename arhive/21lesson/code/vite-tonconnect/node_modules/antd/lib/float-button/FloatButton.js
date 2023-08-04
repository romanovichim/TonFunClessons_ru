"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.floatButtonPrefixCls = exports.default = void 0;
var _classnames = _interopRequireDefault(require("classnames"));
var _react = _interopRequireWildcard(require("react"));
var _configProvider = require("../config-provider");
var _tooltip = _interopRequireDefault(require("../tooltip"));
var _warning = _interopRequireDefault(require("../_util/warning"));
var _context = _interopRequireDefault(require("./context"));
var _FloatButtonContent = _interopRequireDefault(require("./FloatButtonContent"));
var _style = _interopRequireDefault(require("./style"));
var __rest = void 0 && (void 0).__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
const floatButtonPrefixCls = 'float-btn';
exports.floatButtonPrefixCls = floatButtonPrefixCls;
const FloatButton = (props, ref) => {
  const {
      prefixCls: customizePrefixCls,
      className,
      rootClassName,
      type = 'default',
      shape = 'circle',
      icon,
      description,
      tooltip
    } = props,
    restProps = __rest(props, ["prefixCls", "className", "rootClassName", "type", "shape", "icon", "description", "tooltip"]);
  const {
    getPrefixCls,
    direction
  } = (0, _react.useContext)(_configProvider.ConfigContext);
  const groupShape = (0, _react.useContext)(_context.default);
  const prefixCls = getPrefixCls(floatButtonPrefixCls, customizePrefixCls);
  const [wrapSSR, hashId] = (0, _style.default)(prefixCls);
  const mergeShape = groupShape || shape;
  const classString = (0, _classnames.default)(hashId, prefixCls, className, rootClassName, `${prefixCls}-${type}`, `${prefixCls}-${mergeShape}`, {
    [`${prefixCls}-rtl`]: direction === 'rtl'
  });
  const contentProps = (0, _react.useMemo)(() => ({
    prefixCls,
    description,
    icon,
    type
  }), [prefixCls, description, icon, type]);
  const buttonNode = /*#__PURE__*/_react.default.createElement(_tooltip.default, {
    title: tooltip,
    placement: direction === 'rtl' ? 'right' : 'left'
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: `${prefixCls}-body`
  }, /*#__PURE__*/_react.default.createElement(_FloatButtonContent.default, Object.assign({}, contentProps))));
  if (process.env.NODE_ENV !== 'production') {
    process.env.NODE_ENV !== "production" ? (0, _warning.default)(!(shape === 'circle' && description), 'FloatButton', 'supported only when `shape` is `square`. Due to narrow space for text, short sentence is recommended.') : void 0;
  }
  return wrapSSR(props.href ? /*#__PURE__*/_react.default.createElement("a", Object.assign({
    ref: ref
  }, restProps, {
    className: classString
  }), buttonNode) : /*#__PURE__*/_react.default.createElement("button", Object.assign({
    ref: ref
  }, restProps, {
    className: classString,
    type: "button"
  }), buttonNode));
};
if (process.env.NODE_ENV !== 'production') {
  FloatButton.displayName = 'FloatButton';
}
const ForwardFloatButton = /*#__PURE__*/_react.default.forwardRef(FloatButton);
var _default = ForwardFloatButton;
exports.default = _default;