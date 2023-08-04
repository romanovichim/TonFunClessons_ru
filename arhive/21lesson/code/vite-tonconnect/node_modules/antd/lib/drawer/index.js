"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _classnames = _interopRequireDefault(require("classnames"));
var _rcDrawer = _interopRequireDefault(require("rc-drawer"));
var React = _interopRequireWildcard(require("react"));
var _configProvider = require("../config-provider");
var _context = require("../form/context");
var _motion = require("../_util/motion");
var _warning = _interopRequireDefault(require("../_util/warning"));
var _DrawerPanel = _interopRequireDefault(require("./DrawerPanel"));
var _style = _interopRequireDefault(require("./style"));
var _Compact = require("../space/Compact");
var __rest = void 0 && (void 0).__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
const SizeTypes = ['default', 'large'];
const defaultPushState = {
  distance: 180
};
function Drawer(props) {
  var _a;
  const {
      rootClassName,
      width,
      height,
      size = 'default',
      mask = true,
      push = defaultPushState,
      open,
      afterOpenChange,
      onClose,
      prefixCls: customizePrefixCls,
      getContainer: customizeGetContainer,
      // Deprecated
      visible,
      afterVisibleChange
    } = props,
    rest = __rest(props, ["rootClassName", "width", "height", "size", "mask", "push", "open", "afterOpenChange", "onClose", "prefixCls", "getContainer", "visible", "afterVisibleChange"]);
  const {
    getPopupContainer,
    getPrefixCls,
    direction
  } = React.useContext(_configProvider.ConfigContext);
  const prefixCls = getPrefixCls('drawer', customizePrefixCls);
  // Style
  const [wrapSSR, hashId] = (0, _style.default)(prefixCls);
  const getContainer =
  // 有可能为 false，所以不能直接判断
  customizeGetContainer === undefined && getPopupContainer ? () => getPopupContainer(document.body) : customizeGetContainer;
  const drawerClassName = (0, _classnames.default)({
    'no-mask': !mask,
    [`${prefixCls}-rtl`]: direction === 'rtl'
  }, rootClassName, hashId);
  // ========================== Warning ===========================
  if (process.env.NODE_ENV !== 'production') {
    [['visible', 'open'], ['afterVisibleChange', 'afterOpenChange']].forEach(_ref => {
      let [deprecatedName, newName] = _ref;
      process.env.NODE_ENV !== "production" ? (0, _warning.default)(!(deprecatedName in props), 'Drawer', `\`${deprecatedName}\` is deprecated, please use \`${newName}\` instead.`) : void 0;
    });
    if (getContainer !== undefined && ((_a = props.style) === null || _a === void 0 ? void 0 : _a.position) === 'absolute') {
      process.env.NODE_ENV !== "production" ? (0, _warning.default)(false, 'Drawer', '`style` is replaced by `rootStyle` in v5. Please check that `position: absolute` is necessary.') : void 0;
    }
  }
  // ============================ Size ============================
  const mergedWidth = React.useMemo(() => width !== null && width !== void 0 ? width : size === 'large' ? 736 : 378, [width, size]);
  const mergedHeight = React.useMemo(() => height !== null && height !== void 0 ? height : size === 'large' ? 736 : 378, [height, size]);
  // =========================== Motion ===========================
  const maskMotion = {
    motionName: (0, _motion.getTransitionName)(prefixCls, 'mask-motion'),
    motionAppear: true,
    motionEnter: true,
    motionLeave: true,
    motionDeadline: 500
  };
  const panelMotion = motionPlacement => ({
    motionName: (0, _motion.getTransitionName)(prefixCls, `panel-motion-${motionPlacement}`),
    motionAppear: true,
    motionEnter: true,
    motionLeave: true,
    motionDeadline: 500
  });
  // =========================== Render ===========================
  return wrapSSR( /*#__PURE__*/React.createElement(_Compact.NoCompactStyle, null, /*#__PURE__*/React.createElement(_context.NoFormStyle, {
    status: true,
    override: true
  }, /*#__PURE__*/React.createElement(_rcDrawer.default, Object.assign({
    prefixCls: prefixCls,
    onClose: onClose,
    maskMotion: maskMotion,
    motion: panelMotion
  }, rest, {
    open: open !== null && open !== void 0 ? open : visible,
    mask: mask,
    push: push,
    width: mergedWidth,
    height: mergedHeight,
    rootClassName: drawerClassName,
    getContainer: getContainer,
    afterOpenChange: afterOpenChange !== null && afterOpenChange !== void 0 ? afterOpenChange : afterVisibleChange
  }), /*#__PURE__*/React.createElement(_DrawerPanel.default, Object.assign({
    prefixCls: prefixCls
  }, rest, {
    onClose: onClose
  }))))));
}
if (process.env.NODE_ENV !== 'production') {
  Drawer.displayName = 'Drawer';
}
function PurePanel(_a) {
  var {
      prefixCls: customizePrefixCls,
      style,
      className,
      placement = 'right'
    } = _a,
    restProps = __rest(_a, ["prefixCls", "style", "className", "placement"]);
  const {
    getPrefixCls
  } = React.useContext(_configProvider.ConfigContext);
  const prefixCls = getPrefixCls('drawer', customizePrefixCls);
  // Style
  const [wrapSSR, hashId] = (0, _style.default)(prefixCls);
  return wrapSSR( /*#__PURE__*/React.createElement("div", {
    className: (0, _classnames.default)(prefixCls, `${prefixCls}-pure`, `${prefixCls}-${placement}`, hashId, className),
    style: style
  }, /*#__PURE__*/React.createElement(_DrawerPanel.default, Object.assign({
    prefixCls: prefixCls
  }, restProps))));
}
Drawer._InternalPanelDoNotUseOrYouWillBeFired = PurePanel;
var _default = Drawer;
exports.default = _default;