var __rest = this && this.__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
import CheckCircleFilled from "@ant-design/icons/es/icons/CheckCircleFilled";
import CloseCircleFilled from "@ant-design/icons/es/icons/CloseCircleFilled";
import CloseOutlined from "@ant-design/icons/es/icons/CloseOutlined";
import ExclamationCircleFilled from "@ant-design/icons/es/icons/ExclamationCircleFilled";
import InfoCircleFilled from "@ant-design/icons/es/icons/InfoCircleFilled";
import classNames from 'classnames';
import CSSMotion from 'rc-motion';
import * as React from 'react';
import { ConfigContext } from '../config-provider';
import getDataOrAriaProps from '../_util/getDataOrAriaProps';
import { replaceElement } from '../_util/reactNode';
import ErrorBoundary from './ErrorBoundary';
// CSSINJS
import useStyle from './style';
const iconMapFilled = {
  success: CheckCircleFilled,
  info: InfoCircleFilled,
  error: CloseCircleFilled,
  warning: ExclamationCircleFilled
};
const IconNode = props => {
  const {
    icon,
    prefixCls,
    type
  } = props;
  const iconType = iconMapFilled[type] || null;
  if (icon) {
    return replaceElement(icon, /*#__PURE__*/React.createElement("span", {
      className: `${prefixCls}-icon`
    }, icon), () => ({
      className: classNames(`${prefixCls}-icon`, {
        [icon.props.className]: icon.props.className
      })
    }));
  }
  return /*#__PURE__*/React.createElement(iconType, {
    className: `${prefixCls}-icon`
  });
};
const CloseIcon = props => {
  const {
    isClosable,
    closeText,
    prefixCls,
    closeIcon,
    handleClose
  } = props;
  return isClosable ? /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: handleClose,
    className: `${prefixCls}-close-icon`,
    tabIndex: 0
  }, closeText ? /*#__PURE__*/React.createElement("span", {
    className: `${prefixCls}-close-text`
  }, closeText) : closeIcon) : null;
};
const Alert = _a => {
  var {
      description,
      prefixCls: customizePrefixCls,
      message,
      banner,
      className,
      rootClassName,
      style,
      onMouseEnter,
      onMouseLeave,
      onClick,
      afterClose,
      showIcon,
      closable,
      closeText,
      closeIcon = /*#__PURE__*/React.createElement(CloseOutlined, null),
      action
    } = _a,
    props = __rest(_a, ["description", "prefixCls", "message", "banner", "className", "rootClassName", "style", "onMouseEnter", "onMouseLeave", "onClick", "afterClose", "showIcon", "closable", "closeText", "closeIcon", "action"]);
  const [closed, setClosed] = React.useState(false);
  const ref = React.useRef();
  const {
    getPrefixCls,
    direction
  } = React.useContext(ConfigContext);
  const prefixCls = getPrefixCls('alert', customizePrefixCls);
  const [wrapSSR, hashId] = useStyle(prefixCls);
  const handleClose = e => {
    var _a;
    setClosed(true);
    (_a = props.onClose) === null || _a === void 0 ? void 0 : _a.call(props, e);
  };
  const getType = () => {
    const {
      type
    } = props;
    if (type !== undefined) {
      return type;
    }
    // banner 模式默认为警告
    return banner ? 'warning' : 'info';
  };
  // closeable when closeText is assigned
  const isClosable = closeText ? true : closable;
  const type = getType();
  // banner 模式默认有 Icon
  const isShowIcon = banner && showIcon === undefined ? true : showIcon;
  const alertCls = classNames(prefixCls, `${prefixCls}-${type}`, {
    [`${prefixCls}-with-description`]: !!description,
    [`${prefixCls}-no-icon`]: !isShowIcon,
    [`${prefixCls}-banner`]: !!banner,
    [`${prefixCls}-rtl`]: direction === 'rtl'
  }, className, rootClassName, hashId);
  const dataOrAriaProps = getDataOrAriaProps(props);
  return wrapSSR( /*#__PURE__*/React.createElement(CSSMotion, {
    visible: !closed,
    motionName: `${prefixCls}-motion`,
    motionAppear: false,
    motionEnter: false,
    onLeaveStart: node => ({
      maxHeight: node.offsetHeight
    }),
    onLeaveEnd: afterClose
  }, _ref => {
    let {
      className: motionClassName,
      style: motionStyle
    } = _ref;
    return /*#__PURE__*/React.createElement("div", Object.assign({
      ref: ref,
      "data-show": !closed,
      className: classNames(alertCls, motionClassName),
      style: Object.assign(Object.assign({}, style), motionStyle),
      onMouseEnter: onMouseEnter,
      onMouseLeave: onMouseLeave,
      onClick: onClick,
      role: "alert"
    }, dataOrAriaProps), isShowIcon ? /*#__PURE__*/React.createElement(IconNode, {
      description: description,
      icon: props.icon,
      prefixCls: prefixCls,
      type: type
    }) : null, /*#__PURE__*/React.createElement("div", {
      className: `${prefixCls}-content`
    }, message ? /*#__PURE__*/React.createElement("div", {
      className: `${prefixCls}-message`
    }, message) : null, description ? /*#__PURE__*/React.createElement("div", {
      className: `${prefixCls}-description`
    }, description) : null), action ? /*#__PURE__*/React.createElement("div", {
      className: `${prefixCls}-action`
    }, action) : null, /*#__PURE__*/React.createElement(CloseIcon, {
      isClosable: !!isClosable,
      closeText: closeText,
      prefixCls: prefixCls,
      closeIcon: closeIcon,
      handleClose: handleClose
    }));
  }));
};
Alert.ErrorBoundary = ErrorBoundary;
if (process.env.NODE_ENV !== 'production') {
  Alert.displayName = 'Alert';
}
export default Alert;