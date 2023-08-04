"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useTextValueMapping;
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _useLayoutEffect = _interopRequireDefault(require("rc-util/lib/hooks/useLayoutEffect"));
var React = _interopRequireWildcard(require("react"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function useTextValueMapping(_ref) {
  var valueTexts = _ref.valueTexts,
    onTextChange = _ref.onTextChange;
  var _React$useState = React.useState(''),
    _React$useState2 = (0, _slicedToArray2.default)(_React$useState, 2),
    text = _React$useState2[0],
    setInnerText = _React$useState2[1];
  var valueTextsRef = React.useRef([]);
  valueTextsRef.current = valueTexts;
  function triggerTextChange(value) {
    setInnerText(value);
    onTextChange(value);
  }
  function resetText() {
    setInnerText(valueTextsRef.current[0]);
  }
  (0, _useLayoutEffect.default)(function () {
    if (valueTexts.every(function (valText) {
      return valText !== text;
    })) {
      resetText();
    }
  }, [valueTexts.join('||')]);
  return [text, triggerTextChange, resetText];
}