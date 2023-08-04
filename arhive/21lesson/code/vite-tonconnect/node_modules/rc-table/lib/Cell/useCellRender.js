"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof3 = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useCellRender;
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));
var _context = require("@rc-component/context");
var _useMemo = _interopRequireDefault(require("rc-util/lib/hooks/useMemo"));
var _isEqual = _interopRequireDefault(require("rc-util/lib/isEqual"));
var _get = _interopRequireDefault(require("rc-util/lib/utils/get"));
var _warning = _interopRequireDefault(require("rc-util/lib/warning"));
var React = _interopRequireWildcard(require("react"));
var _PerfContext = _interopRequireDefault(require("../context/PerfContext"));
var _valueUtil = require("../utils/valueUtil");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof3(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function isRenderCell(data) {
  return data && (0, _typeof2.default)(data) === 'object' && !Array.isArray(data) && ! /*#__PURE__*/React.isValidElement(data);
}
function useCellRender(record, dataIndex, renderIndex, children, render, shouldCellUpdate) {
  // TODO: Remove this after next major version
  var perfRecord = React.useContext(_PerfContext.default);
  var mark = (0, _context.useImmutableMark)();

  // ======================== Render ========================
  var retData = (0, _useMemo.default)(function () {
    if ((0, _valueUtil.validateValue)(children)) {
      return [children];
    }
    var path = dataIndex === null || dataIndex === undefined || dataIndex === '' ? [] : Array.isArray(dataIndex) ? dataIndex : [dataIndex];
    var value = (0, _get.default)(record, path);

    // Customize render node
    var returnChildNode = value;
    var returnCellProps = undefined;
    if (render) {
      var renderData = render(value, record, renderIndex);
      if (isRenderCell(renderData)) {
        if (process.env.NODE_ENV !== 'production') {
          (0, _warning.default)(false, '`columns.render` return cell props is deprecated with perf issue, please use `onCell` instead.');
        }
        returnChildNode = renderData.children;
        returnCellProps = renderData.props;
        perfRecord.renderWithProps = true;
      } else {
        returnChildNode = renderData;
      }
    }
    return [returnChildNode, returnCellProps];
  }, [
  // Force update deps
  mark,
  // Normal deps
  record, children, dataIndex, render, renderIndex], function (prev, next) {
    if (shouldCellUpdate) {
      var _prev = (0, _slicedToArray2.default)(prev, 2),
        prevRecord = _prev[1];
      var _next = (0, _slicedToArray2.default)(next, 2),
        nextRecord = _next[1];
      return shouldCellUpdate(nextRecord, prevRecord);
    }

    // Legacy mode should always update
    if (perfRecord.renderWithProps) {
      return true;
    }
    return !(0, _isEqual.default)(prev, next, true);
  });
  return retData;
}