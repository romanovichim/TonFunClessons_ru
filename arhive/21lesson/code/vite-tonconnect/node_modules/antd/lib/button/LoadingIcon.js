"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _LoadingOutlined = _interopRequireDefault(require("@ant-design/icons/LoadingOutlined"));
var _rcMotion = _interopRequireDefault(require("rc-motion"));
var _react = _interopRequireDefault(require("react"));
const getCollapsedWidth = () => ({
  width: 0,
  opacity: 0,
  transform: 'scale(0)'
});
const getRealWidth = node => ({
  width: node.scrollWidth,
  opacity: 1,
  transform: 'scale(1)'
});
const LoadingIcon = _ref => {
  let {
    prefixCls,
    loading,
    existIcon
  } = _ref;
  const visible = !!loading;
  if (existIcon) {
    return /*#__PURE__*/_react.default.createElement("span", {
      className: `${prefixCls}-loading-icon`
    }, /*#__PURE__*/_react.default.createElement(_LoadingOutlined.default, null));
  }
  return /*#__PURE__*/_react.default.createElement(_rcMotion.default, {
    visible: visible,
    // We do not really use this motionName
    motionName: `${prefixCls}-loading-icon-motion`,
    removeOnLeave: true,
    onAppearStart: getCollapsedWidth,
    onAppearActive: getRealWidth,
    onEnterStart: getCollapsedWidth,
    onEnterActive: getRealWidth,
    onLeaveStart: getRealWidth,
    onLeaveActive: getCollapsedWidth
  }, (_ref2, ref) => {
    let {
      className,
      style
    } = _ref2;
    return /*#__PURE__*/_react.default.createElement("span", {
      className: `${prefixCls}-loading-icon`,
      style: style,
      ref: ref
    }, /*#__PURE__*/_react.default.createElement(_LoadingOutlined.default, {
      className: className
    }));
  });
};
var _default = LoadingIcon;
exports.default = _default;