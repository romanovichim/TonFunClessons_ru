"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _classnames = _interopRequireDefault(require("classnames"));
var _toArray = _interopRequireDefault(require("rc-util/lib/Children/toArray"));
var React = _interopRequireWildcard(require("react"));
var _configProvider = require("../config-provider");
var _popover = _interopRequireDefault(require("../popover"));
var _reactNode = require("../_util/reactNode");
var _avatar = _interopRequireDefault(require("./avatar"));
var _SizeContext = require("./SizeContext");
var _style = _interopRequireDefault(require("./style"));
const Group = props => {
  const {
    getPrefixCls,
    direction
  } = React.useContext(_configProvider.ConfigContext);
  const {
    prefixCls: customizePrefixCls,
    className,
    rootClassName,
    maxCount,
    maxStyle,
    size
  } = props;
  const prefixCls = getPrefixCls('avatar', customizePrefixCls);
  const groupPrefixCls = `${prefixCls}-group`;
  const [wrapSSR, hashId] = (0, _style.default)(prefixCls);
  const cls = (0, _classnames.default)(groupPrefixCls, {
    [`${groupPrefixCls}-rtl`]: direction === 'rtl'
  }, className, rootClassName, hashId);
  const {
    children,
    maxPopoverPlacement = 'top',
    maxPopoverTrigger = 'hover'
  } = props;
  const childrenWithProps = (0, _toArray.default)(children).map((child, index) => (0, _reactNode.cloneElement)(child, {
    key: `avatar-key-${index}`
  }));
  const numOfChildren = childrenWithProps.length;
  if (maxCount && maxCount < numOfChildren) {
    const childrenShow = childrenWithProps.slice(0, maxCount);
    const childrenHidden = childrenWithProps.slice(maxCount, numOfChildren);
    childrenShow.push( /*#__PURE__*/React.createElement(_popover.default, {
      key: "avatar-popover-key",
      content: childrenHidden,
      trigger: maxPopoverTrigger,
      placement: maxPopoverPlacement,
      overlayClassName: `${groupPrefixCls}-popover`
    }, /*#__PURE__*/React.createElement(_avatar.default, {
      style: maxStyle
    }, `+${numOfChildren - maxCount}`)));
    return wrapSSR( /*#__PURE__*/React.createElement(_SizeContext.SizeContextProvider, {
      size: size
    }, /*#__PURE__*/React.createElement("div", {
      className: cls,
      style: props.style
    }, childrenShow)));
  }
  return wrapSSR( /*#__PURE__*/React.createElement(_SizeContext.SizeContextProvider, {
    size: size
  }, /*#__PURE__*/React.createElement("div", {
    className: cls,
    style: props.style
  }, childrenWithProps)));
};
var _default = Group;
exports.default = _default;