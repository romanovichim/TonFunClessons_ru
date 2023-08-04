import React, { useRef, memo, useContext, useEffect, useCallback, useMemo } from 'react';
import CloseOutlined from "@ant-design/icons/es/icons/CloseOutlined";
import FileTextOutlined from "@ant-design/icons/es/icons/FileTextOutlined";
import classNames from 'classnames';
import CSSMotion from 'rc-motion';
import useMergedState from "rc-util/es/hooks/useMergedState";
import FloatButton, { floatButtonPrefixCls } from './FloatButton';
import { ConfigContext } from '../config-provider';
import { FloatButtonGroupProvider } from './context';
import useStyle from './style';
const FloatButtonGroup = props => {
  const {
    prefixCls: customizePrefixCls,
    className,
    style,
    shape = 'circle',
    type = 'default',
    icon = /*#__PURE__*/React.createElement(FileTextOutlined, null),
    closeIcon = /*#__PURE__*/React.createElement(CloseOutlined, null),
    description,
    trigger,
    children,
    onOpenChange
  } = props;
  const {
    direction,
    getPrefixCls
  } = useContext(ConfigContext);
  const prefixCls = getPrefixCls(floatButtonPrefixCls, customizePrefixCls);
  const [wrapSSR, hashId] = useStyle(prefixCls);
  const groupPrefixCls = `${prefixCls}-group`;
  const groupCls = classNames(groupPrefixCls, hashId, className, {
    [`${groupPrefixCls}-rtl`]: direction === 'rtl',
    [`${groupPrefixCls}-${shape}`]: shape,
    [`${groupPrefixCls}-${shape}-shadow`]: !trigger
  });
  const wrapperCls = classNames(hashId, `${groupPrefixCls}-wrap`);
  const [open, setOpen] = useMergedState(false, {
    value: props.open
  });
  const floatButtonGroupRef = useRef(null);
  const floatButtonRef = useRef(null);
  const hoverAction = useMemo(() => {
    const hoverTypeAction = {
      onMouseEnter() {
        setOpen(true);
        onOpenChange === null || onOpenChange === void 0 ? void 0 : onOpenChange(true);
      },
      onMouseLeave() {
        setOpen(false);
        onOpenChange === null || onOpenChange === void 0 ? void 0 : onOpenChange(false);
      }
    };
    return trigger === 'hover' ? hoverTypeAction : {};
  }, [trigger]);
  const handleOpenChange = () => {
    setOpen(prevState => {
      onOpenChange === null || onOpenChange === void 0 ? void 0 : onOpenChange(!prevState);
      return !prevState;
    });
  };
  const onClick = useCallback(e => {
    var _a, _b;
    if ((_a = floatButtonGroupRef.current) === null || _a === void 0 ? void 0 : _a.contains(e.target)) {
      if ((_b = floatButtonRef.current) === null || _b === void 0 ? void 0 : _b.contains(e.target)) {
        handleOpenChange();
      }
      return;
    }
    setOpen(false);
    onOpenChange === null || onOpenChange === void 0 ? void 0 : onOpenChange(false);
  }, [trigger]);
  useEffect(() => {
    if (trigger === 'click') {
      document.addEventListener('click', onClick);
      return () => {
        document.removeEventListener('click', onClick);
      };
    }
  }, [trigger]);
  return wrapSSR( /*#__PURE__*/React.createElement(FloatButtonGroupProvider, {
    value: shape
  }, /*#__PURE__*/React.createElement("div", Object.assign({
    ref: floatButtonGroupRef,
    className: groupCls,
    style: style
  }, hoverAction), trigger && ['click', 'hover'].includes(trigger) ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(CSSMotion, {
    visible: open,
    motionName: `${groupPrefixCls}-wrap`
  }, _ref => {
    let {
      className: motionClassName
    } = _ref;
    return /*#__PURE__*/React.createElement("div", {
      className: classNames(motionClassName, wrapperCls)
    }, children);
  }), /*#__PURE__*/React.createElement(FloatButton, {
    ref: floatButtonRef,
    type: type,
    shape: shape,
    icon: open ? closeIcon : icon,
    description: description
  })) : children)));
};
export default /*#__PURE__*/memo(FloatButtonGroup);