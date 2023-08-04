"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useRangeViewDates;
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var React = _interopRequireWildcard(require("react"));
var _miscUtil = require("../utils/miscUtil");
var _dateUtil = require("../utils/dateUtil");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function getStartEndDistance(startDate, endDate, picker, generateConfig) {
  var startNext = (0, _dateUtil.getClosingViewDate)(startDate, picker, generateConfig, 1);
  function getDistance(compareFunc) {
    if (compareFunc(startDate, endDate)) {
      return 'same';
    }
    if (compareFunc(startNext, endDate)) {
      return 'closing';
    }
    return 'far';
  }
  switch (picker) {
    case 'year':
      return getDistance(function (start, end) {
        return (0, _dateUtil.isSameDecade)(generateConfig, start, end);
      });
    case 'quarter':
    case 'month':
      return getDistance(function (start, end) {
        return (0, _dateUtil.isSameYear)(generateConfig, start, end);
      });
    default:
      return getDistance(function (start, end) {
        return (0, _dateUtil.isSameMonth)(generateConfig, start, end);
      });
  }
}
function getRangeViewDate(values, index, picker, generateConfig) {
  var startDate = (0, _miscUtil.getValue)(values, 0);
  var endDate = (0, _miscUtil.getValue)(values, 1);
  if (index === 0) {
    return startDate;
  }
  if (startDate && endDate) {
    var distance = getStartEndDistance(startDate, endDate, picker, generateConfig);
    switch (distance) {
      case 'same':
        return startDate;
      case 'closing':
        return startDate;
      default:
        return (0, _dateUtil.getClosingViewDate)(endDate, picker, generateConfig, -1);
    }
  }
  return startDate;
}
function useRangeViewDates(_ref) {
  var values = _ref.values,
    picker = _ref.picker,
    defaultDates = _ref.defaultDates,
    generateConfig = _ref.generateConfig;
  var _React$useState = React.useState(function () {
      return [(0, _miscUtil.getValue)(defaultDates, 0), (0, _miscUtil.getValue)(defaultDates, 1)];
    }),
    _React$useState2 = (0, _slicedToArray2.default)(_React$useState, 2),
    defaultViewDates = _React$useState2[0],
    setDefaultViewDates = _React$useState2[1];
  var _React$useState3 = React.useState(null),
    _React$useState4 = (0, _slicedToArray2.default)(_React$useState3, 2),
    viewDates = _React$useState4[0],
    setInternalViewDates = _React$useState4[1];
  var startDate = (0, _miscUtil.getValue)(values, 0);
  var endDate = (0, _miscUtil.getValue)(values, 1);
  function getViewDate(index) {
    // If set default view date, use it
    if (defaultViewDates[index]) {
      return defaultViewDates[index];
    }
    return (0, _miscUtil.getValue)(viewDates, index) || getRangeViewDate(values, index, picker, generateConfig) || startDate || endDate || generateConfig.getNow();
  }
  function setViewDate(viewDate, index) {
    if (viewDate) {
      var newViewDates = (0, _miscUtil.updateValues)(viewDates, viewDate, index);
      // Set view date will clean up default one
      setDefaultViewDates(
      // Should always be an array
      (0, _miscUtil.updateValues)(defaultViewDates, null, index) || [null, null]);

      // Reset another one when not have value
      var anotherIndex = (index + 1) % 2;
      if (!(0, _miscUtil.getValue)(values, anotherIndex)) {
        newViewDates = (0, _miscUtil.updateValues)(newViewDates, viewDate, anotherIndex);
      }
      setInternalViewDates(newViewDates);
    } else if (startDate || endDate) {
      // Reset all when has values when `viewDate` is `null` which means from open trigger
      setInternalViewDates(null);
    }
  }
  return [getViewDate, setViewDate];
}