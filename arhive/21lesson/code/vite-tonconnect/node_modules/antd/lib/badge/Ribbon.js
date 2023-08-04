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
var _style = _interopRequireDefault(require("./style"));
var _colors = require("../_util/colors");
const Ribbon = _ref => {
  let {
    className,
    prefixCls: customizePrefixCls,
    style,
    color,
    children,
    text,
    placement = 'end'
  } = _ref;
  const {
    getPrefixCls,
    direction
  } = React.useContext(_configProvider.ConfigContext);
  const prefixCls = getPrefixCls('ribbon', customizePrefixCls);
  const colorInPreset = (0, _colors.isPresetColor)(color, false);
  const ribbonCls = (0, _classnames.default)(prefixCls, `${prefixCls}-placement-${placement}`, {
    [`${prefixCls}-rtl`]: direction === 'rtl',
    [`${prefixCls}-color-${color}`]: colorInPreset
  }, className);
  const [wrapSSR, hashId] = (0, _style.default)(prefixCls);
  const colorStyle = {};
  const cornerColorStyle = {};
  if (color && !colorInPreset) {
    colorStyle.background = color;
    cornerColorStyle.color = color;
  }
  return wrapSSR( /*#__PURE__*/React.createElement("div", {
    className: (0, _classnames.default)(`${prefixCls}-wrapper`, hashId)
  }, children, /*#__PURE__*/React.createElement("div", {
    className: (0, _classnames.default)(ribbonCls, hashId),
    style: Object.assign(Object.assign({}, colorStyle), style)
  }, /*#__PURE__*/React.createElement("span", {
    className: `${prefixCls}-text`
  }, text), /*#__PURE__*/React.createElement("div", {
    className: `${prefixCls}-corner`,
    style: cornerColorStyle
  }))));
};
if (process.env.NODE_ENV !== 'production') {
  Ribbon.displayName = 'Ribbon';
}
var _default = Ribbon;
exports.default = _default;