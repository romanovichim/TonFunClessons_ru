"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
var _createSuper2 = _interopRequireDefault(require("@babel/runtime/helpers/createSuper"));
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread2"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _classnames = _interopRequireDefault(require("classnames"));
var _useMergedState5 = _interopRequireDefault(require("rc-util/lib/hooks/useMergedState"));
var _warning = _interopRequireDefault(require("rc-util/lib/warning"));
var React = _interopRequireWildcard(require("react"));
var _useHoverValue3 = _interopRequireDefault(require("./hooks/useHoverValue"));
var _usePickerInput3 = _interopRequireDefault(require("./hooks/usePickerInput"));
var _usePresets = _interopRequireDefault(require("./hooks/usePresets"));
var _useTextValueMapping3 = _interopRequireDefault(require("./hooks/useTextValueMapping"));
var _useValueTexts3 = _interopRequireDefault(require("./hooks/useValueTexts"));
var _PanelContext = _interopRequireDefault(require("./PanelContext"));
var _PickerPanel = _interopRequireDefault(require("./PickerPanel"));
var _PickerTrigger = _interopRequireDefault(require("./PickerTrigger"));
var _PresetPanel = _interopRequireDefault(require("./PresetPanel"));
var _dateUtil = require("./utils/dateUtil");
var _miscUtil = _interopRequireWildcard(require("./utils/miscUtil"));
var _uiUtil = require("./utils/uiUtil");
var _warnUtil = require("./utils/warnUtil");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/**
 * Removed:
 *  - getCalendarContainer: use `getPopupContainer` instead
 *  - onOk
 *
 * New Feature:
 *  - picker
 *  - allowEmpty
 *  - selectable
 *
 * Tips: Should add faq about `datetime` mode with `defaultValue`
 */

