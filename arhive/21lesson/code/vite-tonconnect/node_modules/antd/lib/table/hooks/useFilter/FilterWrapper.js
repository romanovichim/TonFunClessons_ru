"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var React = _interopRequireWildcard(require("react"));
var _KeyCode = _interopRequireDefault(require("rc-util/lib/KeyCode"));
const onKeyDown = event => {
  const {
    keyCode
  } = event;
  if (keyCode === _KeyCode.default.ENTER) {
    event.stopPropagation();
  }
};
const FilterDropdownMenuWrapper = props => /*#__PURE__*/React.createElement("div", {
  className: props.className,
  onClick: e => e.stopPropagation(),
  onKeyDown: onKeyDown
}, props.children);
var _default = FilterDropdownMenuWrapper;
exports.default = _default;