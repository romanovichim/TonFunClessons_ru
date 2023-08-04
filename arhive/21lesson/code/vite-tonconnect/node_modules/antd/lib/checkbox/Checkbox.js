"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _classnames = _interopRequireDefault(require("classnames"));
var _rcCheckbox = _interopRequireDefault(require("rc-checkbox"));
var React = _interopRequireWildcard(require("react"));
var _configProvider = require("../config-provider");
var _context = require("../form/context");
var _warning = _interopRequireDefault(require("../_util/warning"));
var _Group = require("./Group");
var _DisabledContext = _interopRequireDefault(require("../config-provider/DisabledContext"));
var _style = _interopRequireDefault(require("./style"));
var __rest = void 0 && (void 0).__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
const InternalCheckbox = (_a, ref) => {
  var _b;
  var {
      prefixCls: customizePrefixCls,
      className,
      rootClassName,
      children,
      indeterminate = false,
      style,
      onMouseEnter,
      onMouseLeave,
      skipGroup = false,
      disabled
    } = _a,
    restProps = __rest(_a, ["prefixCls", "className", "rootClassName", "children", "indeterminate", "style", "onMouseEnter", "onMouseLeave", "skipGroup", "disabled"]);
  const {
    getPrefixCls,
    direction
  } = React.useContext(_configProvider.ConfigContext);
  const checkboxGroup = React.useContext(_Group.GroupContext);
  const {
    isFormItemInput
  } = React.useContext(_context.FormItemInputContext);
  const contextDisabled = React.useContext(_DisabledContext.default);
  const mergedDisabled = (_b = (checkboxGroup === null || checkboxGroup === void 0 ? void 0 : checkboxGroup.disabled) || disabled) !== null && _b !== void 0 ? _b : contextDisabled;
  const prevValue = React.useRef(restProps.value);
  React.useEffect(() => {
    checkboxGroup === null || checkboxGroup === void 0 ? void 0 : checkboxGroup.registerValue(restProps.value);
    process.env.NODE_ENV !== "production" ? (0, _warning.default)('checked' in restProps || !!checkboxGroup || !('value' in restProps), 'Checkbox', '`value` is not a valid prop, do you mean `checked`?') : void 0;
  }, []);
  React.useEffect(() => {
    if (skipGroup) {
      return;
    }
    if (restProps.value !== prevValue.current) {
      checkboxGroup === null || checkboxGroup === void 0 ? void 0 : checkboxGroup.cancelValue(prevValue.current);
      checkboxGroup === null || checkboxGroup === void 0 ? void 0 : checkboxGroup.registerValue(restProps.value);
      prevValue.current = restProps.value;
    }
    return () => checkboxGroup === null || checkboxGroup === void 0 ? void 0 : checkboxGroup.cancelValue(restProps.value);
  }, [restProps.value]);
  const prefixCls = getPrefixCls('checkbox', customizePrefixCls);
  const [wrapSSR, hashId] = (0, _style.default)(prefixCls);
  const checkboxProps = Object.assign({}, restProps);
  if (checkboxGroup && !skipGroup) {
    checkboxProps.onChange = function () {
      if (restProps.onChange) {
        restProps.onChange.apply(restProps, arguments);
      }
      if (checkboxGroup.toggleOption) {
        checkboxGroup.toggleOption({
          label: children,
          value: restProps.value
        });
      }
    };
    checkboxProps.name = checkboxGroup.name;
    checkboxProps.checked = checkboxGroup.value.includes(restProps.value);
  }
  const classString = (0, _classnames.default)({
    [`${prefixCls}-wrapper`]: true,
    [`${prefixCls}-rtl`]: direction === 'rtl',
    [`${prefixCls}-wrapper-checked`]: checkboxProps.checked,
    [`${prefixCls}-wrapper-disabled`]: mergedDisabled,
    [`${prefixCls}-wrapper-in-form-item`]: isFormItemInput
  }, className, rootClassName, hashId);
  const checkboxClass = (0, _classnames.default)({
    [`${prefixCls}-indeterminate`]: indeterminate
  }, hashId);
  const ariaChecked = indeterminate ? 'mixed' : undefined;
  return wrapSSR(
  /*#__PURE__*/
  // eslint-disable-next-line jsx-a11y/label-has-associated-control
  React.createElement("label", {
    className: classString,
    style: style,
    onMouseEnter: onMouseEnter,
    onMouseLeave: onMouseLeave
  }, /*#__PURE__*/React.createElement(_rcCheckbox.default, Object.assign({
    "aria-checked": ariaChecked
  }, checkboxProps, {
    prefixCls: prefixCls,
    className: checkboxClass,
    disabled: mergedDisabled,
    ref: ref
  })), children !== undefined && /*#__PURE__*/React.createElement("span", null, children)));
};
const Checkbox = /*#__PURE__*/React.forwardRef(InternalCheckbox);
if (process.env.NODE_ENV !== 'production') {
  Checkbox.displayName = 'Checkbox';
}
var _default = Checkbox;
exports.default = _default;