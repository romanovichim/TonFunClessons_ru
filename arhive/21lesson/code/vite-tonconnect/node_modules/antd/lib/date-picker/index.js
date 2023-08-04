"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _dayjs = _interopRequireDefault(require("rc-picker/lib/generate/dayjs"));
var _PurePanel = _interopRequireDefault(require("../_util/PurePanel"));
var _generatePicker = _interopRequireDefault(require("./generatePicker"));
const DatePicker = (0, _generatePicker.default)(_dayjs.default);
// We don't care debug panel
/* istanbul ignore next */
const PurePanel = (0, _PurePanel.default)(DatePicker, 'picker');
DatePicker._InternalPanelDoNotUseOrYouWillBeFired = PurePanel;
const PureRangePanel = (0, _PurePanel.default)(DatePicker.RangePicker, 'picker');
DatePicker._InternalRangePanelDoNotUseOrYouWillBeFired = PureRangePanel;
var _default = DatePicker;
exports.default = _default;