"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _tour = _interopRequireDefault(require("@rc-component/tour"));
var _classnames = _interopRequireDefault(require("classnames"));
var _react = _interopRequireWildcard(require("react"));
var _configProvider = require("../config-provider");
var _theme = _interopRequireDefault(require("../theme"));
var _placements = _interopRequireDefault(require("../_util/placements"));
var _panelRender = _interopRequireDefault(require("./panelRender"));
var _PurePanel = _interopRequireDefault(require("./PurePanel"));
var _style = _interopRequireDefault(require("./style"));
var __rest = void 0 && (void 0).__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
const Tour = props => {
  const {
      prefixCls: customizePrefixCls,
      steps,
      current,
      type,
      rootClassName,
      indicatorsRender
    } = props,
    restProps = __rest(props, ["prefixCls", "steps", "current", "type", "rootClassName", "indicatorsRender"]);
  const {
    getPrefixCls,
    direction
  } = (0, _react.useContext)(_configProvider.ConfigContext);
  const prefixCls = getPrefixCls('tour', customizePrefixCls);
  const [wrapSSR, hashId] = (0, _style.default)(prefixCls);
  const {
    token
  } = _theme.default.useToken();
  const builtinPlacements = (0, _placements.default)({
    arrowPointAtCenter: true,
    autoAdjustOverflow: true,
    offset: token.marginXXS,
    arrowWidth: token.sizePopupArrow,
    borderRadius: token.borderRadius
  });
  const customClassName = (0, _classnames.default)({
    [`${prefixCls}-rtl`]: direction === 'rtl'
  }, hashId, rootClassName);
  const mergedRenderPanel = (stepProps, stepCurrent) => /*#__PURE__*/_react.default.createElement(_panelRender.default, {
    type: type,
    stepProps: stepProps,
    current: stepCurrent,
    indicatorsRender: indicatorsRender
  });
  return wrapSSR( /*#__PURE__*/_react.default.createElement(_tour.default, Object.assign({}, restProps, {
    rootClassName: customClassName,
    prefixCls: prefixCls,
    steps: steps,
    current: current,
    animated: true,
    renderPanel: mergedRenderPanel,
    builtinPlacements: builtinPlacements
  })));
};
if (process.env.NODE_ENV !== 'production') {
  Tour.displayName = 'Tour';
}
Tour._InternalPanelDoNotUseOrYouWillBeFired = _PurePanel.default;
var _default = Tour;
exports.default = _default;