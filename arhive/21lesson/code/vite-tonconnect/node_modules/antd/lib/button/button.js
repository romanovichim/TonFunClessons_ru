"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.convertLegacyProps = convertLegacyProps;
exports.default = void 0;
var _classnames = _interopRequireDefault(require("classnames"));
var _omit = _interopRequireDefault(require("rc-util/lib/omit"));
var React = _interopRequireWildcard(require("react"));
var _configProvider = require("../config-provider");
var _DisabledContext = _interopRequireDefault(require("../config-provider/DisabledContext"));
var _SizeContext = _interopRequireDefault(require("../config-provider/SizeContext"));
var _Compact = require("../space/Compact");
var _warning = _interopRequireDefault(require("../_util/warning"));
var _wave = _interopRequireDefault(require("../_util/wave"));
var _buttonGroup = _interopRequireWildcard(require("./button-group"));
var _buttonHelpers = require("./buttonHelpers");
var _LoadingIcon = _interopRequireDefault(require("./LoadingIcon"));
var _style = _interopRequireDefault(require("./style"));
var __rest = void 0 && (void 0).__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
/* eslint-disable react/button-has-type */

function convertLegacyProps(type) {
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
  } = React.useContext(_configProvider.ConfigContext);
  const prefixCls = getPrefixCls('btn', customizePrefixCls);
  const [wrapSSR, hashId] = (0, _style.default)(prefixCls);
  const size = React.useContext(_SizeContext.default);
  const disabled = React.useContext(_DisabledContext.default);
  const mergedDisabled = customDisabled !== null && customDisabled !== void 0 ? customDisabled : disabled;
  const groupSize = React.useContext(_buttonGroup.GroupSizeContext);
  const loadingOrDelay = React.useMemo(() => getLoadingConfig(loading), [loading]);
  const [innerLoading, setLoading] = React.useState(loadingOrDelay.loading);
  const [hasTwoCNChar, setHasTwoCNChar] = React.useState(false);
  const buttonRef = ref || /*#__PURE__*/React.createRef();
  const isNeedInserted = () => React.Children.count(children) === 1 && !icon && !(0, _buttonHelpers.isUnBorderedButtonType)(type);
  const fixTwoCNChar = () => {
    // FIXME: for HOC usage like <FormatMessage />
    if (!buttonRef || !buttonRef.current || autoInsertSpaceInButton === false) {
      return;
    }
    const buttonText = buttonRef.current.textContent;
    if (isNeedInserted() && (0, _buttonHelpers.isTwoCNChar)(buttonText)) {
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
  process.env.NODE_ENV !== "production" ? (0, _warning.default)(!(typeof icon === 'string' && icon.length > 2), 'Button', `\`icon\` is using ReactNode instead of string naming in v4. Please check \`${icon}\` at https://ant.design/components/icon`) : void 0;
  process.env.NODE_ENV !== "production" ? (0, _warning.default)(!(ghost && (0, _buttonHelpers.isUnBorderedButtonType)(type)), 'Button', "`link` or `text` button can't be a `ghost` button.") : void 0;
  const autoInsertSpace = autoInsertSpaceInButton !== false;
  const {
    compactSize,
    compactItemClassnames
  } = (0, _Compact.useCompactItemContext)(prefixCls, direction);
  const sizeClassNameMap = {
    large: 'lg',
    small: 'sm',
    middle: undefined
  };
  const sizeFullname = compactSize || groupSize || customizeSize || size;
  const sizeCls = sizeFullname ? sizeClassNameMap[sizeFullname] || '' : '';
  const iconType = innerLoading ? 'loading' : icon;
  const linkButtonRestProps = (0, _omit.default)(rest, ['navigate']);
  const hrefAndDisabled = linkButtonRestProps.href !== undefined && mergedDisabled;
  const classes = (0, _classnames.default)(prefixCls, hashId, {
    [`${prefixCls}-${shape}`]: shape !== 'default' && shape,
    [`${prefixCls}-${type}`]: type,
    [`${prefixCls}-${sizeCls}`]: sizeCls,
    [`${prefixCls}-icon-only`]: !children && children !== 0 && !!iconType,
    [`${prefixCls}-background-ghost`]: ghost && !(0, _buttonHelpers.isUnBorderedButtonType)(type),
    [`${prefixCls}-loading`]: innerLoading,
    [`${prefixCls}-two-chinese-chars`]: hasTwoCNChar && autoInsertSpace && !innerLoading,
    [`${prefixCls}-block`]: block,
    [`${prefixCls}-dangerous`]: !!danger,
    [`${prefixCls}-rtl`]: direction === 'rtl',
    [`${prefixCls}-disabled`]: hrefAndDisabled
  }, compactItemClassnames, className, rootClassName);
  const iconNode = icon && !innerLoading ? icon : /*#__PURE__*/React.createElement(_LoadingIcon.default, {
    existIcon: !!icon,
    prefixCls: prefixCls,
    loading: !!innerLoading
  });
  const kids = children || children === 0 ? (0, _buttonHelpers.spaceChildren)(children, isNeedInserted() && autoInsertSpace) : null;
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
  if (!(0, _buttonHelpers.isUnBorderedButtonType)(type)) {
    buttonNode = /*#__PURE__*/React.createElement(_wave.default, {
      disabled: !!innerLoading
    }, buttonNode);
  }
  return wrapSSR(buttonNode);
};
const Button = /*#__PURE__*/React.forwardRef(InternalButton);
if (process.env.NODE_ENV !== 'production') {
  Button.displayName = 'Button';
}
Button.Group = _buttonGroup.default;
Button.__ANT_BUTTON = true;
var _default = Button;
exports.default = _default;