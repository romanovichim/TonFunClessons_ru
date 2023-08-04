"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.ANT_MARK = void 0;
var React = _interopRequireWildcard(require("react"));
var _warning = _interopRequireDefault(require("../_util/warning"));
var _locale = require("../modal/locale");
var _context = _interopRequireDefault(require("./context"));
const ANT_MARK = 'internalMark';
exports.ANT_MARK = ANT_MARK;
const LocaleProvider = props => {
  const {
    locale = {},
    children,
    _ANT_MARK__
  } = props;
  if (process.env.NODE_ENV !== 'production') {
    process.env.NODE_ENV !== "production" ? (0, _warning.default)(_ANT_MARK__ === ANT_MARK, 'LocaleProvider', '`LocaleProvider` is deprecated. Please use `locale` with `ConfigProvider` instead: http://u.ant.design/locale') : void 0;
  }
  React.useEffect(() => {
    (0, _locale.changeConfirmLocale)(locale && locale.Modal);
    return () => {
      (0, _locale.changeConfirmLocale)();
    };
  }, [locale]);
  const getMemoizedContextValue = React.useMemo(() => Object.assign(Object.assign({}, locale), {
    exist: true
  }), [locale]);
  return /*#__PURE__*/React.createElement(_context.default.Provider, {
    value: getMemoizedContextValue
  }, children);
};
if (process.env.NODE_ENV !== 'production') {
  LocaleProvider.displayName = 'LocaleProvider';
}
var _default = LocaleProvider;
exports.default = _default;