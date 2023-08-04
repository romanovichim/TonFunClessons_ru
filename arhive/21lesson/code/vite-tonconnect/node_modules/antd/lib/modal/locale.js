"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.changeConfirmLocale = changeConfirmLocale;
exports.getConfirmLocale = getConfirmLocale;
var _en_US = _interopRequireDefault(require("../locale/en_US"));
let runtimeLocale = Object.assign({}, _en_US.default.Modal);
function changeConfirmLocale(newLocale) {
  if (newLocale) {
    runtimeLocale = Object.assign(Object.assign({}, runtimeLocale), newLocale);
  } else {
    runtimeLocale = Object.assign({}, _en_US.default.Modal);
  }
}
function getConfirmLocale() {
  return runtimeLocale;
}