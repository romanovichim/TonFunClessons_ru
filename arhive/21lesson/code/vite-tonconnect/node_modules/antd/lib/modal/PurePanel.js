"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Footer = void 0;
exports.renderCloseIcon = renderCloseIcon;
var _CloseOutlined = _interopRequireDefault(require("@ant-design/icons/CloseOutlined"));
var _classnames = _interopRequireDefault(require("classnames"));
var _rcDialog = require("rc-dialog");
var React = _interopRequireWildcard(require("react"));
var _button = _interopRequireDefault(require("../button"));
var _button2 = require("../button/button");
var _configProvider = require("../config-provider");
var _useLocale = _interopRequireDefault(require("../locale/useLocale"));
var _ConfirmDialog = require("./ConfirmDialog");
var _locale = require("./locale");
var _style = _interopRequireDefault(require("./style"));
var __rest = void 0 && (void 0).__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
/* eslint-disable react/jsx-no-useless-fragment */

function renderCloseIcon(prefixCls, closeIcon) {
  return /*#__PURE__*/React.createElement("span", {
    className: `${prefixCls}-close-x`
  }, closeIcon || /*#__PURE__*/React.createElement(_CloseOutlined.default, {
    className: `${prefixCls}-close-icon`
  }));
}
const Footer = props => {
  const {
    okText,
    okType = 'primary',
    cancelText,
    confirmLoading,
    onOk,
    onCancel,
    okButtonProps,
    cancelButtonProps
  } = props;
  const [locale] = (0, _useLocale.default)('Modal', (0, _locale.getConfirmLocale)());
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(_button.default, Object.assign({
    onClick: onCancel
  }, cancelButtonProps), cancelText || (locale === null || locale === void 0 ? void 0 : locale.cancelText)), /*#__PURE__*/React.createElement(_button.default, Object.assign({}, (0, _button2.convertLegacyProps)(okType), {
    loading: confirmLoading,
    onClick: onOk
  }, okButtonProps), okText || (locale === null || locale === void 0 ? void 0 : locale.okText)));
};
exports.Footer = Footer;
const PurePanel = props => {
  const {
      prefixCls: customizePrefixCls,
      className,
      closeIcon,
      closable,
      type,
      title,
      children
    } = props,
    restProps = __rest(props, ["prefixCls", "className", "closeIcon", "closable", "type", "title", "children"]);
  const {
    getPrefixCls
  } = React.useContext(_configProvider.ConfigContext);
  const rootPrefixCls = getPrefixCls();
  const prefixCls = customizePrefixCls || getPrefixCls('modal');
  const [, hashId] = (0, _style.default)(prefixCls);
  const confirmPrefixCls = `${prefixCls}-confirm`;
  // Choose target props by confirm mark
  let additionalProps = {};
  if (type) {
    additionalProps = {
      closable: closable !== null && closable !== void 0 ? closable : false,
      title: '',
      footer: '',
      children: /*#__PURE__*/React.createElement(_ConfirmDialog.ConfirmContent, Object.assign({}, props, {
        confirmPrefixCls: confirmPrefixCls,
        rootPrefixCls: rootPrefixCls,
        content: children
      }))
    };
  } else {
    additionalProps = {
      closable: closable !== null && closable !== void 0 ? closable : true,
      title,
      footer: props.footer === undefined ? /*#__PURE__*/React.createElement(Footer, Object.assign({}, props)) : props.footer,
      children
    };
  }
  return /*#__PURE__*/React.createElement(_rcDialog.Panel, Object.assign({
    prefixCls: prefixCls,
    className: (0, _classnames.default)(hashId, `${prefixCls}-pure-panel`, type && confirmPrefixCls, type && `${confirmPrefixCls}-${type}`, className)
  }, restProps, {
    closeIcon: renderCloseIcon(prefixCls, closeIcon),
    closable: closable
  }, additionalProps));
};
var _default = PurePanel;
exports.default = _default;