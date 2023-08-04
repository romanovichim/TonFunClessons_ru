"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _classnames = _interopRequireDefault(require("classnames"));
var _rcTooltip = _interopRequireDefault(require("rc-tooltip"));
var _useMergedState = _interopRequireDefault(require("rc-util/lib/hooks/useMergedState"));
var React = _interopRequireWildcard(require("react"));
var _configProvider = require("../config-provider");
var _theme = _interopRequireDefault(require("../theme"));
var _motion = require("../_util/motion");
var _placements = _interopRequireDefault(require("../_util/placements"));
var _reactNode = require("../_util/reactNode");
var _warning = _interopRequireDefault(require("../_util/warning"));
var _PurePanel = _interopRequireDefault(require("./PurePanel"));
var _style = _interopRequireDefault(require("./style"));
var _util = require("./util");
var __rest = void 0 && (void 0).__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
const {
  useToken
} = _theme.default;
const splitObject = (obj, keys) => {
  const picked = {};
  const omitted = Object.assign({}, obj);
  keys.forEach(key => {
    if (obj && key in obj) {
      picked[key] = obj[key];
      delete omitted[key];
    }
  });
  return {
    picked,
    omitted
  };
};
// Fix Tooltip won't hide at disabled button
// mouse events don't trigger at disabled button in Chrome
// https://github.com/react-component/tooltip/issues/18
function getDisabledCompatibleChildren(element, prefixCls) {
  const elementType = element.type;
  if ((elementType.__ANT_BUTTON === true || element.type === 'button') && element.props.disabled || elementType.__ANT_SWITCH === true && (element.props.disabled || element.props.loading) || elementType.__ANT_RADIO === true && element.props.disabled) {
    // Pick some layout related style properties up to span
    // Prevent layout bugs like https://github.com/ant-design/ant-design/issues/5254
    const {
      picked,
      omitted
    } = splitObject(element.props.style, ['position', 'left', 'right', 'top', 'bottom', 'float', 'display', 'zIndex']);
    const spanStyle = Object.assign(Object.assign({
      display: 'inline-block'
    }, picked), {
      cursor: 'not-allowed',
      width: element.props.block ? '100%' : undefined
    });
    const buttonStyle = Object.assign(Object.assign({}, omitted), {
      pointerEvents: 'none'
    });
    const child = (0, _reactNode.cloneElement)(element, {
      style: buttonStyle,
      className: null
    });
    return /*#__PURE__*/React.createElement("span", {
      style: spanStyle,
      className: (0, _classnames.default)(element.props.className, `${prefixCls}-disabled-compatible-wrapper`)
    }, child);
  }
  return element;
}
const Tooltip = /*#__PURE__*/React.forwardRef((props, ref) => {
  var _a, _b;
  const {
    prefixCls: customizePrefixCls,
    openClassName,
    getTooltipContainer,
    overlayClassName,
    color,
    overlayInnerStyle,
    children,
    afterOpenChange,
    afterVisibleChange,
    destroyTooltipOnHide,
    arrow = true
  } = props;
  const mergedShowArrow = !!arrow;
  const {
    token
  } = useToken();
  const {
    getPopupContainer: getContextPopupContainer,
    getPrefixCls,
    direction
  } = React.useContext(_configProvider.ConfigContext);
  // ============================== Ref ===============================
  const tooltipRef = React.useRef(null);
  const forceAlign = () => {
    var _a;
    (_a = tooltipRef.current) === null || _a === void 0 ? void 0 : _a.forceAlign();
  };
  React.useImperativeHandle(ref, () => ({
    forceAlign,
    forcePopupAlign: () => {
      process.env.NODE_ENV !== "production" ? (0, _warning.default)(false, 'Tooltip', '`forcePopupAlign` is align to `forceAlign` instead.') : void 0;
      forceAlign();
    }
  }));
  // ============================== Warn ==============================
  if (process.env.NODE_ENV !== 'production') {
    [['visible', 'open'], ['defaultVisible', 'defaultOpen'], ['onVisibleChange', 'onOpenChange'], ['afterVisibleChange', 'afterOpenChange'], ['arrowPointAtCenter', 'arrow']].forEach(_ref => {
      let [deprecatedName, newName] = _ref;
      process.env.NODE_ENV !== "production" ? (0, _warning.default)(!(deprecatedName in props), 'Tooltip', `\`${deprecatedName}\` is deprecated, please use \`${newName}\` instead.`) : void 0;
    });
    process.env.NODE_ENV !== "production" ? (0, _warning.default)(!destroyTooltipOnHide || typeof destroyTooltipOnHide === 'boolean', 'Tooltip', '`destroyTooltipOnHide` no need config `keepParent` anymore. Please use `boolean` value directly.') : void 0;
    process.env.NODE_ENV !== "production" ? (0, _warning.default)(!arrow || typeof arrow === 'boolean' || !('arrowPointAtCenter' in arrow), 'Tooltip', '`arrowPointAtCenter` in `arrow` is deprecated, please use `pointAtCenter` instead.') : void 0;
  }
  // ============================== Open ==============================
  const [open, setOpen] = (0, _useMergedState.default)(false, {
    value: (_a = props.open) !== null && _a !== void 0 ? _a : props.visible,
    defaultValue: (_b = props.defaultOpen) !== null && _b !== void 0 ? _b : props.defaultVisible
  });
  const isNoTitle = () => {
    const {
      title,
      overlay
    } = props;
    return !title && !overlay && title !== 0; // overlay for old version compatibility
  };

  const onOpenChange = vis => {
    var _a, _b;
    setOpen(isNoTitle() ? false : vis);
    if (!isNoTitle()) {
      (_a = props.onOpenChange) === null || _a === void 0 ? void 0 : _a.call(props, vis);
      (_b = props.onVisibleChange) === null || _b === void 0 ? void 0 : _b.call(props, vis);
    }
  };
  const getTooltipPlacements = () => {
    var _a, _b;
    const {
      builtinPlacements,
      arrowPointAtCenter = false,
      autoAdjustOverflow = true
    } = props;
    let mergedArrowPointAtCenter = arrowPointAtCenter;
    if (typeof arrow === 'object') {
      mergedArrowPointAtCenter = (_b = (_a = arrow.pointAtCenter) !== null && _a !== void 0 ? _a : arrow.arrowPointAtCenter) !== null && _b !== void 0 ? _b : arrowPointAtCenter;
    }
    return builtinPlacements || (0, _placements.default)({
      arrowPointAtCenter: mergedArrowPointAtCenter,
      autoAdjustOverflow,
      arrowWidth: mergedShowArrow ? token.sizePopupArrow : 0,
      borderRadius: token.borderRadius,
      offset: token.marginXXS
    });
  };
  // 动态设置动画点
  const onPopupAlign = (domNode, align) => {
    const placements = getTooltipPlacements();
    // 当前返回的位置
    const placement = Object.keys(placements).find(key => {
      var _a, _b;
      return placements[key].points[0] === ((_a = align.points) === null || _a === void 0 ? void 0 : _a[0]) && placements[key].points[1] === ((_b = align.points) === null || _b === void 0 ? void 0 : _b[1]);
    });
    if (placement) {
      // 根据当前坐标设置动画点
      const rect = domNode.getBoundingClientRect();
      const transformOrigin = {
        top: '50%',
        left: '50%'
      };
      if (/top|Bottom/.test(placement)) {
        transformOrigin.top = `${rect.height - align.offset[1]}px`;
      } else if (/Top|bottom/.test(placement)) {
        transformOrigin.top = `${-align.offset[1]}px`;
      }
      if (/left|Right/.test(placement)) {
        transformOrigin.left = `${rect.width - align.offset[0]}px`;
      } else if (/right|Left/.test(placement)) {
        transformOrigin.left = `${-align.offset[0]}px`;
      }
      domNode.style.transformOrigin = `${transformOrigin.left} ${transformOrigin.top}`;
    }
  };
  const getOverlay = () => {
    const {
      title,
      overlay
    } = props;
    if (title === 0) {
      return title;
    }
    return overlay || title || '';
  };
  const {
      getPopupContainer,
      placement = 'top',
      mouseEnterDelay = 0.1,
      mouseLeaveDelay = 0.1,
      overlayStyle,
      rootClassName
    } = props,
    otherProps = __rest(props, ["getPopupContainer", "placement", "mouseEnterDelay", "mouseLeaveDelay", "overlayStyle", "rootClassName"]);
  const prefixCls = getPrefixCls('tooltip', customizePrefixCls);
  const rootPrefixCls = getPrefixCls();
  const injectFromPopover = props['data-popover-inject'];
  let tempOpen = open;
  // Hide tooltip when there is no title
  if (!('open' in props) && !('visible' in props) && isNoTitle()) {
    tempOpen = false;
  }
  // ============================= Render =============================
  const child = getDisabledCompatibleChildren((0, _reactNode.isValidElement)(children) && !(0, _reactNode.isFragment)(children) ? children : /*#__PURE__*/React.createElement("span", null, children), prefixCls);
  const childProps = child.props;
  const childCls = !childProps.className || typeof childProps.className === 'string' ? (0, _classnames.default)(childProps.className, {
    [openClassName || `${prefixCls}-open`]: true
  }) : childProps.className;
  // Style
  const [wrapSSR, hashId] = (0, _style.default)(prefixCls, !injectFromPopover);
  // Color
  const colorInfo = (0, _util.parseColor)(prefixCls, color);
  const formattedOverlayInnerStyle = Object.assign(Object.assign({}, overlayInnerStyle), colorInfo.overlayStyle);
  const arrowContentStyle = colorInfo.arrowStyle;
  const customOverlayClassName = (0, _classnames.default)(overlayClassName, {
    [`${prefixCls}-rtl`]: direction === 'rtl'
  }, colorInfo.className, rootClassName, hashId);
  return wrapSSR( /*#__PURE__*/React.createElement(_rcTooltip.default, Object.assign({}, otherProps, {
    showArrow: mergedShowArrow,
    placement: placement,
    mouseEnterDelay: mouseEnterDelay,
    mouseLeaveDelay: mouseLeaveDelay,
    prefixCls: prefixCls,
    overlayClassName: customOverlayClassName,
    overlayStyle: Object.assign(Object.assign({}, arrowContentStyle), overlayStyle),
    getTooltipContainer: getPopupContainer || getTooltipContainer || getContextPopupContainer,
    ref: tooltipRef,
    builtinPlacements: getTooltipPlacements(),
    overlay: getOverlay(),
    visible: tempOpen,
    onVisibleChange: onOpenChange,
    afterVisibleChange: afterOpenChange !== null && afterOpenChange !== void 0 ? afterOpenChange : afterVisibleChange,
    onPopupAlign: onPopupAlign,
    overlayInnerStyle: formattedOverlayInnerStyle,
    arrowContent: /*#__PURE__*/React.createElement("span", {
      className: `${prefixCls}-arrow-content`
    }),
    motion: {
      motionName: (0, _motion.getTransitionName)(rootPrefixCls, 'zoom-big-fast', props.transitionName),
      motionDeadline: 1000
    },
    destroyTooltipOnHide: !!destroyTooltipOnHide
  }), tempOpen ? (0, _reactNode.cloneElement)(child, {
    className: childCls
  }) : child));
});
if (process.env.NODE_ENV !== 'production') {
  Tooltip.displayName = 'Tooltip';
}
Tooltip._InternalPanelDoNotUseOrYouWillBeFired = _PurePanel.default;
var _default = Tooltip;
exports.default = _default;