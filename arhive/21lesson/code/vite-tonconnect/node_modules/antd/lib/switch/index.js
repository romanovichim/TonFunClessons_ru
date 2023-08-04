"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _LoadingOutlined = _interopRequireDefault(require("@ant-design/icons/LoadingOutlined"));
var _classnames = _interopRequireDefault(require("classnames"));
var _rcSwitch = _interopRequireDefault(require("rc-switch"));
var React = _interopRequireWildcard(require("react"));
var _configProvider = require("../config-provider");
var _DisabledContext = _interopRequireDefault(require("../config-provider/DisabledContext"));
var _SizeContext = _interopRequireDefault(require("../config-provider/SizeContext"));
var _warning = _interopRequireDefault(require("../_util/warning"));
var _wave = _interopRequireDefault(require("../_util/wave"));
var _style = _interopRequireDefault(require("./style"));
var __rest = void 0 && (void 0).__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
const Switch = /*#__PURE__*/React.forwardRef((_a, ref) => {
  var {
      prefixCls: customizePrefixCls,
      size: customizeSize,
      disabled: customDisabled,
      loading,
      className,
      rootClassName
    } = _a,
    props = __rest(_a, ["prefixCls", "size", "disabled", "loading", "className", "rootClassName"]);
  process.env.NODE_ENV !== "production" ? (0, _warning.default)('checked' in props || !('value' in props), 'Switch', '`value` is not a valid prop, do you mean `checked`?') : void 0;
  const {
    getPrefixCls,
    direction
  } = React.useContext(_configProvider.ConfigContext);
  const size = React.useContext(_SizeContext.default);
  // ===================== Disabled =====================
  const disabled = React.useContext(_DisabledContext.default);
  const mergedDisabled = (customDisabled !== null && customDisabled !== void 0 ? customDisabled : disabled) || loading;
  const prefixCls = getPrefixCls('switch', customizePrefixCls);
  const loadingIcon = /*#__PURE__*/React.createElement("div", {
    className: `${prefixCls}-handle`
  }, loading && /*#__PURE__*/React.createElement(_LoadingOutlined.default, {
    className: `${prefixCls}-loading-icon`
  }));
  // Style
  const [wrapSSR, hashId] = (0, _style.default)(prefixCls);
  const classes = (0, _classnames.default)({
    [`${prefixCls}-small`]: (customizeSize || size) === 'small',
    [`${prefixCls}-loading`]: loading,
    [`${prefixCls}-rtl`]: direction === 'rtl'
  }, className, rootClassName, hashId);
  return wrapSSR( /*#__PURE__*/React.createElement(_wave.default, null, /*#__PURE__*/React.createElement(_rcSwitch.default, Object.assign({}, props, {
    prefixCls: prefixCls,
    className: classes,
    disabled: mergedDisabled,
    ref: ref,
    loadingIcon: loadingIcon
  }))));
});
Switch.__ANT_SWITCH = true;
if (process.env.NODE_ENV !== 'production') {
  Switch.displayName = 'Switch';
}
var _default = Switch;
exports.default = _default;