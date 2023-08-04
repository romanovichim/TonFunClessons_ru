"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var React = _interopRequireWildcard(require("react"));
var _classnames4 = _interopRequireDefault(require("classnames"));
var _rcMotion = _interopRequireDefault(require("rc-motion"));
var _portal = _interopRequireDefault(require("@rc-component/portal"));
var _previewConfig = require("./previewConfig");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
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
    disabled: scale === _previewConfig.MAX_SCALE
  }, {
    icon: zoomOut,
    onClick: onZoomOut,
    type: 'zoomOut',
    disabled: scale === _previewConfig.MIN_SCALE
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
    className: (0, _classnames4.default)("".concat(prefixCls, "-switch-left"), (0, _defineProperty2.default)({}, "".concat(prefixCls, "-switch-left-disabled"), current === 0)),
    onClick: onSwitchLeft
  }, left), /*#__PURE__*/React.createElement("div", {
    className: (0, _classnames4.default)("".concat(prefixCls, "-switch-right"), (0, _defineProperty2.default)({}, "".concat(prefixCls, "-switch-right-disabled"), current === count - 1)),
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
      className: (0, _classnames4.default)(toolClassName, (_classnames3 = {}, (0, _defineProperty2.default)(_classnames3, "".concat(prefixCls, "-operations-operation-").concat(type), true), (0, _defineProperty2.default)(_classnames3, "".concat(prefixCls, "-operations-operation-disabled"), !!disabled), _classnames3)),
      onClick: onClick,
      key: type
    }, /*#__PURE__*/React.isValidElement(icon) ? /*#__PURE__*/React.cloneElement(icon, {
      className: iconClassName
    }) : icon);
  })));
  return /*#__PURE__*/React.createElement(_rcMotion.default, {
    visible: visible,
    motionName: maskTransitionName
  }, function (_ref2) {
    var className = _ref2.className,
      style = _ref2.style;
    return /*#__PURE__*/React.createElement(_portal.default, {
      open: true,
      getContainer: getContainer !== null && getContainer !== void 0 ? getContainer : document.body
    }, /*#__PURE__*/React.createElement("div", {
      className: (0, _classnames4.default)("".concat(prefixCls, "-operations-wrapper"), className, rootClassName),
      style: style
    }, operations));
  });
};
var _default = Operations;
exports.default = _default;