"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof3 = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread2"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var React = _interopRequireWildcard(require("react"));
var _classnames = _interopRequireDefault(require("classnames"));
var _isMobile = _interopRequireDefault(require("rc-util/lib/isMobile"));
var _useMergedState5 = _interopRequireDefault(require("rc-util/lib/hooks/useMergedState"));
var _TabPanelList = _interopRequireDefault(require("./TabPanelList"));
var _TabContext = _interopRequireDefault(require("./TabContext"));
var _Wrapper = _interopRequireDefault(require("./TabNavList/Wrapper"));
var _useAnimateConfig = _interopRequireDefault(require("./hooks/useAnimateConfig"));
var _excluded = ["id", "prefixCls", "className", "items", "direction", "activeKey", "defaultActiveKey", "editable", "animated", "tabPosition", "tabBarGutter", "tabBarStyle", "tabBarExtraContent", "locale", "moreIcon", "moreTransitionName", "destroyInactiveTabPane", "renderTabBar", "onChange", "onTabClick", "onTabScroll", "getPopupContainer", "popupClassName"];
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof3(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/**
 * Should added antd:
 * - type
 *
 * Removed:
 * - onNextClick
 * - onPrevClick
 * - keyboard
 */

// Used for accessibility
var uuid = 0;
function Tabs(_ref, ref) {
  var _classNames;
  var id = _ref.id,
    _ref$prefixCls = _ref.prefixCls,
    prefixCls = _ref$prefixCls === void 0 ? 'rc-tabs' : _ref$prefixCls,
    className = _ref.className,
    items = _ref.items,
    direction = _ref.direction,
    activeKey = _ref.activeKey,
    defaultActiveKey = _ref.defaultActiveKey,
    editable = _ref.editable,
    animated = _ref.animated,
    _ref$tabPosition = _ref.tabPosition,
    tabPosition = _ref$tabPosition === void 0 ? 'top' : _ref$tabPosition,
    tabBarGutter = _ref.tabBarGutter,
    tabBarStyle = _ref.tabBarStyle,
    tabBarExtraContent = _ref.tabBarExtraContent,
    locale = _ref.locale,
    moreIcon = _ref.moreIcon,
    moreTransitionName = _ref.moreTransitionName,
    destroyInactiveTabPane = _ref.destroyInactiveTabPane,
    renderTabBar = _ref.renderTabBar,
    onChange = _ref.onChange,
    onTabClick = _ref.onTabClick,
    onTabScroll = _ref.onTabScroll,
    getPopupContainer = _ref.getPopupContainer,
    popupClassName = _ref.popupClassName,
    restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  var tabs = React.useMemo(function () {
    return (items || []).filter(function (item) {
      return item && (0, _typeof2.default)(item) === 'object' && 'key' in item;
    });
  }, [items]);
  var rtl = direction === 'rtl';
  var mergedAnimated = (0, _useAnimateConfig.default)(animated);

  // ======================== Mobile ========================
  var _useState = (0, React.useState)(false),
    _useState2 = (0, _slicedToArray2.default)(_useState, 2),
    mobile = _useState2[0],
    setMobile = _useState2[1];
  (0, React.useEffect)(function () {
    // Only update on the client side
    setMobile((0, _isMobile.default)());
  }, []);

  // ====================== Active Key ======================
  var _useMergedState = (0, _useMergedState5.default)(function () {
      var _tabs$;
      return (_tabs$ = tabs[0]) === null || _tabs$ === void 0 ? void 0 : _tabs$.key;
    }, {
      value: activeKey,
      defaultValue: defaultActiveKey
    }),
    _useMergedState2 = (0, _slicedToArray2.default)(_useMergedState, 2),
    mergedActiveKey = _useMergedState2[0],
    setMergedActiveKey = _useMergedState2[1];
  var _useState3 = (0, React.useState)(function () {
      return tabs.findIndex(function (tab) {
        return tab.key === mergedActiveKey;
      });
    }),
    _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
    activeIndex = _useState4[0],
    setActiveIndex = _useState4[1];

  // Reset active key if not exist anymore
  (0, React.useEffect)(function () {
    var newActiveIndex = tabs.findIndex(function (tab) {
      return tab.key === mergedActiveKey;
    });
    if (newActiveIndex === -1) {
      var _tabs$newActiveIndex;
      newActiveIndex = Math.max(0, Math.min(activeIndex, tabs.length - 1));
      setMergedActiveKey((_tabs$newActiveIndex = tabs[newActiveIndex]) === null || _tabs$newActiveIndex === void 0 ? void 0 : _tabs$newActiveIndex.key);
    }
    setActiveIndex(newActiveIndex);
  }, [tabs.map(function (tab) {
    return tab.key;
  }).join('_'), mergedActiveKey, activeIndex]);

  // ===================== Accessibility ====================
  var _useMergedState3 = (0, _useMergedState5.default)(null, {
      value: id
    }),
    _useMergedState4 = (0, _slicedToArray2.default)(_useMergedState3, 2),
    mergedId = _useMergedState4[0],
    setMergedId = _useMergedState4[1];

  // Async generate id to avoid ssr mapping failed
  (0, React.useEffect)(function () {
    if (!id) {
      setMergedId("rc-tabs-".concat(process.env.NODE_ENV === 'test' ? 'test' : uuid));
      uuid += 1;
    }
  }, []);

  // ======================== Events ========================
  function onInternalTabClick(key, e) {
    onTabClick === null || onTabClick === void 0 ? void 0 : onTabClick(key, e);
    var isActiveChanged = key !== mergedActiveKey;
    setMergedActiveKey(key);
    if (isActiveChanged) {
      onChange === null || onChange === void 0 ? void 0 : onChange(key);
    }
  }

  // ======================== Render ========================
  var sharedProps = {
    id: mergedId,
    activeKey: mergedActiveKey,
    animated: mergedAnimated,
    tabPosition: tabPosition,
    rtl: rtl,
    mobile: mobile
  };
  var tabNavBar;
  var tabNavBarProps = (0, _objectSpread2.default)((0, _objectSpread2.default)({}, sharedProps), {}, {
    editable: editable,
    locale: locale,
    moreIcon: moreIcon,
    moreTransitionName: moreTransitionName,
    tabBarGutter: tabBarGutter,
    onTabClick: onInternalTabClick,
    onTabScroll: onTabScroll,
    extra: tabBarExtraContent,
    style: tabBarStyle,
    panes: null,
    getPopupContainer: getPopupContainer,
    popupClassName: popupClassName
  });
  return /*#__PURE__*/React.createElement(_TabContext.default.Provider, {
    value: {
      tabs: tabs,
      prefixCls: prefixCls
    }
  }, /*#__PURE__*/React.createElement("div", (0, _extends2.default)({
    ref: ref,
    id: id,
    className: (0, _classnames.default)(prefixCls, "".concat(prefixCls, "-").concat(tabPosition), (_classNames = {}, (0, _defineProperty2.default)(_classNames, "".concat(prefixCls, "-mobile"), mobile), (0, _defineProperty2.default)(_classNames, "".concat(prefixCls, "-editable"), editable), (0, _defineProperty2.default)(_classNames, "".concat(prefixCls, "-rtl"), rtl), _classNames), className)
  }, restProps), tabNavBar, /*#__PURE__*/React.createElement(_Wrapper.default, (0, _extends2.default)({}, tabNavBarProps, {
    renderTabBar: renderTabBar
  })), /*#__PURE__*/React.createElement(_TabPanelList.default, (0, _extends2.default)({
    destroyInactiveTabPane: destroyInactiveTabPane
  }, sharedProps, {
    animated: mergedAnimated
  }))));
}
var ForwardTabs = /*#__PURE__*/React.forwardRef(Tabs);
if (process.env.NODE_ENV !== 'production') {
  ForwardTabs.displayName = 'Tabs';
}
var _default = ForwardTabs;
exports.default = _default;