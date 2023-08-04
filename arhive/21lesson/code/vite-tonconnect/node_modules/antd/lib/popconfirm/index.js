"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _ExclamationCircleFilled = _interopRequireDefault(require("@ant-design/icons/ExclamationCircleFilled"));
var _classnames = _interopRequireDefault(require("classnames"));
var _useMergedState = _interopRequireDefault(require("rc-util/lib/hooks/useMergedState"));
var _KeyCode = _interopRequireDefault(require("rc-util/lib/KeyCode"));
var React = _interopRequireWildcard(require("react"));
var _omit = _interopRequireDefault(require("rc-util/lib/omit"));
var _configProvider = require("../config-provider");
var _popover = _interopRequireDefault(require("../popover"));
var _reactNode = require("../_util/reactNode");
var _PurePanel = _interopRequireWildcard(require("./PurePanel"));
var _style = _interopRequireDefault(require("./style"));
var __rest = void 0 && (void 0).__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
const Popconfirm = /*#__PURE__*/React.forwardRef((props, ref) => {
  const {
    getPrefixCls
  } = React.useContext(_configProvider.ConfigContext);
  const [open, setOpen] = (0, _useMergedState.default)(false, {
    value: props.open,
    defaultValue: props.defaultOpen
  });
  // const isDestroyed = useDestroyed();
  const settingOpen = (value, e) => {
    var _a;
    setOpen(value, true);
    (_a = props.onOpenChange) === null || _a === void 0 ? void 0 : _a.call(props, value, e);
  };
  const close = e => {
    settingOpen(false, e);
  };
  const onConfirm = e => {
    var _a;
    return (_a = props.onConfirm) === null || _a === void 0 ? void 0 : _a.call(void 0, e);
  };
  const onCancel = e => {
    var _a;
    settingOpen(false, e);
    (_a = props.onCancel) === null || _a === void 0 ? void 0 : _a.call(void 0, e);
  };
  const onKeyDown = e => {
    if (e.keyCode === _KeyCode.default.ESC && open) {
      settingOpen(false, e);
    }
  };
  const onOpenChange = value => {
    const {
      disabled = false
    } = props;
    if (disabled) {
      return;
    }
    settingOpen(value);
  };
  const {
      prefixCls: customizePrefixCls,
      placement = 'top',
      trigger = 'click',
      okType = 'primary',
      icon = /*#__PURE__*/React.createElement(_ExclamationCircleFilled.default, null),
      children,
      overlayClassName
    } = props,
    restProps = __rest(props, ["prefixCls", "placement", "trigger", "okType", "icon", "children", "overlayClassName"]);
  const prefixCls = getPrefixCls('popconfirm', customizePrefixCls);
  const overlayClassNames = (0, _classnames.default)(prefixCls, overlayClassName);
  const [wrapSSR] = (0, _style.default)(prefixCls);
  return wrapSSR( /*#__PURE__*/React.createElement(_popover.default, Object.assign({}, (0, _omit.default)(restProps, ['title']), {
    trigger: trigger,
    placement: placement,
    onOpenChange: onOpenChange,
    open: open,
    ref: ref,
    overlayClassName: overlayClassNames,
    content: /*#__PURE__*/React.createElement(_PurePanel.Overlay, Object.assign({
      okType: okType,
      icon: icon
    }, props, {
      prefixCls: prefixCls,
      close: close,
      onConfirm: onConfirm,
      onCancel: onCancel
    })),
    "data-popover-inject": true
  }), (0, _reactNode.cloneElement)(children, {
    onKeyDown: e => {
      var _a, _b;
      if ( /*#__PURE__*/React.isValidElement(children)) {
        (_b = children === null || children === void 0 ? void 0 : (_a = children.props).onKeyDown) === null || _b === void 0 ? void 0 : _b.call(_a, e);
      }
      onKeyDown(e);
    }
  })));
});
// We don't care debug panel
/* istanbul ignore next */
Popconfirm._InternalPanelDoNotUseOrYouWillBeFired = _PurePanel.default;
if (process.env.NODE_ENV !== 'production') {
  Popconfirm.displayName = 'Popconfirm';
}
var _default = Popconfirm;
exports.default = _default;