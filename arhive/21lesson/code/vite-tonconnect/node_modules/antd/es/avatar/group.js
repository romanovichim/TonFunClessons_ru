import classNames from 'classnames';
import toArray from "rc-util/es/Children/toArray";
import * as React from 'react';
import { ConfigContext } from '../config-provider';
import Popover from '../popover';
import { cloneElement } from '../_util/reactNode';
import Avatar from './avatar';
import { SizeContextProvider } from './SizeContext';
import useStyle from './style';
const Group = props => {
  const {
    getPrefixCls,
    direction
  } = React.useContext(ConfigContext);
  const {
    prefixCls: customizePrefixCls,
    className,
    rootClassName,
    maxCount,
    maxStyle,
    size
  } = props;
  const prefixCls = getPrefixCls('avatar', customizePrefixCls);
  const groupPrefixCls = `${prefixCls}-group`;
  const [wrapSSR, hashId] = useStyle(prefixCls);
  const cls = classNames(groupPrefixCls, {
    [`${groupPrefixCls}-rtl`]: direction === 'rtl'
  }, className, rootClassName, hashId);
  const {
    children,
    maxPopoverPlacement = 'top',
    maxPopoverTrigger = 'hover'
  } = props;
  const childrenWithProps = toArray(children).map((child, index) => cloneElement(child, {
    key: `avatar-key-${index}`
  }));
  const numOfChildren = childrenWithProps.length;
  if (maxCount && maxCount < numOfChildren) {
    const childrenShow = childrenWithProps.slice(0, maxCount);
    const childrenHidden = childrenWithProps.slice(maxCount, numOfChildren);
    childrenShow.push( /*#__PURE__*/React.createElement(Popover, {
      key: "avatar-popover-key",
      content: childrenHidden,
      trigger: maxPopoverTrigger,
      placement: maxPopoverPlacement,
      overlayClassName: `${groupPrefixCls}-popover`
    }, /*#__PURE__*/React.createElement(Avatar, {
      style: maxStyle
    }, `+${numOfChildren - maxCount}`)));
    return wrapSSR( /*#__PURE__*/React.createElement(SizeContextProvider, {
      size: size
    }, /*#__PURE__*/React.createElement("div", {
      className: cls,
      style: props.style
    }, childrenShow)));
  }
  return wrapSSR( /*#__PURE__*/React.createElement(SizeContextProvider, {
    size: size
  }, /*#__PURE__*/React.createElement("div", {
    className: cls,
    style: props.style
  }, childrenWithProps)));
};
export default Group;