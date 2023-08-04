"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.RadioOptionTypeContextProvider = exports.RadioOptionTypeContext = exports.RadioGroupContextProvider = void 0;
var React = _interopRequireWildcard(require("react"));
const RadioGroupContext = /*#__PURE__*/React.createContext(null);
const RadioGroupContextProvider = RadioGroupContext.Provider;
exports.RadioGroupContextProvider = RadioGroupContextProvider;
var _default = RadioGroupContext;
exports.default = _default;
const RadioOptionTypeContext = /*#__PURE__*/React.createContext(null);
exports.RadioOptionTypeContext = RadioOptionTypeContext;
const RadioOptionTypeContextProvider = RadioOptionTypeContext.Provider;
exports.RadioOptionTypeContextProvider = RadioOptionTypeContextProvider;