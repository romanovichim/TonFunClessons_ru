"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var React = _interopRequireWildcard(require("react"));
var _useForceUpdate = _interopRequireDefault(require("../_util/hooks/useForceUpdate"));
var _reactNode = require("../_util/reactNode");
var _Statistic = _interopRequireDefault(require("./Statistic"));
var _utils = require("./utils");
const REFRESH_INTERVAL = 1000 / 30;
function getTime(value) {
  return new Date(value).getTime();
}
const Countdown = props => {
  const {
    value,
    format = 'HH:mm:ss',
    onChange,
    onFinish
  } = props;
  const forceUpdate = (0, _useForceUpdate.default)();
  const countdown = React.useRef(null);
  const stopTimer = () => {
    onFinish === null || onFinish === void 0 ? void 0 : onFinish();
    if (countdown.current) {
      clearInterval(countdown.current);
      countdown.current = null;
    }
  };
  const syncTimer = () => {
    const timestamp = getTime(value);
    if (timestamp >= Date.now()) {
      countdown.current = setInterval(() => {
        forceUpdate();
        onChange === null || onChange === void 0 ? void 0 : onChange(timestamp - Date.now());
        if (timestamp < Date.now()) {
          stopTimer();
        }
      }, REFRESH_INTERVAL);
    }
  };
  React.useEffect(() => {
    syncTimer();
    return () => {
      if (countdown.current) {
        clearInterval(countdown.current);
        countdown.current = null;
      }
    };
  }, [value]);
  const formatter = (formatValue, config) => (0, _utils.formatCountdown)(formatValue, Object.assign(Object.assign({}, config), {
    format
  }));
  const valueRender = node => (0, _reactNode.cloneElement)(node, {
    title: undefined
  });
  return /*#__PURE__*/React.createElement(_Statistic.default, Object.assign({}, props, {
    valueRender: valueRender,
    formatter: formatter
  }));
};
var _default = /*#__PURE__*/React.memo(Countdown);
exports.default = _default;