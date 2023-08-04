"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Track;
var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread2"));
var React = _interopRequireWildcard(require("react"));
var _classnames = _interopRequireDefault(require("classnames"));
var _context = _interopRequireDefault(require("../context"));
var _util = require("../util");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function Track(props) {
  var prefixCls = props.prefixCls,
    style = props.style,
    start = props.start,
    end = props.end,
    index = props.index,
    onStartMove = props.onStartMove;
  var _React$useContext = React.useContext(_context.default),
    direction = _React$useContext.direction,
    min = _React$useContext.min,
    max = _React$useContext.max,
    disabled = _React$useContext.disabled,
    range = _React$useContext.range;
  var trackPrefixCls = "".concat(prefixCls, "-track");
  var offsetStart = (0, _util.getOffset)(start, min, max);
  var offsetEnd = (0, _util.getOffset)(end, min, max);
  // ============================ Events ============================
  var onInternalStartMove = function onInternalStartMove(e) {
    if (!disabled && onStartMove) {
      onStartMove(e, -1);
    }
  };
  // ============================ Render ============================
  var positionStyle = {};
  switch (direction) {
    case 'rtl':
      positionStyle.right = "".concat(offsetStart * 100, "%");
      positionStyle.width = "".concat(offsetEnd * 100 - offsetStart * 100, "%");
      break;
    case 'btt':
      positionStyle.bottom = "".concat(offsetStart * 100, "%");
      positionStyle.height = "".concat(offsetEnd * 100 - offsetStart * 100, "%");
      break;
    case 'ttb':
      positionStyle.top = "".concat(offsetStart * 100, "%");
      positionStyle.height = "".concat(offsetEnd * 100 - offsetStart * 100, "%");
      break;
    default:
      positionStyle.left = "".concat(offsetStart * 100, "%");
      positionStyle.width = "".concat(offsetEnd * 100 - offsetStart * 100, "%");
  }
  return /*#__PURE__*/React.createElement("div", {
    className: (0, _classnames.default)(trackPrefixCls, range && "".concat(trackPrefixCls, "-").concat(index + 1)),
    style: (0, _objectSpread2.default)((0, _objectSpread2.default)({}, positionStyle), style),
    onMouseDown: onInternalStartMove,
    onTouchStart: onInternalStartMove
  });
}