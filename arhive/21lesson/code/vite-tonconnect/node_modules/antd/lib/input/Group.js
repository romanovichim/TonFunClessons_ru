"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _classnames = _interopRequireDefault(require("classnames"));
var React = _interopRequireWildcard(require("react"));
var _configProvider = require("../config-provider");
var _context = require("../form/context");
var _warning = _interopRequireDefault(require("../_util/warning"));
var _style = _interopRequireDefault(require("./style"));
const Group = props => {
  const {
    getPrefixCls,
    direction
  } = (0, React.useContext)(_configProvider.ConfigContext);
  const {
    prefixCls: customizePrefixCls,
    className = ''
  } = props;
  const prefixCls = getPrefixCls('input-group', customizePrefixCls);
  const inputPrefixCls = getPrefixCls('input');
  const [wrapSSR, hashId] = (0, _style.default)(inputPrefixCls);
  const cls = (0, _classnames.default)(prefixCls, {
    [`${prefixCls}-lg`]: props.size === 'large',
    [`${prefixCls}-sm`]: props.size === 'small',
    [`${prefixCls}-compact`]: props.compact,
    [`${prefixCls}-rtl`]: direction === 'rtl'
  }, hashId, className);
  const formItemContext = (0, React.useContext)(_context.FormItemInputContext);
  const groupFormItemContext = (0, React.useMemo)(() => Object.assign(Object.assign({}, formItemContext), {
    isFormItemInput: false
  }), [formItemContext]);
  if (process.env.NODE_ENV !== 'production') {
    process.env.NODE_ENV !== "production" ? (0, _warning.default)(false, 'Input.Group', `'Input.Group' is deprecated. Please use 'Space.Compact' instead.`) : void 0;
  }
  return wrapSSR( /*#__PURE__*/React.createElement("span", {
    className: cls,
    style: props.style,
    onMouseEnter: props.onMouseEnter,
    onMouseLeave: props.onMouseLeave,
    onFocus: props.onFocus,
    onBlur: props.onBlur
  }, /*#__PURE__*/React.createElement(_context.FormItemInputContext.Provider, {
    value: groupFormItemContext
  }, props.children)));
};
var _default = Group;
exports.default = _default;