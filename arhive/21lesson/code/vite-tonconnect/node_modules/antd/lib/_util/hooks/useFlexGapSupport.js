"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var React = _interopRequireWildcard(require("react"));
var _styleChecker = require("../styleChecker");
var _default = () => {
  const [flexible, setFlexible] = React.useState(false);
  React.useEffect(() => {
    setFlexible((0, _styleChecker.detectFlexGapSupported)());
  }, []);
  return flexible;
};
exports.default = _default;