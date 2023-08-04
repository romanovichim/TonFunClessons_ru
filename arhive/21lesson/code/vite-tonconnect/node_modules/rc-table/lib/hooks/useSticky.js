"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof3 = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useSticky;
var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));
var React = _interopRequireWildcard(require("react"));
var _canUseDom = _interopRequireDefault(require("rc-util/lib/Dom/canUseDom"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof3(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
// fix ssr render
var defaultContainer = (0, _canUseDom.default)() ? window : null;

/** Sticky header hooks */
function useSticky(sticky, prefixCls) {
  var _ref = (0, _typeof2.default)(sticky) === 'object' ? sticky : {},
    _ref$offsetHeader = _ref.offsetHeader,
    offsetHeader = _ref$offsetHeader === void 0 ? 0 : _ref$offsetHeader,
    _ref$offsetSummary = _ref.offsetSummary,
    offsetSummary = _ref$offsetSummary === void 0 ? 0 : _ref$offsetSummary,
    _ref$offsetScroll = _ref.offsetScroll,
    offsetScroll = _ref$offsetScroll === void 0 ? 0 : _ref$offsetScroll,
    _ref$getContainer = _ref.getContainer,
    getContainer = _ref$getContainer === void 0 ? function () {
      return defaultContainer;
    } : _ref$getContainer;
  var container = getContainer() || defaultContainer;
  return React.useMemo(function () {
    var isSticky = !!sticky;
    return {
      isSticky: isSticky,
      stickyClassName: isSticky ? "".concat(prefixCls, "-sticky-holder") : '',
      offsetHeader: offsetHeader,
      offsetSummary: offsetSummary,
      offsetScroll: offsetScroll,
      container: container
    };
  }, [offsetScroll, offsetHeader, offsetSummary, prefixCls, container]);
}