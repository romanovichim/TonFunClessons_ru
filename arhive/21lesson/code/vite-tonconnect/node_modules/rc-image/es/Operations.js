import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import * as React from 'react';
import classnames from 'classnames';
import CSSMotion from 'rc-motion';
import Portal from '@rc-component/portal';
import { MIN_SCALE, MAX_SCALE } from "./previewConfig";
var Operations = function Operations(props) {
  var _countRender;
  var visible = props.visible,
    maskTransitionName = props.maskTransitionName,
    getContainer = props.getContainer,
    prefixCls = props.prefixCls,
    rootClassName = props.rootClassName,
    icons = props.icons,
    countRender = props.countRender,
    showSwitch = props.showSwitch,
    showProgress = props.showProgress,
    current = props.current,
    count = props.count,
    scale = props.scale,
    onSwitchLeft = props.onSwitchLeft,
    onSwitchRight = props.onSwitchRight,
    onClose = props.onClose,
    onZoomIn = props.onZoomIn,
    onZoomOut = props.onZoomOut,
    onRotateRight = props.onRotateRight,
    onRotateLeft = props.onRotateLeft,
    onFlipX = props.onFlipX,
    onFlipY = props.onFlipY;
  var rotateLeft = icons.rotateLeft,
    rotateRight = icons.rotateRight,
    zoomIn = icons.zoomIn,
    zoomOut = icons.zoomOut,
    close = icons.close,
    left = icons.left,
    right = icons.right,
    flipX = icons.flipX,
    flipY = icons.flipY;
  var toolClassName = "".concat(prefixCls, "-operations-operation");
  var iconClassName = "".concat(prefixCls, "-operations-icon");
  var tools = [{
    icon: close,
    onClick: onClose,
    type: 'close'
  }, {
    icon: zoomIn,
    onClick: onZoomIn,
    type: 'zoomIn',
    disabled: scale === MAX_SCALE
  }, {
    icon: zoomOut,
    onClick: onZoomOut,
    type: 'zoomOut',
    disabled: scale === MIN_SCALE
  }, {
    icon: rotateRight,
    onClick: onRotateRight,
    type: 'rotateRight'
  }, {
    icon: rotateLeft,
    onClick: onRotateLeft,
    type: 'rotateLeft'
  }, {
    icon: flipX,
    onClick: onFlipX,
    type: 'flipX'
  }, {
    icon: flipY,
    onClick: onFlipY,
    type: 'flipY'
  }];
  var operations = /*#__PURE__*/React.createElement(React.Fragment, null, showSwitch && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: classnames("".concat(prefixCls, "-switch-left"), _defineProperty({}, "".concat(prefixCls, "-switch-left-disabled"), current === 0)),
    onClick: onSwitchLeft
  }, left), /*#__PURE__*/React.createElement("div", {
    className: classnames("".concat(prefixCls, "-switch-right"), _defineProperty({}, "".concat(prefixCls, "-switch-right-disabled"), current === count - 1)),
    onClick: onSwitchRight
  }, right)), /*#__PURE__*/React.createElement("ul", {
    className: "".concat(prefixCls, "-operations")
  }, showProgress && /*#__PURE__*/React.createElement("li", {
    className: "".concat(prefixCls, "-operations-progress")
  }, (_countRender = countRender === null || countRender === void 0 ? void 0 : countRender(current + 1, count)) !== null && _countRender !== void 0 ? _countRender : "".concat(current + 1, " / ").concat(count)), tools.map(function (_ref) {
    var _classnames3;
    var icon = _ref.icon,
      onClick = _ref.onClick,
      type = _ref.type,
      disabled = _ref.disabled;
    return /*#__PURE__*/React.createElement("li", {
      className: classnames(toolClassName, (_classnames3 = {}, _defineProperty(_classnames3, "".concat(prefixCls, "-operations-operation-").concat(type), true), _defineProperty(_classnames3, "".concat(prefixCls, "-operations-operation-disabled"), !!disabled), _classnames3)),
      onClick: onClick,
      key: type
    }, /*#__PURE__*/React.isValidElement(icon) ? /*#__PURE__*/React.cloneElement(icon, {
      className: iconClassName
    }) : icon);
  })));
  return /*#__PURE__*/React.createElement(CSSMotion, {
    visible: visible,
    motionName: maskTransitionName
  }, function (_ref2) {
    var className = _ref2.className,
      style = _ref2.style;
    return /*#__PURE__*/React.createElement(Portal, {
      open: true,
      getContainer: getContainer !== null && getContainer !== void 0 ? getContainer : document.body
    }, /*#__PURE__*/React.createElement("div", {
      className: classnames("".concat(prefixCls, "-operations-wrapper"), className, rootClassName),
      style: style
    }, operations));
  });
};
export default Operations;