"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RawPurePanel = RawPurePanel;
exports.default = PurePanel;
exports.getOverlay = void 0;
var _classnames = _interopRequireDefault(require("classnames"));
var _rcTooltip = require("rc-tooltip");
var React = _interopRequireWildcard(require("react"));
var _configProvider = require("../config-provider");
var _getRenderPropValue = require("../_util/getRenderPropValue");
var _style = _interopRequireDefault(require("./style"));
var __rest = void 0 && (void 0).__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
const getOverlay = (prefixCls, title, content) => {
  if (!title && !content) return undefined;
  return /*#__PURE__*/React.createElement(React.Fragment, null, title && /*#__PURE__*/React.createElement("div", {
    className: `${prefixCls}-title`
  }, (0, _getRenderPropValue.getRenderPropValue)(title)), /*#__PURE__*/React.createElement("div", {
    className: `${prefixCls}-inner-content`
  }, (0, _getRenderPropValue.getRenderPropValue)(content)));
};
exports.getOverlay = getOverlay;
function RawPurePanel(props) {
  const {
    hashId,
    prefixCls,
    className,
    style,
    placement = 'top',
    title,
    content,
    children
  } = props;
  return /*#__PURE__*/React.createElement("div", {
    className: (0, _classnames.default)(hashId, prefixCls, `${prefixCls}-pure`, `${prefixCls}-placement-${placement}`, className),
    style: style
  }, /*#__PURE__*/React.createElement("div", {
    className: `${prefixCls}-arrow`
  }), /*#__PURE__*/React.createElement(_rcTooltip.Popup, Object.assign({}, props, {
    className: hashId,
    prefixCls: prefixCls
  }), children || getOverlay(prefixCls, title, content)));
}
function PurePanel(props) {
  const {
      prefixCls: customizePrefixCls
    } = props,
    restProps = __rest(props, ["prefixCls"]);
  const {
    getPrefixCls
  } = React.useContext(_configProvider.ConfigContext);
  const prefixCls = getPrefixCls('popover', customizePrefixCls);
  const [wrapSSR, hashId] = (0, _style.default)(prefixCls);
  return wrapSSR( /*#__PURE__*/React.createElement(RawPurePanel, Object.assign({}, restProps, {
    prefixCls: prefixCls,
    hashId: hashId
  })));
}