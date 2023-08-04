"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = PurePanel;
var _classnames = _interopRequireDefault(require("classnames"));
var _rcTooltip = require("rc-tooltip");
var React = _interopRequireWildcard(require("react"));
var _configProvider = require("../config-provider");
var _style = _interopRequireDefault(require("./style"));
var _util = require("./util");
// ant-tooltip css-dev-only-do-not-override-w2s56n ant-tooltip-placement-top  ant-tooltip-hidden
function PurePanel(props) {
  const {
    prefixCls: customizePrefixCls,
    className,
    placement = 'top',
    title,
    color,
    overlayInnerStyle
  } = props;
  const {
    getPrefixCls
  } = React.useContext(_configProvider.ConfigContext);
  const prefixCls = getPrefixCls('tooltip', customizePrefixCls);
  const [wrapSSR, hashId] = (0, _style.default)(prefixCls, true);
  // Color
  const colorInfo = (0, _util.parseColor)(prefixCls, color);
  const formattedOverlayInnerStyle = Object.assign(Object.assign({}, overlayInnerStyle), colorInfo.overlayStyle);
  const arrowContentStyle = colorInfo.arrowStyle;
  return wrapSSR( /*#__PURE__*/React.createElement("div", {
    className: (0, _classnames.default)(hashId, prefixCls, `${prefixCls}-pure`, `${prefixCls}-placement-${placement}`, className, colorInfo.className),
    style: arrowContentStyle
  }, /*#__PURE__*/React.createElement("div", {
    className: `${prefixCls}-arrow`
  }), /*#__PURE__*/React.createElement(_rcTooltip.Popup, Object.assign({}, props, {
    className: hashId,
    prefixCls: prefixCls,
    overlayInnerStyle: formattedOverlayInnerStyle
  }), title)));
}