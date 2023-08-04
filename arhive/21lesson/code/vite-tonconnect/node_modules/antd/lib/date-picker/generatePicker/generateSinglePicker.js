"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = generatePicker;
var _CalendarOutlined = _interopRequireDefault(require("@ant-design/icons/CalendarOutlined"));
var _ClockCircleOutlined = _interopRequireDefault(require("@ant-design/icons/ClockCircleOutlined"));
var _CloseCircleFilled = _interopRequireDefault(require("@ant-design/icons/CloseCircleFilled"));
var _classnames = _interopRequireDefault(require("classnames"));
var _rcPicker = _interopRequireDefault(require("rc-picker"));
var React = _interopRequireWildcard(require("react"));
var _ = require(".");
var _configProvider = require("../../config-provider");
var _DisabledContext = _interopRequireDefault(require("../../config-provider/DisabledContext"));
var _SizeContext = _interopRequireDefault(require("../../config-provider/SizeContext"));
var _context = require("../../form/context");
var _useLocale = _interopRequireDefault(require("../../locale/useLocale"));
var _Compact = require("../../space/Compact");
var _statusUtils = require("../../_util/statusUtils");
var _warning = _interopRequireDefault(require("../../_util/warning"));
var _en_US = _interopRequireDefault(require("../locale/en_US"));
var _util = require("../util");
var _style = _interopRequireDefault(require("../style"));
var __rest = void 0 && (void 0).__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
function generatePicker(generateConfig) {
  function getPicker(picker, displayName) {
    const Picker = /*#__PURE__*/(0, React.forwardRef)((props, ref) => {
      const {
          prefixCls: customizePrefixCls,
          getPopupContainer: customizeGetPopupContainer,
          className,
          rootClassName,
          size: customizeSize,
          bordered = true,
          placement,
          placeholder,
          popupClassName,
          dropdownClassName,
          disabled: customDisabled,
          status: customStatus
        } = props,
        restProps = __rest(props, ["prefixCls", "getPopupContainer", "className", "rootClassName", "size", "bordered", "placement", "placeholder", "popupClassName", "dropdownClassName", "disabled", "status"]);
      const {
        getPrefixCls,
        direction,
        getPopupContainer
      } = (0, React.useContext)(_configProvider.ConfigContext);
      const prefixCls = getPrefixCls('picker', customizePrefixCls);
      const {
        compactSize,
        compactItemClassnames
      } = (0, _Compact.useCompactItemContext)(prefixCls, direction);
      const innerRef = React.useRef(null);
      const {
        format,
        showTime
      } = props;
      const [wrapSSR, hashId] = (0, _style.default)(prefixCls);
      (0, React.useImperativeHandle)(ref, () => ({
        focus: () => {
          var _a;
          return (_a = innerRef.current) === null || _a === void 0 ? void 0 : _a.focus();
        },
        blur: () => {
          var _a;
          return (_a = innerRef.current) === null || _a === void 0 ? void 0 : _a.blur();
        }
      }));
      const additionalProps = {
        showToday: true
      };
      let additionalOverrideProps = {};
      if (picker) {
        additionalOverrideProps.picker = picker;
      }
      const mergedPicker = picker || props.picker;
      additionalOverrideProps = Object.assign(Object.assign(Object.assign({}, additionalOverrideProps), showTime ? (0, _.getTimeProps)(Object.assign({
        format,
        picker: mergedPicker
      }, showTime)) : {}), mergedPicker === 'time' ? (0, _.getTimeProps)(Object.assign(Object.assign({
        format
      }, props), {
        picker: mergedPicker
      })) : {});
      const rootPrefixCls = getPrefixCls();
      // =================== Warning =====================
      if (process.env.NODE_ENV !== 'production') {
        process.env.NODE_ENV !== "production" ? (0, _warning.default)(picker !== 'quarter', displayName, `DatePicker.${displayName} is legacy usage. Please use DatePicker[picker='${picker}'] directly.`) : void 0;
        process.env.NODE_ENV !== "production" ? (0, _warning.default)(!dropdownClassName, displayName || 'DatePicker', '`dropdownClassName` is deprecated. Please use `popupClassName` instead.') : void 0;
      }
      // ===================== Size =====================
      const size = React.useContext(_SizeContext.default);
      const mergedSize = compactSize || customizeSize || size;
      // ===================== Disabled =====================
      const disabled = React.useContext(_DisabledContext.default);
      const mergedDisabled = customDisabled !== null && customDisabled !== void 0 ? customDisabled : disabled;
      // ===================== FormItemInput =====================
      const formItemContext = (0, React.useContext)(_context.FormItemInputContext);
      const {
        hasFeedback,
        status: contextStatus,
        feedbackIcon
      } = formItemContext;
      const suffixNode = /*#__PURE__*/React.createElement(React.Fragment, null, mergedPicker === 'time' ? /*#__PURE__*/React.createElement(_ClockCircleOutlined.default, null) : /*#__PURE__*/React.createElement(_CalendarOutlined.default, null), hasFeedback && feedbackIcon);
      const [contextLocale] = (0, _useLocale.default)('DatePicker', _en_US.default);
      const locale = Object.assign(Object.assign({}, contextLocale), props.locale);
      return wrapSSR( /*#__PURE__*/React.createElement(_rcPicker.default, Object.assign({
        ref: innerRef,
        placeholder: (0, _util.getPlaceholder)(locale, mergedPicker, placeholder),
        suffixIcon: suffixNode,
        dropdownAlign: (0, _util.transPlacement2DropdownAlign)(direction, placement),
        clearIcon: /*#__PURE__*/React.createElement(_CloseCircleFilled.default, null),
        prevIcon: /*#__PURE__*/React.createElement("span", {
          className: `${prefixCls}-prev-icon`
        }),
        nextIcon: /*#__PURE__*/React.createElement("span", {
          className: `${prefixCls}-next-icon`
        }),
        superPrevIcon: /*#__PURE__*/React.createElement("span", {
          className: `${prefixCls}-super-prev-icon`
        }),
        superNextIcon: /*#__PURE__*/React.createElement("span", {
          className: `${prefixCls}-super-next-icon`
        }),
        allowClear: true,
        transitionName: `${rootPrefixCls}-slide-up`
      }, additionalProps, restProps, additionalOverrideProps, {
        locale: locale.lang,
        className: (0, _classnames.default)({
          [`${prefixCls}-${mergedSize}`]: mergedSize,
          [`${prefixCls}-borderless`]: !bordered
        }, (0, _statusUtils.getStatusClassNames)(prefixCls, (0, _statusUtils.getMergedStatus)(contextStatus, customStatus), hasFeedback), hashId, compactItemClassnames, className, rootClassName),
        prefixCls: prefixCls,
        getPopupContainer: customizeGetPopupContainer || getPopupContainer,
        generateConfig: generateConfig,
        components: _.Components,
        direction: direction,
        disabled: mergedDisabled,
        dropdownClassName: (0, _classnames.default)(hashId, rootClassName, popupClassName || dropdownClassName)
      })));
    });
    if (displayName) {
      Picker.displayName = displayName;
    }
    return Picker;
  }
  const DatePicker = getPicker();
  const WeekPicker = getPicker('week', 'WeekPicker');
  const MonthPicker = getPicker('month', 'MonthPicker');
  const YearPicker = getPicker('year', 'YearPicker');
  const TimePicker = getPicker('time', 'TimePicker');
  const QuarterPicker = getPicker('quarter', 'QuarterPicker');
  return {
    DatePicker,
    WeekPicker,
    MonthPicker,
    YearPicker,
    TimePicker,
    QuarterPicker
  };
}