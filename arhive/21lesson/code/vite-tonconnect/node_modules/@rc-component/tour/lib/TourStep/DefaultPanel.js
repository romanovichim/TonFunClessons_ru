"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = DefaultPanel;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var React = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

function DefaultPanel(props) {
  var prefixCls = props.prefixCls,
      current = props.current,
      total = props.total,
      title = props.title,
      description = props.description,
      onClose = props.onClose,
      onPrev = props.onPrev,
      onNext = props.onNext,
      onFinish = props.onFinish,
      className = props.className;
  return /*#__PURE__*/React.createElement("div", {
    className: (0, _classnames.default)("".concat(prefixCls, "-content"), className)
  }, /*#__PURE__*/React.createElement("div", {
    className: "".concat(prefixCls, "-inner")
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onClose,
    "aria-label": "Close",
    className: "".concat(prefixCls, "-close")
  }, /*#__PURE__*/React.createElement("span", {
    className: "".concat(prefixCls, "-close-x")
  }, "\xD7")), /*#__PURE__*/React.createElement("div", {
    className: "".concat(prefixCls, "-header")
  }, /*#__PURE__*/React.createElement("div", {
    className: "".concat(prefixCls, "-title")
  }, title)), /*#__PURE__*/React.createElement("div", {
    className: "".concat(prefixCls, "-description")
  }, description), /*#__PURE__*/React.createElement("div", {
    className: "".concat(prefixCls, "-footer")
  }, /*#__PURE__*/React.createElement("div", {
    className: "".concat(prefixCls, "-sliders")
  }, total > 1 ? (0, _toConsumableArray2.default)(Array.from({
    length: total
  }).keys()).map(function (item, index) {
    return /*#__PURE__*/React.createElement("span", {
      key: item,
      className: index === current ? 'active' : ''
    });
  }) : null), /*#__PURE__*/React.createElement("div", {
    className: "".concat(prefixCls, "-buttons")
  }, current !== 0 ? /*#__PURE__*/React.createElement("button", {
    className: "".concat(prefixCls, "-prev-btn"),
    onClick: onPrev
  }, "Prev") : null, current === total - 1 ? /*#__PURE__*/React.createElement("button", {
    className: "".concat(prefixCls, "-finish-btn"),
    onClick: onFinish
  }, "Finish") : /*#__PURE__*/React.createElement("button", {
    className: "".concat(prefixCls, "-next-btn"),
    onClick: onNext
  }, "Next")))));
}