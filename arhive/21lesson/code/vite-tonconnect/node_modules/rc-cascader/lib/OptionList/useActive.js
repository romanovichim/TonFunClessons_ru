"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var React = _interopRequireWildcard(require("react"));
var _context = _interopRequireDefault(require("../context"));
var _rcSelect = require("rc-select");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/**
 * Control the active open options path.
 */
var _default = function _default() {
  var _useBaseProps = (0, _rcSelect.useBaseProps)(),
    multiple = _useBaseProps.multiple,
    open = _useBaseProps.open;
  var _React$useContext = React.useContext(_context.default),
    values = _React$useContext.values;

  // Record current dropdown active options
  // This also control the open status
  var _React$useState = React.useState([]),
    _React$useState2 = (0, _slicedToArray2.default)(_React$useState, 2),
    activeValueCells = _React$useState2[0],
    setActiveValueCells = _React$useState2[1];
  React.useEffect(function () {
    if (open && !multiple) {
      var firstValueCells = values[0];
      setActiveValueCells(firstValueCells || []);
    }
  }, /* eslint-disable react-hooks/exhaustive-deps */
  [open]
  /* eslint-enable react-hooks/exhaustive-deps */);

  return [activeValueCells, setActiveValueCells];
};
exports.default = _default;