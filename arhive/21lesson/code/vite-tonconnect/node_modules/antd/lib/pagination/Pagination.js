"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _DoubleLeftOutlined = _interopRequireDefault(require("@ant-design/icons/DoubleLeftOutlined"));
var _DoubleRightOutlined = _interopRequireDefault(require("@ant-design/icons/DoubleRightOutlined"));
var _LeftOutlined = _interopRequireDefault(require("@ant-design/icons/LeftOutlined"));
var _RightOutlined = _interopRequireDefault(require("@ant-design/icons/RightOutlined"));
var _classnames = _interopRequireDefault(require("classnames"));
var _rcPagination = _interopRequireDefault(require("rc-pagination"));
var _en_US = _interopRequireDefault(require("rc-pagination/lib/locale/en_US"));
var React = _interopRequireWildcard(require("react"));
var _configProvider = require("../config-provider");
var _useBreakpoint = _interopRequireDefault(require("../grid/hooks/useBreakpoint"));
var _useLocale = _interopRequireDefault(require("../locale/useLocale"));
var _Select = require("./Select");
var _style = _interopRequireDefault(require("./style"));
var __rest = void 0 && (void 0).__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
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
  } = (0, _useBreakpoint.default)(responsive);
  const {
    getPrefixCls,
    direction,
    pagination = {}
  } = React.useContext(_configProvider.ConfigContext);
  const prefixCls = getPrefixCls('pagination', customizePrefixCls);
  // Style
  const [wrapSSR, hashId] = (0, _style.default)(prefixCls);
  const mergedShowSizeChanger = showSizeChanger !== null && showSizeChanger !== void 0 ? showSizeChanger : pagination.showSizeChanger;
  const getIconsProps = () => {
    const ellipsis = /*#__PURE__*/React.createElement("span", {
      className: `${prefixCls}-item-ellipsis`
    }, "\u2022\u2022\u2022");
    let prevIcon = /*#__PURE__*/React.createElement("button", {
      className: `${prefixCls}-item-link`,
      type: "button",
      tabIndex: -1
    }, /*#__PURE__*/React.createElement(_LeftOutlined.default, null));
    let nextIcon = /*#__PURE__*/React.createElement("button", {
      className: `${prefixCls}-item-link`,
      type: "button",
      tabIndex: -1
    }, /*#__PURE__*/React.createElement(_RightOutlined.default, null));
    let jumpPrevIcon = /*#__PURE__*/React.createElement("a", {
      className: `${prefixCls}-item-link`
    }, /*#__PURE__*/React.createElement("div", {
      className: `${prefixCls}-item-container`
    }, /*#__PURE__*/React.createElement(_DoubleLeftOutlined.default, {
      className: `${prefixCls}-item-link-icon`
    }), ellipsis));
    let jumpNextIcon = /*#__PURE__*/React.createElement("a", {
      className: `${prefixCls}-item-link`
    }, /*#__PURE__*/React.createElement("div", {
      className: `${prefixCls}-item-container`
    }, /*#__PURE__*/React.createElement(_DoubleRightOutlined.default, {
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
  const [contextLocale] = (0, _useLocale.default)('Pagination', _en_US.default);
  const locale = Object.assign(Object.assign({}, contextLocale), customLocale);
  const isSmall = size === 'small' || !!(xs && !size && responsive);
  const selectPrefixCls = getPrefixCls('select', customizeSelectPrefixCls);
  const extendedClassName = (0, _classnames.default)({
    [`${prefixCls}-mini`]: isSmall,
    [`${prefixCls}-rtl`]: direction === 'rtl'
  }, className, rootClassName, hashId);
  return wrapSSR( /*#__PURE__*/React.createElement(_rcPagination.default, Object.assign({}, getIconsProps(), restProps, {
    prefixCls: prefixCls,
    selectPrefixCls: selectPrefixCls,
    className: extendedClassName,
    selectComponentClass: selectComponentClass || (isSmall ? _Select.MiniSelect : _Select.MiddleSelect),
    locale: locale,
    showSizeChanger: mergedShowSizeChanger
  })));
};
if (process.env.NODE_ENV !== 'production') {
  Pagination.displayName = 'Pagination';
}
var _default = Pagination;
exports.default = _default;