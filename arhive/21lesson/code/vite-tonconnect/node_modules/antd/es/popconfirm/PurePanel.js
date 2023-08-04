var __rest = this && this.__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
import ExclamationCircleFilled from "@ant-design/icons/es/icons/ExclamationCircleFilled";
import classNames from 'classnames';
import * as React from 'react';
import Button from '../button';
import { convertLegacyProps } from '../button/button';
import { ConfigContext } from '../config-provider';
import defaultLocale from '../locale/en_US';
import useLocale from '../locale/useLocale';
import PopoverPurePanel from '../popover/PurePanel';
import ActionButton from '../_util/ActionButton';
import { getRenderPropValue } from '../_util/getRenderPropValue';
import useStyle from './style';
export const Overlay = props => {
  const {
    prefixCls,
    okButtonProps,
    cancelButtonProps,
    title,
    description,
    cancelText,
    okText,
    okType = 'primary',
    icon = /*#__PURE__*/React.createElement(ExclamationCircleFilled, null),
    showCancel = true,
    close,
    onConfirm,
    onCancel
  } = props;
  const {
    getPrefixCls
  } = React.useContext(ConfigContext);
  const [contextLocale] = useLocale('Popconfirm', defaultLocale.Popconfirm);
  return /*#__PURE__*/React.createElement("div", {
    className: `${prefixCls}-inner-content`
  }, /*#__PURE__*/React.createElement("div", {
    className: `${prefixCls}-message`
  }, icon && /*#__PURE__*/React.createElement("span", {
    className: `${prefixCls}-message-icon`
  }, icon), /*#__PURE__*/React.createElement("div", {
    className: classNames(`${prefixCls}-message-title`, {
      [`${prefixCls}-message-title-only`]: !!description
    })
  }, getRenderPropValue(title))), description && /*#__PURE__*/React.createElement("div", {
    className: `${prefixCls}-description`
  }, getRenderPropValue(description)), /*#__PURE__*/React.createElement("div", {
    className: `${prefixCls}-buttons`
  }, showCancel && /*#__PURE__*/React.createElement(Button, Object.assign({
    onClick: onCancel,
    size: "small"
  }, cancelButtonProps), cancelText !== null && cancelText !== void 0 ? cancelText : contextLocale === null || contextLocale === void 0 ? void 0 : contextLocale.cancelText), /*#__PURE__*/React.createElement(ActionButton, {
    buttonProps: Object.assign(Object.assign({
      size: 'small'
    }, convertLegacyProps(okType)), okButtonProps),
    actionFn: onConfirm,
    close: close,
    prefixCls: getPrefixCls('btn'),
    quitOnNullishReturnValue: true,
    emitEvent: true
  }, okText !== null && okText !== void 0 ? okText : contextLocale === null || contextLocale === void 0 ? void 0 : contextLocale.okText)));
};
export default function PurePanel(props) {
  const {
      prefixCls: customizePrefixCls,
      placement,
      className,
      style
    } = props,
    restProps = __rest(props, ["prefixCls", "placement", "className", "style"]);
  const {
    getPrefixCls
  } = React.useContext(ConfigContext);
  const prefixCls = getPrefixCls('popconfirm', customizePrefixCls);
  const [wrapSSR] = useStyle(prefixCls);
  return wrapSSR( /*#__PURE__*/React.createElement(PopoverPurePanel, {
    placement: placement,
    className: classNames(prefixCls, className),
    style: style,
    content: /*#__PURE__*/React.createElement(Overlay, Object.assign({
      prefixCls: prefixCls
    }, restProps))
  }));
}