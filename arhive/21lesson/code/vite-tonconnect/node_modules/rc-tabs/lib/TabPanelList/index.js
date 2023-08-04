"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = TabPanelList;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread2"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var React = _interopRequireWildcard(require("react"));
var _classnames = _interopRequireDefault(require("classnames"));
var _rcMotion = _interopRequireDefault(require("rc-motion"));
var _TabContext = _interopRequireDefault(require("../TabContext"));
var _TabPane = _interopRequireDefault(require("./TabPane"));
var _excluded = ["key", "forceRender", "style", "className"];
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function TabPanelList(_ref) {
  var id = _ref.id,
    activeKey = _ref.activeKey,
    animated = _ref.animated,
    tabPosition = _ref.tabPosition,
    destroyInactiveTabPane = _ref.destroyInactiveTabPane;
  var _React$useContext = React.useContext(_TabContext.default),
    prefixCls = _React$useContext.prefixCls,
    tabs = _React$useContext.tabs;
  var tabPaneAnimated = animated.tabPane;
  var tabPanePrefixCls = "".concat(prefixCls, "-tabpane");
  return /*#__PURE__*/React.createElement("div", {
    className: (0, _classnames.default)("".concat(prefixCls, "-content-holder"))
  }, /*#__PURE__*/React.createElement("div", {
    className: (0, _classnames.default)("".concat(prefixCls, "-content"), "".concat(prefixCls, "-content-").concat(tabPosition), (0, _defineProperty2.default)({}, "".concat(prefixCls, "-content-animated"), tabPaneAnimated))
  }, tabs.map(function (_ref2) {
    var key = _ref2.key,
      forceRender = _ref2.forceRender,
      paneStyle = _ref2.style,
      paneClassName = _ref2.className,
      restTabProps = (0, _objectWithoutProperties2.default)(_ref2, _excluded);
    var active = key === activeKey;
    return /*#__PURE__*/React.createElement(_rcMotion.default, (0, _extends2.default)({
      key: key,
      visible: active,
      forceRender: forceRender,
      removeOnLeave: !!destroyInactiveTabPane,
      leavedClassName: "".concat(tabPanePrefixCls, "-hidden")
    }, animated.tabPaneMotion), function (_ref3, ref) {
      var motionStyle = _ref3.style,
        motionClassName = _ref3.className;
      return /*#__PURE__*/React.createElement(_TabPane.default, (0, _extends2.default)({}, restTabProps, {
        prefixCls: tabPanePrefixCls,
        id: id,
        tabKey: key,
        animated: tabPaneAnimated,
        active: active,
        style: (0, _objectSpread2.default)((0, _objectSpread2.default)({}, paneStyle), motionStyle),
        className: (0, _classnames.default)(paneClassName, motionClassName),
        ref: ref
      }));
    });
  })));
}