function InnerPicker(props) {
  var _classNames2;
  var _ref = props,
    _ref$prefixCls = _ref.prefixCls,
    prefixCls = _ref$prefixCls === void 0 ? 'rc-picker' : _ref$prefixCls,
    id = _ref.id,
    tabIndex = _ref.tabIndex,
    style = _ref.style,
    className = _ref.className,
    dropdownClassName = _ref.dropdownClassName,
    dropdownAlign = _ref.dropdownAlign,
    popupStyle = _ref.popupStyle,
    transitionName = _ref.transitionName,
    generateConfig = _ref.generateConfig,
    locale = _ref.locale,
    inputReadOnly = _ref.inputReadOnly,
    allowClear = _ref.allowClear,
    autoFocus = _ref.autoFocus,
    showTime = _ref.showTime,
    _ref$picker = _ref.picker,
    picker = _ref$picker === void 0 ? 'date' : _ref$picker,
    format = _ref.format,
    use12Hours = _ref.use12Hours,
    value = _ref.value,
    defaultValue = _ref.defaultValue,
    presets = _ref.presets,
    open = _ref.open,
    defaultOpen = _ref.defaultOpen,
    defaultOpenValue = _ref.defaultOpenValue,
    suffixIcon = _ref.suffixIcon,
    clearIcon = _ref.clearIcon,
    disabled = _ref.disabled,
    disabledDate = _ref.disabledDate,
    placeholder = _ref.placeholder,
    getPopupContainer = _ref.getPopupContainer,
    pickerRef = _ref.pickerRef,
    panelRender = _ref.panelRender,
    onChange = _ref.onChange,
    onOpenChange = _ref.onOpenChange,
    onFocus = _ref.onFocus,
    onBlur = _ref.onBlur,
    onMouseDown = _ref.onMouseDown,
    onMouseUp = _ref.onMouseUp,
    onMouseEnter = _ref.onMouseEnter,
    onMouseLeave = _ref.onMouseLeave,
    onContextMenu = _ref.onContextMenu,
    onClick = _ref.onClick,
    _onKeyDown = _ref.onKeyDown,
    _onSelect = _ref.onSelect,
    direction = _ref.direction,
    _ref$autoComplete = _ref.autoComplete,
    autoComplete = _ref$autoComplete === void 0 ? 'off' : _ref$autoComplete,
    inputRender = _ref.inputRender;
  var inputRef = React.useRef(null);
  var needConfirmButton = picker === 'date' && !!showTime || picker === 'time';
  var presetList = (0, _usePresets.default)(presets);

  // ============================ Warning ============================
  if (process.env.NODE_ENV !== 'production') {
    (0, _warnUtil.legacyPropsWarning)(props);
  }

  // ============================= State =============================
  var formatList = (0, _miscUtil.toArray)((0, _uiUtil.getDefaultFormat)(format, picker, showTime, use12Hours));

  // Panel ref
  var panelDivRef = React.useRef(null);
  var inputDivRef = React.useRef(null);
  var containerRef = React.useRef(null);

  // Real value
  var _useMergedState = (0, _useMergedState5.default)(null, {
      value: value,
      defaultValue: defaultValue
    }),
    _useMergedState2 = (0, _slicedToArray2.default)(_useMergedState, 2),
    mergedValue = _useMergedState2[0],
    setInnerValue = _useMergedState2[1];

  // Selected value
  var _React$useState = React.useState(mergedValue),
    _React$useState2 = (0, _slicedToArray2.default)(_React$useState, 2),
    selectedValue = _React$useState2[0],
    setSelectedValue = _React$useState2[1];

  // Operation ref
  var operationRef = React.useRef(null);

  // Open
  var _useMergedState3 = (0, _useMergedState5.default)(false, {
      value: open,
      defaultValue: defaultOpen,
      postState: function postState(postOpen) {
        return disabled ? false : postOpen;
      },
      onChange: function onChange(newOpen) {
        if (onOpenChange) {
          onOpenChange(newOpen);
        }
        if (!newOpen && operationRef.current && operationRef.current.onClose) {
          operationRef.current.onClose();
        }
      }
    }),
    _useMergedState4 = (0, _slicedToArray2.default)(_useMergedState3, 2),
    mergedOpen = _useMergedState4[0],
    triggerInnerOpen = _useMergedState4[1];

  // ============================= Text ==============================
  var _useValueTexts = (0, _useValueTexts3.default)(selectedValue, {
      formatList: formatList,
      generateConfig: generateConfig,
      locale: locale
    }),
    _useValueTexts2 = (0, _slicedToArray2.default)(_useValueTexts, 2),
    valueTexts = _useValueTexts2[0],
    firstValueText = _useValueTexts2[1];
  var _useTextValueMapping = (0, _useTextValueMapping3.default)({
      valueTexts: valueTexts,
      onTextChange: function onTextChange(newText) {
        var inputDate = (0, _dateUtil.parseValue)(newText, {
          locale: locale,
          formatList: formatList,
          generateConfig: generateConfig
        });
        if (inputDate && (!disabledDate || !disabledDate(inputDate))) {
          setSelectedValue(inputDate);
        }
      }
    }),
    _useTextValueMapping2 = (0, _slicedToArray2.default)(_useTextValueMapping, 3),
    text = _useTextValueMapping2[0],
    triggerTextChange = _useTextValueMapping2[1],
    resetText = _useTextValueMapping2[2];

  // ============================ Trigger ============================
  var triggerChange = function triggerChange(newValue) {
    setSelectedValue(newValue);
    setInnerValue(newValue);
    if (onChange && !(0, _dateUtil.isEqual)(generateConfig, mergedValue, newValue)) {
      onChange(newValue, newValue ? (0, _dateUtil.formatValue)(newValue, {
        generateConfig: generateConfig,
        locale: locale,
        format: formatList[0]
      }) : '');
    }
  };
  var triggerOpen = function triggerOpen(newOpen) {
    if (disabled && newOpen) {
      return;
    }
    triggerInnerOpen(newOpen);
  };
  var forwardKeyDown = function forwardKeyDown(e) {
    if (mergedOpen && operationRef.current && operationRef.current.onKeyDown) {
      // Let popup panel handle keyboard
      return operationRef.current.onKeyDown(e);
    }

    /* istanbul ignore next */
    /* eslint-disable no-lone-blocks */
    {
      (0, _warning.default)(false, 'Picker not correct forward KeyDown operation. Please help to fire issue about this.');
      return false;
    }
  };
  var onInternalClick = function onInternalClick() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    onClick === null || onClick === void 0 ? void 0 : onClick.apply(void 0, args);
    if (inputRef.current) {
      inputRef.current.focus();
      triggerOpen(true);
    }
  };

  // ============================= Input =============================
  var _usePickerInput = (0, _usePickerInput3.default)({
      blurToCancel: needConfirmButton,
      open: mergedOpen,
      value: text,
      triggerOpen: triggerOpen,
      forwardKeyDown: forwardKeyDown,
      isClickOutside: function isClickOutside(target) {
        return !(0, _uiUtil.elementsContains)([panelDivRef.current, inputDivRef.current, containerRef.current], target);
      },
      onSubmit: function onSubmit() {
        if (
        // When user typing disabledDate with keyboard and enter, this value will be empty
        !selectedValue ||
        // Normal disabled check
        disabledDate && disabledDate(selectedValue)) {
          return false;
        }
        triggerChange(selectedValue);
        triggerOpen(false);
        resetText();
        return true;
      },
      onCancel: function onCancel() {
        triggerOpen(false);
        setSelectedValue(mergedValue);
        resetText();
      },
      onKeyDown: function onKeyDown(e, preventDefault) {
        _onKeyDown === null || _onKeyDown === void 0 ? void 0 : _onKeyDown(e, preventDefault);
      },
      onFocus: onFocus,
      onBlur: onBlur
    }),
    _usePickerInput2 = (0, _slicedToArray2.default)(_usePickerInput, 2),
    inputProps = _usePickerInput2[0],
    _usePickerInput2$ = _usePickerInput2[1],
    focused = _usePickerInput2$.focused,
    typing = _usePickerInput2$.typing;

  // ============================= Sync ==============================
  // Close should sync back with text value
  React.useEffect(function () {
    if (!mergedOpen) {
      setSelectedValue(mergedValue);
      if (!valueTexts.length || valueTexts[0] === '') {
        triggerTextChange('');
      } else if (firstValueText !== text) {
        resetText();
      }
    }
  }, [mergedOpen, valueTexts]);

  // Change picker should sync back with text value
  React.useEffect(function () {
    if (!mergedOpen) {
      resetText();
    }
  }, [picker]);

  // Sync innerValue with control mode
  React.useEffect(function () {
    // Sync select value
    setSelectedValue(mergedValue);
  }, [mergedValue]);

  // ============================ Private ============================
  if (pickerRef) {
    pickerRef.current = {
      focus: function focus() {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      },
      blur: function blur() {
        if (inputRef.current) {
          inputRef.current.blur();
        }
      }
    };
  }
  var _useHoverValue = (0, _useHoverValue3.default)(text, {
      formatList: formatList,
      generateConfig: generateConfig,
      locale: locale
    }),
    _useHoverValue2 = (0, _slicedToArray2.default)(_useHoverValue, 3),
    hoverValue = _useHoverValue2[0],
    onEnter = _useHoverValue2[1],
    onLeave = _useHoverValue2[2];

  // ============================= Panel =============================
  var panelProps = (0, _objectSpread2.default)((0, _objectSpread2.default)({}, props), {}, {
    className: undefined,
    style: undefined,
    pickerValue: undefined,
    onPickerValueChange: undefined,
    onChange: null
  });
  var panelNode = /*#__PURE__*/React.createElement("div", {
    className: "".concat(prefixCls, "-panel-layout")
  }, /*#__PURE__*/React.createElement(_PresetPanel.default, {
    prefixCls: prefixCls,
    presets: presetList,
    onClick: function onClick(nextValue) {
      triggerChange(nextValue);
      triggerOpen(false);
    }
  }), /*#__PURE__*/React.createElement(_PickerPanel.default, (0, _extends2.default)({}, panelProps, {
    generateConfig: generateConfig,
    className: (0, _classnames.default)((0, _defineProperty2.default)({}, "".concat(prefixCls, "-panel-focused"), !typing)),
    value: selectedValue,
    locale: locale,
    tabIndex: -1,
    onSelect: function onSelect(date) {
      _onSelect === null || _onSelect === void 0 ? void 0 : _onSelect(date);
      setSelectedValue(date);
    },
    direction: direction,
    onPanelChange: function onPanelChange(viewDate, mode) {
      var onPanelChange = props.onPanelChange;
      onLeave(true);
      onPanelChange === null || onPanelChange === void 0 ? void 0 : onPanelChange(viewDate, mode);
    }
  })));
  if (panelRender) {
    panelNode = panelRender(panelNode);
  }
  var panel = /*#__PURE__*/React.createElement("div", {
    className: "".concat(prefixCls, "-panel-container"),
    ref: panelDivRef,
    onMouseDown: function onMouseDown(e) {
      e.preventDefault();
    }
  }, panelNode);
  var suffixNode;
  if (suffixIcon) {
    suffixNode = /*#__PURE__*/React.createElement("span", {
      className: "".concat(prefixCls, "-suffix")
    }, suffixIcon);
  }
  var clearNode;
  if (allowClear && mergedValue && !disabled) {
    clearNode = /*#__PURE__*/React.createElement("span", {
      onMouseDown: function onMouseDown(e) {
        e.preventDefault();
        e.stopPropagation();
      },
      onMouseUp: function onMouseUp(e) {
        e.preventDefault();
        e.stopPropagation();
        triggerChange(null);
        triggerOpen(false);
      },
      className: "".concat(prefixCls, "-clear"),
      role: "button"
    }, clearIcon || /*#__PURE__*/React.createElement("span", {
      className: "".concat(prefixCls, "-clear-btn")
    }));
  }
  var mergedInputProps = (0, _objectSpread2.default)((0, _objectSpread2.default)((0, _objectSpread2.default)({
    id: id,
    tabIndex: tabIndex,
    disabled: disabled,
    readOnly: inputReadOnly || typeof formatList[0] === 'function' || !typing,
    value: hoverValue || text,
    onChange: function onChange(e) {
      triggerTextChange(e.target.value);
    },
    autoFocus: autoFocus,
    placeholder: placeholder,
    ref: inputRef,
    title: text
  }, inputProps), {}, {
    size: (0, _uiUtil.getInputSize)(picker, formatList[0], generateConfig)
  }, (0, _miscUtil.default)(props)), {}, {
    autoComplete: autoComplete
  });
  var inputNode = inputRender ? inputRender(mergedInputProps) : /*#__PURE__*/React.createElement("input", mergedInputProps);

  // ============================ Warning ============================
  if (process.env.NODE_ENV !== 'production') {
    (0, _warning.default)(!defaultOpenValue, '`defaultOpenValue` may confuse user for the current value status. Please use `defaultValue` instead.');
  }

  // ============================ Return =============================
  var onContextSelect = function onContextSelect(date, type) {
    if (type === 'submit' || type !== 'key' && !needConfirmButton) {
      // triggerChange will also update selected values
      triggerChange(date);
      triggerOpen(false);
    }
  };
  var popupPlacement = direction === 'rtl' ? 'bottomRight' : 'bottomLeft';
  return /*#__PURE__*/React.createElement(_PanelContext.default.Provider, {
    value: {
      operationRef: operationRef,
      hideHeader: picker === 'time',
      onSelect: onContextSelect,
      open: mergedOpen,
      defaultOpenValue: defaultOpenValue,
      onDateMouseEnter: onEnter,
      onDateMouseLeave: onLeave
    }
  }, /*#__PURE__*/React.createElement(_PickerTrigger.default, {
    visible: mergedOpen,
    popupElement: panel,
    popupStyle: popupStyle,
    prefixCls: prefixCls,
    dropdownClassName: dropdownClassName,
    dropdownAlign: dropdownAlign,
    getPopupContainer: getPopupContainer,
    transitionName: transitionName,
    popupPlacement: popupPlacement,
    direction: direction
  }, /*#__PURE__*/React.createElement("div", {
    ref: containerRef,
    className: (0, _classnames.default)(prefixCls, className, (_classNames2 = {}, (0, _defineProperty2.default)(_classNames2, "".concat(prefixCls, "-disabled"), disabled), (0, _defineProperty2.default)(_classNames2, "".concat(prefixCls, "-focused"), focused), (0, _defineProperty2.default)(_classNames2, "".concat(prefixCls, "-rtl"), direction === 'rtl'), _classNames2)),
    style: style,
    onMouseDown: onMouseDown,
    onMouseUp: onMouseUp,
    onMouseEnter: onMouseEnter,
    onMouseLeave: onMouseLeave,
    onContextMenu: onContextMenu,
    onClick: onInternalClick
  }, /*#__PURE__*/React.createElement("div", {
    className: (0, _classnames.default)("".concat(prefixCls, "-input"), (0, _defineProperty2.default)({}, "".concat(prefixCls, "-input-placeholder"), !!hoverValue)),
    ref: inputDivRef
  }, inputNode, suffixNode, clearNode))));
}

// Wrap with class component to enable pass generic with instance method
var Picker = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2.default)(Picker, _React$Component);
  var _super = (0, _createSuper2.default)(Picker);
  function Picker() {
    var _this;
    (0, _classCallCheck2.default)(this, Picker);
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "pickerRef", /*#__PURE__*/React.createRef());
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "focus", function () {
      if (_this.pickerRef.current) {
        _this.pickerRef.current.focus();
      }
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "blur", function () {
      if (_this.pickerRef.current) {
        _this.pickerRef.current.blur();
      }
    });
    return _this;
  }
  (0, _createClass2.default)(Picker, [{
    key: "render",
    value: function render() {
      return /*#__PURE__*/React.createElement(InnerPicker, (0, _extends2.default)({}, this.props, {
        pickerRef: this.pickerRef
      }));
    }
  }]);
  return Picker;
}(React.Component);
var _default = Picker;
exports.default = _default;