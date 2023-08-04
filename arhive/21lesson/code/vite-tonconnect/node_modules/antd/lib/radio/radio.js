"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _classnames = _interopRequireDefault(require("classnames"));
var _rcCheckbox = _interopRequireDefault(require("rc-checkbox"));
var _ref = require("rc-util/lib/ref");
var React = _interopRequireWildcard(require("react"));
var _configProvider = require("../config-provider");
var _DisabledContext = _interopRequireDefault(require("../config-provider/DisabledContext"));
var _context = require("../form/context");
var _warning = _interopRequireDefault(require("../_util/warning"));
var _context2 = _interopRequireWildcard(require("./context"));
var _style = _interopRequireDefault(require("./style"));
var __rest = void 0 && (void 0).__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
const InternalRadio = (props, ref) => {
  var _a, _b;
  const groupContext = React.useContext(_context2.default);
  const radioOptionTypeContext = React.useContext(_context2.RadioOptionTypeContext);
  const {
    getPrefixCls,
    direction
  } = React.useContext(_configProvider.ConfigContext);
  const innerRef = React.useRef();
  const mergedRef = (0, _ref.composeRef)(ref, innerRef);
  const {
    isFormItemInput
  } = React.useContext(_context.FormItemInputContext);
  process.env.NODE_ENV !== "production" ? (0, _warning.default)(!('optionType' in props), 'Radio', '`optionType` is only support in Radio.Group.') : void 0;
  const onChange = e => {
    var _a, _b;
    (_a = props.onChange) === null || _a === void 0 ? void 0 : _a.call(props, e);
    (_b = groupContext === null || groupContext === void 0 ? void 0 : groupContext.onChange) === null || _b === void 0 ? void 0 : _b.call(groupContext, e);
  };
  const {
      prefixCls: customizePrefixCls,
      className,
      rootClassName,
      children,
      style
    } = props,
    restProps = __rest(props, ["prefixCls", "className", "rootClassName", "children", "style"]);
  const radioPrefixCls = getPrefixCls('radio', customizePrefixCls);
  const prefixCls = ((groupContext === null || groupContext === void 0 ? void 0 : groupContext.optionType) || radioOptionTypeContext) === 'button' ? `${radioPrefixCls}-button` : radioPrefixCls;
  // Style
  const [wrapSSR, hashId] = (0, _style.default)(radioPrefixCls);
  const radioProps = Object.assign({}, restProps);
  // ===================== Disabled =====================
  const disabled = React.useContext(_DisabledContext.default);
  if (groupContext) {
    radioProps.name = groupContext.name;
    radioProps.onChange = onChange;
    radioProps.checked = props.value === groupContext.value;
    radioProps.disabled = (_a = radioProps.disabled) !== null && _a !== void 0 ? _a : groupContext.disabled;
  }
  radioProps.disabled = (_b = radioProps.disabled) !== null && _b !== void 0 ? _b : disabled;
  const wrapperClassString = (0, _classnames.default)(`${prefixCls}-wrapper`, {
    [`${prefixCls}-wrapper-checked`]: radioProps.checked,
    [`${prefixCls}-wrapper-disabled`]: radioProps.disabled,
    [`${prefixCls}-wrapper-rtl`]: direction === 'rtl',
    [`${prefixCls}-wrapper-in-form-item`]: isFormItemInput
  }, className, rootClassName, hashId);
  return wrapSSR(
  /*#__PURE__*/
  // eslint-disable-next-line jsx-a11y/label-has-associated-control
  React.createElement("label", {
    className: wrapperClassString,
    style: style,
    onMouseEnter: props.onMouseEnter,
    onMouseLeave: props.onMouseLeave
  }, /*#__PURE__*/React.createElement(_rcCheckbox.default, Object.assign({}, radioProps, {
    type: "radio",
    prefixCls: prefixCls,
    ref: mergedRef
  })), children !== undefined ? /*#__PURE__*/React.createElement("span", null, children) : null));
};
const Radio = /*#__PURE__*/React.forwardRef(InternalRadio);
if (process.env.NODE_ENV !== 'production') {
  Radio.displayName = 'Radio';
}
var _default = Radio;
exports.default = _default;