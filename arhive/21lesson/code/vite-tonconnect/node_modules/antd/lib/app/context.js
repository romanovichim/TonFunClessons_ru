"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.AppConfigContext = void 0;
var _react = _interopRequireDefault(require("react"));
const AppConfigContext = /*#__PURE__*/_react.default.createContext({});
exports.AppConfigContext = AppConfigContext;
const AppContext = /*#__PURE__*/_react.default.createContext({
  message: {},
  notification: {},
  modal: {}
});
var _default = AppContext;
exports.default = _default;