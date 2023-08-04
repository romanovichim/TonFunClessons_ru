"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));
var _LeftOutlined = _interopRequireDefault(require("@ant-design/icons/LeftOutlined"));
var _LoadingOutlined = _interopRequireDefault(require("@ant-design/icons/LoadingOutlined"));
var _RightOutlined = _interopRequireDefault(require("@ant-design/icons/RightOutlined"));
var _classnames = _interopRequireDefault(require("classnames"));
var _rcCascader = _interopRequireDefault(require("rc-cascader"));
var _omit = _interopRequireDefault(require("rc-util/lib/omit"));
var React = _interopRequireWildcard(require("react"));
var _configProvider = require("../config-provider");
var _defaultRenderEmpty = _interopRequireDefault(require("../config-provider/defaultRenderEmpty"));
var _DisabledContext = _interopRequireDefault(require("../config-provider/DisabledContext"));
var _SizeContext = _interopRequireDefault(require("../config-provider/SizeContext"));
var _Compact = require("../space/Compact");
var _context = require("../form/context");
var _iconUtil = _interopRequireDefault(require("../select/utils/iconUtil"));
var _motion = require("../_util/motion");
var _statusUtils = require("../_util/statusUtils");
var _warning = _interopRequireDefault(require("../_util/warning"));
var _style = _interopRequireDefault(require("../select/style"));
var _useShowArrow = _interopRequireDefault(require("../select/useShowArrow"));
var _PurePanel = _interopRequireDefault(require("../_util/PurePanel"));
var _style2 = _interopRequireDefault(require("./style"));
var __rest = void 0 && (void 0).__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
const {
  SHOW_CHILD,
  SHOW_PARENT
} = _rcCascader.default;
function highlightKeyword(str, lowerKeyword, prefixCls) {
  const cells = str.toLowerCase().split(lowerKeyword).reduce((list, cur, index) => index === 0 ? [cur] : [].concat((0, _toConsumableArray2.default)(list), [lowerKeyword, cur]), []);
  const fillCells = [];
  let start = 0;
  cells.forEach((cell, index) => {
    const end = start + cell.length;
    let originWorld = str.slice(start, end);
    start = end;
    if (index % 2 === 1) {
      originWorld =
      /*#__PURE__*/
      // eslint-disable-next-line react/no-array-index-key
      React.createElement("span", {
        className: `${prefixCls}-menu-item-keyword`,
        key: `separator-${index}`
      }, originWorld);
    }
    fillCells.push(originWorld);
  });
  return fillCells;
}
const defaultSearchRender = (inputValue, path, prefixCls, fieldNames) => {
  const optionList = [];
  // We do lower here to save perf
  const lower = inputValue.toLowerCase();
  path.forEach((node, index) => {
    if (index !== 0) {
      optionList.push(' / ');
    }
    let label = node[fieldNames.label];
    const type = typeof label;
    if (type === 'string' || type === 'number') {
      label = highlightKeyword(String(label), lower, prefixCls);
    }
    optionList.push(label);
  });
  return optionList;
};
const Cascader = /*#__PURE__*/React.forwardRef((props, ref) => {
  const {
      prefixCls: customizePrefixCls,
      size: customizeSize,
      disabled: customDisabled,
      className,
      rootClassName,
      multiple,
      bordered = true,
      transitionName,
      choiceTransitionName = '',
      popupClassName,
      dropdownClassName,
      expandIcon,
      placement,
      showSearch,
      allowClear = true,
      notFoundContent,
      direction,
      getPopupContainer,
      status: customStatus,
      showArrow
    } = props,
    rest = __rest(props, ["prefixCls", "size", "disabled", "className", "rootClassName", "multiple", "bordered", "transitionName", "choiceTransitionName", "popupClassName", "dropdownClassName", "expandIcon", "placement", "showSearch", "allowClear", "notFoundContent", "direction", "getPopupContainer", "status", "showArrow"]);
  const restProps = (0, _omit.default)(rest, ['suffixIcon']);
  const {
    getPopupContainer: getContextPopupContainer,
    getPrefixCls,
    renderEmpty,
    direction: rootDirection
    // virtual,
    // dropdownMatchSelectWidth,
  } = React.useContext(_configProvider.ConfigContext);
  const mergedDirection = direction || rootDirection;
  const isRtl = mergedDirection === 'rtl';
  // =================== Form =====================
  const {
    status: contextStatus,
    hasFeedback,
    isFormItemInput,
    feedbackIcon
  } = React.useContext(_context.FormItemInputContext);
  const mergedStatus = (0, _statusUtils.getMergedStatus)(contextStatus, customStatus);
  // =================== Warning =====================
  if (process.env.NODE_ENV !== 'production') {
    process.env.NODE_ENV !== "production" ? (0, _warning.default)(!dropdownClassName, 'Cascader', '`dropdownClassName` is deprecated. Please use `popupClassName` instead.') : void 0;
  }
  // =================== No Found ====================
  const mergedNotFoundContent = notFoundContent || (renderEmpty === null || renderEmpty === void 0 ? void 0 : renderEmpty('Cascader')) || /*#__PURE__*/React.createElement(_defaultRenderEmpty.default, {
    componentName: "Cascader"
  });
  // ==================== Prefix =====================
  const rootPrefixCls = getPrefixCls();
  const prefixCls = getPrefixCls('select', customizePrefixCls);
  const cascaderPrefixCls = getPrefixCls('cascader', customizePrefixCls);
  const [wrapSelectSSR, hashId] = (0, _style.default)(prefixCls);
  const [wrapCascaderSSR] = (0, _style2.default)(cascaderPrefixCls);
  const {
    compactSize,
    compactItemClassnames
  } = (0, _Compact.useCompactItemContext)(prefixCls, direction);
  // =================== Dropdown ====================
  const mergedDropdownClassName = (0, _classnames.default)(popupClassName || dropdownClassName, `${cascaderPrefixCls}-dropdown`, {
    [`${cascaderPrefixCls}-dropdown-rtl`]: mergedDirection === 'rtl'
  }, rootClassName, hashId);
  // ==================== Search =====================
  const mergedShowSearch = React.useMemo(() => {
    if (!showSearch) {
      return showSearch;
    }
    let searchConfig = {
      render: defaultSearchRender
    };
    if (typeof showSearch === 'object') {
      searchConfig = Object.assign(Object.assign({}, searchConfig), showSearch);
    }
    return searchConfig;
  }, [showSearch]);
  // ===================== Size ======================
  const size = React.useContext(_SizeContext.default);
  const mergedSize = compactSize || customizeSize || size;
  // ===================== Disabled =====================
  const disabled = React.useContext(_DisabledContext.default);
  const mergedDisabled = customDisabled !== null && customDisabled !== void 0 ? customDisabled : disabled;
  // ===================== Icon ======================
  let mergedExpandIcon = expandIcon;
  if (!expandIcon) {
    mergedExpandIcon = isRtl ? /*#__PURE__*/React.createElement(_LeftOutlined.default, null) : /*#__PURE__*/React.createElement(_RightOutlined.default, null);
  }
  const loadingIcon = /*#__PURE__*/React.createElement("span", {
    className: `${prefixCls}-menu-item-loading-icon`
  }, /*#__PURE__*/React.createElement(_LoadingOutlined.default, {
    spin: true
  }));
  // =================== Multiple ====================
  const checkable = React.useMemo(() => multiple ? /*#__PURE__*/React.createElement("span", {
    className: `${cascaderPrefixCls}-checkbox-inner`
  }) : false, [multiple]);
  // ===================== Icons =====================
  const mergedShowArrow = (0, _useShowArrow.default)(showArrow);
  const {
    suffixIcon,
    removeIcon,
    clearIcon
  } = (0, _iconUtil.default)(Object.assign(Object.assign({}, props), {
    hasFeedback,
    feedbackIcon,
    showArrow: mergedShowArrow,
    multiple,
    prefixCls
  }));
  // ===================== Placement =====================
  const getPlacement = () => {
    if (placement !== undefined) {
      return placement;
    }
    return isRtl ? 'bottomRight' : 'bottomLeft';
  };
  // ==================== Render =====================
  const renderNode = /*#__PURE__*/React.createElement(_rcCascader.default, Object.assign({
    prefixCls: prefixCls,
    className: (0, _classnames.default)(!customizePrefixCls && cascaderPrefixCls, {
      [`${prefixCls}-lg`]: mergedSize === 'large',
      [`${prefixCls}-sm`]: mergedSize === 'small',
      [`${prefixCls}-rtl`]: isRtl,
      [`${prefixCls}-borderless`]: !bordered,
      [`${prefixCls}-in-form-item`]: isFormItemInput
    }, (0, _statusUtils.getStatusClassNames)(prefixCls, mergedStatus, hasFeedback), compactItemClassnames, className, rootClassName, hashId),
    disabled: mergedDisabled
  }, restProps, {
    direction: mergedDirection,
    placement: getPlacement(),
    notFoundContent: mergedNotFoundContent,
    allowClear: allowClear,
    showSearch: mergedShowSearch,
    expandIcon: mergedExpandIcon,
    inputIcon: suffixIcon,
    removeIcon: removeIcon,
    clearIcon: clearIcon,
    loadingIcon: loadingIcon,
    checkable: checkable,
    dropdownClassName: mergedDropdownClassName,
    dropdownPrefixCls: customizePrefixCls || cascaderPrefixCls,
    choiceTransitionName: (0, _motion.getTransitionName)(rootPrefixCls, '', choiceTransitionName),
    transitionName: (0, _motion.getTransitionName)(rootPrefixCls, (0, _motion.getTransitionDirection)(placement), transitionName),
    getPopupContainer: getPopupContainer || getContextPopupContainer,
    ref: ref,
    showArrow: hasFeedback || mergedShowArrow
  }));
  return wrapCascaderSSR(wrapSelectSSR(renderNode));
});
if (process.env.NODE_ENV !== 'production') {
  Cascader.displayName = 'Cascader';
}
// We don't care debug panel
/* istanbul ignore next */
const PurePanel = (0, _PurePanel.default)(Cascader);
Cascader.SHOW_PARENT = SHOW_PARENT;
Cascader.SHOW_CHILD = SHOW_CHILD;
Cascader._InternalPanelDoNotUseOrYouWillBeFired = PurePanel;
var _default = Cascader;
exports.default = _default;