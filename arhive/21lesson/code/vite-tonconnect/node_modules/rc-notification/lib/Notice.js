"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _classnames = _interopRequireDefault(require("classnames"));
var _KeyCode = _interopRequireDefault(require("rc-util/lib/KeyCode"));
var React = _interopRequireWildcard(require("react"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var Notify = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var prefixCls = props.prefixCls,
    style = props.style,
    className = props.className,
    _props$duration = props.duration,
    duration = _props$duration === void 0 ? 4.5 : _props$duration,
    eventKey = props.eventKey,
    content = props.content,
    closable = props.closable,
    _props$closeIcon = props.closeIcon,
    closeIcon = _props$closeIcon === void 0 ? 'x' : _props$closeIcon,
    divProps = props.props,
    onClick = props.onClick,
    onNoticeClose = props.onNoticeClose,
    times = props.times;
  var _React$useState = React.useState(false),
    _React$useState2 = (0, _slicedToArray2.default)(_React$useState, 2),
    hovering = _React$useState2[0],
    setHovering = _React$useState2[1];
  // ======================== Close =========================
  var onInternalClose = function onInternalClose() {
    onNoticeClose(eventKey);
  };
  var onCloseKeyDown = function onCloseKeyDown(e) {
    if (e.key === 'Enter' || e.code === 'Enter' || e.keyCode === _KeyCode.default.ENTER) {
      onInternalClose();
    }
  };
  // ======================== Effect ========================
  React.useEffect(function () {
    if (!hovering && duration > 0) {
      var timeout = setTimeout(function () {
        onInternalClose();
      }, duration * 1000);
      return function () {
        clearTimeout(timeout);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [duration, hovering, times]);
  // ======================== Render ========================
  var noticePrefixCls = "".concat(prefixCls, "-notice");
  return /*#__PURE__*/React.createElement("div", (0, _extends2.default)({}, divProps, {
    ref: ref,
    className: (0, _classnames.default)(noticePrefixCls, className, (0, _defineProperty2.default)({}, "".concat(noticePrefixCls, "-closable"), closable)),
    style: style,
    onMouseEnter: function onMouseEnter() {
      setHovering(true);
    },
    onMouseLeave: function onMouseLeave() {
      setHovering(false);
    },
    onClick: onClick
  }), /*#__PURE__*/React.createElement("div", {
    className: "".concat(noticePrefixCls, "-content")
  }, content), closable && /*#__PURE__*/React.createElement("a", {
    tabIndex: 0,
    className: "".concat(noticePrefixCls, "-close"),
    onKeyDown: onCloseKeyDown,
    onClick: function onClick(e) {
      e.preventDefault();
      e.stopPropagation();
      onInternalClose();
    }
  }, closeIcon));
});
var _default = Notify;
exports.default = _default;