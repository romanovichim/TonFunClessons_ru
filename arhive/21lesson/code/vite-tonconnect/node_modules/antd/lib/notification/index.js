"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.actWrapper = void 0;
var _render = require("rc-util/lib/React/render");
var React = _interopRequireWildcard(require("react"));
var _configProvider = _interopRequireWildcard(require("../config-provider"));
var _PurePanel = _interopRequireDefault(require("./PurePanel"));
var _useNotification = _interopRequireWildcard(require("./useNotification"));
let notification = null;
let act = callback => callback();
let taskQueue = [];
let defaultGlobalConfig = {};
function getGlobalContext() {
  const {
    prefixCls: globalPrefixCls,
    getContainer: globalGetContainer,
    rtl,
    maxCount,
    top,
    bottom
  } = defaultGlobalConfig;
  const mergedPrefixCls = globalPrefixCls !== null && globalPrefixCls !== void 0 ? globalPrefixCls : (0, _configProvider.globalConfig)().getPrefixCls('notification');
  const mergedContainer = (globalGetContainer === null || globalGetContainer === void 0 ? void 0 : globalGetContainer()) || document.body;
  return {
    prefixCls: mergedPrefixCls,
    container: mergedContainer,
    rtl,
    maxCount,
    top,
    bottom
  };
}
const GlobalHolder = /*#__PURE__*/React.forwardRef((_, ref) => {
  const [prefixCls, setPrefixCls] = React.useState();
  const [container, setContainer] = React.useState();
  const [maxCount, setMaxCount] = React.useState();
  const [rtl, setRTL] = React.useState();
  const [top, setTop] = React.useState();
  const [bottom, setBottom] = React.useState();
  const [api, holder] = (0, _useNotification.useInternalNotification)({
    prefixCls,
    getContainer: () => container,
    maxCount,
    rtl,
    top,
    bottom
  });
  const global = (0, _configProvider.globalConfig)();
  const rootPrefixCls = global.getRootPrefixCls();
  const rootIconPrefixCls = global.getIconPrefixCls();
  const sync = () => {
    const {
      prefixCls: nextGlobalPrefixCls,
      container: nextGlobalContainer,
      maxCount: nextGlobalMaxCount,
      rtl: nextGlobalRTL,
      top: nextTop,
      bottom: nextBottom
    } = getGlobalContext();
    setPrefixCls(nextGlobalPrefixCls);
    setContainer(nextGlobalContainer);
    setMaxCount(nextGlobalMaxCount);
    setRTL(nextGlobalRTL);
    setTop(nextTop);
    setBottom(nextBottom);
  };
  React.useEffect(sync, []);
  React.useImperativeHandle(ref, () => {
    const instance = Object.assign({}, api);
    Object.keys(instance).forEach(method => {
      instance[method] = function () {
        sync();
        return api[method].apply(api, arguments);
      };
    });
    return {
      instance,
      sync
    };
  });
  return /*#__PURE__*/React.createElement(_configProvider.default, {
    prefixCls: rootPrefixCls,
    iconPrefixCls: rootIconPrefixCls
  }, holder);
});
function flushNotice() {
  if (!notification) {
    const holderFragment = document.createDocumentFragment();
    const newNotification = {
      fragment: holderFragment
    };
    notification = newNotification;
    // Delay render to avoid sync issue
    act(() => {
      (0, _render.render)( /*#__PURE__*/React.createElement(GlobalHolder, {
        ref: node => {
          const {
            instance,
            sync
          } = node || {};
          Promise.resolve().then(() => {
            if (!newNotification.instance && instance) {
              newNotification.instance = instance;
              newNotification.sync = sync;
              flushNotice();
            }
          });
        }
      }), holderFragment);
    });
    return;
  }
  // Notification not ready
  if (!notification.instance) {
    return;
  }
  // >>> Execute task
  taskQueue.forEach(task => {
    // eslint-disable-next-line default-case
    switch (task.type) {
      case 'open':
        {
          act(() => {
            notification.instance.open(Object.assign(Object.assign({}, defaultGlobalConfig), task.config));
          });
          break;
        }
      case 'destroy':
        act(() => {
          notification === null || notification === void 0 ? void 0 : notification.instance.destroy(task.key);
        });
        break;
    }
  });
  // Clean up
  taskQueue = [];
}
// ==============================================================================
// ==                                  Export                                  ==
// ==============================================================================
function setNotificationGlobalConfig(config) {
  defaultGlobalConfig = Object.assign(Object.assign({}, defaultGlobalConfig), config);
  // Trigger sync for it
  act(() => {
    var _a;
    (_a = notification === null || notification === void 0 ? void 0 : notification.sync) === null || _a === void 0 ? void 0 : _a.call(notification);
  });
}
function open(config) {
  // Warning if exist theme
  if (process.env.NODE_ENV !== 'production') {
    (0, _configProvider.warnContext)('notification');
  }
  taskQueue.push({
    type: 'open',
    config
  });
  flushNotice();
}
function destroy(key) {
  taskQueue.push({
    type: 'destroy',
    key
  });
  flushNotice();
}
const methods = ['success', 'info', 'warning', 'error'];
const baseStaticMethods = {
  open,
  destroy,
  config: setNotificationGlobalConfig,
  useNotification: _useNotification.default,
  _InternalPanelDoNotUseOrYouWillBeFired: _PurePanel.default
};
const staticMethods = baseStaticMethods;
methods.forEach(type => {
  staticMethods[type] = config => open(Object.assign(Object.assign({}, config), {
    type
  }));
});
// ==============================================================================
// ==                                   Test                                   ==
// ==============================================================================
const noop = () => {};
/** @private Only Work in test env */
// eslint-disable-next-line import/no-mutable-exports
let actWrapper = noop;
exports.actWrapper = actWrapper;
if (process.env.NODE_ENV === 'test') {
  exports.actWrapper = actWrapper = wrapper => {
    act = wrapper;
  };
}
var _default = staticMethods;
exports.default = _default;