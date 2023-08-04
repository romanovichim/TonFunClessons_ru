"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useLegacyItems;
var React = _interopRequireWildcard(require("react"));
var _toArray = _interopRequireDefault(require("rc-util/lib/Children/toArray"));
var _warning = _interopRequireDefault(require("../_util/warning"));
function filter(items) {
  return items.filter(item => item);
}
function useLegacyItems(items, children) {
  if (items) {
    return items;
  }
  process.env.NODE_ENV !== "production" ? (0, _warning.default)(!children, 'Steps', 'Step is deprecated. Please use `items` directly.') : void 0;
  const childrenItems = (0, _toArray.default)(children).map(node => {
    if ( /*#__PURE__*/React.isValidElement(node)) {
      const {
        props
      } = node;
      const item = Object.assign({}, props);
      return item;
    }
    return null;
  });
  return filter(childrenItems);
}