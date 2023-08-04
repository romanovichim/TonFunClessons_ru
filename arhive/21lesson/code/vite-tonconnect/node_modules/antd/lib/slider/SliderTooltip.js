"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _raf = _interopRequireDefault(require("rc-util/lib/raf"));
var _ref = require("rc-util/lib/ref");
var React = _interopRequireWildcard(require("react"));
var _tooltip = _interopRequireDefault(require("../tooltip"));
const SliderTooltip = /*#__PURE__*/React.forwardRef((props, ref) => {
  const {
    open
  } = props;
  const innerRef = (0, React.useRef)(null);
  const rafRef = (0, React.useRef)(null);
  function cancelKeepAlign() {
    _raf.default.cancel(rafRef.current);
    rafRef.current = null;
  }
  function keepAlign() {
    rafRef.current = (0, _raf.default)(() => {
      var _a;
      (_a = innerRef.current) === null || _a === void 0 ? void 0 : _a.forcePopupAlign();
      rafRef.current = null;
    });
  }
  React.useEffect(() => {
    if (open) {
      keepAlign();
    } else {
      cancelKeepAlign();
    }
    return cancelKeepAlign;
  }, [open, props.title]);
  return /*#__PURE__*/React.createElement(_tooltip.default, Object.assign({
    ref: (0, _ref.composeRef)(innerRef, ref)
  }, props));
});
var _default = SliderTooltip;
exports.default = _default;