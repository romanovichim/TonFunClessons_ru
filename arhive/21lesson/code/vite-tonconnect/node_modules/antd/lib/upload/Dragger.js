"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var React = _interopRequireWildcard(require("react"));
var _Upload = _interopRequireDefault(require("./Upload"));
var __rest = void 0 && (void 0).__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
const Dragger = /*#__PURE__*/React.forwardRef((_a, ref) => {
  var {
      style,
      height
    } = _a,
    restProps = __rest(_a, ["style", "height"]);
  return /*#__PURE__*/React.createElement(_Upload.default, Object.assign({
    ref: ref
  }, restProps, {
    type: "drag",
    style: Object.assign(Object.assign({}, style), {
      height
    })
  }));
});
if (process.env.NODE_ENV !== 'production') {
  Dragger.displayName = 'Dragger';
}
var _default = Dragger;
exports.default = _default;