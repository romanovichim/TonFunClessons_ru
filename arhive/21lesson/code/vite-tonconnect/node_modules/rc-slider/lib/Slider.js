"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof3 = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));
var React = _interopRequireWildcard(require("react"));
var _classnames = _interopRequireDefault(require("classnames"));
var _isEqual = _interopRequireDefault(require("rc-util/lib/isEqual"));
var _useMergedState3 = _interopRequireDefault(require("rc-util/lib/hooks/useMergedState"));
var _Handles = _interopRequireDefault(require("./Handles"));
var _useDrag3 = _interopRequireDefault(require("./hooks/useDrag"));
var _context = _interopRequireDefault(require("./context"));
var _Tracks = _interopRequireDefault(require("./Tracks"));
var _Marks = _interopRequireDefault(require("./Marks"));
var _Steps = _interopRequireDefault(require("./Steps"));
var _useOffset3 = _interopRequireDefault(require("./hooks/useOffset"));
var _warning = _interopRequireDefault(require("rc-util/lib/warning"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof3(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var Slider = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var _classNames;
  var _props$prefixCls = props.prefixCls,
    prefixCls = _props$prefixCls === void 0 ? 'rc-slider' : _props$prefixCls,
    className = props.className,
    style = props.style,
    _props$disabled = props.disabled,
    disabled = _props$disabled === void 0 ? false : _props$disabled,
    _props$keyboard = props.keyboard,
    keyboard = _props$keyboard === void 0 ? true : _props$keyboard,
    autoFocus = props.autoFocus,
    onFocus = props.onFocus,
    onBlur = props.onBlur,
    _props$min = props.min,
    min = _props$min === void 0 ? 0 : _props$min,
    _props$max = props.max,
    max = _props$max === void 0 ? 100 : _props$max,
    _props$step = props.step,
    step = _props$step === void 0 ? 1 : _props$step,
    value = props.value,
    defaultValue = props.defaultValue,
    range = props.range,
    count = props.count,
    onChange = props.onChange,
    onBeforeChange = props.onBeforeChange,
    onAfterChange = props.onAfterChange,
    _props$allowCross = props.allowCross,
    allowCross = _props$allowCross === void 0 ? true : _props$allowCross,
    _props$pushable = props.pushable,
    pushable = _props$pushable === void 0 ? false : _props$pushable,
    draggableTrack = props.draggableTrack,
    reverse = props.reverse,
    vertical = props.vertical,
    _props$included = props.included,
    included = _props$included === void 0 ? true : _props$included,
    startPoint = props.startPoint,
    trackStyle = props.trackStyle,
    handleStyle = props.handleStyle,
    railStyle = props.railStyle,
    dotStyle = props.dotStyle,
    activeDotStyle = props.activeDotStyle,
    marks = props.marks,
    dots = props.dots,
    handleRender = props.handleRender,
    _props$tabIndex = props.tabIndex,
    tabIndex = _props$tabIndex === void 0 ? 0 : _props$tabIndex,
    ariaLabelForHandle = props.ariaLabelForHandle,
    ariaLabelledByForHandle = props.ariaLabelledByForHandle,
    ariaValueTextFormatterForHandle = props.ariaValueTextFormatterForHandle;
  var handlesRef = React.useRef();
  var containerRef = React.useRef();
  var direction = React.useMemo(function () {
    if (vertical) {
      return reverse ? 'ttb' : 'btt';
    }
    return reverse ? 'rtl' : 'ltr';
  }, [reverse, vertical]);
  // ============================ Range =============================
  var mergedMin = React.useMemo(function () {
    return isFinite(min) ? min : 0;
  }, [min]);
  var mergedMax = React.useMemo(function () {
    return isFinite(max) ? max : 100;
  }, [max]);
  // ============================= Step =============================
  var mergedStep = React.useMemo(function () {
    return step !== null && step <= 0 ? 1 : step;
  }, [step]);
  // ============================= Push =============================
  var mergedPush = React.useMemo(function () {
    if (pushable === true) {
      return mergedStep;
    }
    return pushable >= 0 ? pushable : false;
  }, [pushable, mergedStep]);
  // ============================ Marks =============================
  var markList = React.useMemo(function () {
    var keys = Object.keys(marks || {});
    return keys.map(function (key) {
      var mark = marks[key];
      var markObj = {
        value: Number(key)
      };
      if (mark && (0, _typeof2.default)(mark) === 'object' && ! /*#__PURE__*/React.isValidElement(mark) && ('label' in mark || 'style' in mark)) {
        markObj.style = mark.style;
        markObj.label = mark.label;
      } else {
        markObj.label = mark;
      }
      return markObj;
    }).filter(function (_ref) {
      var label = _ref.label;
      return label || typeof label === 'number';
    }).sort(function (a, b) {
      return a.value - b.value;
    });
  }, [marks]);
  // ============================ Format ============================
  var _useOffset = (0, _useOffset3.default)(mergedMin, mergedMax, mergedStep, markList, allowCross, mergedPush),
    _useOffset2 = (0, _slicedToArray2.default)(_useOffset, 2),
    formatValue = _useOffset2[0],
    offsetValues = _useOffset2[1];
  // ============================ Values ============================
  var _useMergedState = (0, _useMergedState3.default)(defaultValue, {
      value: value
    }),
    _useMergedState2 = (0, _slicedToArray2.default)(_useMergedState, 2),
    mergedValue = _useMergedState2[0],
    setValue = _useMergedState2[1];
  var rawValues = React.useMemo(function () {
    var valueList = mergedValue === null || mergedValue === undefined ? [] : Array.isArray(mergedValue) ? mergedValue : [mergedValue];
    var _valueList = (0, _slicedToArray2.default)(valueList, 1),
      _valueList$ = _valueList[0],
      val0 = _valueList$ === void 0 ? mergedMin : _valueList$;
    var returnValues = mergedValue === null ? [] : [val0];
    // Format as range
    if (range) {
      returnValues = (0, _toConsumableArray2.default)(valueList);
      // When count provided or value is `undefined`, we fill values
      if (count || mergedValue === undefined) {
        var pointCount = count >= 0 ? count + 1 : 2;
        returnValues = returnValues.slice(0, pointCount);
        // Fill with count
        while (returnValues.length < pointCount) {
          var _returnValues;
          returnValues.push((_returnValues = returnValues[returnValues.length - 1]) !== null && _returnValues !== void 0 ? _returnValues : mergedMin);
        }
      }
      returnValues.sort(function (a, b) {
        return a - b;
      });
    }
    // Align in range
    returnValues.forEach(function (val, index) {
      returnValues[index] = formatValue(val);
    });
    return returnValues;
  }, [mergedValue, range, mergedMin, count, formatValue]);
  // =========================== onChange ===========================
  var rawValuesRef = React.useRef(rawValues);
  rawValuesRef.current = rawValues;
  var getTriggerValue = function getTriggerValue(triggerValues) {
    return range ? triggerValues : triggerValues[0];
  };
  var triggerChange = function triggerChange(nextValues) {
    // Order first
    var cloneNextValues = (0, _toConsumableArray2.default)(nextValues).sort(function (a, b) {
      return a - b;
    });
    // Trigger event if needed
    if (onChange && !(0, _isEqual.default)(cloneNextValues, rawValuesRef.current, true)) {
      onChange(getTriggerValue(cloneNextValues));
    }
    // We set this later since it will re-render component immediately
    setValue(cloneNextValues);
  };
  var changeToCloseValue = function changeToCloseValue(newValue) {
    if (!disabled) {
      var valueIndex = 0;
      var valueDist = mergedMax - mergedMin;
      rawValues.forEach(function (val, index) {
        var dist = Math.abs(newValue - val);
        if (dist <= valueDist) {
          valueDist = dist;
          valueIndex = index;
        }
      });
      // Create new values
      var cloneNextValues = (0, _toConsumableArray2.default)(rawValues);
      cloneNextValues[valueIndex] = newValue;
      // Fill value to match default 2
      if (range && !rawValues.length && count === undefined) {
        cloneNextValues.push(newValue);
      }
      onBeforeChange === null || onBeforeChange === void 0 ? void 0 : onBeforeChange(getTriggerValue(cloneNextValues));
      triggerChange(cloneNextValues);
      onAfterChange === null || onAfterChange === void 0 ? void 0 : onAfterChange(getTriggerValue(cloneNextValues));
    }
  };
  // ============================ Click =============================
  var onSliderMouseDown = function onSliderMouseDown(e) {
    e.preventDefault();
    var _containerRef$current = containerRef.current.getBoundingClientRect(),
      width = _containerRef$current.width,
      height = _containerRef$current.height,
      left = _containerRef$current.left,
      top = _containerRef$current.top,
      bottom = _containerRef$current.bottom,
      right = _containerRef$current.right;
    var clientX = e.clientX,
      clientY = e.clientY;
    var percent;
    switch (direction) {
      case 'btt':
        percent = (bottom - clientY) / height;
        break;
      case 'ttb':
        percent = (clientY - top) / height;
        break;
      case 'rtl':
        percent = (right - clientX) / width;
        break;
      default:
        percent = (clientX - left) / width;
    }
    var nextValue = mergedMin + percent * (mergedMax - mergedMin);
    changeToCloseValue(formatValue(nextValue));
  };
  // =========================== Keyboard ===========================
  var _React$useState = React.useState(null),
    _React$useState2 = (0, _slicedToArray2.default)(_React$useState, 2),
    keyboardValue = _React$useState2[0],
    setKeyboardValue = _React$useState2[1];
  var onHandleOffsetChange = function onHandleOffsetChange(offset, valueIndex) {
    if (!disabled) {
      var next = offsetValues(rawValues, offset, valueIndex);
      onBeforeChange === null || onBeforeChange === void 0 ? void 0 : onBeforeChange(getTriggerValue(rawValues));
      triggerChange(next.values);
      onAfterChange === null || onAfterChange === void 0 ? void 0 : onAfterChange(getTriggerValue(next.values));
      setKeyboardValue(next.value);
    }
  };
  React.useEffect(function () {
    if (keyboardValue !== null) {
      var valueIndex = rawValues.indexOf(keyboardValue);
      if (valueIndex >= 0) {
        handlesRef.current.focus(valueIndex);
      }
    }
    setKeyboardValue(null);
  }, [keyboardValue]);
  // ============================= Drag =============================
  var mergedDraggableTrack = React.useMemo(function () {
    if (draggableTrack && mergedStep === null) {
      if (process.env.NODE_ENV !== 'production') {
        (0, _warning.default)(false, '`draggableTrack` is not supported when `step` is `null`.');
      }
      return false;
    }
    return draggableTrack;
  }, [draggableTrack, mergedStep]);
  var finishChange = function finishChange() {
    onAfterChange === null || onAfterChange === void 0 ? void 0 : onAfterChange(getTriggerValue(rawValuesRef.current));
  };
  var _useDrag = (0, _useDrag3.default)(containerRef, direction, rawValues, mergedMin, mergedMax, formatValue, triggerChange, finishChange, offsetValues),
    _useDrag2 = (0, _slicedToArray2.default)(_useDrag, 4),
    draggingIndex = _useDrag2[0],
    draggingValue = _useDrag2[1],
    cacheValues = _useDrag2[2],
    onStartDrag = _useDrag2[3];
  var onStartMove = function onStartMove(e, valueIndex) {
    onStartDrag(e, valueIndex);
    onBeforeChange === null || onBeforeChange === void 0 ? void 0 : onBeforeChange(getTriggerValue(rawValuesRef.current));
  };
  // Auto focus for updated handle
  var dragging = draggingIndex !== -1;
  React.useEffect(function () {
    if (!dragging) {
      var valueIndex = rawValues.lastIndexOf(draggingValue);
      handlesRef.current.focus(valueIndex);
    }
  }, [dragging]);
  // =========================== Included ===========================
  var sortedCacheValues = React.useMemo(function () {
    return (0, _toConsumableArray2.default)(cacheValues).sort(function (a, b) {
      return a - b;
    });
  }, [cacheValues]);
  // Provide a range values with included [min, max]
  // Used for Track, Mark & Dot
  var _React$useMemo = React.useMemo(function () {
      if (!range) {
        return [mergedMin, sortedCacheValues[0]];
      }
      return [sortedCacheValues[0], sortedCacheValues[sortedCacheValues.length - 1]];
    }, [sortedCacheValues, range, mergedMin]),
    _React$useMemo2 = (0, _slicedToArray2.default)(_React$useMemo, 2),
    includedStart = _React$useMemo2[0],
    includedEnd = _React$useMemo2[1];
  // ============================= Refs =============================
  React.useImperativeHandle(ref, function () {
    return {
      focus: function focus() {
        handlesRef.current.focus(0);
      },
      blur: function blur() {
        var _document = document,
          activeElement = _document.activeElement;
        if (containerRef.current.contains(activeElement)) {
          activeElement === null || activeElement === void 0 ? void 0 : activeElement.blur();
        }
      }
    };
  });
  // ========================== Auto Focus ==========================
  React.useEffect(function () {
    if (autoFocus) {
      handlesRef.current.focus(0);
    }
  }, []);
  // =========================== Context ============================
  var context = React.useMemo(function () {
    return {
      min: mergedMin,
      max: mergedMax,
      direction: direction,
      disabled: disabled,
      keyboard: keyboard,
      step: mergedStep,
      included: included,
      includedStart: includedStart,
      includedEnd: includedEnd,
      range: range,
      tabIndex: tabIndex,
      ariaLabelForHandle: ariaLabelForHandle,
      ariaLabelledByForHandle: ariaLabelledByForHandle,
      ariaValueTextFormatterForHandle: ariaValueTextFormatterForHandle
    };
  }, [mergedMin, mergedMax, direction, disabled, keyboard, mergedStep, included, includedStart, includedEnd, range, tabIndex, ariaLabelForHandle, ariaLabelledByForHandle, ariaValueTextFormatterForHandle]);
  // ============================ Render ============================
  return /*#__PURE__*/React.createElement(_context.default.Provider, {
    value: context
  }, /*#__PURE__*/React.createElement("div", {
    ref: containerRef,
    className: (0, _classnames.default)(prefixCls, className, (_classNames = {}, (0, _defineProperty2.default)(_classNames, "".concat(prefixCls, "-disabled"), disabled), (0, _defineProperty2.default)(_classNames, "".concat(prefixCls, "-vertical"), vertical), (0, _defineProperty2.default)(_classNames, "".concat(prefixCls, "-horizontal"), !vertical), (0, _defineProperty2.default)(_classNames, "".concat(prefixCls, "-with-marks"), markList.length), _classNames)),
    style: style,
    onMouseDown: onSliderMouseDown
  }, /*#__PURE__*/React.createElement("div", {
    className: "".concat(prefixCls, "-rail"),
    style: railStyle
  }), /*#__PURE__*/React.createElement(_Tracks.default, {
    prefixCls: prefixCls,
    style: trackStyle,
    values: sortedCacheValues,
    startPoint: startPoint,
    onStartMove: mergedDraggableTrack ? onStartMove : null
  }), /*#__PURE__*/React.createElement(_Steps.default, {
    prefixCls: prefixCls,
    marks: markList,
    dots: dots,
    style: dotStyle,
    activeStyle: activeDotStyle
  }), /*#__PURE__*/React.createElement(_Handles.default, {
    ref: handlesRef,
    prefixCls: prefixCls,
    style: handleStyle,
    values: cacheValues,
    draggingIndex: draggingIndex,
    onStartMove: onStartMove,
    onOffsetChange: onHandleOffsetChange,
    onFocus: onFocus,
    onBlur: onBlur,
    handleRender: handleRender
  }), /*#__PURE__*/React.createElement(_Marks.default, {
    prefixCls: prefixCls,
    marks: markList,
    onClick: changeToCloseValue
  })));
});
if (process.env.NODE_ENV !== 'production') {
  Slider.displayName = 'Slider';
}
var _default = Slider;
exports.default = _default;