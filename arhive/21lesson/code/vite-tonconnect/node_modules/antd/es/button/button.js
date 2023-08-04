var __rest = this && this.__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
/* eslint-disable react/button-has-type */
import classNames from 'classnames';
import omit from "rc-util/es/omit";
import * as React from 'react';
import { ConfigContext } from '../config-provider';
import DisabledContext from '../config-provider/DisabledContext';
import SizeContext from '../config-provider/SizeContext';
import { useCompactItemContext } from '../space/Compact';
import warning from '../_util/warning';
import Wave from '../_util/wave';
import Group, { GroupSizeContext } from './button-group';
import { isTwoCNChar, isUnBorderedButtonType, spaceChildren } from './buttonHelpers';
import LoadingIcon from './LoadingIcon';
import useStyle from './style';
export function convertLegacyProps(type) {
  if (type === 'danger') {
    return {
      danger: true
    };
  }
  return {
    type
  };
}
function getLoadingConfig(loading) {
  if (typeof loading === 'object' && loading) {
    const delay = loading === null || loading === void 0 ? void 0 : loading.delay;
    const isDelay = !Number.isNaN(delay) && typeof delay === 'number';
    return {
      loading: false,
      delay: isDelay ? delay : 0
    };
  }
  return {
    loading: !!loading,
    delay: 0
  };
}
const InternalButton = (props, ref) => {
  const {
      loading = false,
      prefixCls: customizePrefixCls,
      type = 'default',
      danger,
      shape = 'default',
      size: customizeSize,
      disabled: customDisabled,
      className,
      rootClassName,
      children,
      icon,
      ghost = false,
      block = false,
      // React does not recognize the `htmlType` prop on a DOM element. Here we pick it out of `rest`.
      htmlType = 'button'
    } = props,
    rest = __rest(props, ["loading", "prefixCls", "type", "danger", "shape", "size", "disabled", "className", "rootClassName", "children", "icon", "ghost", "block", "htmlType"]);
  const {
    getPrefixCls,
    autoInsertSpaceInButton,
    direction
  } = React.useContext(ConfigContext);
  const prefixCls = getPrefixCls('btn', customizePrefixCls);
  const [wrapSSR, hashId] = useStyle(prefixCls);
  const size = React.useContext(SizeContext);
  const disabled = React.useContext(DisabledContext);
  const mergedDisabled = customDisabled !== null && customDisabled !== void 0 ? customDisabled : disabled;
  const groupSize = React.useContext(GroupSizeContext);
  const loadingOrDelay = React.useMemo(() => getLoadingConfig(loading), [loading]);
  const [innerLoading, setLoading] = React.useState(loadingOrDelay.loading);
  const [hasTwoCNChar, setHasTwoCNChar] = React.useState(false);
  const buttonRef = ref || /*#__PURE__*/React.createRef();
  const isNeedInserted = () => React.Children.count(children) === 1 && !icon && !isUnBorderedButtonType(type);
  const fixTwoCNChar = () => {
    // FIXME: for HOC usage like <FormatMessage />
    if (!buttonRef || !buttonRef.current || autoInsertSpaceInButton === false) {
      return;
    }
    const buttonText = buttonRef.current.textContent;
    if (isNeedInserted() && isTwoCNChar(buttonText)) {
      if (!hasTwoCNChar) {
        setHasTwoCNChar(true);
      }
    } else if (hasTwoCNChar) {
      setHasTwoCNChar(false);
    }
  };
  React.useEffect(() => {
    let delayTimer = null;
    if (loadingOrDelay.delay > 0) {
      delayTimer = window.setTimeout(() => {
        delayTimer = null;
        setLoading(true);
      }, loadingOrDelay.delay);
    } else {
      setLoading(loadingOrDelay.loading);
    }
    function cleanupTimer() {
      if (delayTimer) {
        window.clearTimeout(delayTimer);
        delayTimer = null;
      }
    }
    return cleanupTimer;
  }, [loadingOrDelay]);
  React.useEffect(fixTwoCNChar, [buttonRef]);
  const handleClick = e => {
    const {
      onClick
    } = props;
    // FIXME: https://github.com/ant-design/ant-design/issues/30207
    if (innerLoading || mergedDisabled) {
      e.preventDefault();
      return;
    }
    onClick === null || onClick === void 0 ? void 0 : onClick(e);
  };
  process.env.NODE_ENV !== "production" ? warning(!(typeof icon === 'string' && icon.length > 2), 'Button', `\`icon\` is using ReactNode instead of string naming in v4. Please check \`${icon}\` at https://ant.design/components/icon`) : void 0;
  process.env.NODE_ENV !== "production" ? warning(!(ghost && isUnBorderedButtonType(type)), 'Button', "`link` or `text` button can't be a `ghost` button.") : void 0;
  const autoInsertSpace = autoInsertSpaceInButton !== false;
  const {
    compactSize,
    compactItemClassnames
  } = useCompactItemContext(prefixCls, direction);
  const sizeClassNameMap = {
    large: 'lg',
    small: 'sm',
    middle: undefined
  };
  const sizeFullname = compactSize || groupSize || customizeSize || size;
  const sizeCls = sizeFullname ? sizeClassNameMap[sizeFullname] || '' : '';
  const iconType = innerLoading ? 'loading' : icon;
  const linkButtonRestProps = omit(rest, ['navigate']);
  const hrefAndDisabled = linkButtonRestProps.href !== undefined && mergedDisabled;
  const classes = classNames(prefixCls, hashId, {
    [`${prefixCls}-${shape}`]: shape !== 'default' && shape,
    [`${prefixCls}-${type}`]: type,
    [`${prefixCls}-${sizeCls}`]: sizeCls,
    [`${prefixCls}-icon-only`]: !children && children !== 0 && !!iconType,
    [`${prefixCls}-background-ghost`]: ghost && !isUnBorderedButtonType(type),
    [`${prefixCls}-loading`]: innerLoading,
    [`${prefixCls}-two-chinese-chars`]: hasTwoCNChar && autoInsertSpace && !innerLoading,
    [`${prefixCls}-block`]: block,
    [`${prefixCls}-dangerous`]: !!danger,
    [`${prefixCls}-rtl`]: direction === 'rtl',
    [`${prefixCls}-disabled`]: hrefAndDisabled
  }, compactItemClassnames, className, rootClassName);
  const iconNode = icon && !innerLoading ? icon : /*#__PURE__*/React.createElement(LoadingIcon, {
    existIcon: !!icon,
    prefixCls: prefixCls,
    loading: !!innerLoading
  });
  const kids = children || children === 0 ? spaceChildren(children, isNeedInserted() && autoInsertSpace) : null;
  if (linkButtonRestProps.href !== undefined) {
    return wrapSSR( /*#__PURE__*/React.createElement("a", Object.assign({}, linkButtonRestProps, {
      className: classes,
      onClick: handleClick,
      ref: buttonRef
    }), iconNode, kids));
  }
  let buttonNode = /*#__PURE__*/React.createElement("button", Object.assign({}, rest, {
    type: htmlType,
    className: classes,
    onClick: handleClick,
    disabled: mergedDisabled,
    ref: buttonRef
  }), iconNode, kids);
  if (!isUnBorderedButtonType(type)) {
    buttonNode = /*#__PURE__*/React.createElement(Wave, {
      disabled: !!innerLoading
    }, buttonNode);
  }
  return wrapSSR(buttonNode);
};
const Button = /*#__PURE__*/React.forwardRef(InternalButton);
if (process.env.NODE_ENV !== 'production') {
  Button.displayName = 'Button';
}
Button.Group = Group;
Button.__ANT_BUTTON = true;
export default Button;