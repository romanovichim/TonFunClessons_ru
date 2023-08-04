"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _classnames = _interopRequireDefault(require("classnames"));
var _rcDialog = _interopRequireDefault(require("rc-dialog"));
var React = _interopRequireWildcard(require("react"));
var _configProvider = require("../config-provider");
var _context = require("../form/context");
var _Compact = require("../space/Compact");
var _motion = require("../_util/motion");
var _styleChecker = require("../_util/styleChecker");
var _warning = _interopRequireDefault(require("../_util/warning"));
var _PurePanel = require("./PurePanel");
var _style = _interopRequireDefault(require("./style"));
var __rest = void 0 && (void 0).__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
let mousePosition;
// ref: https://github.com/ant-design/ant-design/issues/15795
const getClickPosition = e => {
  mousePosition = {
    x: e.pageX,
    y: e.pageY
  };
  // 100ms 内发生过点击事件，则从点击位置动画展示
  // 否则直接 zoom 展示
  // 这样可以兼容非点击方式展开
  setTimeout(() => {
    mousePosition = null;
  }, 100);
};
// 只有点击事件支持从鼠标位置动画展开
if ((0, _styleChecker.canUseDocElement)()) {
  document.documentElement.addEventListener('click', getClickPosition, true);
}
const Modal = props => {
  var _a;
  const {
    getPopupContainer: getContextPopupContainer,
    getPrefixCls,
    direction
  } = React.useContext(_configProvider.ConfigContext);
  const handleCancel = e => {
    const {
      onCancel
    } = props;
    onCancel === null || onCancel === void 0 ? void 0 : onCancel(e);
  };
  const handleOk = e => {
    const {
      onOk
    } = props;
    onOk === null || onOk === void 0 ? void 0 : onOk(e);
  };
  process.env.NODE_ENV !== "production" ? (0, _warning.default)(!('visible' in props), 'Modal', `\`visible\` will be removed in next major version, please use \`open\` instead.`) : void 0;
  const {
      prefixCls: customizePrefixCls,
      className,
      rootClassName,
      open,
      wrapClassName,
      centered,
      getContainer,
      closeIcon,
      focusTriggerAfterClose = true,
      // Deprecated
      visible,
      width = 520,
      footer
    } = props,
    restProps = __rest(props, ["prefixCls", "className", "rootClassName", "open", "wrapClassName", "centered", "getContainer", "closeIcon", "focusTriggerAfterClose", "visible", "width", "footer"]);
  const prefixCls = getPrefixCls('modal', customizePrefixCls);
  const rootPrefixCls = getPrefixCls();
  // Style
  const [wrapSSR, hashId] = (0, _style.default)(prefixCls);
  const wrapClassNameExtended = (0, _classnames.default)(wrapClassName, {
    [`${prefixCls}-centered`]: !!centered,
    [`${prefixCls}-wrap-rtl`]: direction === 'rtl'
  });
  if (process.env.NODE_ENV !== 'production') {
    process.env.NODE_ENV !== "production" ? (0, _warning.default)(!('visible' in props), 'Modal', '`visible` is deprecated, please use `open` instead.') : void 0;
  }
  const dialogFooter = footer === undefined ? /*#__PURE__*/React.createElement(_PurePanel.Footer, Object.assign({}, props, {
    onOk: handleOk,
    onCancel: handleCancel
  })) : footer;
  return wrapSSR( /*#__PURE__*/React.createElement(_Compact.NoCompactStyle, null, /*#__PURE__*/React.createElement(_context.NoFormStyle, {
    status: true,
    override: true
  }, /*#__PURE__*/React.createElement(_rcDialog.default, Object.assign({
    width: width
  }, restProps, {
    getContainer: getContainer === undefined ? getContextPopupContainer : getContainer,
    prefixCls: prefixCls,
    rootClassName: (0, _classnames.default)(hashId, rootClassName),
    wrapClassName: wrapClassNameExtended,
    footer: dialogFooter,
    visible: open !== null && open !== void 0 ? open : visible,
    mousePosition: (_a = restProps.mousePosition) !== null && _a !== void 0 ? _a : mousePosition,
    onClose: handleCancel,
    closeIcon: (0, _PurePanel.renderCloseIcon)(prefixCls, closeIcon),
    focusTriggerAfterClose: focusTriggerAfterClose,
    transitionName: (0, _motion.getTransitionName)(rootPrefixCls, 'zoom', props.transitionName),
    maskTransitionName: (0, _motion.getTransitionName)(rootPrefixCls, 'fade', props.maskTransitionName),
    className: (0, _classnames.default)(hashId, className)
  })))));
};
var _default = Modal;
exports.default = _default;