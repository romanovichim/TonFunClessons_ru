"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread2"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var React = _interopRequireWildcard(require("react"));

var _trigger = _interopRequireDefault(require("@rc-component/trigger"));

var _portal = _interopRequireDefault(require("@rc-component/portal"));

var _classnames = _interopRequireDefault(require("classnames"));

var _useMergedState5 = _interopRequireDefault(require("rc-util/lib/hooks/useMergedState"));

var _useTarget3 = _interopRequireDefault(require("./hooks/useTarget"));

var _TourStep = _interopRequireDefault(require("./TourStep"));

var _Mask = _interopRequireDefault(require("./Mask"));

var _placements = require("./placements");

var _useLayoutEffect = _interopRequireDefault(require("rc-util/lib/hooks/useLayoutEffect"));

var _excluded = ["prefixCls", "steps", "defaultCurrent", "current", "onChange", "onClose", "onFinish", "open", "mask", "arrow", "rootClassName", "placement", "renderPanel", "gap", "animated", "scrollIntoViewOptions", "zIndex"];
var CENTER_PLACEHOLDER = {
  left: '50%',
  top: '50%',
  width: 1,
  height: 1
};

var Tour = function Tour(props) {
  var _props$prefixCls = props.prefixCls,
      prefixCls = _props$prefixCls === void 0 ? 'rc-tour' : _props$prefixCls,
      _props$steps = props.steps,
      steps = _props$steps === void 0 ? [] : _props$steps,
      defaultCurrent = props.defaultCurrent,
      current = props.current,
      onChange = props.onChange,
      onClose = props.onClose,
      _onFinish = props.onFinish,
      open = props.open,
      _props$mask = props.mask,
      mask = _props$mask === void 0 ? true : _props$mask,
      _props$arrow = props.arrow,
      arrow = _props$arrow === void 0 ? true : _props$arrow,
      rootClassName = props.rootClassName,
      _props$placement = props.placement,
      placement = _props$placement === void 0 ? 'bottom' : _props$placement,
      renderPanel = props.renderPanel,
      gap = props.gap,
      animated = props.animated,
      _props$scrollIntoView = props.scrollIntoViewOptions,
      scrollIntoViewOptions = _props$scrollIntoView === void 0 ? true : _props$scrollIntoView,
      _props$zIndex = props.zIndex,
      zIndex = _props$zIndex === void 0 ? 1001 : _props$zIndex,
      restProps = (0, _objectWithoutProperties2.default)(props, _excluded);
  var triggerRef = React.useRef();

  var _useMergedState = (0, _useMergedState5.default)(0, {
    value: current,
    defaultValue: defaultCurrent
  }),
      _useMergedState2 = (0, _slicedToArray2.default)(_useMergedState, 2),
      mergedCurrent = _useMergedState2[0],
      setMergedCurrent = _useMergedState2[1];

  var _useMergedState3 = (0, _useMergedState5.default)(undefined, {
    value: open,
    postState: function postState(origin) {
      return mergedCurrent < 0 || mergedCurrent >= steps.length ? false : origin !== null && origin !== void 0 ? origin : true;
    }
  }),
      _useMergedState4 = (0, _slicedToArray2.default)(_useMergedState3, 2),
      mergedOpen = _useMergedState4[0],
      setMergedOpen = _useMergedState4[1];

  var openRef = React.useRef(mergedOpen);
  (0, _useLayoutEffect.default)(function () {
    if (mergedOpen && !openRef.current) {
      setMergedCurrent(0);
    }

    openRef.current = mergedOpen;
  }, [mergedOpen]);

  var _ref = steps[mergedCurrent] || {},
      target = _ref.target,
      stepPlacement = _ref.placement,
      stepStyle = _ref.style,
      stepArrow = _ref.arrow,
      stepClassName = _ref.className,
      stepMask = _ref.mask,
      stepScrollIntoViewOptions = _ref.scrollIntoViewOptions;

  var mergedPlacement = stepPlacement !== null && stepPlacement !== void 0 ? stepPlacement : placement;
  var mergedMask = mergedOpen && (stepMask !== null && stepMask !== void 0 ? stepMask : mask);
  var mergedScrollIntoViewOptions = stepScrollIntoViewOptions !== null && stepScrollIntoViewOptions !== void 0 ? stepScrollIntoViewOptions : scrollIntoViewOptions;

  var _useTarget = (0, _useTarget3.default)(target, open, gap, mergedScrollIntoViewOptions),
      _useTarget2 = (0, _slicedToArray2.default)(_useTarget, 2),
      posInfo = _useTarget2[0],
      targetElement = _useTarget2[1]; // ========================= arrow =========================


  var mergedArrow = targetElement ? typeof stepArrow === 'undefined' ? arrow : stepArrow : false;
  var arrowPointAtCenter = (0, _typeof2.default)(mergedArrow) === 'object' ? mergedArrow.pointAtCenter : false;
  (0, _useLayoutEffect.default)(function () {
    var _triggerRef$current;

    (_triggerRef$current = triggerRef.current) === null || _triggerRef$current === void 0 ? void 0 : _triggerRef$current.forceAlign();
  }, [arrowPointAtCenter, mergedCurrent]); // ========================= Change =========================

  var onInternalChange = function onInternalChange(nextCurrent) {
    setMergedCurrent(nextCurrent);
    onChange === null || onChange === void 0 ? void 0 : onChange(nextCurrent);
  }; // ========================= Render =========================
  // Skip if not init yet


  if (targetElement === undefined) {
    return null;
  }

  var handleClose = function handleClose() {
    setMergedOpen(false);
    onClose === null || onClose === void 0 ? void 0 : onClose(mergedCurrent);
  };

  var getPopupElement = function getPopupElement() {
    return /*#__PURE__*/React.createElement(_TourStep.default, (0, _extends2.default)({
      arrow: mergedArrow,
      key: "content",
      prefixCls: prefixCls,
      total: steps.length,
      renderPanel: renderPanel,
      onPrev: function onPrev() {
        onInternalChange(mergedCurrent - 1);
      },
      onNext: function onNext() {
        onInternalChange(mergedCurrent + 1);
      },
      onClose: handleClose,
      current: mergedCurrent,
      onFinish: function onFinish() {
        handleClose();
        _onFinish === null || _onFinish === void 0 ? void 0 : _onFinish();
      }
    }, steps[mergedCurrent]));
  };

  var mergedShowMask = typeof mergedMask === 'boolean' ? mergedMask : !!mergedMask;
  var mergedMaskStyle = typeof mergedMask === 'boolean' ? undefined : mergedMask; // when targetElement is not exist, use body as triggerDOMNode

  var getTriggerDOMNode = function getTriggerDOMNode(node) {
    return node || targetElement || document.body;
  };

  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(_Mask.default, {
    zIndex: zIndex,
    prefixCls: prefixCls,
    pos: posInfo,
    showMask: mergedShowMask,
    style: mergedMaskStyle === null || mergedMaskStyle === void 0 ? void 0 : mergedMaskStyle.style,
    fill: mergedMaskStyle === null || mergedMaskStyle === void 0 ? void 0 : mergedMaskStyle.color,
    open: mergedOpen,
    animated: animated,
    rootClassName: rootClassName
  }), /*#__PURE__*/React.createElement(_trigger.default, (0, _extends2.default)({
    builtinPlacements: (0, _placements.getPlacements)(arrowPointAtCenter)
  }, restProps, {
    ref: triggerRef,
    popupStyle: stepStyle,
    popupPlacement: mergedPlacement,
    popupVisible: mergedOpen,
    popupClassName: (0, _classnames.default)(rootClassName, stepClassName),
    prefixCls: prefixCls,
    popup: getPopupElement,
    forceRender: false,
    destroyPopupOnHide: true,
    zIndex: zIndex,
    getTriggerDOMNode: getTriggerDOMNode,
    arrow: !!mergedArrow
  }), /*#__PURE__*/React.createElement(_portal.default, {
    open: mergedOpen,
    autoLock: true
  }, /*#__PURE__*/React.createElement("div", {
    className: (0, _classnames.default)(rootClassName, "".concat(prefixCls, "-target-placeholder")),
    style: (0, _objectSpread2.default)((0, _objectSpread2.default)({}, posInfo || CENTER_PLACEHOLDER), {}, {
      position: 'fixed',
      pointerEvents: 'none'
    })
  }))));
};

var _default = Tour;
exports.default = _default;