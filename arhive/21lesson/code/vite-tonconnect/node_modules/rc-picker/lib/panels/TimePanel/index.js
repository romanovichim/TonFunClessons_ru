"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var React = _interopRequireWildcard(require("react"));
var _classnames = _interopRequireDefault(require("classnames"));
var _TimeHeader = _interopRequireDefault(require("./TimeHeader"));
var _TimeBody = _interopRequireDefault(require("./TimeBody"));
var _uiUtil = require("../../utils/uiUtil");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var countBoolean = function countBoolean(boolList) {
  return boolList.filter(function (bool) {
    return bool !== false;
  }).length;
};
function TimePanel(props) {
  var generateConfig = props.generateConfig,
    _props$format = props.format,
    format = _props$format === void 0 ? 'HH:mm:ss' : _props$format,
    prefixCls = props.prefixCls,
    active = props.active,
    operationRef = props.operationRef,
    showHour = props.showHour,
    showMinute = props.showMinute,
    showSecond = props.showSecond,
    _props$use12Hours = props.use12Hours,
    use12Hours = _props$use12Hours === void 0 ? false : _props$use12Hours,
    onSelect = props.onSelect,
    value = props.value;
  var panelPrefixCls = "".concat(prefixCls, "-time-panel");
  var bodyOperationRef = React.useRef();

  // ======================= Keyboard =======================
  var _React$useState = React.useState(-1),
    _React$useState2 = (0, _slicedToArray2.default)(_React$useState, 2),
    activeColumnIndex = _React$useState2[0],
    setActiveColumnIndex = _React$useState2[1];
  var columnsCount = countBoolean([showHour, showMinute, showSecond, use12Hours]);
  operationRef.current = {
    onKeyDown: function onKeyDown(event) {
      return (0, _uiUtil.createKeyDownHandler)(event, {
        onLeftRight: function onLeftRight(diff) {
          setActiveColumnIndex((activeColumnIndex + diff + columnsCount) % columnsCount);
        },
        onUpDown: function onUpDown(diff) {
          if (activeColumnIndex === -1) {
            setActiveColumnIndex(0);
          } else if (bodyOperationRef.current) {
            bodyOperationRef.current.onUpDown(diff);
          }
        },
        onEnter: function onEnter() {
          onSelect(value || generateConfig.getNow(), 'key');
          setActiveColumnIndex(-1);
        }
      });
    },
    onBlur: function onBlur() {
      setActiveColumnIndex(-1);
    }
  };
  return /*#__PURE__*/React.createElement("div", {
    className: (0, _classnames.default)(panelPrefixCls, (0, _defineProperty2.default)({}, "".concat(panelPrefixCls, "-active"), active))
  }, /*#__PURE__*/React.createElement(_TimeHeader.default, (0, _extends2.default)({}, props, {
    format: format,
    prefixCls: prefixCls
  })), /*#__PURE__*/React.createElement(_TimeBody.default, (0, _extends2.default)({}, props, {
    prefixCls: prefixCls,
    activeColumnIndex: activeColumnIndex,
    operationRef: bodyOperationRef
  })));
}
var _default = TimePanel;
exports.default = _default;