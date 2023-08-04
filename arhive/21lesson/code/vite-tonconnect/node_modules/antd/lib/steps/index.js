"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _CheckOutlined = _interopRequireDefault(require("@ant-design/icons/CheckOutlined"));
var _CloseOutlined = _interopRequireDefault(require("@ant-design/icons/CloseOutlined"));
var _classnames = _interopRequireDefault(require("classnames"));
var _rcSteps = _interopRequireDefault(require("rc-steps"));
var React = _interopRequireWildcard(require("react"));
var _tooltip = _interopRequireDefault(require("../tooltip"));
var _configProvider = require("../config-provider");
var _useBreakpoint = _interopRequireDefault(require("../grid/hooks/useBreakpoint"));
var _progress = _interopRequireDefault(require("../progress"));
var _useLegacyItems = _interopRequireDefault(require("./useLegacyItems"));
var _style = _interopRequireDefault(require("./style"));
var __rest = void 0 && (void 0).__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
const Steps = props => {
  const {
      percent,
      size,
      className,
      rootClassName,
      direction,
      items,
      responsive = true,
      current = 0,
      children
    } = props,
    restProps = __rest(props, ["percent", "size", "className", "rootClassName", "direction", "items", "responsive", "current", "children"]);
  const {
    xs
  } = (0, _useBreakpoint.default)(responsive);
  const {
    getPrefixCls,
    direction: rtlDirection
  } = React.useContext(_configProvider.ConfigContext);
  const realDirectionValue = React.useMemo(() => responsive && xs ? 'vertical' : direction, [xs, direction]);
  const prefixCls = getPrefixCls('steps', props.prefixCls);
  const [wrapSSR, hashId] = (0, _style.default)(prefixCls);
  const isInline = props.type === 'inline';
  const iconPrefix = getPrefixCls('', props.iconPrefix);
  const mergedItems = (0, _useLegacyItems.default)(items, children);
  const mergedPercent = isInline ? undefined : percent;
  const stepsClassName = (0, _classnames.default)({
    [`${prefixCls}-rtl`]: rtlDirection === 'rtl',
    [`${prefixCls}-with-progress`]: mergedPercent !== undefined
  }, className, rootClassName, hashId);
  const icons = {
    finish: /*#__PURE__*/React.createElement(_CheckOutlined.default, {
      className: `${prefixCls}-finish-icon`
    }),
    error: /*#__PURE__*/React.createElement(_CloseOutlined.default, {
      className: `${prefixCls}-error-icon`
    })
  };
  const stepIconRender = _ref => {
    let {
      node,
      status
    } = _ref;
    if (status === 'process' && mergedPercent !== undefined) {
      // currently it's hard-coded, since we can't easily read the actually width of icon
      const progressWidth = size === 'small' ? 32 : 40;
      // iconWithProgress
      return /*#__PURE__*/React.createElement("div", {
        className: `${prefixCls}-progress-icon`
      }, /*#__PURE__*/React.createElement(_progress.default, {
        type: "circle",
        percent: mergedPercent,
        size: progressWidth,
        strokeWidth: 4,
        format: () => null
      }), node);
    }
    return node;
  };
  const itemRender = (item, stepItem) => item.description ? /*#__PURE__*/React.createElement(_tooltip.default, {
    title: item.description
  }, stepItem) : stepItem;
  return wrapSSR( /*#__PURE__*/React.createElement(_rcSteps.default, Object.assign({
    icons: icons
  }, restProps, {
    current: current,
    size: size,
    items: mergedItems,
    itemRender: isInline ? itemRender : undefined,
    stepIcon: stepIconRender,
    direction: realDirectionValue,
    prefixCls: prefixCls,
    iconPrefix: iconPrefix,
    className: stepsClassName
  })));
};
Steps.Step = _rcSteps.default.Step;
if (process.env.NODE_ENV !== 'production') {
  Steps.displayName = 'Steps';
}
var _default = Steps;
exports.default = _default;