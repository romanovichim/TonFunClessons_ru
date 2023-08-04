"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _CloseOutlined = _interopRequireDefault(require("@ant-design/icons/CloseOutlined"));
var _classnames = _interopRequireDefault(require("classnames"));
var React = _interopRequireWildcard(require("react"));
var _configProvider = require("../config-provider");
var _colors = require("../_util/colors");
var _wave = _interopRequireDefault(require("../_util/wave"));
var _warning = _interopRequireDefault(require("../_util/warning"));
var _CheckableTag = _interopRequireDefault(require("./CheckableTag"));
var _style = _interopRequireDefault(require("./style"));
var __rest = void 0 && (void 0).__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
const InternalTag = (_a, ref) => {
  var {
      prefixCls: customizePrefixCls,
      className,
      rootClassName,
      style,
      children,
      icon,
      color,
      onClose,
      closeIcon,
      closable = false
    } = _a,
    props = __rest(_a, ["prefixCls", "className", "rootClassName", "style", "children", "icon", "color", "onClose", "closeIcon", "closable"]);
  const {
    getPrefixCls,
    direction
  } = React.useContext(_configProvider.ConfigContext);
  const [visible, setVisible] = React.useState(true);
  // Warning for deprecated usage
  if (process.env.NODE_ENV !== 'production') {
    process.env.NODE_ENV !== "production" ? (0, _warning.default)(!('visible' in props), 'Tag', '`visible` is deprecated, please use `visible && <Tag />` instead.') : void 0;
  }
  React.useEffect(() => {
    if ('visible' in props) {
      setVisible(props.visible);
    }
  }, [props.visible]);
  const isInternalColor = (0, _colors.isPresetColor)(color) || (0, _colors.isPresetStatusColor)(color);
  const tagStyle = Object.assign({
    backgroundColor: color && !isInternalColor ? color : undefined
  }, style);
  const prefixCls = getPrefixCls('tag', customizePrefixCls);
  // Style
  const [wrapSSR, hashId] = (0, _style.default)(prefixCls);
  const tagClassName = (0, _classnames.default)(prefixCls, {
    [`${prefixCls}-${color}`]: isInternalColor,
    [`${prefixCls}-has-color`]: color && !isInternalColor,
    [`${prefixCls}-hidden`]: !visible,
    [`${prefixCls}-rtl`]: direction === 'rtl'
  }, className, rootClassName, hashId);
  const handleCloseClick = e => {
    e.stopPropagation();
    onClose === null || onClose === void 0 ? void 0 : onClose(e);
    if (e.defaultPrevented) {
      return;
    }
    setVisible(false);
  };
  const renderCloseIcon = () => {
    if (closable) {
      return closeIcon ? /*#__PURE__*/React.createElement("span", {
        className: `${prefixCls}-close-icon`,
        onClick: handleCloseClick
      }, closeIcon) : /*#__PURE__*/React.createElement(_CloseOutlined.default, {
        className: `${prefixCls}-close-icon`,
        onClick: handleCloseClick
      });
    }
    return null;
  };
  const isNeedWave = typeof props.onClick === 'function' || children && children.type === 'a';
  const iconNode = icon || null;
  const kids = iconNode ? /*#__PURE__*/React.createElement(React.Fragment, null, iconNode, /*#__PURE__*/React.createElement("span", null, children)) : children;
  const tagNode = /*#__PURE__*/React.createElement("span", Object.assign({}, props, {
    ref: ref,
    className: tagClassName,
    style: tagStyle
  }), kids, renderCloseIcon());
  return wrapSSR(isNeedWave ? /*#__PURE__*/React.createElement(_wave.default, null, tagNode) : tagNode);
};
const Tag = /*#__PURE__*/React.forwardRef(InternalTag);
if (process.env.NODE_ENV !== 'production') {
  Tag.displayName = 'Tag';
}
Tag.CheckableTag = _CheckableTag.default;
var _default = Tag;
exports.default = _default;