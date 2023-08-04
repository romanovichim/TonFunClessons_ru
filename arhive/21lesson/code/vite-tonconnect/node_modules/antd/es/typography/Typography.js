var __rest = this && this.__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
import classNames from 'classnames';
import { composeRef } from "rc-util/es/ref";
import * as React from 'react';
import { ConfigContext } from '../config-provider';
import warning from '../_util/warning';
import useStyle from './style';
const Typography = /*#__PURE__*/React.forwardRef((_a, ref) => {
  var {
      prefixCls: customizePrefixCls,
      component: Component = 'article',
      className,
      rootClassName,
      setContentRef,
      children,
      direction: typographyDirection
    } = _a,
    restProps = __rest(_a, ["prefixCls", "component", "className", "rootClassName", "setContentRef", "children", "direction"]);
  const {
    getPrefixCls,
    direction: contextDirection
  } = React.useContext(ConfigContext);
  const direction = typographyDirection !== null && typographyDirection !== void 0 ? typographyDirection : contextDirection;
  let mergedRef = ref;
  if (setContentRef) {
    process.env.NODE_ENV !== "production" ? warning(false, 'Typography', '`setContentRef` is deprecated. Please use `ref` instead.') : void 0;
    mergedRef = composeRef(ref, setContentRef);
  }
  const prefixCls = getPrefixCls('typography', customizePrefixCls);
  // Style
  const [wrapSSR, hashId] = useStyle(prefixCls);
  const componentClassName = classNames(prefixCls, {
    [`${prefixCls}-rtl`]: direction === 'rtl'
  }, className, rootClassName, hashId);
  return wrapSSR(
  /*#__PURE__*/
  // @ts-expect-error: Expression produces a union type that is too complex to represent.
  React.createElement(Component, Object.assign({
    className: componentClassName,
    ref: mergedRef
  }, restProps), children));
});
if (process.env.NODE_ENV !== 'production') {
  Typography.displayName = 'Typography';
}
// es default export should use const instead of let
export default Typography;