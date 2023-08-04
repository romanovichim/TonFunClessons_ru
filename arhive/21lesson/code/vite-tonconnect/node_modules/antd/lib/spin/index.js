"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _classnames = _interopRequireDefault(require("classnames"));
var _throttleDebounce = require("throttle-debounce");
var _omit = _interopRequireDefault(require("rc-util/lib/omit"));
var React = _interopRequireWildcard(require("react"));
var _configProvider = require("../config-provider");
var _reactNode = require("../_util/reactNode");
var _index = _interopRequireDefault(require("./style/index"));
var __rest = void 0 && (void 0).__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
const SpinSizes = ['small', 'default', 'large'];
// Render indicator
let defaultIndicator = null;
function renderIndicator(prefixCls, props) {
  const {
    indicator
  } = props;
  const dotClassName = `${prefixCls}-dot`;
  // should not be render default indicator when indicator value is null
  if (indicator === null) {
    return null;
  }
  if ((0, _reactNode.isValidElement)(indicator)) {
    return (0, _reactNode.cloneElement)(indicator, {
      className: (0, _classnames.default)(indicator.props.className, dotClassName)
    });
  }
  if ((0, _reactNode.isValidElement)(defaultIndicator)) {
    return (0, _reactNode.cloneElement)(defaultIndicator, {
      className: (0, _classnames.default)(defaultIndicator.props.className, dotClassName)
    });
  }
  return /*#__PURE__*/React.createElement("span", {
    className: (0, _classnames.default)(dotClassName, `${prefixCls}-dot-spin`)
  }, /*#__PURE__*/React.createElement("i", {
    className: `${prefixCls}-dot-item`
  }), /*#__PURE__*/React.createElement("i", {
    className: `${prefixCls}-dot-item`
  }), /*#__PURE__*/React.createElement("i", {
    className: `${prefixCls}-dot-item`
  }), /*#__PURE__*/React.createElement("i", {
    className: `${prefixCls}-dot-item`
  }));
}
function shouldDelay(spinning, delay) {
  return !!spinning && !!delay && !isNaN(Number(delay));
}
const Spin = props => {
  const {
      spinPrefixCls: prefixCls,
      spinning: customSpinning = true,
      delay = 0,
      className,
      rootClassName,
      size = 'default',
      tip,
      wrapperClassName,
      style,
      children,
      hashId
    } = props,
    restProps = __rest(props, ["spinPrefixCls", "spinning", "delay", "className", "rootClassName", "size", "tip", "wrapperClassName", "style", "children", "hashId"]);
  const [spinning, setSpinning] = React.useState(() => customSpinning && !shouldDelay(customSpinning, delay));
  React.useEffect(() => {
    if (customSpinning) {
      const showSpinning = (0, _throttleDebounce.debounce)(delay, () => {
        setSpinning(true);
      });
      showSpinning();
      return () => {
        var _a;
        (_a = showSpinning === null || showSpinning === void 0 ? void 0 : showSpinning.cancel) === null || _a === void 0 ? void 0 : _a.call(showSpinning);
      };
    }
    setSpinning(false);
  }, [delay, customSpinning]);
  const isNestedPattern = React.useMemo(() => typeof children !== 'undefined', [children]);
  const {
    direction
  } = React.useContext(_configProvider.ConfigContext);
  const spinClassName = (0, _classnames.default)(prefixCls, {
    [`${prefixCls}-sm`]: size === 'small',
    [`${prefixCls}-lg`]: size === 'large',
    [`${prefixCls}-spinning`]: spinning,
    [`${prefixCls}-show-text`]: !!tip,
    [`${prefixCls}-rtl`]: direction === 'rtl'
  }, className, rootClassName, hashId);
  const containerClassName = (0, _classnames.default)(`${prefixCls}-container`, {
    [`${prefixCls}-blur`]: spinning
  });
  // fix https://fb.me/react-unknown-prop
  const divProps = (0, _omit.default)(restProps, ['indicator', 'prefixCls']);
  const spinElement = /*#__PURE__*/React.createElement("div", Object.assign({}, divProps, {
    style: style,
    className: spinClassName,
    "aria-live": "polite",
    "aria-busy": spinning
  }), renderIndicator(prefixCls, props), tip ? /*#__PURE__*/React.createElement("div", {
    className: `${prefixCls}-text`
  }, tip) : null);
  if (isNestedPattern) {
    return /*#__PURE__*/React.createElement("div", Object.assign({}, divProps, {
      className: (0, _classnames.default)(`${prefixCls}-nested-loading`, wrapperClassName, hashId)
    }), spinning && /*#__PURE__*/React.createElement("div", {
      key: "loading"
    }, spinElement), /*#__PURE__*/React.createElement("div", {
      className: containerClassName,
      key: "container"
    }, children));
  }
  return spinElement;
};
const SpinFC = props => {
  const {
    prefixCls: customizePrefixCls
  } = props;
  const {
    getPrefixCls
  } = React.useContext(_configProvider.ConfigContext);
  const spinPrefixCls = getPrefixCls('spin', customizePrefixCls);
  const [wrapSSR, hashId] = (0, _index.default)(spinPrefixCls);
  const spinClassProps = Object.assign(Object.assign({}, props), {
    spinPrefixCls,
    hashId
  });
  return wrapSSR( /*#__PURE__*/React.createElement(Spin, Object.assign({}, spinClassProps)));
};
SpinFC.setDefaultIndicator = indicator => {
  defaultIndicator = indicator;
};
if (process.env.NODE_ENV !== 'production') {
  SpinFC.displayName = 'Spin';
}
var _default = SpinFC;
exports.default = _default;