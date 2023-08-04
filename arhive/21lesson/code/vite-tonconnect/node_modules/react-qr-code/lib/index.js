"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _QRCode = require("qr.js/lib/QRCode");

var _QRCode2 = _interopRequireDefault(_QRCode);

var _ErrorCorrectLevel = require("qr.js/lib/ErrorCorrectLevel");

var _ErrorCorrectLevel2 = _interopRequireDefault(_ErrorCorrectLevel);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _QRCodeSvg = require("./QRCodeSvg");

var _QRCodeSvg2 = _interopRequireDefault(_QRCodeSvg);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; } // A `qr.js` doesn't handle error level of zero (M) so we need to do it right, thus the deep require.


var propTypes = {
  bgColor: _propTypes2.default.oneOfType([_propTypes2.default.object, _propTypes2.default.string]),
  fgColor: _propTypes2.default.oneOfType([_propTypes2.default.object, _propTypes2.default.string]),
  level: _propTypes2.default.string,
  size: _propTypes2.default.number,
  value: _propTypes2.default.string.isRequired
};

var defaultProps = {
  bgColor: "#FFFFFF",
  fgColor: "#000000",
  level: "L",
  size: 256
};

var QRCode = (0, _react.forwardRef)(function (_ref, ref) {
  var bgColor = _ref.bgColor,
      fgColor = _ref.fgColor,
      level = _ref.level,
      size = _ref.size,
      value = _ref.value,
      props = _objectWithoutProperties(_ref, ["bgColor", "fgColor", "level", "size", "value"]);

  // Use type === -1 to automatically pick the best type.
  var qrcode = new _QRCode2.default(-1, _ErrorCorrectLevel2.default[level]);
  qrcode.addData(value);
  qrcode.make();
  var cells = qrcode.modules;
  return _react2.default.createElement(_QRCodeSvg2.default, _extends({}, props, {
    bgColor: bgColor,
    bgD: cells.map(function (row, rowIndex) {
      return row.map(function (cell, cellIndex) {
        return !cell ? "M " + cellIndex + " " + rowIndex + " l 1 0 0 1 -1 0 Z" : "";
      }).join(" ");
    }).join(" "),
    fgColor: fgColor,
    fgD: cells.map(function (row, rowIndex) {
      return row.map(function (cell, cellIndex) {
        return cell ? "M " + cellIndex + " " + rowIndex + " l 1 0 0 1 -1 0 Z" : "";
      }).join(" ");
    }).join(" "),
    ref: ref,
    size: size,
    viewBoxSize: cells.length
  }));
});

QRCode.displayName = "QRCode";
QRCode.propTypes = propTypes;
QRCode.defaultProps = defaultProps;

exports.default = QRCode;