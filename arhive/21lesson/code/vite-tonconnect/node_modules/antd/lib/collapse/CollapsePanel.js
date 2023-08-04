"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _classnames = _interopRequireDefault(require("classnames"));
var _rcCollapse = _interopRequireDefault(require("rc-collapse"));
var React = _interopRequireWildcard(require("react"));
var _configProvider = require("../config-provider");
var _warning = _interopRequireDefault(require("../_util/warning"));
const CollapsePanel = /*#__PURE__*/React.forwardRef((props, ref) => {
  process.env.NODE_ENV !== "production" ? (0, _warning.default)(!('disabled' in props), 'Collapse.Panel', '`disabled` is deprecated. Please use `collapsible="disabled"` instead.') : void 0;
  const {
    getPrefixCls
  } = React.useContext(_configProvider.ConfigContext);
  const {
    prefixCls: customizePrefixCls,
    className = '',
    showArrow = true
  } = props;
  const prefixCls = getPrefixCls('collapse', customizePrefixCls);
  const collapsePanelClassName = (0, _classnames.default)({
    [`${prefixCls}-no-arrow`]: !showArrow
  }, className);
  return /*#__PURE__*/React.createElement(_rcCollapse.default.Panel, Object.assign({
    ref: ref
  }, props, {
    prefixCls: prefixCls,
    className: collapsePanelClassName
  }));
});
var _default = CollapsePanel;
exports.default = _default;