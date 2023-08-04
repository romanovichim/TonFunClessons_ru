var __rest = this && this.__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
import classNames from 'classnames';
import * as React from 'react';
import { ConfigContext } from '../config-provider';
import warning from '../_util/warning';
import useStyle from './style';
const Divider = props => {
  const {
    getPrefixCls,
    direction
  } = React.useContext(ConfigContext);
  const {
      prefixCls: customizePrefixCls,
      type = 'horizontal',
      orientation = 'center',
      orientationMargin,
      className,
      rootClassName,
      children,
      dashed,
      plain
    } = props,
    restProps = __rest(props, ["prefixCls", "type", "orientation", "orientationMargin", "className", "rootClassName", "children", "dashed", "plain"]);
  const prefixCls = getPrefixCls('divider', customizePrefixCls);
  const [wrapSSR, hashId] = useStyle(prefixCls);
  const orientationPrefix = orientation.length > 0 ? `-${orientation}` : orientation;
  const hasChildren = !!children;
  const hasCustomMarginLeft = orientation === 'left' && orientationMargin != null;
  const hasCustomMarginRight = orientation === 'right' && orientationMargin != null;
  const classString = classNames(prefixCls, hashId, `${prefixCls}-${type}`, {
    [`${prefixCls}-with-text`]: hasChildren,
    [`${prefixCls}-with-text${orientationPrefix}`]: hasChildren,
    [`${prefixCls}-dashed`]: !!dashed,
    [`${prefixCls}-plain`]: !!plain,
    [`${prefixCls}-rtl`]: direction === 'rtl',
    [`${prefixCls}-no-default-orientation-margin-left`]: hasCustomMarginLeft,
    [`${prefixCls}-no-default-orientation-margin-right`]: hasCustomMarginRight
  }, className, rootClassName);
  const innerStyle = Object.assign(Object.assign({}, hasCustomMarginLeft && {
    marginLeft: orientationMargin
  }), hasCustomMarginRight && {
    marginRight: orientationMargin
  });
  // Warning children not work in vertical mode
  if (process.env.NODE_ENV !== 'production') {
    process.env.NODE_ENV !== "production" ? warning(!children || type !== 'vertical', 'Divider', '`children` not working in `vertical` mode.') : void 0;
  }
  return wrapSSR( /*#__PURE__*/React.createElement("div", Object.assign({
    className: classString
  }, restProps, {
    role: "separator"
  }), children && type !== 'vertical' && /*#__PURE__*/React.createElement("span", {
    className: `${prefixCls}-inner-text`,
    style: innerStyle
  }, children)));
};
if (process.env.NODE_ENV !== 'production') {
  Divider.displayName = 'Divider';
}
export default Divider;