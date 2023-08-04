"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _classnames = _interopRequireDefault(require("classnames"));
var _useMergedState = _interopRequireDefault(require("rc-util/lib/hooks/useMergedState"));
var React = _interopRequireWildcard(require("react"));
var _configProvider = require("../config-provider");
var _SizeContext = _interopRequireDefault(require("../config-provider/SizeContext"));
var _getDataOrAriaProps = _interopRequireDefault(require("../_util/getDataOrAriaProps"));
var _context = require("./context");
var _radio = _interopRequireDefault(require("./radio"));
var _style = _interopRequireDefault(require("./style"));
const RadioGroup = /*#__PURE__*/React.forwardRef((props, ref) => {
  const {
    getPrefixCls,
    direction
  } = React.useContext(_configProvider.ConfigContext);
  const size = React.useContext(_SizeContext.default);
  const [value, setValue] = (0, _useMergedState.default)(props.defaultValue, {
    value: props.value
  });
  const onRadioChange = ev => {
    const lastValue = value;
    const val = ev.target.value;
    if (!('value' in props)) {
      setValue(val);
    }
    const {
      onChange
    } = props;
    if (onChange && val !== lastValue) {
      onChange(ev);
    }
  };
  const {
    prefixCls: customizePrefixCls,
    className,
    rootClassName,
    options,
    buttonStyle = 'outline',
    disabled,
    children,
    size: customizeSize,
    style,
    id,
    onMouseEnter,
    onMouseLeave,
    onFocus,
    onBlur
  } = props;
  const prefixCls = getPrefixCls('radio', customizePrefixCls);
  const groupPrefixCls = `${prefixCls}-group`;
  // Style
  const [wrapSSR, hashId] = (0, _style.default)(prefixCls);
  let childrenToRender = children;
  // 如果存在 options, 优先使用
  if (options && options.length > 0) {
    childrenToRender = options.map(option => {
      if (typeof option === 'string' || typeof option === 'number') {
        // 此处类型自动推导为 string
        return /*#__PURE__*/React.createElement(_radio.default, {
          key: option.toString(),
          prefixCls: prefixCls,
          disabled: disabled,
          value: option,
          checked: value === option
        }, option);
      }
      // 此处类型自动推导为 { label: string value: string }
      return /*#__PURE__*/React.createElement(_radio.default, {
        key: `radio-group-value-options-${option.value}`,
        prefixCls: prefixCls,
        disabled: option.disabled || disabled,
        value: option.value,
        checked: value === option.value,
        style: option.style
      }, option.label);
    });
  }
  const mergedSize = customizeSize || size;
  const classString = (0, _classnames.default)(groupPrefixCls, `${groupPrefixCls}-${buttonStyle}`, {
    [`${groupPrefixCls}-${mergedSize}`]: mergedSize,
    [`${groupPrefixCls}-rtl`]: direction === 'rtl'
  }, className, rootClassName, hashId);
  return wrapSSR( /*#__PURE__*/React.createElement("div", Object.assign({}, (0, _getDataOrAriaProps.default)(props), {
    className: classString,
    style: style,
    onMouseEnter: onMouseEnter,
    onMouseLeave: onMouseLeave,
    onFocus: onFocus,
    onBlur: onBlur,
    id: id,
    ref: ref
  }), /*#__PURE__*/React.createElement(_context.RadioGroupContextProvider, {
    value: {
      onChange: onRadioChange,
      value,
      disabled: props.disabled,
      name: props.name,
      optionType: props.optionType
    }
  }, childrenToRender)));
});
var _default = /*#__PURE__*/React.memo(RadioGroup);
exports.default = _default;