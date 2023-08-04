"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _context = require("@rc-component/context");
var React = _interopRequireWildcard(require("react"));
var _PerfContext = _interopRequireDefault(require("../context/PerfContext"));
var _TableContext = _interopRequireDefault(require("../context/TableContext"));
var _useFlattenRecords = _interopRequireDefault(require("../hooks/useFlattenRecords"));
var _useRenderTimes = _interopRequireDefault(require("../hooks/useRenderTimes"));
var _valueUtil = require("../utils/valueUtil");
var _BodyRow = _interopRequireDefault(require("./BodyRow"));
var _ExpandedRow = _interopRequireDefault(require("./ExpandedRow"));
var _MeasureRow = _interopRequireDefault(require("./MeasureRow"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function Body(props) {
  if (process.env.NODE_ENV !== 'production') {
    (0, _useRenderTimes.default)(props);
  }
  var data = props.data,
    getRowKey = props.getRowKey,
    measureColumnWidth = props.measureColumnWidth,
    expandedKeys = props.expandedKeys,
    onRow = props.onRow,
    rowExpandable = props.rowExpandable,
    emptyNode = props.emptyNode,
    childrenColumnName = props.childrenColumnName;
  var _useContext = (0, _context.useContext)(_TableContext.default, ['prefixCls', 'getComponent', 'onColumnResize', 'flattenColumns']),
    prefixCls = _useContext.prefixCls,
    getComponent = _useContext.getComponent,
    onColumnResize = _useContext.onColumnResize,
    flattenColumns = _useContext.flattenColumns;
  var flattenData = (0, _useFlattenRecords.default)(data, childrenColumnName, expandedKeys, getRowKey);

  // =================== Performance ====================
  var perfRef = React.useRef({
    renderWithProps: false
  });

  // ====================== Render ======================
  var WrapperComponent = getComponent(['body', 'wrapper'], 'tbody');
  var trComponent = getComponent(['body', 'row'], 'tr');
  var tdComponent = getComponent(['body', 'cell'], 'td');
  var thComponent = getComponent(['body', 'cell'], 'th');
  var rows;
  if (data.length) {
    rows = flattenData.map(function (item, idx) {
      var record = item.record,
        indent = item.indent,
        renderIndex = item.index;
      var key = getRowKey(record, idx);
      return /*#__PURE__*/React.createElement(_BodyRow.default, {
        key: key,
        rowKey: key,
        record: record,
        index: idx,
        renderIndex: renderIndex,
        rowComponent: trComponent,
        cellComponent: tdComponent,
        scopeCellComponent: thComponent,
        expandedKeys: expandedKeys,
        onRow: onRow,
        getRowKey: getRowKey,
        rowExpandable: rowExpandable,
        childrenColumnName: childrenColumnName,
        indent: indent
      });
    });
  } else {
    rows = /*#__PURE__*/React.createElement(_ExpandedRow.default, {
      expanded: true,
      className: "".concat(prefixCls, "-placeholder"),
      prefixCls: prefixCls,
      component: trComponent,
      cellComponent: tdComponent,
      colSpan: flattenColumns.length,
      isEmpty: true
    }, emptyNode);
  }
  var columnsKey = (0, _valueUtil.getColumnsKey)(flattenColumns);
  return /*#__PURE__*/React.createElement(_PerfContext.default.Provider, {
    value: perfRef.current
  }, /*#__PURE__*/React.createElement(WrapperComponent, {
    className: "".concat(prefixCls, "-tbody")
  }, measureColumnWidth && /*#__PURE__*/React.createElement(_MeasureRow.default, {
    prefixCls: prefixCls,
    columnsKey: columnsKey,
    onColumnResize: onColumnResize
  }), rows));
}
Body.displayName = 'Body';
var _default = (0, _context.responseImmutable)(Body);
exports.default = _default;