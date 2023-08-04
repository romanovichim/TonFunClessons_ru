"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.DECADE_UNIT_DIFF = exports.DECADE_DISTANCE_COUNT = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var React = _interopRequireWildcard(require("react"));
var _DecadeHeader = _interopRequireDefault(require("./DecadeHeader"));
var _DecadeBody = _interopRequireWildcard(require("./DecadeBody"));
var _uiUtil = require("../../utils/uiUtil");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var DECADE_UNIT_DIFF = 10;
exports.DECADE_UNIT_DIFF = DECADE_UNIT_DIFF;
var DECADE_DISTANCE_COUNT = DECADE_UNIT_DIFF * 10;
exports.DECADE_DISTANCE_COUNT = DECADE_DISTANCE_COUNT;
function DecadePanel(props) {
  var prefixCls = props.prefixCls,
    onViewDateChange = props.onViewDateChange,
    generateConfig = props.generateConfig,
    viewDate = props.viewDate,
    operationRef = props.operationRef,
    onSelect = props.onSelect,
    onPanelChange = props.onPanelChange;
  var panelPrefixCls = "".concat(prefixCls, "-decade-panel");

  // ======================= Keyboard =======================
  operationRef.current = {
    onKeyDown: function onKeyDown(event) {
      return (0, _uiUtil.createKeyDownHandler)(event, {
        onLeftRight: function onLeftRight(diff) {
          onSelect(generateConfig.addYear(viewDate, diff * DECADE_UNIT_DIFF), 'key');
        },
        onCtrlLeftRight: function onCtrlLeftRight(diff) {
          onSelect(generateConfig.addYear(viewDate, diff * DECADE_DISTANCE_COUNT), 'key');
        },
        onUpDown: function onUpDown(diff) {
          onSelect(generateConfig.addYear(viewDate, diff * DECADE_UNIT_DIFF * _DecadeBody.DECADE_COL_COUNT), 'key');
        },
        onEnter: function onEnter() {
          onPanelChange('year', viewDate);
        }
      });
    }
  };

  // ==================== View Operation ====================
  var onDecadesChange = function onDecadesChange(diff) {
    var newDate = generateConfig.addYear(viewDate, diff * DECADE_DISTANCE_COUNT);
    onViewDateChange(newDate);
    onPanelChange(null, newDate);
  };
  var onInternalSelect = function onInternalSelect(date) {
    onSelect(date, 'mouse');
    onPanelChange('year', date);
  };
  return /*#__PURE__*/React.createElement("div", {
    className: panelPrefixCls
  }, /*#__PURE__*/React.createElement(_DecadeHeader.default, (0, _extends2.default)({}, props, {
    prefixCls: prefixCls,
    onPrevDecades: function onPrevDecades() {
      onDecadesChange(-1);
    },
    onNextDecades: function onNextDecades() {
      onDecadesChange(1);
    }
  })), /*#__PURE__*/React.createElement(_DecadeBody.default, (0, _extends2.default)({}, props, {
    prefixCls: prefixCls,
    onSelect: onInternalSelect
  })));
}
var _default = DecadePanel;
exports.default = _default;