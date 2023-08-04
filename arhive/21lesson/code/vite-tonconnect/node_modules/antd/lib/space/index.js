"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.SpaceContext = void 0;
var _classnames = _interopRequireDefault(require("classnames"));
var _toArray = _interopRequireDefault(require("rc-util/lib/Children/toArray"));
var React = _interopRequireWildcard(require("react"));
var _configProvider = require("../config-provider");
var _useFlexGapSupport = _interopRequireDefault(require("../_util/hooks/useFlexGapSupport"));
var _Compact = _interopRequireDefault(require("./Compact"));
var _Item = _interopRequireDefault(require("./Item"));
var _style = _interopRequireDefault(require("./style"));
var __rest = void 0 && (void 0).__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
const SpaceContext = /*#__PURE__*/React.createContext({
  latestIndex: 0,
  horizontalSize: 0,
  verticalSize: 0,
  supportFlexGap: false
});
exports.SpaceContext = SpaceContext;
const spaceSize = {
  small: 8,
  middle: 16,
  large: 24
};
function getNumberSize(size) {
  return typeof size === 'string' ? spaceSize[size] : size || 0;
}
const Space = props => {
  const {
    getPrefixCls,
    space,
    direction: directionConfig
  } = React.useContext(_configProvider.ConfigContext);
  const {
      size = (space === null || space === void 0 ? void 0 : space.size) || 'small',
      align,
      className,
      rootClassName,
      children,
      direction = 'horizontal',
      prefixCls: customizePrefixCls,
      split,
      style,
      wrap = false
    } = props,
    otherProps = __rest(props, ["size", "align", "className", "rootClassName", "children", "direction", "prefixCls", "split", "style", "wrap"]);
  const supportFlexGap = (0, _useFlexGapSupport.default)();
  const [horizontalSize, verticalSize] = React.useMemo(() => (Array.isArray(size) ? size : [size, size]).map(item => getNumberSize(item)), [size]);
  const childNodes = (0, _toArray.default)(children, {
    keepEmpty: true
  });
  const mergedAlign = align === undefined && direction === 'horizontal' ? 'center' : align;
  const prefixCls = getPrefixCls('space', customizePrefixCls);
  const [wrapSSR, hashId] = (0, _style.default)(prefixCls);
  const cn = (0, _classnames.default)(prefixCls, hashId, `${prefixCls}-${direction}`, {
    [`${prefixCls}-rtl`]: directionConfig === 'rtl',
    [`${prefixCls}-align-${mergedAlign}`]: mergedAlign
  }, className, rootClassName);
  const itemClassName = `${prefixCls}-item`;
  const marginDirection = directionConfig === 'rtl' ? 'marginLeft' : 'marginRight';
  // Calculate latest one
  let latestIndex = 0;
  const nodes = childNodes.map((child, i) => {
    if (child !== null && child !== undefined) {
      latestIndex = i;
    }
    const key = child && child.key || `${itemClassName}-${i}`;
    return /*#__PURE__*/React.createElement(_Item.default, {
      className: itemClassName,
      key: key,
      direction: direction,
      index: i,
      marginDirection: marginDirection,
      split: split,
      wrap: wrap
    }, child);
  });
  const spaceContext = React.useMemo(() => ({
    horizontalSize,
    verticalSize,
    latestIndex,
    supportFlexGap
  }), [horizontalSize, verticalSize, latestIndex, supportFlexGap]);
  // =========================== Render ===========================
  if (childNodes.length === 0) {
    return null;
  }
  const gapStyle = {};
  if (wrap) {
    gapStyle.flexWrap = 'wrap';
    // Patch for gap not support
    if (!supportFlexGap) {
      gapStyle.marginBottom = -verticalSize;
    }
  }
  if (supportFlexGap) {
    gapStyle.columnGap = horizontalSize;
    gapStyle.rowGap = verticalSize;
  }
  return wrapSSR( /*#__PURE__*/React.createElement("div", Object.assign({
    className: cn,
    style: Object.assign(Object.assign({}, gapStyle), style)
  }, otherProps), /*#__PURE__*/React.createElement(SpaceContext.Provider, {
    value: spaceContext
  }, nodes)));
};
if (process.env.NODE_ENV !== 'production') {
  Space.displayName = 'Space';
}
const CompoundedSpace = Space;
CompoundedSpace.Compact = _Compact.default;
var _default = CompoundedSpace;
exports.default = _default;