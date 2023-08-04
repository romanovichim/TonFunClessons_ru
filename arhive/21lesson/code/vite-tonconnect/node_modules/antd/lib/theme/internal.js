"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DesignTokenContext = void 0;
Object.defineProperty(exports, "PresetColors", {
  enumerable: true,
  get: function () {
    return _interface.PresetColors;
  }
});
exports.defaultConfig = void 0;
Object.defineProperty(exports, "genComponentStyleHook", {
  enumerable: true,
  get: function () {
    return _genComponentStyleHook.default;
  }
});
Object.defineProperty(exports, "mergeToken", {
  enumerable: true,
  get: function () {
    return _statistic.merge;
  }
});
Object.defineProperty(exports, "statistic", {
  enumerable: true,
  get: function () {
    return _statistic.statistic;
  }
});
Object.defineProperty(exports, "statisticToken", {
  enumerable: true,
  get: function () {
    return _statistic.default;
  }
});
Object.defineProperty(exports, "useStyleRegister", {
  enumerable: true,
  get: function () {
    return _cssinjs.useStyleRegister;
  }
});
exports.useToken = useToken;
var _cssinjs = require("@ant-design/cssinjs");
var _react = _interopRequireDefault(require("react"));
var _version = _interopRequireDefault(require("../version"));
var _interface = require("./interface");
var _default = _interopRequireDefault(require("./themes/default"));
var _seed = _interopRequireDefault(require("./themes/seed"));
var _alias = _interopRequireDefault(require("./util/alias"));
var _genComponentStyleHook = _interopRequireDefault(require("./util/genComponentStyleHook"));
var _statistic = _interopRequireWildcard(require("./util/statistic"));
const defaultTheme = (0, _cssinjs.createTheme)(_default.default);
// ================================ Context =================================
// To ensure snapshot stable. We disable hashed in test env.
const defaultConfig = {
  token: _seed.default,
  hashed: true
};
exports.defaultConfig = defaultConfig;
const DesignTokenContext = /*#__PURE__*/_react.default.createContext(defaultConfig);
// ================================== Hook ==================================
exports.DesignTokenContext = DesignTokenContext;
function useToken() {
  const {
    token: rootDesignToken,
    hashed,
    theme,
    components
  } = _react.default.useContext(DesignTokenContext);
  const salt = `${_version.default}-${hashed || ''}`;
  const mergedTheme = theme || defaultTheme;
  const [token, hashId] = (0, _cssinjs.useCacheToken)(mergedTheme, [_seed.default, rootDesignToken], {
    salt,
    override: Object.assign({
      override: rootDesignToken
    }, components),
    formatToken: _alias.default
  });
  return [mergedTheme, token, hashed ? hashId : ''];
}