"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _classnames = _interopRequireDefault(require("classnames"));
var _react = _interopRequireDefault(require("react"));
/* eslint react/prop-types: 0 */

var Pager = function Pager(props) {
  var _classNames;
  var rootPrefixCls = props.rootPrefixCls,
    page = props.page,
    active = props.active,
    className = props.className,
    showTitle = props.showTitle,
    onClick = props.onClick,
    onKeyPress = props.onKeyPress,
    itemRender = props.itemRender;
  var prefixCls = "".concat(rootPrefixCls, "-item");
  var cls = (0, _classnames.default)(prefixCls, "".concat(prefixCls, "-").concat(page), (_classNames = {}, (0, _defineProperty2.default)(_classNames, "".concat(prefixCls, "-active"), active), (0, _defineProperty2.default)(_classNames, "".concat(prefixCls, "-disabled"), !page), (0, _defineProperty2.default)(_classNames, props.className, className), _classNames));
  var handleClick = function handleClick() {
    onClick(page);
  };
  var handleKeyPress = function handleKeyPress(e) {
    onKeyPress(e, onClick, page);
  };
  return /*#__PURE__*/_react.default.createElement("li", {
    title: showTitle ? page.toString() : null,
    className: cls,
    onClick: handleClick,
    onKeyPress: handleKeyPress,
    tabIndex: 0
  }, itemRender(page, 'page', /*#__PURE__*/_react.default.createElement("a", {
    rel: "nofollow"
  }, page)));
};
var _default = Pager;
exports.default = _default;