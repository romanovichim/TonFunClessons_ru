"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.findAllChildrenKeys = findAllChildrenKeys;
exports.renderExpandIcon = renderExpandIcon;
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var React = _interopRequireWildcard(require("react"));
var _classnames = _interopRequireDefault(require("classnames"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function renderExpandIcon(_ref) {
  var _classNames;
  var prefixCls = _ref.prefixCls,
    record = _ref.record,
    onExpand = _ref.onExpand,
    expanded = _ref.expanded,
    expandable = _ref.expandable;
  var expandClassName = "".concat(prefixCls, "-row-expand-icon");
  if (!expandable) {
    return /*#__PURE__*/React.createElement("span", {
      className: (0, _classnames.default)(expandClassName, "".concat(prefixCls, "-row-spaced"))
    });
  }
  var onClick = function onClick(event) {
    onExpand(record, event);
    event.stopPropagation();
  };
  return /*#__PURE__*/React.createElement("span", {
    className: (0, _classnames.default)(expandClassName, (_classNames = {}, (0, _defineProperty2.default)(_classNames, "".concat(prefixCls, "-row-expanded"), expanded), (0, _defineProperty2.default)(_classNames, "".concat(prefixCls, "-row-collapsed"), !expanded), _classNames)),
    onClick: onClick
  });
}
function findAllChildrenKeys(data, getRowKey, childrenColumnName) {
  var keys = [];
  function dig(list) {
    (list || []).forEach(function (item, index) {
      keys.push(getRowKey(item, index));
      dig(item[childrenColumnName]);
    });
  }
  dig(data);
  return keys;
}