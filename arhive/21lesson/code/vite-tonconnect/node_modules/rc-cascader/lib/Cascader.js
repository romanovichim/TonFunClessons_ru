"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var _rcSelect = require("rc-select");
var _useId = _interopRequireDefault(require("rc-select/lib/hooks/useId"));
var _conductUtil = require("rc-tree/lib/utils/conductUtil");
var _useMergedState5 = _interopRequireDefault(require("rc-util/lib/hooks/useMergedState"));
var React = _interopRequireWildcard(require("react"));
var _context = _interopRequireDefault(require("./context"));
var _useDisplayValues = _interopRequireDefault(require("./hooks/useDisplayValues"));
var _useEntities = _interopRequireDefault(require("./hooks/useEntities"));
var _useMissingValues = _interopRequireDefault(require("./hooks/useMissingValues"));
var _useRefFunc = _interopRequireDefault(require("./hooks/useRefFunc"));
var _useSearchConfig3 = _interopRequireDefault(require("./hooks/useSearchConfig"));
var _useSearchOptions = _interopRequireDefault(require("./hooks/useSearchOptions"));
var _OptionList = _interopRequireDefault(require("./OptionList"));
var _commonUtil = require("./utils/commonUtil");
var _treeUtil = require("./utils/treeUtil");
var _warningPropsUtil = _interopRequireWildcard(require("./utils/warningPropsUtil"));
var _excluded = ["id", "prefixCls", "fieldNames", "defaultValue", "value", "changeOnSelect", "onChange", "displayRender", "checkable", "searchValue", "onSearch", "showSearch", "expandTrigger", "options", "dropdownPrefixCls", "loadData", "popupVisible", "open", "popupClassName", "dropdownClassName", "dropdownMenuColumnStyle", "popupPlacement", "placement", "onDropdownVisibleChange", "onPopupVisibleChange", "expandIcon", "loadingIcon", "children", "dropdownMatchSelectWidth", "showCheckedStrategy"];
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function isMultipleValue(value) {
  return Array.isArray(value) && Array.isArray(value[0]);
}
function toRawValues(value) {
  if (!value) {
    return [];
  }
  if (isMultipleValue(value)) {
    return value;
  }
  return (value.length === 0 ? [] : [value]).map(function (val) {
    return Array.isArray(val) ? val : [val];
  });
}
var Cascader = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var id = props.id,
    _props$prefixCls = props.prefixCls,
    prefixCls = _props$prefixCls === void 0 ? 'rc-cascader' : _props$prefixCls,
    fieldNames = props.fieldNames,
    defaultValue = props.defaultValue,
    value = props.value,
    changeOnSelect = props.changeOnSelect,
    onChange = props.onChange,
    displayRender = props.displayRender,
    checkable = props.checkable,
    searchValue = props.searchValue,
    onSearch = props.onSearch,
    showSearch = props.showSearch,
    expandTrigger = props.expandTrigger,
    options = props.options,
    dropdownPrefixCls = props.dropdownPrefixCls,
    loadData = props.loadData,
    popupVisible = props.popupVisible,
    open = props.open,
    popupClassName = props.popupClassName,
    dropdownClassName = props.dropdownClassName,
    dropdownMenuColumnStyle = props.dropdownMenuColumnStyle,
    popupPlacement = props.popupPlacement,
    placement = props.placement,
    onDropdownVisibleChange = props.onDropdownVisibleChange,
    onPopupVisibleChange = props.onPopupVisibleChange,
    _props$expandIcon = props.expandIcon,
    expandIcon = _props$expandIcon === void 0 ? '>' : _props$expandIcon,
    loadingIcon = props.loadingIcon,
    children = props.children,
    _props$dropdownMatchS = props.dropdownMatchSelectWidth,
    dropdownMatchSelectWidth = _props$dropdownMatchS === void 0 ? false : _props$dropdownMatchS,
    _props$showCheckedStr = props.showCheckedStrategy,
    showCheckedStrategy = _props$showCheckedStr === void 0 ? _commonUtil.SHOW_PARENT : _props$showCheckedStr,
    restProps = (0, _objectWithoutProperties2.default)(props, _excluded);
  var mergedId = (0, _useId.default)(id);
  var multiple = !!checkable;

  // =========================== Values ===========================
  var _useMergedState = (0, _useMergedState5.default)(defaultValue, {
      value: value,
      postState: toRawValues
    }),
    _useMergedState2 = (0, _slicedToArray2.default)(_useMergedState, 2),
    rawValues = _useMergedState2[0],
    setRawValues = _useMergedState2[1];

  // ========================= FieldNames =========================
  var mergedFieldNames = React.useMemo(function () {
    return (0, _commonUtil.fillFieldNames)(fieldNames);
  }, /* eslint-disable react-hooks/exhaustive-deps */
  [JSON.stringify(fieldNames)]
  /* eslint-enable react-hooks/exhaustive-deps */);

  // =========================== Option ===========================
  var mergedOptions = React.useMemo(function () {
    return options || [];
  }, [options]);

  // Only used in multiple mode, this fn will not call in single mode
  var getPathKeyEntities = (0, _useEntities.default)(mergedOptions, mergedFieldNames);

  /** Convert path key back to value format */
  var getValueByKeyPath = React.useCallback(function (pathKeys) {
    var keyPathEntities = getPathKeyEntities();
    return pathKeys.map(function (pathKey) {
      var nodes = keyPathEntities[pathKey].nodes;
      return nodes.map(function (node) {
        return node[mergedFieldNames.value];
      });
    });
  }, [getPathKeyEntities, mergedFieldNames]);

  // =========================== Search ===========================
  var _useMergedState3 = (0, _useMergedState5.default)('', {
      value: searchValue,
      postState: function postState(search) {
        return search || '';
      }
    }),
    _useMergedState4 = (0, _slicedToArray2.default)(_useMergedState3, 2),
    mergedSearchValue = _useMergedState4[0],
    setSearchValue = _useMergedState4[1];
  var onInternalSearch = function onInternalSearch(searchText, info) {
    setSearchValue(searchText);
    if (info.source !== 'blur' && onSearch) {
      onSearch(searchText);
    }
  };
  var _useSearchConfig = (0, _useSearchConfig3.default)(showSearch),
    _useSearchConfig2 = (0, _slicedToArray2.default)(_useSearchConfig, 2),
    mergedShowSearch = _useSearchConfig2[0],
    searchConfig = _useSearchConfig2[1];
  var searchOptions = (0, _useSearchOptions.default)(mergedSearchValue, mergedOptions, mergedFieldNames, dropdownPrefixCls || prefixCls, searchConfig, changeOnSelect);

  // =========================== Values ===========================
  var getMissingValues = (0, _useMissingValues.default)(mergedOptions, mergedFieldNames);

  // Fill `rawValues` with checked conduction values
  var _React$useMemo = React.useMemo(function () {
      var _getMissingValues = getMissingValues(rawValues),
        _getMissingValues2 = (0, _slicedToArray2.default)(_getMissingValues, 2),
        existValues = _getMissingValues2[0],
        missingValues = _getMissingValues2[1];
      if (!multiple || !rawValues.length) {
        return [existValues, [], missingValues];
      }
      var keyPathValues = (0, _commonUtil.toPathKeys)(existValues);
      var keyPathEntities = getPathKeyEntities();
      var _conductCheck = (0, _conductUtil.conductCheck)(keyPathValues, true, keyPathEntities),
        checkedKeys = _conductCheck.checkedKeys,
        halfCheckedKeys = _conductCheck.halfCheckedKeys;

      // Convert key back to value cells
      return [getValueByKeyPath(checkedKeys), getValueByKeyPath(halfCheckedKeys), missingValues];
    }, [multiple, rawValues, getPathKeyEntities, getValueByKeyPath, getMissingValues]),
    _React$useMemo2 = (0, _slicedToArray2.default)(_React$useMemo, 3),
    checkedValues = _React$useMemo2[0],
    halfCheckedValues = _React$useMemo2[1],
    missingCheckedValues = _React$useMemo2[2];
  var deDuplicatedValues = React.useMemo(function () {
    var checkedKeys = (0, _commonUtil.toPathKeys)(checkedValues);
    var deduplicateKeys = (0, _treeUtil.formatStrategyValues)(checkedKeys, getPathKeyEntities, showCheckedStrategy);
    return [].concat((0, _toConsumableArray2.default)(missingCheckedValues), (0, _toConsumableArray2.default)(getValueByKeyPath(deduplicateKeys)));
  }, [checkedValues, getPathKeyEntities, getValueByKeyPath, missingCheckedValues, showCheckedStrategy]);
  var displayValues = (0, _useDisplayValues.default)(deDuplicatedValues, mergedOptions, mergedFieldNames, multiple, displayRender);

  // =========================== Change ===========================
  var triggerChange = (0, _useRefFunc.default)(function (nextValues) {
    setRawValues(nextValues);

    // Save perf if no need trigger event
    if (onChange) {
      var nextRawValues = toRawValues(nextValues);
      var valueOptions = nextRawValues.map(function (valueCells) {
        return (0, _treeUtil.toPathOptions)(valueCells, mergedOptions, mergedFieldNames).map(function (valueOpt) {
          return valueOpt.option;
        });
      });
      var triggerValues = multiple ? nextRawValues : nextRawValues[0];
      var triggerOptions = multiple ? valueOptions : valueOptions[0];
      onChange(triggerValues, triggerOptions);
    }
  });

  // =========================== Select ===========================
  var onInternalSelect = (0, _useRefFunc.default)(function (valuePath) {
    setSearchValue('');
    if (!multiple) {
      triggerChange(valuePath);
    } else {
      // Prepare conduct required info
      var pathKey = (0, _commonUtil.toPathKey)(valuePath);
      var checkedPathKeys = (0, _commonUtil.toPathKeys)(checkedValues);
      var halfCheckedPathKeys = (0, _commonUtil.toPathKeys)(halfCheckedValues);
      var existInChecked = checkedPathKeys.includes(pathKey);
      var existInMissing = missingCheckedValues.some(function (valueCells) {
        return (0, _commonUtil.toPathKey)(valueCells) === pathKey;
      });

      // Do update
      var nextCheckedValues = checkedValues;
      var nextMissingValues = missingCheckedValues;
      if (existInMissing && !existInChecked) {
        // Missing value only do filter
        nextMissingValues = missingCheckedValues.filter(function (valueCells) {
          return (0, _commonUtil.toPathKey)(valueCells) !== pathKey;
        });
      } else {
        // Update checked key first
        var nextRawCheckedKeys = existInChecked ? checkedPathKeys.filter(function (key) {
          return key !== pathKey;
        }) : [].concat((0, _toConsumableArray2.default)(checkedPathKeys), [pathKey]);
        var pathKeyEntities = getPathKeyEntities();

        // Conduction by selected or not
        var checkedKeys;
        if (existInChecked) {
          var _conductCheck2 = (0, _conductUtil.conductCheck)(nextRawCheckedKeys, {
            checked: false,
            halfCheckedKeys: halfCheckedPathKeys
          }, pathKeyEntities);
          checkedKeys = _conductCheck2.checkedKeys;
        } else {
          var _conductCheck3 = (0, _conductUtil.conductCheck)(nextRawCheckedKeys, true, pathKeyEntities);
          checkedKeys = _conductCheck3.checkedKeys;
        }

        // Roll up to parent level keys
        var deDuplicatedKeys = (0, _treeUtil.formatStrategyValues)(checkedKeys, getPathKeyEntities, showCheckedStrategy);
        nextCheckedValues = getValueByKeyPath(deDuplicatedKeys);
      }
      triggerChange([].concat((0, _toConsumableArray2.default)(nextMissingValues), (0, _toConsumableArray2.default)(nextCheckedValues)));
    }
  });

  // Display Value change logic
  var onDisplayValuesChange = function onDisplayValuesChange(_, info) {
    if (info.type === 'clear') {
      triggerChange([]);
      return;
    }

    // Cascader do not support `add` type. Only support `remove`
    var _ref = info.values[0],
      valueCells = _ref.valueCells;
    onInternalSelect(valueCells);
  };

  // ============================ Open ============================
  var mergedOpen = open !== undefined ? open : popupVisible;
  var mergedDropdownClassName = dropdownClassName || popupClassName;
  var mergedPlacement = placement || popupPlacement;
  var onInternalDropdownVisibleChange = function onInternalDropdownVisibleChange(nextVisible) {
    onDropdownVisibleChange === null || onDropdownVisibleChange === void 0 ? void 0 : onDropdownVisibleChange(nextVisible);
    onPopupVisibleChange === null || onPopupVisibleChange === void 0 ? void 0 : onPopupVisibleChange(nextVisible);
  };

  // ========================== Warning ===========================
  if (process.env.NODE_ENV !== 'production') {
    (0, _warningPropsUtil.default)(props);
    (0, _warningPropsUtil.warningNullOptions)(mergedOptions, mergedFieldNames);
  }

  // ========================== Context ===========================
  var cascaderContext = React.useMemo(function () {
    return {
      options: mergedOptions,
      fieldNames: mergedFieldNames,
      values: checkedValues,
      halfValues: halfCheckedValues,
      changeOnSelect: changeOnSelect,
      onSelect: onInternalSelect,
      checkable: checkable,
      searchOptions: searchOptions,
      dropdownPrefixCls: dropdownPrefixCls,
      loadData: loadData,
      expandTrigger: expandTrigger,
      expandIcon: expandIcon,
      loadingIcon: loadingIcon,
      dropdownMenuColumnStyle: dropdownMenuColumnStyle
    };
  }, [mergedOptions, mergedFieldNames, checkedValues, halfCheckedValues, changeOnSelect, onInternalSelect, checkable, searchOptions, dropdownPrefixCls, loadData, expandTrigger, expandIcon, loadingIcon, dropdownMenuColumnStyle]);

  // ==============================================================
  // ==                          Render                          ==
  // ==============================================================
  var emptyOptions = !(mergedSearchValue ? searchOptions : mergedOptions).length;
  var dropdownStyle =
  // Search to match width
  mergedSearchValue && searchConfig.matchInputWidth ||
  // Empty keep the width
  emptyOptions ? {} : {
    minWidth: 'auto'
  };
  return /*#__PURE__*/React.createElement(_context.default.Provider, {
    value: cascaderContext
  }, /*#__PURE__*/React.createElement(_rcSelect.BaseSelect, (0, _extends2.default)({}, restProps, {
    // MISC
    ref: ref,
    id: mergedId,
    prefixCls: prefixCls,
    dropdownMatchSelectWidth: dropdownMatchSelectWidth,
    dropdownStyle: dropdownStyle
    // Value
    ,
    displayValues: displayValues,
    onDisplayValuesChange: onDisplayValuesChange,
    mode: multiple ? 'multiple' : undefined
    // Search
    ,
    searchValue: mergedSearchValue,
    onSearch: onInternalSearch,
    showSearch: mergedShowSearch
    // Options
    ,
    OptionList: _OptionList.default,
    emptyOptions: emptyOptions
    // Open
    ,
    open: mergedOpen,
    dropdownClassName: mergedDropdownClassName,
    placement: mergedPlacement,
    onDropdownVisibleChange: onInternalDropdownVisibleChange
    // Children
    ,
    getRawInputElement: function getRawInputElement() {
      return children;
    }
  })));
});
if (process.env.NODE_ENV !== 'production') {
  Cascader.displayName = 'Cascader';
}
Cascader.SHOW_PARENT = _commonUtil.SHOW_PARENT;
Cascader.SHOW_CHILD = _commonUtil.SHOW_CHILD;
var _default = Cascader;
exports.default = _default;