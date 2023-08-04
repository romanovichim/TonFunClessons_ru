"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.FooterComponents = void 0;
var _context = require("@rc-component/context");
var React = _interopRequireWildcard(require("react"));
var _TableContext = _interopRequireDefault(require("../context/TableContext"));
var _useRenderTimes = _interopRequireDefault(require("../hooks/useRenderTimes"));
var _Summary = _interopRequireDefault(require("./Summary"));
var _SummaryContext = _interopRequireDefault(require("./SummaryContext"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function Footer(props) {
  if (process.env.NODE_ENV !== 'production') {
    (0, _useRenderTimes.default)(props);
  }
  var children = props.children,
    stickyOffsets = props.stickyOffsets,
    flattenColumns = props.flattenColumns,
    columns = props.columns;
  var prefixCls = (0, _context.useContext)(_TableContext.default, 'prefixCls');
  var lastColumnIndex = flattenColumns.length - 1;
  var scrollColumn = flattenColumns[lastColumnIndex];
  var summaryContext = React.useMemo(function () {
    return {
      stickyOffsets: stickyOffsets,
      flattenColumns: flattenColumns,
      scrollColumnIndex: scrollColumn !== null && scrollColumn !== void 0 && scrollColumn.scrollbar ? lastColumnIndex : null,
      columns: columns
    };
  }, [scrollColumn, flattenColumns, lastColumnIndex, stickyOffsets, columns]);
  return /*#__PURE__*/React.createElement(_SummaryContext.default.Provider, {
    value: summaryContext
  }, /*#__PURE__*/React.createElement("tfoot", {
    className: "".concat(prefixCls, "-summary")
  }, children));
}
var _default = (0, _context.responseImmutable)(Footer);
exports.default = _default;
var FooterComponents = _Summary.default;
exports.FooterComponents = FooterComponents;