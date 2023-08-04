"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {};
exports.default = void 0;
var _useLocale = _interopRequireWildcard(require("../locale/useLocale"));
Object.keys(_useLocale).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _useLocale[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _useLocale[key];
    }
  });
});
// locale-provider 文件夹的移除需要修改 @ant-design/tools 和 antd-img-crop
var _default = _useLocale.default;
exports.default = _default;