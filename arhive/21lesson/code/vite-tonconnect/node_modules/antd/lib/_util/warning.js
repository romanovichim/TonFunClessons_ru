"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
exports.noop = noop;
Object.defineProperty(exports, "resetWarned", {
  enumerable: true,
  get: function () {
    return _warning.resetWarned;
  }
});
var _warning = _interopRequireWildcard(require("rc-util/lib/warning"));
function noop() {}
// eslint-disable-next-line import/no-mutable-exports
let warning = noop;
if (process.env.NODE_ENV !== 'production') {
  warning = (valid, component, message) => {
    (0, _warning.default)(valid, `[antd: ${component}] ${message}`);
    // StrictMode will inject console which will not throw warning in React 17.
    if (process.env.NODE_ENV === 'test') {
      (0, _warning.resetWarned)();
    }
  };
}
var _default = warning;
exports.default = _default;