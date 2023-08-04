"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _QuestionCircleOutlined = _interopRequireDefault(require("@ant-design/icons/QuestionCircleOutlined"));
var _classnames = _interopRequireDefault(require("classnames"));
var React = _interopRequireWildcard(require("react"));
var _col = _interopRequireDefault(require("../grid/col"));
var _en_US = _interopRequireDefault(require("../locale/en_US"));
var _useLocale = _interopRequireDefault(require("../locale/useLocale"));
var _tooltip = _interopRequireDefault(require("../tooltip"));
var _context = require("./context");
var __rest = void 0 && (void 0).__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
function toTooltipProps(tooltip) {
  if (!tooltip) {
    return null;
  }
  if (typeof tooltip === 'object' && ! /*#__PURE__*/React.isValidElement(tooltip)) {
    return tooltip;
  }
  return {
    title: tooltip
  };
}
const FormItemLabel = _ref => {
  let {
    prefixCls,
    label,
    htmlFor,
    labelCol,
    labelAlign,
    colon,
    required,
    requiredMark,
    tooltip
  } = _ref;
  var _a;
  const [formLocale] = (0, _useLocale.default)('Form');
  const {
    vertical,
    labelAlign: contextLabelAlign,
    labelCol: contextLabelCol,
    labelWrap,
    colon: contextColon
  } = React.useContext(_context.FormContext);
  if (!label) {
    return null;
  }
  const mergedLabelCol = labelCol || contextLabelCol || {};
  const mergedLabelAlign = labelAlign || contextLabelAlign;
  const labelClsBasic = `${prefixCls}-item-label`;
  const labelColClassName = (0, _classnames.default)(labelClsBasic, mergedLabelAlign === 'left' && `${labelClsBasic}-left`, mergedLabelCol.className, {
    [`${labelClsBasic}-wrap`]: !!labelWrap
  });
  let labelChildren = label;
  // Keep label is original where there should have no colon
  const computedColon = colon === true || contextColon !== false && colon !== false;
  const haveColon = computedColon && !vertical;
  // Remove duplicated user input colon
  if (haveColon && typeof label === 'string' && label.trim() !== '') {
    labelChildren = label.replace(/[:|：]\s*$/, '');
  }
  // Tooltip
  const tooltipProps = toTooltipProps(tooltip);
  if (tooltipProps) {
    const {
        icon = /*#__PURE__*/React.createElement(_QuestionCircleOutlined.default, null)
      } = tooltipProps,
      restTooltipProps = __rest(tooltipProps, ["icon"]);
    const tooltipNode = /*#__PURE__*/React.createElement(_tooltip.default, Object.assign({}, restTooltipProps), /*#__PURE__*/React.cloneElement(icon, {
      className: `${prefixCls}-item-tooltip`,
      title: ''
    }));
    labelChildren = /*#__PURE__*/React.createElement(React.Fragment, null, labelChildren, tooltipNode);
  }
  if (requiredMark === 'optional' && !required) {
    labelChildren = /*#__PURE__*/React.createElement(React.Fragment, null, labelChildren, /*#__PURE__*/React.createElement("span", {
      className: `${prefixCls}-item-optional`,
      title: ""
    }, (formLocale === null || formLocale === void 0 ? void 0 : formLocale.optional) || ((_a = _en_US.default.Form) === null || _a === void 0 ? void 0 : _a.optional)));
  }
  const labelClassName = (0, _classnames.default)({
    [`${prefixCls}-item-required`]: required,
    [`${prefixCls}-item-required-mark-optional`]: requiredMark === 'optional',
    [`${prefixCls}-item-no-colon`]: !computedColon
  });
  return /*#__PURE__*/React.createElement(_col.default, Object.assign({}, mergedLabelCol, {
    className: labelColClassName
  }), /*#__PURE__*/React.createElement("label", {
    htmlFor: htmlFor,
    className: labelClassName,
    title: typeof label === 'string' ? label : ''
  }, labelChildren));
};
var _default = FormItemLabel;
exports.default = _default;