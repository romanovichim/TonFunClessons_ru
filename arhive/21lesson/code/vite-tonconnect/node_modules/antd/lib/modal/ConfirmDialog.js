"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConfirmContent = ConfirmContent;
exports.default = void 0;
var _CheckCircleFilled = _interopRequireDefault(require("@ant-design/icons/CheckCircleFilled"));
var _CloseCircleFilled = _interopRequireDefault(require("@ant-design/icons/CloseCircleFilled"));
var _ExclamationCircleFilled = _interopRequireDefault(require("@ant-design/icons/ExclamationCircleFilled"));
var _InfoCircleFilled = _interopRequireDefault(require("@ant-design/icons/InfoCircleFilled"));
var _classnames = _interopRequireDefault(require("classnames"));
var React = _interopRequireWildcard(require("react"));
var _configProvider = _interopRequireDefault(require("../config-provider"));
var _useLocale = _interopRequireDefault(require("../locale/useLocale"));
var _ActionButton = _interopRequireDefault(require("../_util/ActionButton"));
var _motion = require("../_util/motion");
var _warning = _interopRequireDefault(require("../_util/warning"));
var _Modal = _interopRequireDefault(require("./Modal"));
function ConfirmContent(props) {
  const {
    icon,
    onCancel,
    onOk,
    close,
    okText,
    okButtonProps,
    cancelText,
    cancelButtonProps,
    confirmPrefixCls,
    rootPrefixCls,
    type,
    okCancel,
    footer,
    // Legacy for static function usage
    locale: staticLocale
  } = props;
  process.env.NODE_ENV !== "production" ? (0, _warning.default)(!(typeof icon === 'string' && icon.length > 2), 'Modal', `\`icon\` is using ReactNode instead of string naming in v4. Please check \`${icon}\` at https://ant.design/components/icon`) : void 0;
  // Icon
  let mergedIcon = icon;
  // 支持传入{ icon: null }来隐藏`Modal.confirm`默认的Icon
  if (!icon && icon !== null) {
    switch (type) {
      case 'info':
        mergedIcon = /*#__PURE__*/React.createElement(_InfoCircleFilled.default, null);
        break;
      case 'success':
        mergedIcon = /*#__PURE__*/React.createElement(_CheckCircleFilled.default, null);
        break;
      case 'error':
        mergedIcon = /*#__PURE__*/React.createElement(_CloseCircleFilled.default, null);
        break;
      default:
        mergedIcon = /*#__PURE__*/React.createElement(_ExclamationCircleFilled.default, null);
    }
  }
  const okType = props.okType || 'primary';
  // 默认为 true，保持向下兼容
  const mergedOkCancel = okCancel !== null && okCancel !== void 0 ? okCancel : type === 'confirm';
  const autoFocusButton = props.autoFocusButton === null ? false : props.autoFocusButton || 'ok';
  const [locale] = (0, _useLocale.default)('Modal');
  const mergedLocale = staticLocale || locale;
  const cancelButton = mergedOkCancel && /*#__PURE__*/React.createElement(_ActionButton.default, {
    actionFn: onCancel,
    close: close,
    autoFocus: autoFocusButton === 'cancel',
    buttonProps: cancelButtonProps,
    prefixCls: `${rootPrefixCls}-btn`
  }, cancelText || (mergedLocale === null || mergedLocale === void 0 ? void 0 : mergedLocale.cancelText));
  return /*#__PURE__*/React.createElement("div", {
    className: `${confirmPrefixCls}-body-wrapper`
  }, /*#__PURE__*/React.createElement("div", {
    className: `${confirmPrefixCls}-body`
  }, mergedIcon, props.title === undefined ? null : /*#__PURE__*/React.createElement("span", {
    className: `${confirmPrefixCls}-title`
  }, props.title), /*#__PURE__*/React.createElement("div", {
    className: `${confirmPrefixCls}-content`
  }, props.content)), footer === undefined ? /*#__PURE__*/React.createElement("div", {
    className: `${confirmPrefixCls}-btns`
  }, cancelButton, /*#__PURE__*/React.createElement(_ActionButton.default, {
    type: okType,
    actionFn: onOk,
    close: close,
    autoFocus: autoFocusButton === 'ok',
    buttonProps: okButtonProps,
    prefixCls: `${rootPrefixCls}-btn`
  }, okText || (mergedOkCancel ? mergedLocale === null || mergedLocale === void 0 ? void 0 : mergedLocale.okText : mergedLocale === null || mergedLocale === void 0 ? void 0 : mergedLocale.justOkText))) : footer);
}
const ConfirmDialog = props => {
  const {
    close,
    zIndex,
    afterClose,
    visible,
    open,
    keyboard,
    centered,
    getContainer,
    maskStyle,
    direction,
    prefixCls,
    wrapClassName,
    rootPrefixCls,
    iconPrefixCls,
    bodyStyle,
    closable = false,
    closeIcon,
    modalRender,
    focusTriggerAfterClose
  } = props;
  if (process.env.NODE_ENV !== 'production') {
    process.env.NODE_ENV !== "production" ? (0, _warning.default)(visible === undefined, 'Modal', `\`visible\` is deprecated, please use \`open\` instead.`) : void 0;
  }
  const confirmPrefixCls = `${prefixCls}-confirm`;
  const width = props.width || 416;
  const style = props.style || {};
  const mask = props.mask === undefined ? true : props.mask;
  // 默认为 false，保持旧版默认行为
  const maskClosable = props.maskClosable === undefined ? false : props.maskClosable;
  const classString = (0, _classnames.default)(confirmPrefixCls, `${confirmPrefixCls}-${props.type}`, {
    [`${confirmPrefixCls}-rtl`]: direction === 'rtl'
  }, props.className);
  return /*#__PURE__*/React.createElement(_configProvider.default, {
    prefixCls: rootPrefixCls,
    iconPrefixCls: iconPrefixCls,
    direction: direction
  }, /*#__PURE__*/React.createElement(_Modal.default, {
    prefixCls: prefixCls,
    className: classString,
    wrapClassName: (0, _classnames.default)({
      [`${confirmPrefixCls}-centered`]: !!props.centered
    }, wrapClassName),
    onCancel: () => close === null || close === void 0 ? void 0 : close({
      triggerCancel: true
    }),
    open: open,
    title: "",
    footer: null,
    transitionName: (0, _motion.getTransitionName)(rootPrefixCls, 'zoom', props.transitionName),
    maskTransitionName: (0, _motion.getTransitionName)(rootPrefixCls, 'fade', props.maskTransitionName),
    mask: mask,
    maskClosable: maskClosable,
    maskStyle: maskStyle,
    style: style,
    bodyStyle: bodyStyle,
    width: width,
    zIndex: zIndex,
    afterClose: afterClose,
    keyboard: keyboard,
    centered: centered,
    getContainer: getContainer,
    closable: closable,
    closeIcon: closeIcon,
    modalRender: modalRender,
    focusTriggerAfterClose: focusTriggerAfterClose
  }, /*#__PURE__*/React.createElement(ConfirmContent, Object.assign({}, props, {
    confirmPrefixCls: confirmPrefixCls
  }))));
};
if (process.env.NODE_ENV !== 'production') {
  ConfirmDialog.displayName = 'ConfirmDialog';
}
var _default = ConfirmDialog;
exports.default = _default;