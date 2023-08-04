"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useWave;
var _WaveEffect = _interopRequireDefault(require("./WaveEffect"));
function useWave(nodeRef, className) {
  function showWave() {
    const node = nodeRef.current;
    (0, _WaveEffect.default)(node, className);
  }
  return showWave;
}