"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _classnames = _interopRequireDefault(require("classnames"));
var _rcSlider = _interopRequireDefault(require("rc-slider"));
var React = _interopRequireWildcard(require("react"));
var _configProvider = require("../config-provider");
var _warning = _interopRequireDefault(require("../_util/warning"));
var _SliderTooltip = _interopRequireDefault(require("./SliderTooltip"));
var _style = _interopRequireDefault(require("./style"));
var __rest = void 0 && (void 0).__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
const defaultFormatter = val => typeof val === 'number' ? val.toString() : '';
const Slider = /*#__PURE__*/React.forwardRef((props, ref) => {
  const {
      prefixCls: customizePrefixCls,
      range,
      className,
      rootClassName,
      // Deprecated Props
      tooltipPrefixCls: legacyTooltipPrefixCls,
      tipFormatter: legacyTipFormatter,
      tooltipVisible: legacyTooltipVisible,
      getTooltipPopupContainer: legacyGetTooltipPopupContainer,
      tooltipPlacement: legacyTooltipPlacement
    } = props,
    restProps = __rest(props, ["prefixCls", "range", "className", "rootClassName", "tooltipPrefixCls", "tipFormatter", "tooltipVisible", "getTooltipPopupContainer", "tooltipPlacement"]);
  const {
    getPrefixCls,
    direction,
    getPopupContainer
  } = React.useContext(_configProvider.ConfigContext);
  const [opens, setOpens] = React.useState({});
  const toggleTooltipOpen = (index, open) => {
    setOpens(prev => Object.assign(Object.assign({}, prev), {
      [index]: open
    }));
  };
  const getTooltipPlacement = (placement, vertical) => {
    if (placement) {
      return placement;
    }
    if (!vertical) {
      return 'top';
    }
    return direction === 'rtl' ? 'left' : 'right';
  };
  const prefixCls = getPrefixCls('slider', customizePrefixCls);
  const [wrapSSR, hashId] = (0, _style.default)(prefixCls);
  const cls = (0, _classnames.default)(className, rootClassName, {
    [`${prefixCls}-rtl`]: direction === 'rtl'
  }, hashId);
  // make reverse default on rtl direction
  if (direction === 'rtl' && !restProps.vertical) {
    restProps.reverse = !restProps.reverse;
  }
  // Range config
  const [mergedRange, draggableTrack] = React.useMemo(() => {
    if (!range) {
      return [false];
    }
    return typeof range === 'object' ? [true, range.draggableTrack] : [true, false];
  }, [range]);
  // Warning for deprecated usage
  if (process.env.NODE_ENV !== 'production') {
    [['tooltipPrefixCls', 'prefixCls'], ['getTooltipPopupContainer', 'getPopupContainer'], ['tipFormatter', 'formatter'], ['tooltipPlacement', 'placement'], ['tooltipVisible', 'open']].forEach(_ref => {
      let [deprecatedName, newName] = _ref;
      process.env.NODE_ENV !== "production" ? (0, _warning.default)(!(deprecatedName in props), 'Slider', `\`${deprecatedName}\` is deprecated, please use \`tooltip.${newName}\` instead.`) : void 0;
    });
  }
  const handleRender = (node, info) => {
    var _a;
    const {
      index,
      dragging
    } = info;
    const {
      tooltip = {},
      vertical
    } = props;
    const tooltipProps = Object.assign({}, tooltip);
    const {
      open: tooltipOpen,
      placement: tooltipPlacement,
      getPopupContainer: getTooltipPopupContainer,
      prefixCls: customizeTooltipPrefixCls,
      formatter: tipFormatter
    } = tooltipProps;
    let mergedTipFormatter;
    if (tipFormatter || tipFormatter === null) {
      mergedTipFormatter = tipFormatter;
    } else if (legacyTipFormatter || legacyTipFormatter === null) {
      mergedTipFormatter = legacyTipFormatter;
    } else {
      mergedTipFormatter = defaultFormatter;
    }
    const isTipFormatter = mergedTipFormatter ? opens[index] || dragging : false;
    const open = (_a = tooltipOpen !== null && tooltipOpen !== void 0 ? tooltipOpen : legacyTooltipVisible) !== null && _a !== void 0 ? _a : tooltipOpen === undefined && isTipFormatter;
    const passedProps = Object.assign(Object.assign({}, node.props), {
      onMouseEnter: () => toggleTooltipOpen(index, true),
      onMouseLeave: () => toggleTooltipOpen(index, false)
    });
    const tooltipPrefixCls = getPrefixCls('tooltip', customizeTooltipPrefixCls !== null && customizeTooltipPrefixCls !== void 0 ? customizeTooltipPrefixCls : legacyTooltipPrefixCls);
    return /*#__PURE__*/React.createElement(_SliderTooltip.default, {
      prefixCls: tooltipPrefixCls,
      title: mergedTipFormatter ? mergedTipFormatter(info.value) : '',
      open: open,
      placement: getTooltipPlacement(tooltipPlacement !== null && tooltipPlacement !== void 0 ? tooltipPlacement : legacyTooltipPlacement, vertical),
      key: index,
      overlayClassName: `${prefixCls}-tooltip`,
      getPopupContainer: getTooltipPopupContainer || legacyGetTooltipPopupContainer || getPopupContainer
    }, /*#__PURE__*/React.cloneElement(node, passedProps));
  };
  return wrapSSR( /*#__PURE__*/React.createElement(_rcSlider.default, Object.assign({}, restProps, {
    step: restProps.step,
    range: mergedRange,
    draggableTrack: draggableTrack,
    className: cls,
    ref: ref,
    prefixCls: prefixCls,
    handleRender: handleRender
  })));
});
if (process.env.NODE_ENV !== 'production') {
  Slider.displayName = 'Slider';
}
var _default = Slider;
exports.default = _default;