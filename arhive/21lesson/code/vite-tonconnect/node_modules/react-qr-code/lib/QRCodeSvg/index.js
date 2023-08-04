"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var propTypes = {
  bgColor: _propTypes2.default.oneOfType([_propTypes2.default.object, _propTypes2.default.string]).isRequired,
  bgD: _propTypes2.default.string.isRequired,
  fgColor: _propTypes2.default.oneOfType([_propTypes2.default.object, _propTypes2.default.string]).isRequired,
  fgD: _propTypes2.default.string.isRequired,
  size: _propTypes2.default.number.isRequired,
  title: _propTypes2.default.string,
  viewBoxSize: _propTypes2.default.number.isRequired,
  xmlns: _propTypes2.default.string
};

var defaultProps = {
  title: undefined,
  xmlns: "http://www.w3.org/2000/svg"
};

var QRCodeSvg = (0, _react.forwardRef)(function (_ref, ref) {
  var bgColor = _ref.bgColor,
      bgD = _ref.bgD,
      fgD = _ref.fgD,
      fgColor = _ref.fgColor,
      size = _ref.size,
      title = _ref.title,
      viewBoxSize = _ref.viewBoxSize,
      props = _objectWithoutProperties(_ref, ["bgColor", "bgD", "fgD", "fgColor", "size", "title", "viewBoxSize"]);

  return _react2.default.createElement(
    "svg",
    _extends({}, props, { height: size, ref: ref, viewBox: "0 0 " + viewBoxSize + " " + viewBoxSize, width: size }),
    title ? _react2.default.createElement(
      "title",
      null,
      title
    ) : null,
    _react2.default.createElement("path", { d: bgD, fill: bgColor }),
    _react2.default.createElement("path", { d: fgD, fill: fgColor })
  );
});

QRCodeSvg.displayName = "QRCodeSvg";
QRCodeSvg.propTypes = propTypes;
QRCodeSvg.defaultProps = defaultProps;

exports.default = QRCodeSvg;