"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof3 = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
exports.warningNullOptions = warningNullOptions;

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _toArray = _interopRequireDefault(require("rc-util/lib/Children/toArray"));

var _warning = _interopRequireWildcard(require("rc-util/lib/warning"));

var React = _interopRequireWildcard(require("react"));

var _BaseSelect = require("../BaseSelect");

var _commonUtil = require("./commonUtil");

var _legacyUtil = require("./legacyUtil");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof3(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function warningProps(props) {
  var mode = props.mode,
      options = props.options,
      children = props.children,
      backfill = props.backfill,
      allowClear = props.allowClear,
      placeholder = props.placeholder,
      getInputElement = props.getInputElement,
      showSearch = props.showSearch,
      onSearch = props.onSearch,
      defaultOpen = props.defaultOpen,
      autoFocus = props.autoFocus,
      labelInValue = props.labelInValue,
      value = props.value,
      inputValue = props.inputValue,
      optionLabelProp = props.optionLabelProp;
  var multiple = (0, _BaseSelect.isMultiple)(mode);
  var mergedShowSearch = showSearch !== undefined ? showSearch : multiple || mode === 'combobox';
  var mergedOptions = options || (0, _legacyUtil.convertChildrenToData)(children); // `tags` should not set option as disabled

  (0, _warning.default)(mode !== 'tags' || mergedOptions.every(function (opt) {
    return !opt.disabled;
  }), 'Please avoid setting option to disabled in tags mode since user can always type text as tag.'); // `combobox` & `tags` should option be `string` type

  if (mode === 'tags' || mode === 'combobox') {
    var hasNumberValue = mergedOptions.some(function (item) {
      if (item.options) {
        return item.options.some(function (opt) {
          return typeof ('value' in opt ? opt.value : opt.key) === 'number';
        });
      }

      return typeof ('value' in item ? item.value : item.key) === 'number';
    });
    (0, _warning.default)(!hasNumberValue, '`value` of Option should not use number type when `mode` is `tags` or `combobox`.');
  } // `combobox` should not use `optionLabelProp`


  (0, _warning.default)(mode !== 'combobox' || !optionLabelProp, '`combobox` mode not support `optionLabelProp`. Please set `value` on Option directly.'); // Only `combobox` support `backfill`

  (0, _warning.default)(mode === 'combobox' || !backfill, '`backfill` only works with `combobox` mode.'); // Only `combobox` support `getInputElement`

  (0, _warning.default)(mode === 'combobox' || !getInputElement, '`getInputElement` only work with `combobox` mode.'); // Customize `getInputElement` should not use `allowClear` & `placeholder`

  (0, _warning.noteOnce)(mode !== 'combobox' || !getInputElement || !allowClear || !placeholder, 'Customize `getInputElement` should customize clear and placeholder logic instead of configuring `allowClear` and `placeholder`.'); // `onSearch` should use in `combobox` or `showSearch`

  if (onSearch && !mergedShowSearch && mode !== 'combobox' && mode !== 'tags') {
    (0, _warning.default)(false, '`onSearch` should work with `showSearch` instead of use alone.');
  }

  (0, _warning.noteOnce)(!defaultOpen || autoFocus, '`defaultOpen` makes Select open without focus which means it will not close by click outside. You can set `autoFocus` if needed.');

  if (value !== undefined && value !== null) {
    var values = (0, _commonUtil.toArray)(value);
    (0, _warning.default)(!labelInValue || values.every(function (val) {
      return (0, _typeof2.default)(val) === 'object' && ('key' in val || 'value' in val);
    }), '`value` should in shape of `{ value: string | number, label?: ReactNode }` when you set `labelInValue` to `true`');
    (0, _warning.default)(!multiple || Array.isArray(value), '`value` should be array when `mode` is `multiple` or `tags`');
  } // Syntactic sugar should use correct children type


  if (children) {
    var invalidateChildType = null;
    (0, _toArray.default)(children).some(function (node) {
      if (! /*#__PURE__*/React.isValidElement(node) || !node.type) {
        return false;
      }

      var _ref = node,
          type = _ref.type;

      if (type.isSelectOption) {
        return false;
      }

      if (type.isSelectOptGroup) {
        var allChildrenValid = (0, _toArray.default)(node.props.children).every(function (subNode) {
          if (! /*#__PURE__*/React.isValidElement(subNode) || !node.type || subNode.type.isSelectOption) {
            return true;
          }

          invalidateChildType = subNode.type;
          return false;
        });

        if (allChildrenValid) {
          return false;
        }

        return true;
      }

      invalidateChildType = type;
      return true;
    });

    if (invalidateChildType) {
      (0, _warning.default)(false, "`children` should be `Select.Option` or `Select.OptGroup` instead of `".concat(invalidateChildType.displayName || invalidateChildType.name || invalidateChildType, "`."));
    }

    (0, _warning.default)(inputValue === undefined, '`inputValue` is deprecated, please use `searchValue` instead.');
  }
} // value in Select option should not be null
// note: OptGroup has options too


function warningNullOptions(options, fieldNames) {
  if (options) {
    var recursiveOptions = function recursiveOptions(optionsList) {
      var inGroup = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      for (var i = 0; i < optionsList.length; i++) {
        var option = optionsList[i];

        if (option[fieldNames === null || fieldNames === void 0 ? void 0 : fieldNames.value] === null) {
          (0, _warning.default)(false, '`value` in Select options should not be `null`.');
          return true;
        }

        if (!inGroup && Array.isArray(option[fieldNames === null || fieldNames === void 0 ? void 0 : fieldNames.options]) && recursiveOptions(option[fieldNames === null || fieldNames === void 0 ? void 0 : fieldNames.options], true)) {
          break;
        }
      }
    };

    recursiveOptions(options);
  }
}

var _default = warningProps;
exports.default = _default;