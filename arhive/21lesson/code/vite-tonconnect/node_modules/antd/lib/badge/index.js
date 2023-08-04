"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _classnames = _interopRequireDefault(require("classnames"));
var _rcMotion = _interopRequireDefault(require("rc-motion"));
var React = _interopRequireWildcard(require("react"));
var _configProvider = require("../config-provider");
var _colors = require("../_util/colors");
var _reactNode = require("../_util/reactNode");
var _Ribbon = _interopRequireDefault(require("./Ribbon"));
var _ScrollNumber = _interopRequireDefault(require("./ScrollNumber"));
var _style = _interopRequireDefault(require("./style"));
var __rest = void 0 && (void 0).__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
const Badge = _a => {
  var {
      prefixCls: customizePrefixCls,
      scrollNumberPrefixCls: customizeScrollNumberPrefixCls,
      children,
      status,
      text,
      color,
      count = null,
      overflowCount = 99,
      dot = false,
      size = 'default',
      title,
      offset,
      style,
      className,
      rootClassName,
      showZero = false
    } = _a,
    restProps = __rest(_a, ["prefixCls", "scrollNumberPrefixCls", "children", "status", "text", "color", "count", "overflowCount", "dot", "size", "title", "offset", "style", "className", "rootClassName", "showZero"]);
  const {
    getPrefixCls,
    direction
  } = React.useContext(_configProvider.ConfigContext);
  const prefixCls = getPrefixCls('badge', customizePrefixCls);
  // Style
  const [wrapSSR, hashId] = (0, _style.default)(prefixCls);
  // ================================ Misc ================================
  const numberedDisplayCount = count > overflowCount ? `${overflowCount}+` : count;
  const isZero = numberedDisplayCount === '0' || numberedDisplayCount === 0;
  const ignoreCount = count === null || isZero && !showZero;
  const hasStatus = (status !== null && status !== undefined || color !== null && color !== undefined) && ignoreCount;
  const showAsDot = dot && !isZero;
  const mergedCount = showAsDot ? '' : numberedDisplayCount;
  const isHidden = (0, React.useMemo)(() => {
    const isEmpty = mergedCount === null || mergedCount === undefined || mergedCount === '';
    return (isEmpty || isZero && !showZero) && !showAsDot;
  }, [mergedCount, isZero, showZero, showAsDot]);
  // Count should be cache in case hidden change it
  const countRef = (0, React.useRef)(count);
  if (!isHidden) {
    countRef.current = count;
  }
  const livingCount = countRef.current;
  // We need cache count since remove motion should not change count display
  const displayCountRef = (0, React.useRef)(mergedCount);
  if (!isHidden) {
    displayCountRef.current = mergedCount;
  }
  const displayCount = displayCountRef.current;
  // We will cache the dot status to avoid shaking on leaved motion
  const isDotRef = (0, React.useRef)(showAsDot);
  if (!isHidden) {
    isDotRef.current = showAsDot;
  }
  // =============================== Styles ===============================
  const mergedStyle = (0, React.useMemo)(() => {
    if (!offset) {
      return Object.assign({}, style);
    }
    const offsetStyle = {
      marginTop: offset[1]
    };
    if (direction === 'rtl') {
      offsetStyle.left = parseInt(offset[0], 10);
    } else {
      offsetStyle.right = -parseInt(offset[0], 10);
    }
    return Object.assign(Object.assign({}, offsetStyle), style);
  }, [direction, offset, style]);
  // =============================== Render ===============================
  // >>> Title
  const titleNode = title !== null && title !== void 0 ? title : typeof livingCount === 'string' || typeof livingCount === 'number' ? livingCount : undefined;
  // >>> Status Text
  const statusTextNode = isHidden || !text ? null : /*#__PURE__*/React.createElement("span", {
    className: `${prefixCls}-status-text`
  }, text);
  // >>> Display Component
  const displayNode = !livingCount || typeof livingCount !== 'object' ? undefined : (0, _reactNode.cloneElement)(livingCount, oriProps => ({
    style: Object.assign(Object.assign({}, mergedStyle), oriProps.style)
  }));
  // InternalColor
  const isInternalColor = (0, _colors.isPresetColor)(color, false);
  // Shared styles
  const statusCls = (0, _classnames.default)({
    [`${prefixCls}-status-dot`]: hasStatus,
    [`${prefixCls}-status-${status}`]: !!status,
    [`${prefixCls}-color-${color}`]: isInternalColor
  });
  const statusStyle = {};
  if (color && !isInternalColor) {
    statusStyle.color = color;
    statusStyle.background = color;
  }
  const badgeClassName = (0, _classnames.default)(prefixCls, {
    [`${prefixCls}-status`]: hasStatus,
    [`${prefixCls}-not-a-wrapper`]: !children,
    [`${prefixCls}-rtl`]: direction === 'rtl'
  }, className, rootClassName, hashId);
  // <Badge status="success" />
  if (!children && hasStatus) {
    const statusTextColor = mergedStyle.color;
    return wrapSSR( /*#__PURE__*/React.createElement("span", Object.assign({}, restProps, {
      className: badgeClassName,
      style: mergedStyle
    }), /*#__PURE__*/React.createElement("span", {
      className: statusCls,
      style: statusStyle
    }), text && /*#__PURE__*/React.createElement("span", {
      style: {
        color: statusTextColor
      },
      className: `${prefixCls}-status-text`
    }, text)));
  }
  return wrapSSR( /*#__PURE__*/React.createElement("span", Object.assign({}, restProps, {
    className: badgeClassName
  }), children, /*#__PURE__*/React.createElement(_rcMotion.default, {
    visible: !isHidden,
    motionName: `${prefixCls}-zoom`,
    motionAppear: false,
    motionDeadline: 1000
  }, _ref => {
    let {
      className: motionClassName,
      ref
    } = _ref;
    const scrollNumberPrefixCls = getPrefixCls('scroll-number', customizeScrollNumberPrefixCls);
    const isDot = isDotRef.current;
    const scrollNumberCls = (0, _classnames.default)({
      [`${prefixCls}-dot`]: isDot,
      [`${prefixCls}-count`]: !isDot,
      [`${prefixCls}-count-sm`]: size === 'small',
      [`${prefixCls}-multiple-words`]: !isDot && displayCount && displayCount.toString().length > 1,
      [`${prefixCls}-status-${status}`]: !!status,
      [`${prefixCls}-color-${color}`]: isInternalColor
    });
    let scrollNumberStyle = Object.assign({}, mergedStyle);
    if (color && !isInternalColor) {
      scrollNumberStyle = scrollNumberStyle || {};
      scrollNumberStyle.background = color;
    }
    return /*#__PURE__*/React.createElement(_ScrollNumber.default, {
      prefixCls: scrollNumberPrefixCls,
      show: !isHidden,
      motionClassName: motionClassName,
      className: scrollNumberCls,
      count: displayCount,
      title: titleNode,
      style: scrollNumberStyle,
      key: "scrollNumber",
      ref: ref
    }, displayNode);
  }), statusTextNode));
};
Badge.Ribbon = _Ribbon.default;
if (process.env.NODE_ENV !== 'production') {
  Badge.displayName = 'Badge';
}
var _default = Badge;
exports.default = _default;