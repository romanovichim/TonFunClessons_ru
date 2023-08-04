"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _classnames = _interopRequireDefault(require("classnames"));
var _toArray = _interopRequireDefault(require("rc-util/lib/Children/toArray"));
var _omit = _interopRequireDefault(require("rc-util/lib/omit"));
var React = _interopRequireWildcard(require("react"));
var _configProvider = require("../config-provider");
var _select = _interopRequireDefault(require("../select"));
var _PurePanel = _interopRequireDefault(require("../_util/PurePanel"));
var _reactNode = require("../_util/reactNode");
var _warning = _interopRequireDefault(require("../_util/warning"));
/**
 * TODO: 4.0
 *
 * - Remove `dataSource`
 * - `size` not work with customizeInput
 * - CustomizeInput not feedback `ENTER` key since accessibility enhancement
 */

const {
  Option
} = _select.default;
function isSelectOptionOrSelectOptGroup(child) {
  return child && child.type && (child.type.isSelectOption || child.type.isSelectOptGroup);
}
const AutoComplete = (props, ref) => {
  const {
    prefixCls: customizePrefixCls,
    className,
    popupClassName,
    dropdownClassName,
    children,
    dataSource
  } = props;
  const childNodes = (0, _toArray.default)(children);
  // ============================= Input =============================
  let customizeInput;
  if (childNodes.length === 1 && (0, _reactNode.isValidElement)(childNodes[0]) && !isSelectOptionOrSelectOptGroup(childNodes[0])) {
    [customizeInput] = childNodes;
  }
  const getInputElement = customizeInput ? () => customizeInput : undefined;
  // ============================ Options ============================
  let optionChildren;
  // [Legacy] convert `children` or `dataSource` into option children
  if (childNodes.length && isSelectOptionOrSelectOptGroup(childNodes[0])) {
    optionChildren = children;
  } else {
    optionChildren = dataSource ? dataSource.map(item => {
      if ((0, _reactNode.isValidElement)(item)) {
        return item;
      }
      switch (typeof item) {
        case 'string':
          return /*#__PURE__*/React.createElement(Option, {
            key: item,
            value: item
          }, item);
        case 'object':
          {
            const {
              value: optionValue
            } = item;
            return /*#__PURE__*/React.createElement(Option, {
              key: optionValue,
              value: optionValue
            }, item.text);
          }
        default:
          process.env.NODE_ENV !== "production" ? (0, _warning.default)(false, 'AutoComplete', '`dataSource` is only supports type `string[] | Object[]`.') : void 0;
          return undefined;
      }
    }) : [];
  }
  if (process.env.NODE_ENV !== 'production') {
    process.env.NODE_ENV !== "production" ? (0, _warning.default)(!('dataSource' in props), 'AutoComplete', '`dataSource` is deprecated, please use `options` instead.') : void 0;
    process.env.NODE_ENV !== "production" ? (0, _warning.default)(!customizeInput || !('size' in props), 'AutoComplete', 'You need to control style self instead of setting `size` when using customize input.') : void 0;
    process.env.NODE_ENV !== "production" ? (0, _warning.default)(!dropdownClassName, 'AutoComplete', '`dropdownClassName` is deprecated, please use `popupClassName` instead.') : void 0;
  }
  const {
    getPrefixCls
  } = React.useContext(_configProvider.ConfigContext);
  const prefixCls = getPrefixCls('select', customizePrefixCls);
  return /*#__PURE__*/React.createElement(_select.default, Object.assign({
    ref: ref,
    showArrow: false
  }, (0, _omit.default)(props, ['dataSource', 'dropdownClassName']), {
    prefixCls: prefixCls,
    popupClassName: popupClassName || dropdownClassName,
    className: (0, _classnames.default)(`${prefixCls}-auto-complete`, className),
    mode: _select.default.SECRET_COMBOBOX_MODE_DO_NOT_USE
  }, {
    // Internal api
    getInputElement
  }), optionChildren);
};
const RefAutoComplete = /*#__PURE__*/React.forwardRef(AutoComplete);
// We don't care debug panel
/* istanbul ignore next */
const PurePanel = (0, _PurePanel.default)(RefAutoComplete);
RefAutoComplete.Option = Option;
RefAutoComplete._InternalPanelDoNotUseOrYouWillBeFired = PurePanel;
if (process.env.NODE_ENV !== 'production') {
  AutoComplete.displayName = 'AutoComplete';
}
var _default = RefAutoComplete;
exports.default = _default;