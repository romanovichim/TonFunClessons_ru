"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _VerticalAlignTopOutlined = _interopRequireDefault(require("@ant-design/icons/VerticalAlignTopOutlined"));
var _classnames = _interopRequireDefault(require("classnames"));
var _rcMotion = _interopRequireDefault(require("rc-motion"));
var _react = _interopRequireWildcard(require("react"));
var _FloatButton = _interopRequireWildcard(require("./FloatButton"));
var _configProvider = require("../config-provider");
var _getScroll = _interopRequireDefault(require("../_util/getScroll"));
var _scrollTo = _interopRequireDefault(require("../_util/scrollTo"));
var _throttleByAnimationFrame = _interopRequireDefault(require("../_util/throttleByAnimationFrame"));
var _context = _interopRequireDefault(require("./context"));
var _style = _interopRequireDefault(require("./style"));
var __rest = void 0 && (void 0).__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
const BackTop = props => {
  const {
      prefixCls: customizePrefixCls,
      className,
      type = 'default',
      shape = 'circle',
      visibilityHeight = 400,
      icon = /*#__PURE__*/_react.default.createElement(_VerticalAlignTopOutlined.default, null),
      target,
      onClick,
      duration = 450
    } = props,
    restProps = __rest(props, ["prefixCls", "className", "type", "shape", "visibilityHeight", "icon", "target", "onClick", "duration"]);
  const [visible, setVisible] = (0, _react.useState)(visibilityHeight === 0);
  const ref = (0, _react.useRef)(null);
  const getDefaultTarget = () => ref.current && ref.current.ownerDocument ? ref.current.ownerDocument : window;
  const handleScroll = (0, _throttleByAnimationFrame.default)(e => {
    const scrollTop = (0, _getScroll.default)(e.target, true);
    setVisible(scrollTop >= visibilityHeight);
  });
  (0, _react.useEffect)(() => {
    const getTarget = target || getDefaultTarget;
    const container = getTarget();
    handleScroll({
      target: container
    });
    container === null || container === void 0 ? void 0 : container.addEventListener('scroll', handleScroll);
    return () => {
      handleScroll.cancel();
      container === null || container === void 0 ? void 0 : container.removeEventListener('scroll', handleScroll);
    };
  }, [target]);
  const scrollToTop = e => {
    (0, _scrollTo.default)(0, {
      getContainer: target || getDefaultTarget,
      duration
    });
    onClick === null || onClick === void 0 ? void 0 : onClick(e);
  };
  const {
    getPrefixCls
  } = (0, _react.useContext)(_configProvider.ConfigContext);
  const prefixCls = getPrefixCls(_FloatButton.floatButtonPrefixCls, customizePrefixCls);
  const rootPrefixCls = getPrefixCls();
  const [wrapSSR] = (0, _style.default)(prefixCls);
  const groupShape = (0, _react.useContext)(_context.default);
  const mergeShape = groupShape || shape;
  const contentProps = Object.assign({
    prefixCls,
    icon,
    type,
    shape: mergeShape
  }, restProps);
  return wrapSSR( /*#__PURE__*/_react.default.createElement(_rcMotion.default, {
    visible: visible,
    motionName: `${rootPrefixCls}-fade`
  }, _ref => {
    let {
      className: motionClassName
    } = _ref;
    return /*#__PURE__*/_react.default.createElement(_FloatButton.default, Object.assign({
      ref: ref
    }, contentProps, {
      onClick: scrollToTop,
      className: (0, _classnames.default)(className, motionClassName)
    }));
  }));
};
if (process.env.NODE_ENV !== 'production') {
  BackTop.displayName = 'BackTop';
}
var _default = /*#__PURE__*/(0, _react.memo)(BackTop);
exports.default = _default;