"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _DeleteOutlined = _interopRequireDefault(require("@ant-design/icons/DeleteOutlined"));
var _classnames = _interopRequireDefault(require("classnames"));
var React = _interopRequireWildcard(require("react"));
var _checkbox = _interopRequireDefault(require("../checkbox"));
var _en_US = _interopRequireDefault(require("../locale/en_US"));
var _useLocale = _interopRequireDefault(require("../locale/useLocale"));
var _transButton = _interopRequireDefault(require("../_util/transButton"));
const ListItem = props => {
  const {
    renderedText,
    renderedEl,
    item,
    checked,
    disabled,
    prefixCls,
    onClick,
    onRemove,
    showRemove
  } = props;
  const className = (0, _classnames.default)({
    [`${prefixCls}-content-item`]: true,
    [`${prefixCls}-content-item-disabled`]: disabled || item.disabled,
    [`${prefixCls}-content-item-checked`]: checked
  });
  let title;
  if (typeof renderedText === 'string' || typeof renderedText === 'number') {
    title = String(renderedText);
  }
  const [contextLocale] = (0, _useLocale.default)('Transfer', _en_US.default.Transfer);
  const liProps = {
    className,
    title
  };
  const labelNode = /*#__PURE__*/React.createElement("span", {
    className: `${prefixCls}-content-item-text`
  }, renderedEl);
  if (showRemove) {
    return /*#__PURE__*/React.createElement("li", Object.assign({}, liProps), labelNode, /*#__PURE__*/React.createElement(_transButton.default, {
      disabled: disabled || item.disabled,
      className: `${prefixCls}-content-item-remove`,
      "aria-label": contextLocale === null || contextLocale === void 0 ? void 0 : contextLocale.remove,
      onClick: () => {
        onRemove === null || onRemove === void 0 ? void 0 : onRemove(item);
      }
    }, /*#__PURE__*/React.createElement(_DeleteOutlined.default, null)));
  }
  // Default click to select
  liProps.onClick = disabled || item.disabled ? undefined : () => onClick(item);
  return /*#__PURE__*/React.createElement("li", Object.assign({}, liProps), /*#__PURE__*/React.createElement(_checkbox.default, {
    className: `${prefixCls}-checkbox`,
    checked: checked,
    disabled: disabled || item.disabled
  }), labelNode);
};
var _default = /*#__PURE__*/React.memo(ListItem);
exports.default = _default;