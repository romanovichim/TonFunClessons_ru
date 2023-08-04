"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _rcMenu = _interopRequireWildcard(require("rc-menu"));
var React = _interopRequireWildcard(require("react"));
var _MentionsContext = _interopRequireDefault(require("./MentionsContext"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/**
 * We only use Menu to display the candidate.
 * The focus is controlled by textarea to make accessibility easy.
 */
function DropdownMenu(props) {
  var _React$useContext = React.useContext(_MentionsContext.default),
    notFoundContent = _React$useContext.notFoundContent,
    activeIndex = _React$useContext.activeIndex,
    setActiveIndex = _React$useContext.setActiveIndex,
    selectOption = _React$useContext.selectOption,
    onFocus = _React$useContext.onFocus,
    onBlur = _React$useContext.onBlur;
  var prefixCls = props.prefixCls,
    options = props.options;
  var activeOption = options[activeIndex] || {};
  return /*#__PURE__*/React.createElement(_rcMenu.default, {
    prefixCls: "".concat(prefixCls, "-menu"),
    activeKey: activeOption.key,
    onSelect: function onSelect(_ref) {
      var key = _ref.key;
      var option = options.find(function (_ref2) {
        var optionKey = _ref2.key;
        return optionKey === key;
      });
      selectOption(option);
    },
    onFocus: onFocus,
    onBlur: onBlur
  }, options.map(function (option, index) {
    var key = option.key,
      disabled = option.disabled,
      className = option.className,
      style = option.style,
      label = option.label;
    return /*#__PURE__*/React.createElement(_rcMenu.MenuItem, {
      key: key,
      disabled: disabled,
      className: className,
      style: style,
      onMouseEnter: function onMouseEnter() {
        setActiveIndex(index);
      }
    }, label);
  }), !options.length && /*#__PURE__*/React.createElement(_rcMenu.MenuItem, {
    disabled: true
  }, notFoundContent));
}
var _default = DropdownMenu;
exports.default = _default;