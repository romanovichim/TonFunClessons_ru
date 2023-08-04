"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _warning = _interopRequireDefault(require("../_util/warning"));
const Icon = () => {
  process.env.NODE_ENV !== "production" ? (0, _warning.default)(false, 'Icon', 'Empty Icon') : void 0;
  return null;
};
var _default = Icon;
exports.default = _default;