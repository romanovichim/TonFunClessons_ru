var __rest = this && this.__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
import CalendarOutlined from "@ant-design/icons/es/icons/CalendarOutlined";
import ClockCircleOutlined from "@ant-design/icons/es/icons/ClockCircleOutlined";
import CloseCircleFilled from "@ant-design/icons/es/icons/CloseCircleFilled";
import SwapRightOutlined from "@ant-design/icons/es/icons/SwapRightOutlined";
import classNames from 'classnames';
import { RangePicker as RCRangePicker } from 'rc-picker';
import * as React from 'react';
import { forwardRef, useContext, useImperativeHandle } from 'react';
import { Components, getTimeProps } from '.';
import { ConfigContext } from '../../config-provider';
import DisabledContext from '../../config-provider/DisabledContext';
import SizeContext from '../../config-provider/SizeContext';
import { FormItemInputContext } from '../../form/context';
import useLocale from '../../locale/useLocale';
import { useCompactItemContext } from '../../space/Compact';
import { getMergedStatus, getStatusClassNames } from '../../_util/statusUtils';
import warning from '../../_util/warning';
import enUS from '../locale/en_US';
import { getRangePlaceholder, transPlacement2DropdownAlign } from '../util';
import useStyle from '../style';
export default function generateRangePicker(generateConfig) {
  const RangePicker = /*#__PURE__*/forwardRef((props, ref) => {
    const {
        prefixCls: customizePrefixCls,
        getPopupContainer: customGetPopupContainer,
        className,
        placement,
        size: customizeSize,
        disabled: customDisabled,
        bordered = true,
        placeholder,
        popupClassName,
        dropdownClassName,
        status: customStatus
      } = props,
      restProps = __rest(props, ["prefixCls", "getPopupContainer", "className", "placement", "size", "disabled", "bordered", "placeholder", "popupClassName", "dropdownClassName", "status"]);
    const innerRef = React.useRef(null);
    const {
      getPrefixCls,
      direction,
      getPopupContainer
    } = useContext(ConfigContext);
    const prefixCls = getPrefixCls('picker', customizePrefixCls);
    const {
      compactSize,
      compactItemClassnames
    } = useCompactItemContext(prefixCls, direction);
    const {
      format,
      showTime,
      picker
    } = props;
    const rootPrefixCls = getPrefixCls();
    const [wrapSSR, hashId] = useStyle(prefixCls);
    let additionalOverrideProps = {};
    additionalOverrideProps = Object.assign(Object.assign(Object.assign({}, additionalOverrideProps), showTime ? getTimeProps(Object.assign({
      format,
      picker
    }, showTime)) : {}), picker === 'time' ? getTimeProps(Object.assign(Object.assign({
      format
    }, props), {
      picker
    })) : {});
    // =================== Warning =====================
    if (process.env.NODE_ENV !== 'production') {
      process.env.NODE_ENV !== "production" ? warning(!dropdownClassName, 'DatePicker.RangePicker', '`dropdownClassName` is deprecated. Please use `popupClassName` instead.') : void 0;
    }
    // ===================== Size =====================
    const size = React.useContext(SizeContext);
    const mergedSize = compactSize || customizeSize || size;
    // ===================== Disabled =====================
    const disabled = React.useContext(DisabledContext);
    const mergedDisabled = customDisabled !== null && customDisabled !== void 0 ? customDisabled : disabled;
    // ===================== FormItemInput =====================
    const formItemContext = useContext(FormItemInputContext);
    const {
      hasFeedback,
      status: contextStatus,
      feedbackIcon
    } = formItemContext;
    const suffixNode = /*#__PURE__*/React.createElement(React.Fragment, null, picker === 'time' ? /*#__PURE__*/React.createElement(ClockCircleOutlined, null) : /*#__PURE__*/React.createElement(CalendarOutlined, null), hasFeedback && feedbackIcon);
    useImperativeHandle(ref, () => ({
      focus: () => {
        var _a;
        return (_a = innerRef.current) === null || _a === void 0 ? void 0 : _a.focus();
      },
      blur: () => {
        var _a;
        return (_a = innerRef.current) === null || _a === void 0 ? void 0 : _a.blur();
      }
    }));
    const [contextLocale] = useLocale('Calendar', enUS);
    const locale = Object.assign(Object.assign({}, contextLocale), props.locale);
    return wrapSSR( /*#__PURE__*/React.createElement(RCRangePicker, Object.assign({
      separator: /*#__PURE__*/React.createElement("span", {
        "aria-label": "to",
        className: `${prefixCls}-separator`
      }, /*#__PURE__*/React.createElement(SwapRightOutlined, null)),
      disabled: mergedDisabled,
      ref: innerRef,
      dropdownAlign: transPlacement2DropdownAlign(direction, placement),
      placeholder: getRangePlaceholder(locale, picker, placeholder),
      suffixIcon: suffixNode,
      clearIcon: /*#__PURE__*/React.createElement(CloseCircleFilled, null),
      prevIcon: /*#__PURE__*/React.createElement("span", {
        className: `${prefixCls}-prev-icon`
      }),
      nextIcon: /*#__PURE__*/React.createElement("span", {
        className: `${prefixCls}-next-icon`
      }),
      superPrevIcon: /*#__PURE__*/React.createElement("span", {
        className: `${prefixCls}-super-prev-icon`
      }),
      superNextIcon: /*#__PURE__*/React.createElement("span", {
        className: `${prefixCls}-super-next-icon`
      }),
      allowClear: true,
      transitionName: `${rootPrefixCls}-slide-up`
    }, restProps, additionalOverrideProps, {
      className: classNames({
        [`${prefixCls}-${mergedSize}`]: mergedSize,
        [`${prefixCls}-borderless`]: !bordered
      }, getStatusClassNames(prefixCls, getMergedStatus(contextStatus, customStatus), hasFeedback), hashId, compactItemClassnames, className),
      locale: locale.lang,
      prefixCls: prefixCls,
      getPopupContainer: customGetPopupContainer || getPopupContainer,
      generateConfig: generateConfig,
      components: Components,
      direction: direction,
      dropdownClassName: classNames(hashId, popupClassName || dropdownClassName)
    })));
  });
  return RangePicker;
}