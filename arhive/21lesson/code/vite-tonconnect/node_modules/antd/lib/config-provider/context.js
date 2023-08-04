"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultIconPrefixCls = exports.ConfigContext = exports.ConfigConsumer = void 0;
var React = _interopRequireWildcard(require("react"));
const defaultIconPrefixCls = 'anticon';
exports.defaultIconPrefixCls = defaultIconPrefixCls;
const defaultGetPrefixCls = (suffixCls, customizePrefixCls) => {
  if (customizePrefixCls) return customizePrefixCls;
  return suffixCls ? `ant-${suffixCls}` : 'ant';
};
// zombieJ: 🚨 Do not pass `defaultRenderEmpty` here since it will cause circular dependency.
const ConfigContext = /*#__PURE__*/React.createContext({
  // We provide a default function for Context without provider
  getPrefixCls: defaultGetPrefixCls,
  iconPrefixCls: defaultIconPrefixCls
});
exports.ConfigContext = ConfigContext;
const {
  Consumer: ConfigConsumer
} = ConfigContext;
exports.ConfigConsumer = ConfigConsumer;