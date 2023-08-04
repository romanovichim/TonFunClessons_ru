"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _DownOutlined = _interopRequireDefault(require("@ant-design/icons/DownOutlined"));
var _UpOutlined = _interopRequireDefault(require("@ant-design/icons/UpOutlined"));
var _classnames = _interopRequireDefault(require("classnames"));
var _rcInputNumber = _interopRequireDefault(require("rc-input-number"));
var React = _interopRequireWildcard(require("react"));
var _configProvider = _interopRequireWildcard(require("../config-provider"));
var _DisabledContext = _interopRequireDefault(require("../config-provider/DisabledContext"));
var _SizeContext = _interopRequireDefault(require("../config-provider/SizeContext"));
var _context = require("../form/context");
var _Compact = require("../space/Compact");
var _reactNode = require("../_util/reactNode");
var _statusUtils = require("../_util/statusUtils");
var _style = _interopRequireDefault(require("./style"));
var __rest = void 0 && (void 0).__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
const InputNumber = /*#__PURE__*/React.forwardRef((props, ref) => {
  const {
    getPrefixCls,
    direction
  } = React.useContext(_configProvider.ConfigContext);
  const size = React.useContext(_SizeContext.default);
  const [focused, setFocus] = React.useState(false);
  const inputRef = React.useRef(null);
  React.useImperativeHandle(ref, () => inputRef.current);
  const {
      className,
      rootClassName,
      size: customizeSize,
      disabled: customDisabled,
      prefixCls: customizePrefixCls,
      addonBefore,
      addonAfter,
      prefix,
      bordered = true,
      readOnly,
      status: customStatus,
      controls
    } = props,
    others = __rest(props, ["className", "rootClassName", "size", "disabled", "prefixCls", "addonBefore", "addonAfter", "prefix", "bordered", "readOnly", "status", "controls"]);
  const prefixCls = getPrefixCls('input-number', customizePrefixCls);
  // Style
  const [wrapSSR, hashId] = (0, _style.default)(prefixCls);
  const {
    compactSize,
    compactItemClassnames
  } = (0, _Compact.useCompactItemContext)(prefixCls, direction);
  let upIcon = /*#__PURE__*/React.createElement(_UpOutlined.default, {
    className: `${prefixCls}-handler-up-inner`
  });
  let downIcon = /*#__PURE__*/React.createElement(_DownOutlined.default, {
    className: `${prefixCls}-handler-down-inner`
  });
  const controlsTemp = typeof controls === 'boolean' ? controls : undefined;
  if (typeof controls === 'object') {
    upIcon = typeof controls.upIcon === 'undefined' ? upIcon : /*#__PURE__*/React.createElement("span", {
      className: `${prefixCls}-handler-up-inner`
    }, controls.upIcon);
    downIcon = typeof controls.downIcon === 'undefined' ? downIcon : /*#__PURE__*/React.createElement("span", {
      className: `${prefixCls}-handler-down-inner`
    }, controls.downIcon);
  }
  const {
    hasFeedback,
    status: contextStatus,
    isFormItemInput,
    feedbackIcon
  } = React.useContext(_context.FormItemInputContext);
  const mergedStatus = (0, _statusUtils.getMergedStatus)(contextStatus, customStatus);
  const mergeSize = compactSize || customizeSize || size;
  const hasPrefix = prefix != null || hasFeedback;
  const hasAddon = !!(addonBefore || addonAfter);
  // ===================== Disabled =====================
  const disabled = React.useContext(_DisabledContext.default);
  const mergedDisabled = customDisabled !== null && customDisabled !== void 0 ? customDisabled : disabled;
  const inputNumberClass = (0, _classnames.default)({
    [`${prefixCls}-lg`]: mergeSize === 'large',
    [`${prefixCls}-sm`]: mergeSize === 'small',
    [`${prefixCls}-rtl`]: direction === 'rtl',
    [`${prefixCls}-borderless`]: !bordered,
    [`${prefixCls}-in-form-item`]: isFormItemInput
  }, (0, _statusUtils.getStatusClassNames)(prefixCls, mergedStatus), compactItemClassnames, hashId, className, !hasPrefix && !hasAddon && rootClassName);
  let element = /*#__PURE__*/React.createElement(_rcInputNumber.default, Object.assign({
    ref: inputRef,
    disabled: mergedDisabled,
    className: inputNumberClass,
    upHandler: upIcon,
    downHandler: downIcon,
    prefixCls: prefixCls,
    readOnly: readOnly,
    controls: controlsTemp
  }, others));
  if (hasPrefix) {
    const affixWrapperCls = (0, _classnames.default)(`${prefixCls}-affix-wrapper`, (0, _statusUtils.getStatusClassNames)(`${prefixCls}-affix-wrapper`, mergedStatus, hasFeedback), {
      [`${prefixCls}-affix-wrapper-focused`]: focused,
      [`${prefixCls}-affix-wrapper-disabled`]: props.disabled,
      [`${prefixCls}-affix-wrapper-sm`]: mergeSize === 'small',
      [`${prefixCls}-affix-wrapper-lg`]: mergeSize === 'large',
      [`${prefixCls}-affix-wrapper-rtl`]: direction === 'rtl',
      [`${prefixCls}-affix-wrapper-readonly`]: readOnly,
      [`${prefixCls}-affix-wrapper-borderless`]: !bordered
    },
    // className will go to addon wrapper
    !hasAddon && className, !hasAddon && rootClassName, hashId);
    element = /*#__PURE__*/React.createElement("div", {
      className: affixWrapperCls,
      style: props.style,
      onMouseUp: () => inputRef.current.focus()
    }, prefix && /*#__PURE__*/React.createElement("span", {
      className: `${prefixCls}-prefix`
    }, prefix), (0, _reactNode.cloneElement)(element, {
      style: null,
      value: props.value,
      onFocus: event => {
        var _a;
        setFocus(true);
        (_a = props.onFocus) === null || _a === void 0 ? void 0 : _a.call(props, event);
      },
      onBlur: event => {
        var _a;
        setFocus(false);
        (_a = props.onBlur) === null || _a === void 0 ? void 0 : _a.call(props, event);
      }
    }), hasFeedback && /*#__PURE__*/React.createElement("span", {
      className: `${prefixCls}-suffix`
    }, feedbackIcon));
  }
  if (hasAddon) {
    const wrapperClassName = `${prefixCls}-group`;
    const addonClassName = `${wrapperClassName}-addon`;
    const addonBeforeNode = addonBefore ? /*#__PURE__*/React.createElement("div", {
      className: addonClassName
    }, addonBefore) : null;
    const addonAfterNode = addonAfter ? /*#__PURE__*/React.createElement("div", {
      className: addonClassName
    }, addonAfter) : null;
    const mergedWrapperClassName = (0, _classnames.default)(`${prefixCls}-wrapper`, wrapperClassName, hashId, {
      [`${wrapperClassName}-rtl`]: direction === 'rtl'
    });
    const mergedGroupClassName = (0, _classnames.default)(`${prefixCls}-group-wrapper`, {
      [`${prefixCls}-group-wrapper-sm`]: mergeSize === 'small',
      [`${prefixCls}-group-wrapper-lg`]: mergeSize === 'large',
      [`${prefixCls}-group-wrapper-rtl`]: direction === 'rtl'
    }, (0, _statusUtils.getStatusClassNames)(`${prefixCls}-group-wrapper`, mergedStatus, hasFeedback), hashId, className, rootClassName);
    element = /*#__PURE__*/React.createElement("div", {
      className: mergedGroupClassName,
      style: props.style
    }, /*#__PURE__*/React.createElement("div", {
      className: mergedWrapperClassName
    }, addonBeforeNode && /*#__PURE__*/React.createElement(_Compact.NoCompactStyle, null, /*#__PURE__*/React.createElement(_context.NoFormStyle, {
      status: true,
      override: true
    }, addonBeforeNode)), (0, _reactNode.cloneElement)(element, {
      style: null,
      disabled: mergedDisabled
    }), addonAfterNode && /*#__PURE__*/React.createElement(_Compact.NoCompactStyle, null, /*#__PURE__*/React.createElement(_context.NoFormStyle, {
      status: true,
      override: true
    }, addonAfterNode))));
  }
  return wrapSSR(element);
});
const TypedInputNumber = InputNumber;
const PureInputNumber = props => /*#__PURE__*/React.createElement(_configProvider.default, {
  theme: {
    components: {
      InputNumber: {
        handleVisible: true
      }
    }
  }
}, /*#__PURE__*/React.createElement(InputNumber, Object.assign({}, props)));
if (process.env.NODE_ENV !== 'production') {
  TypedInputNumber.displayName = 'InputNumber';
}
TypedInputNumber._InternalPanelDoNotUseOrYouWillBeFired = PureInputNumber;
var _default = TypedInputNumber;
exports.default = _default;