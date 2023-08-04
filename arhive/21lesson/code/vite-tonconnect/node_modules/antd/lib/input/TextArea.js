"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var React = _interopRequireWildcard(require("react"));
var _rcTextarea = _interopRequireDefault(require("rc-textarea"));
var _classnames = _interopRequireDefault(require("classnames"));
var _CloseCircleFilled = _interopRequireDefault(require("@ant-design/icons/CloseCircleFilled"));
var _context = require("../form/context");
var _style = _interopRequireDefault(require("./style"));
var _SizeContext = _interopRequireDefault(require("../config-provider/SizeContext"));
var _statusUtils = require("../_util/statusUtils");
var _Input = require("./Input");
var _DisabledContext = _interopRequireDefault(require("../config-provider/DisabledContext"));
var _configProvider = require("../config-provider");
var __rest = void 0 && (void 0).__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
const TextArea = /*#__PURE__*/(0, React.forwardRef)((_a, ref) => {
  var {
      prefixCls: customizePrefixCls,
      bordered = true,
      size: customizeSize,
      disabled: customDisabled,
      status: customStatus,
      allowClear
    } = _a,
    rest = __rest(_a, ["prefixCls", "bordered", "size", "disabled", "status", "allowClear"]);
  const {
    getPrefixCls,
    direction
  } = React.useContext(_configProvider.ConfigContext);
  // ===================== Size =====================
  const size = React.useContext(_SizeContext.default);
  const mergedSize = customizeSize || size;
  // ===================== Disabled =====================
  const disabled = React.useContext(_DisabledContext.default);
  const mergedDisabled = customDisabled !== null && customDisabled !== void 0 ? customDisabled : disabled;
  // ===================== Status =====================
  const {
    status: contextStatus,
    hasFeedback,
    feedbackIcon
  } = React.useContext(_context.FormItemInputContext);
  const mergedStatus = (0, _statusUtils.getMergedStatus)(contextStatus, customStatus);
  // ===================== Ref =====================
  const innerRef = React.useRef(null);
  React.useImperativeHandle(ref, () => {
    var _a;
    return {
      resizableTextArea: (_a = innerRef.current) === null || _a === void 0 ? void 0 : _a.resizableTextArea,
      focus: option => {
        var _a, _b;
        (0, _Input.triggerFocus)((_b = (_a = innerRef.current) === null || _a === void 0 ? void 0 : _a.resizableTextArea) === null || _b === void 0 ? void 0 : _b.textArea, option);
      },
      blur: () => {
        var _a;
        return (_a = innerRef.current) === null || _a === void 0 ? void 0 : _a.blur();
      }
    };
  });
  const prefixCls = getPrefixCls('input', customizePrefixCls);
  // Allow clear
  let mergedAllowClear;
  if (typeof allowClear === 'object' && (allowClear === null || allowClear === void 0 ? void 0 : allowClear.clearIcon)) {
    mergedAllowClear = allowClear;
  } else if (allowClear) {
    mergedAllowClear = {
      clearIcon: /*#__PURE__*/React.createElement(_CloseCircleFilled.default, null)
    };
  }
  // ===================== Style =====================
  const [wrapSSR, hashId] = (0, _style.default)(prefixCls);
  return wrapSSR( /*#__PURE__*/React.createElement(_rcTextarea.default, Object.assign({}, rest, {
    disabled: mergedDisabled,
    allowClear: mergedAllowClear,
    classes: {
      affixWrapper: (0, _classnames.default)(`${prefixCls}-textarea-affix-wrapper`, {
        [`${prefixCls}-affix-wrapper-rtl`]: direction === 'rtl',
        [`${prefixCls}-affix-wrapper-borderless`]: !bordered,
        [`${prefixCls}-affix-wrapper-sm`]: mergedSize === 'small',
        [`${prefixCls}-affix-wrapper-lg`]: mergedSize === 'large'
      }, (0, _statusUtils.getStatusClassNames)(`${prefixCls}-affix-wrapper`, mergedStatus), hashId),
      countWrapper: (0, _classnames.default)(`${prefixCls}-textarea`, `${prefixCls}-textarea-show-count`, {
        [`${prefixCls}-textarea-show-count-rtl`]: direction === 'rtl'
      }, hashId),
      textarea: (0, _classnames.default)({
        [`${prefixCls}-borderless`]: !bordered,
        [`${prefixCls}-sm`]: mergedSize === 'small',
        [`${prefixCls}-lg`]: mergedSize === 'large'
      }, (0, _statusUtils.getStatusClassNames)(prefixCls, mergedStatus), hashId)
    },
    prefixCls: prefixCls,
    suffix: hasFeedback && /*#__PURE__*/React.createElement("span", {
      className: `${prefixCls}-textarea-suffix`
    }, feedbackIcon),
    ref: innerRef
  })));
});
var _default = TextArea;
exports.default = _default;