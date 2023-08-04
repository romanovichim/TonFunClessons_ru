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
var _PurePanel = require("../popover/PurePanel");
var _panelRender = _interopRequireDefault(require("./panelRender"));
var _style = _interopRequireDefault(require("./style"));
var __rest = void 0 && (void 0).__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
const PurePanel = props => {
  const {
      prefixCls: customizePrefixCls,
      current = 0,
      total = 6,
      className,
      style,
      type
    } = props,
    restProps = __rest(props, ["prefixCls", "current", "total", "className", "style", "type"]);
  const {
    getPrefixCls
  } = React.useContext(_configProvider.ConfigContext);
  const prefixCls = getPrefixCls('tour', customizePrefixCls);
  const [wrapSSR, hashId] = (0, _style.default)(prefixCls);
  return wrapSSR( /*#__PURE__*/React.createElement(_PurePanel.RawPurePanel, {
    prefixCls: prefixCls,
    hashId: hashId,
    className: (0, _classnames.default)(className, `${prefixCls}-pure`, type && `${prefixCls}-${type}`),
    style: style
  }, /*#__PURE__*/React.createElement(_panelRender.default, {
    stepProps: Object.assign(Object.assign({}, restProps), {
      prefixCls,
      total
    }),
    current: current,
    type: type
  })));
};
var _default = PurePanel;
exports.default = _default;