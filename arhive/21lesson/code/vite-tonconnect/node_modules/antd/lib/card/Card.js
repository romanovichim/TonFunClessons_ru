"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _classnames = _interopRequireDefault(require("classnames"));
var _omit = _interopRequireDefault(require("rc-util/lib/omit"));
var React = _interopRequireWildcard(require("react"));
var _configProvider = require("../config-provider");
var _SizeContext = _interopRequireDefault(require("../config-provider/SizeContext"));
var _skeleton = _interopRequireDefault(require("../skeleton"));
var _tabs = _interopRequireDefault(require("../tabs"));
var _Grid = _interopRequireDefault(require("./Grid"));
var _style = _interopRequireDefault(require("./style"));
var __rest = void 0 && (void 0).__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
function getAction(actions) {
  const actionList = actions.map((action, index) =>
  /*#__PURE__*/
  // eslint-disable-next-line react/no-array-index-key
  React.createElement("li", {
    style: {
      width: `${100 / actions.length}%`
    },
    key: `action-${index}`
  }, /*#__PURE__*/React.createElement("span", null, action)));
  return actionList;
}
const Card = /*#__PURE__*/React.forwardRef((props, ref) => {
  const {
    getPrefixCls,
    direction
  } = React.useContext(_configProvider.ConfigContext);
  const size = React.useContext(_SizeContext.default);
  const onTabChange = key => {
    var _a;
    (_a = props.onTabChange) === null || _a === void 0 ? void 0 : _a.call(props, key);
  };
  const isContainGrid = () => {
    let containGrid;
    React.Children.forEach(props.children, element => {
      if (element && element.type && element.type === _Grid.default) {
        containGrid = true;
      }
    });
    return containGrid;
  };
  const {
      prefixCls: customizePrefixCls,
      className,
      rootClassName,
      extra,
      headStyle = {},
      bodyStyle = {},
      title,
      loading,
      bordered = true,
      size: customizeSize,
      type,
      cover,
      actions,
      tabList,
      children,
      activeTabKey,
      defaultActiveTabKey,
      tabBarExtraContent,
      hoverable,
      tabProps = {}
    } = props,
    others = __rest(props, ["prefixCls", "className", "rootClassName", "extra", "headStyle", "bodyStyle", "title", "loading", "bordered", "size", "type", "cover", "actions", "tabList", "children", "activeTabKey", "defaultActiveTabKey", "tabBarExtraContent", "hoverable", "tabProps"]);
  const prefixCls = getPrefixCls('card', customizePrefixCls);
  const [wrapSSR, hashId] = (0, _style.default)(prefixCls);
  const loadingBlock = /*#__PURE__*/React.createElement(_skeleton.default, {
    loading: true,
    active: true,
    paragraph: {
      rows: 4
    },
    title: false
  }, children);
  const hasActiveTabKey = activeTabKey !== undefined;
  const extraProps = Object.assign(Object.assign({}, tabProps), {
    [hasActiveTabKey ? 'activeKey' : 'defaultActiveKey']: hasActiveTabKey ? activeTabKey : defaultActiveTabKey,
    tabBarExtraContent
  });
  let head;
  const tabs = tabList && tabList.length ? /*#__PURE__*/React.createElement(_tabs.default, Object.assign({
    size: "large"
  }, extraProps, {
    className: `${prefixCls}-head-tabs`,
    onChange: onTabChange,
    items: tabList.map(item => {
      var _a;
      return {
        label: item.tab,
        key: item.key,
        disabled: (_a = item.disabled) !== null && _a !== void 0 ? _a : false
      };
    })
  })) : null;
  if (title || extra || tabs) {
    head = /*#__PURE__*/React.createElement("div", {
      className: `${prefixCls}-head`,
      style: headStyle
    }, /*#__PURE__*/React.createElement("div", {
      className: `${prefixCls}-head-wrapper`
    }, title && /*#__PURE__*/React.createElement("div", {
      className: `${prefixCls}-head-title`
    }, title), extra && /*#__PURE__*/React.createElement("div", {
      className: `${prefixCls}-extra`
    }, extra)), tabs);
  }
  const coverDom = cover ? /*#__PURE__*/React.createElement("div", {
    className: `${prefixCls}-cover`
  }, cover) : null;
  const body = /*#__PURE__*/React.createElement("div", {
    className: `${prefixCls}-body`,
    style: bodyStyle
  }, loading ? loadingBlock : children);
  const actionDom = actions && actions.length ? /*#__PURE__*/React.createElement("ul", {
    className: `${prefixCls}-actions`
  }, getAction(actions)) : null;
  const divProps = (0, _omit.default)(others, ['onTabChange']);
  const mergedSize = customizeSize || size;
  const classString = (0, _classnames.default)(prefixCls, {
    [`${prefixCls}-loading`]: loading,
    [`${prefixCls}-bordered`]: bordered,
    [`${prefixCls}-hoverable`]: hoverable,
    [`${prefixCls}-contain-grid`]: isContainGrid(),
    [`${prefixCls}-contain-tabs`]: tabList && tabList.length,
    [`${prefixCls}-${mergedSize}`]: mergedSize,
    [`${prefixCls}-type-${type}`]: !!type,
    [`${prefixCls}-rtl`]: direction === 'rtl'
  }, className, rootClassName, hashId);
  return wrapSSR( /*#__PURE__*/React.createElement("div", Object.assign({
    ref: ref
  }, divProps, {
    className: classString
  }), head, coverDom, body, actionDom));
});
var _default = Card;
exports.default = _default;