var __rest = this && this.__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
import DoubleLeftOutlined from "@ant-design/icons/es/icons/DoubleLeftOutlined";
import DoubleRightOutlined from "@ant-design/icons/es/icons/DoubleRightOutlined";
import LeftOutlined from "@ant-design/icons/es/icons/LeftOutlined";
import RightOutlined from "@ant-design/icons/es/icons/RightOutlined";
import classNames from 'classnames';
import RcPagination from 'rc-pagination';
import enUS from "rc-pagination/es/locale/en_US";
import * as React from 'react';
import { ConfigContext } from '../config-provider';
import useBreakpoint from '../grid/hooks/useBreakpoint';
import useLocale from '../locale/useLocale';
import { MiddleSelect, MiniSelect } from './Select';
import useStyle from './style';
const Pagination = _a => {
  var {
      prefixCls: customizePrefixCls,
      selectPrefixCls: customizeSelectPrefixCls,
      className,
      rootClassName,
      size,
      locale: customLocale,
      selectComponentClass,
      responsive,
      showSizeChanger
    } = _a,
    restProps = __rest(_a, ["prefixCls", "selectPrefixCls", "className", "rootClassName", "size", "locale", "selectComponentClass", "responsive", "showSizeChanger"]);
  const {
    xs
  } = useBreakpoint(responsive);
  const {
    getPrefixCls,
    direction,
    pagination = {}
  } = React.useContext(ConfigContext);
  const prefixCls = getPrefixCls('pagination', customizePrefixCls);
  // Style
  const [wrapSSR, hashId] = useStyle(prefixCls);
  const mergedShowSizeChanger = showSizeChanger !== null && showSizeChanger !== void 0 ? showSizeChanger : pagination.showSizeChanger;
  const getIconsProps = () => {
    const ellipsis = /*#__PURE__*/React.createElement("span", {
      className: `${prefixCls}-item-ellipsis`
    }, "\u2022\u2022\u2022");
    let prevIcon = /*#__PURE__*/React.createElement("button", {
      className: `${prefixCls}-item-link`,
      type: "button",
      tabIndex: -1
    }, /*#__PURE__*/React.createElement(LeftOutlined, null));
    let nextIcon = /*#__PURE__*/React.createElement("button", {
      className: `${prefixCls}-item-link`,
      type: "button",
      tabIndex: -1
    }, /*#__PURE__*/React.createElement(RightOutlined, null));
    let jumpPrevIcon = /*#__PURE__*/React.createElement("a", {
      className: `${prefixCls}-item-link`
    }, /*#__PURE__*/React.createElement("div", {
      className: `${prefixCls}-item-container`
    }, /*#__PURE__*/React.createElement(DoubleLeftOutlined, {
      className: `${prefixCls}-item-link-icon`
    }), ellipsis));
    let jumpNextIcon = /*#__PURE__*/React.createElement("a", {
      className: `${prefixCls}-item-link`
    }, /*#__PURE__*/React.createElement("div", {
      className: `${prefixCls}-item-container`
    }, /*#__PURE__*/React.createElement(DoubleRightOutlined, {
      className: `${prefixCls}-item-link-icon`
    }), ellipsis));
    // change arrows direction in right-to-left direction
    if (direction === 'rtl') {
      [prevIcon, nextIcon] = [nextIcon, prevIcon];
      [jumpPrevIcon, jumpNextIcon] = [jumpNextIcon, jumpPrevIcon];
    }
    return {
      prevIcon,
      nextIcon,
      jumpPrevIcon,
      jumpNextIcon
    };
  };
  const [contextLocale] = useLocale('Pagination', enUS);
  const locale = Object.assign(Object.assign({}, contextLocale), customLocale);
  const isSmall = size === 'small' || !!(xs && !size && responsive);
  const selectPrefixCls = getPrefixCls('select', customizeSelectPrefixCls);
  const extendedClassName = classNames({
    [`${prefixCls}-mini`]: isSmall,
    [`${prefixCls}-rtl`]: direction === 'rtl'
  }, className, rootClassName, hashId);
  return wrapSSR( /*#__PURE__*/React.createElement(RcPagination, Object.assign({}, getIconsProps(), restProps, {
    prefixCls: prefixCls,
    selectPrefixCls: selectPrefixCls,
    className: extendedClassName,
    selectComponentClass: selectComponentClass || (isSmall ? MiniSelect : MiddleSelect),
    locale: locale,
    showSizeChanger: mergedShowSizeChanger
  })));
};
if (process.env.NODE_ENV !== 'production') {
  Pagination.displayName = 'Pagination';
}
export default Pagination;