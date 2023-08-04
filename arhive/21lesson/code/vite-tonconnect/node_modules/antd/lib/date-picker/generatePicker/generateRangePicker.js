"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = generateRangePicker;
var _CalendarOutlined = _interopRequireDefault(require("@ant-design/icons/CalendarOutlined"));
var _ClockCircleOutlined = _interopRequireDefault(require("@ant-design/icons/ClockCircleOutlined"));
var _CloseCircleFilled = _interopRequireDefault(require("@ant-design/icons/CloseCircleFilled"));
var _SwapRightOutlined = _interopRequireDefault(require("@ant-design/icons/SwapRightOutlined"));
var _classnames = _interopRequireDefault(require("classnames"));
var _rcPicker = require("rc-picker");
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
function generateRangePicker(generateConfig) {
  const RangePicker = /*#__PURE__*/(0, React.forwardRef)((props, ref) => {
    const {
        prefixCls: customizePrefixCls,
        getPopupContainer: customGetPopupContainer,
        className,
        placement,
        size: customizeSize,
        disabled: customDisabled,
        bordered = true,
        placeholder,
        popupClassName,
        dropdownClassName,
        status: customStatus
      } = props,
      restProps = __rest(props, ["prefixCls", "getPopupContainer", "className", "placement", "size", "disabled", "bordered", "placeholder", "popupClassName", "dropdownClassName", "status"]);
    const innerRef = React.useRef(null);
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
    const {
      format,
      showTime,
      picker
    } = props;
    const rootPrefixCls = getPrefixCls();
    const [wrapSSR, hashId] = (0, _style.default)(prefixCls);
    let additionalOverrideProps = {};
    additionalOverrideProps = Object.assign(Object.assign(Object.assign({}, additionalOverrideProps), showTime ? (0, _.getTimeProps)(Object.assign({
      format,
      picker
    }, showTime)) : {}), picker === 'time' ? (0, _.getTimeProps)(Object.assign(Object.assign({
      format
    }, props), {
      picker
    })) : {});
    // =================== Warning =====================
    if (process.env.NODE_ENV !== 'production') {
      process.env.NODE_ENV !== "production" ? (0, _warning.default)(!dropdownClassName, 'DatePicker.RangePicker', '`dropdownClassName` is deprecated. Please use `popupClassName` instead.') : void 0;
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
    const suffixNode = /*#__PURE__*/React.createElement(React.Fragment, null, picker === 'time' ? /*#__PURE__*/React.createElement(_ClockCircleOutlined.default, null) : /*#__PURE__*/React.createElement(_CalendarOutlined.default, null), hasFeedback && feedbackIcon);
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
    const [contextLocale] = (0, _useLocale.default)('Calendar', _en_US.default);
    const locale = Object.assign(Object.assign({}, contextLocale), props.locale);
    return wrapSSR( /*#__PURE__*/React.createElement(_rcPicker.RangePicker, Object.assign({
      separator: /*#__PURE__*/React.createElement("span", {
        "aria-label": "to",
        className: `${prefixCls}-separator`
      }, /*#__PURE__*/React.createElement(_SwapRightOutlined.default, null)),
      disabled: mergedDisabled,
      ref: innerRef,
      dropdownAlign: (0, _util.transPlacement2DropdownAlign)(direction, placement),
      placeholder: (0, _util.getRangePlaceholder)(locale, picker, placeholder),
      suffixIcon: suffixNode,
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
    }, restProps, additionalOverrideProps, {
      className: (0, _classnames.default)({
        [`${prefixCls}-${mergedSize}`]: mergedSize,
        [`${prefixCls}-borderless`]: !bordered
      }, (0, _statusUtils.getStatusClassNames)(prefixCls, (0, _statusUtils.getMergedStatus)(contextStatus, customStatus), hasFeedback), hashId, compactItemClassnames, className),
      locale: locale.lang,
      prefixCls: prefixCls,
      getPopupContainer: customGetPopupContainer || getPopupContainer,
      generateConfig: generateConfig,
      components: _.Components,
      direction: direction,
      dropdownClassName: (0, _classnames.default)(hashId, popupClassName || dropdownClassName)
    })));
  });
  return RangePicker;
}