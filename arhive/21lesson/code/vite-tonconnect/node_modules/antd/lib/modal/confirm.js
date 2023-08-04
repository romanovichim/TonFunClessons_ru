"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = confirm;
exports.modalGlobalConfig = modalGlobalConfig;
exports.withConfirm = withConfirm;
exports.withError = withError;
exports.withInfo = withInfo;
exports.withSuccess = withSuccess;
exports.withWarn = withWarn;
var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));
var _render = require("rc-util/lib/React/render");
var React = _interopRequireWildcard(require("react"));
var _configProvider = require("../config-provider");
var _warning = _interopRequireDefault(require("../_util/warning"));
var _ConfirmDialog = _interopRequireDefault(require("./ConfirmDialog"));
var _destroyFns = _interopRequireDefault(require("./destroyFns"));
var _locale = require("./locale");
var __rest = void 0 && (void 0).__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
let defaultRootPrefixCls = '';
function getRootPrefixCls() {
  return defaultRootPrefixCls;
}
function confirm(config) {
  // Warning if exist theme
  if (process.env.NODE_ENV !== 'production') {
    (0, _configProvider.warnContext)('Modal');
  }
  const container = document.createDocumentFragment();
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  let currentConfig = Object.assign(Object.assign({}, config), {
    close,
    open: true
  });
  let timeoutId;
  function destroy() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    const triggerCancel = args.some(param => param && param.triggerCancel);
    if (config.onCancel && triggerCancel) {
      config.onCancel.apply(config, [() => {}].concat((0, _toConsumableArray2.default)(args.slice(1))));
    }
    for (let i = 0; i < _destroyFns.default.length; i++) {
      const fn = _destroyFns.default[i];
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      if (fn === close) {
        _destroyFns.default.splice(i, 1);
        break;
      }
    }
    (0, _render.unmount)(container);
  }
  function render(_a) {
    var {
        okText,
        cancelText,
        prefixCls: customizePrefixCls
      } = _a,
      props = __rest(_a, ["okText", "cancelText", "prefixCls"]);
    clearTimeout(timeoutId);
    /**
     * https://github.com/ant-design/ant-design/issues/23623
     *
     * Sync render blocks React event. Let's make this async.
     */
    timeoutId = setTimeout(() => {
      const runtimeLocale = (0, _locale.getConfirmLocale)();
      const {
        getPrefixCls,
        getIconPrefixCls
      } = (0, _configProvider.globalConfig)();
      // because Modal.config  set rootPrefixCls, which is different from other components
      const rootPrefixCls = getPrefixCls(undefined, getRootPrefixCls());
      const prefixCls = customizePrefixCls || `${rootPrefixCls}-modal`;
      const iconPrefixCls = getIconPrefixCls();
      (0, _render.render)( /*#__PURE__*/React.createElement(_ConfirmDialog.default, Object.assign({}, props, {
        prefixCls: prefixCls,
        rootPrefixCls: rootPrefixCls,
        iconPrefixCls: iconPrefixCls,
        okText: okText,
        locale: runtimeLocale,
        cancelText: cancelText || runtimeLocale.cancelText
      })), container);
    });
  }
  function close() {
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }
    currentConfig = Object.assign(Object.assign({}, currentConfig), {
      open: false,
      afterClose: () => {
        if (typeof config.afterClose === 'function') {
          config.afterClose();
        }
        destroy.apply(this, args);
      }
    });
    // Legacy support
    if (currentConfig.visible) {
      delete currentConfig.visible;
    }
    render(currentConfig);
  }
  function update(configUpdate) {
    if (typeof configUpdate === 'function') {
      currentConfig = configUpdate(currentConfig);
    } else {
      currentConfig = Object.assign(Object.assign({}, currentConfig), configUpdate);
    }
    render(currentConfig);
  }
  render(currentConfig);
  _destroyFns.default.push(close);
  return {
    destroy: close,
    update
  };
}
function withWarn(props) {
  return Object.assign(Object.assign({}, props), {
    type: 'warning'
  });
}
function withInfo(props) {
  return Object.assign(Object.assign({}, props), {
    type: 'info'
  });
}
function withSuccess(props) {
  return Object.assign(Object.assign({}, props), {
    type: 'success'
  });
}
function withError(props) {
  return Object.assign(Object.assign({}, props), {
    type: 'error'
  });
}
function withConfirm(props) {
  return Object.assign(Object.assign({}, props), {
    type: 'confirm'
  });
}
function modalGlobalConfig(_ref) {
  let {
    rootPrefixCls
  } = _ref;
  process.env.NODE_ENV !== "production" ? (0, _warning.default)(false, 'Modal', 'Modal.config is deprecated. Please use ConfigProvider.config instead.') : void 0;
  defaultRootPrefixCls = rootPrefixCls;
}