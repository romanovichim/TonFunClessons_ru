"use strict";

var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.RenderBlock = void 0;
var React = _interopRequireWildcard(require("react"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/* istanbul ignore file */

function useRenderTimes(props, debug) {
  // Render times
  var timesRef = React.useRef(0);
  timesRef.current += 1;

  // Props changed
  var propsRef = React.useRef(props);
  var keys = [];
  Object.keys(props || {}).map(function (key) {
    var _propsRef$current;
    if ((props === null || props === void 0 ? void 0 : props[key]) !== ((_propsRef$current = propsRef.current) === null || _propsRef$current === void 0 ? void 0 : _propsRef$current[key])) {
      keys.push(key);
    }
  });
  propsRef.current = props;

  // Cache keys since React rerender may cause it lost
  var keysRef = React.useRef([]);
  if (keys.length) {
    keysRef.current = keys;
  }
  React.useDebugValue(timesRef.current);
  React.useDebugValue(keysRef.current.join(', '));
  if (debug) {
    console.log("".concat(debug, ":"), timesRef.current, keysRef.current);
  }
  return timesRef.current;
}
var _default = process.env.NODE_ENV !== 'production' ? useRenderTimes : function () {};
exports.default = _default;
var RenderBlock = /*#__PURE__*/React.memo(function () {
  var times = useRenderTimes();
  return /*#__PURE__*/React.createElement("h1", null, "Render Times: ", times);
});
exports.RenderBlock = RenderBlock;
RenderBlock.displayName = 'RenderBlock';