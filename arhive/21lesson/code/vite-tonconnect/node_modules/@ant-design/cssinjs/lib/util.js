"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.flattenToken = flattenToken;
exports.supportLayer = supportLayer;
exports.token2key = token2key;
var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));
var _hash = _interopRequireDefault(require("@emotion/hash"));
var _canUseDom = _interopRequireDefault(require("rc-util/lib/Dom/canUseDom"));
var _dynamicCSS = require("rc-util/lib/Dom/dynamicCSS");
function flattenToken(token) {
  var str = '';
  Object.keys(token).forEach(function (key) {
    var value = token[key];
    str += key;
    if (value && (0, _typeof2.default)(value) === 'object') {
      str += flattenToken(value);
    } else {
      str += value;
    }
  });
  return str;
}

/**
 * Convert derivative token to key string
 */
function token2key(token, salt) {
  return (0, _hash.default)("".concat(salt, "_").concat(flattenToken(token)));
}
var layerKey = "layer-".concat(Date.now(), "-").concat(Math.random()).replace(/\./g, '');
var layerWidth = '903px';
function supportSelector(styleStr, handleElement) {
  if ((0, _canUseDom.default)()) {
    var _ele$parentNode;
    (0, _dynamicCSS.updateCSS)(styleStr, layerKey);
    var _ele = document.createElement('div');
    _ele.style.position = 'fixed';
    _ele.style.left = '0';
    _ele.style.top = '0';
    handleElement === null || handleElement === void 0 ? void 0 : handleElement(_ele);
    document.body.appendChild(_ele);
    if (process.env.NODE_ENV !== 'production') {
      _ele.innerHTML = 'Test';
      _ele.style.zIndex = '9999999';
    }
    var support = getComputedStyle(_ele).width === layerWidth;
    (_ele$parentNode = _ele.parentNode) === null || _ele$parentNode === void 0 ? void 0 : _ele$parentNode.removeChild(_ele);
    (0, _dynamicCSS.removeCSS)(layerKey);
    return support;
  }
  return false;
}
var canLayer = undefined;
function supportLayer() {
  if (canLayer === undefined) {
    canLayer = supportSelector("@layer ".concat(layerKey, " { .").concat(layerKey, " { width: ").concat(layerWidth, "!important; } }"), function (ele) {
      ele.className = layerKey;
    });
  }
  return canLayer;
}