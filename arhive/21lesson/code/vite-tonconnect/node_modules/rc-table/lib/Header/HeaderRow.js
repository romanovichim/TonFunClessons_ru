"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var React = _interopRequireWildcard(require("react"));
var _Cell = _interopRequireDefault(require("../Cell"));
var _TableContext = _interopRequireDefault(require("../context/TableContext"));
var _context = require("@rc-component/context");
var _fixUtil = require("../utils/fixUtil");
var _valueUtil = require("../utils/valueUtil");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function HeaderRow(_ref) {
  var cells = _ref.cells,
    stickyOffsets = _ref.stickyOffsets,
    flattenColumns = _ref.flattenColumns,
    RowComponent = _ref.rowComponent,
    CellComponent = _ref.cellComponent,
    tdCellComponent = _ref.tdCellComponent,
    onHeaderRow = _ref.onHeaderRow,
    index = _ref.index;
  var _useContext = (0, _context.useContext)(_TableContext.default, ['prefixCls', 'direction']),
    prefixCls = _useContext.prefixCls,
    direction = _useContext.direction;
  var rowProps;
  if (onHeaderRow) {
    rowProps = onHeaderRow(cells.map(function (cell) {
      return cell.column;
    }), index);
  }
  var columnsKey = (0, _valueUtil.getColumnsKey)(cells.map(function (cell) {
    return cell.column;
  }));
  return /*#__PURE__*/React.createElement(RowComponent, rowProps, cells.map(function (cell, cellIndex) {
    var column = cell.column;
    var fixedInfo = (0, _fixUtil.getCellFixedInfo)(cell.colStart, cell.colEnd, flattenColumns, stickyOffsets, direction, column);
    var additionalProps;
    if (column && column.onHeaderCell) {
      additionalProps = cell.column.onHeaderCell(column);
    }
    return /*#__PURE__*/React.createElement(_Cell.default, (0, _extends2.default)({}, cell, {
      scope: column.title ? cell.colSpan > 1 ? 'colgroup' : 'col' : null,
      ellipsis: column.ellipsis,
      align: column.align,
      component: column.title ? CellComponent : tdCellComponent,
      prefixCls: prefixCls,
      key: columnsKey[cellIndex]
    }, fixedInfo, {
      additionalProps: additionalProps,
      rowType: "header"
    }));
  }));
}
HeaderRow.displayName = 'HeaderRow';
var _default = HeaderRow;
exports.default = _default;