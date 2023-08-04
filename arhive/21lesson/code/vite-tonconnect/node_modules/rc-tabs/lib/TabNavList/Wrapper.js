"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = TabNavListWrapper;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread2"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var React = _interopRequireWildcard(require("react"));
var _ = _interopRequireDefault(require("."));
var _TabContext = _interopRequireDefault(require("../TabContext"));
var _TabPane = _interopRequireDefault(require("../TabPanelList/TabPane"));
var _excluded = ["renderTabBar"],
  _excluded2 = ["label", "key"];
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
// We have to create a TabNavList components.
function TabNavListWrapper(_ref) {
  var renderTabBar = _ref.renderTabBar,
    restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  var _React$useContext = React.useContext(_TabContext.default),
    tabs = _React$useContext.tabs;
  if (renderTabBar) {
    var tabNavBarProps = (0, _objectSpread2.default)((0, _objectSpread2.default)({}, restProps), {}, {
      // Legacy support. We do not use this actually
      panes: tabs.map(function (_ref2) {
        var label = _ref2.label,
          key = _ref2.key,
          restTabProps = (0, _objectWithoutProperties2.default)(_ref2, _excluded2);
        return /*#__PURE__*/React.createElement(_TabPane.default, (0, _extends2.default)({
          tab: label,
          key: key,
          tabKey: key
        }, restTabProps));
      })
    });
    return renderTabBar(tabNavBarProps, _.default);
  }
  return /*#__PURE__*/React.createElement(_.default, restProps);
}