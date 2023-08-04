var __rest = this && this.__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
import DownOutlined from "@ant-design/icons/es/icons/DownOutlined";
import UpOutlined from "@ant-design/icons/es/icons/UpOutlined";
import classNames from 'classnames';
import RcInputNumber from 'rc-input-number';
import * as React from 'react';
import ConfigProvider, { ConfigContext } from '../config-provider';
import DisabledContext from '../config-provider/DisabledContext';
import SizeContext from '../config-provider/SizeContext';
import { FormItemInputContext, NoFormStyle } from '../form/context';
import { NoCompactStyle, useCompactItemContext } from '../space/Compact';
import { cloneElement } from '../_util/reactNode';
import { getMergedStatus, getStatusClassNames } from '../_util/statusUtils';
import useStyle from './style';
const InputNumber = /*#__PURE__*/React.forwardRef((props, ref) => {
  const {
    getPrefixCls,
    direction
  } = React.useContext(ConfigContext);
  const size = React.useContext(SizeContext);
  const [focused, setFocus] = React.useState(false);
  const inputRef = React.useRef(null);
  React.useImperativeHandle(ref, () => inputRef.current);
  const {
      className,
      rootClassName,
      size: customizeSize,
      disabled: customDisabled,
      prefixCls: customizePrefixCls,
      addonBefore,
      addonAfter,
      prefix,
      bordered = true,
      readOnly,
      status: customStatus,
      controls
    } = props,
    others = __rest(props, ["className", "rootClassName", "size", "disabled", "prefixCls", "addonBefore", "addonAfter", "prefix", "bordered", "readOnly", "status", "controls"]);
  const prefixCls = getPrefixCls('input-number', customizePrefixCls);
  // Style
  const [wrapSSR, hashId] = useStyle(prefixCls);
  const {
    compactSize,
    compactItemClassnames
  } = useCompactItemContext(prefixCls, direction);
  let upIcon = /*#__PURE__*/React.createElement(UpOutlined, {
    className: `${prefixCls}-handler-up-inner`
  });
  let downIcon = /*#__PURE__*/React.createElement(DownOutlined, {
    className: `${prefixCls}-handler-down-inner`
  });
  const controlsTemp = typeof controls === 'boolean' ? controls : undefined;
  if (typeof controls === 'object') {
    upIcon = typeof controls.upIcon === 'undefined' ? upIcon : /*#__PURE__*/React.createElement("span", {
      className: `${prefixCls}-handler-up-inner`
    }, controls.upIcon);
    downIcon = typeof controls.downIcon === 'undefined' ? downIcon : /*#__PURE__*/React.createElement("span", {
      className: `${prefixCls}-handler-down-inner`
    }, controls.downIcon);
  }
  const {
    hasFeedback,
    status: contextStatus,
    isFormItemInput,
    feedbackIcon
  } = React.useContext(FormItemInputContext);
  const mergedStatus = getMergedStatus(contextStatus, customStatus);
  const mergeSize = compactSize || customizeSize || size;
  const hasPrefix = prefix != null || hasFeedback;
  const hasAddon = !!(addonBefore || addonAfter);
  // ===================== Disabled =====================
  const disabled = React.useContext(DisabledContext);
  const mergedDisabled = customDisabled !== null && customDisabled !== void 0 ? customDisabled : disabled;
  const inputNumberClass = classNames({
    [`${prefixCls}-lg`]: mergeSize === 'large',
    [`${prefixCls}-sm`]: mergeSize === 'small',
    [`${prefixCls}-rtl`]: direction === 'rtl',
    [`${prefixCls}-borderless`]: !bordered,
    [`${prefixCls}-in-form-item`]: isFormItemInput
  }, getStatusClassNames(prefixCls, mergedStatus), compactItemClassnames, hashId, className, !hasPrefix && !hasAddon && rootClassName);
  let element = /*#__PURE__*/React.createElement(RcInputNumber, Object.assign({
    ref: inputRef,
    disabled: mergedDisabled,
    className: inputNumberClass,
    upHandler: upIcon,
    downHandler: downIcon,
    prefixCls: prefixCls,
    readOnly: readOnly,
    controls: controlsTemp
  }, others));
  if (hasPrefix) {
    const affixWrapperCls = classNames(`${prefixCls}-affix-wrapper`, getStatusClassNames(`${prefixCls}-affix-wrapper`, mergedStatus, hasFeedback), {
      [`${prefixCls}-affix-wrapper-focused`]: focused,
      [`${prefixCls}-affix-wrapper-disabled`]: props.disabled,
      [`${prefixCls}-affix-wrapper-sm`]: mergeSize === 'small',
      [`${prefixCls}-affix-wrapper-lg`]: mergeSize === 'large',
      [`${prefixCls}-affix-wrapper-rtl`]: direction === 'rtl',
      [`${prefixCls}-affix-wrapper-readonly`]: readOnly,
      [`${prefixCls}-affix-wrapper-borderless`]: !bordered
    },
    // className will go to addon wrapper
    !hasAddon && className, !hasAddon && rootClassName, hashId);
    element = /*#__PURE__*/React.createElement("div", {
      className: affixWrapperCls,
      style: props.style,
      onMouseUp: () => inputRef.current.focus()
    }, prefix && /*#__PURE__*/React.createElement("span", {
      className: `${prefixCls}-prefix`
    }, prefix), cloneElement(element, {
      style: null,
      value: props.value,
      onFocus: event => {
        var _a;
        setFocus(true);
        (_a = props.onFocus) === null || _a === void 0 ? void 0 : _a.call(props, event);
      },
      onBlur: event => {
        var _a;
        setFocus(false);
        (_a = props.onBlur) === null || _a === void 0 ? void 0 : _a.call(props, event);
      }
    }), hasFeedback && /*#__PURE__*/React.createElement("span", {
      className: `${prefixCls}-suffix`
    }, feedbackIcon));
  }
  if (hasAddon) {
    const wrapperClassName = `${prefixCls}-group`;
    const addonClassName = `${wrapperClassName}-addon`;
    const addonBeforeNode = addonBefore ? /*#__PURE__*/React.createElement("div", {
      className: addonClassName
    }, addonBefore) : null;
    const addonAfterNode = addonAfter ? /*#__PURE__*/React.createElement("div", {
      className: addonClassName
    }, addonAfter) : null;
    const mergedWrapperClassName = classNames(`${prefixCls}-wrapper`, wrapperClassName, hashId, {
      [`${wrapperClassName}-rtl`]: direction === 'rtl'
    });
    const mergedGroupClassName = classNames(`${prefixCls}-group-wrapper`, {
      [`${prefixCls}-group-wrapper-sm`]: mergeSize === 'small',
      [`${prefixCls}-group-wrapper-lg`]: mergeSize === 'large',
      [`${prefixCls}-group-wrapper-rtl`]: direction === 'rtl'
    }, getStatusClassNames(`${prefixCls}-group-wrapper`, mergedStatus, hasFeedback), hashId, className, rootClassName);
    element = /*#__PURE__*/React.createElement("div", {
      className: mergedGroupClassName,
      style: props.style
    }, /*#__PURE__*/React.createElement("div", {
      className: mergedWrapperClassName
    }, addonBeforeNode && /*#__PURE__*/React.createElement(NoCompactStyle, null, /*#__PURE__*/React.createElement(NoFormStyle, {
      status: true,
      override: true
    }, addonBeforeNode)), cloneElement(element, {
      style: null,
      disabled: mergedDisabled
    }), addonAfterNode && /*#__PURE__*/React.createElement(NoCompactStyle, null, /*#__PURE__*/React.createElement(NoFormStyle, {
      status: true,
      override: true
    }, addonAfterNode))));
  }
  return wrapSSR(element);
});
const TypedInputNumber = InputNumber;
const PureInputNumber = props => /*#__PURE__*/React.createElement(ConfigProvider, {
  theme: {
    components: {
      InputNumber: {
        handleVisible: true
      }
    }
  }
}, /*#__PURE__*/React.createElement(InputNumber, Object.assign({}, props)));
if (process.env.NODE_ENV !== 'production') {
  TypedInputNumber.displayName = 'InputNumber';
}
TypedInputNumber._InternalPanelDoNotUseOrYouWillBeFired = PureInputNumber;
export default TypedInputNumber;