import LoadingOutlined from "@ant-design/icons/es/icons/LoadingOutlined";
import CSSMotion from 'rc-motion';
import React from 'react';
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
    return /*#__PURE__*/React.createElement("span", {
      className: `${prefixCls}-loading-icon`
    }, /*#__PURE__*/React.createElement(LoadingOutlined, null));
  }
  return /*#__PURE__*/React.createElement(CSSMotion, {
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
    return /*#__PURE__*/React.createElement("span", {
      className: `${prefixCls}-loading-icon`,
      style: style,
      ref: ref
    }, /*#__PURE__*/React.createElement(LoadingOutlined, {
      className: className
    }));
  });
};
export default LoadingIcon;