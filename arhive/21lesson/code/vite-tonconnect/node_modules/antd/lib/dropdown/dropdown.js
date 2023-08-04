"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _RightOutlined = _interopRequireDefault(require("@ant-design/icons/RightOutlined"));
var _classnames = _interopRequireDefault(require("classnames"));
var _rcDropdown = _interopRequireDefault(require("rc-dropdown"));
var _useEvent = _interopRequireDefault(require("rc-util/lib/hooks/useEvent"));
var _useMergedState = _interopRequireDefault(require("rc-util/lib/hooks/useMergedState"));
var _omit = _interopRequireDefault(require("rc-util/lib/omit"));
var React = _interopRequireWildcard(require("react"));
var _configProvider = require("../config-provider");
var _menu = _interopRequireDefault(require("../menu"));
var _OverrideContext = require("../menu/OverrideContext");
var _Compact = require("../space/Compact");
var _placements = _interopRequireDefault(require("../_util/placements"));
var _PurePanel = _interopRequireDefault(require("../_util/PurePanel"));
var _reactNode = require("../_util/reactNode");
var _warning = _interopRequireDefault(require("../_util/warning"));
var _dropdownButton = _interopRequireDefault(require("./dropdown-button"));
var _style = _interopRequireDefault(require("./style"));
var _theme = _interopRequireDefault(require("../theme"));
const Placements = ['topLeft', 'topCenter', 'topRight', 'bottomLeft', 'bottomCenter', 'bottomRight', 'top', 'bottom'];
const Dropdown = props => {
  const {
    getPopupContainer: getContextPopupContainer,
    getPrefixCls,
    direction
  } = React.useContext(_configProvider.ConfigContext);
  // Warning for deprecated usage
  if (process.env.NODE_ENV !== 'production') {
    [['visible', 'open'], ['onVisibleChange', 'onOpenChange']].forEach(_ref => {
      let [deprecatedName, newName] = _ref;
      process.env.NODE_ENV !== "production" ? (0, _warning.default)(!(deprecatedName in props), 'Dropdown', `\`${deprecatedName}\` is deprecated which will be removed in next major version, please use \`${newName}\` instead.`) : void 0;
    });
    process.env.NODE_ENV !== "production" ? (0, _warning.default)(!('overlay' in props), 'Dropdown', '`overlay` is deprecated. Please use `menu` instead.') : void 0;
  }
  const getTransitionName = () => {
    const rootPrefixCls = getPrefixCls();
    const {
      placement = '',
      transitionName
    } = props;
    if (transitionName !== undefined) {
      return transitionName;
    }
    if (placement.includes('top')) {
      return `${rootPrefixCls}-slide-down`;
    }
    return `${rootPrefixCls}-slide-up`;
  };
  const getPlacement = () => {
    const {
      placement
    } = props;
    if (!placement) {
      return direction === 'rtl' ? 'bottomRight' : 'bottomLeft';
    }
    if (placement.includes('Center')) {
      const newPlacement = placement.slice(0, placement.indexOf('Center'));
      process.env.NODE_ENV !== "production" ? (0, _warning.default)(!placement.includes('Center'), 'Dropdown', `You are using '${placement}' placement in Dropdown, which is deprecated. Try to use '${newPlacement}' instead.`) : void 0;
      return newPlacement;
    }
    return placement;
  };
  const {
    menu,
    arrow,
    prefixCls: customizePrefixCls,
    children,
    trigger,
    disabled,
    dropdownRender,
    getPopupContainer,
    overlayClassName,
    rootClassName,
    open,
    onOpenChange,
    // Deprecated
    visible,
    onVisibleChange,
    mouseEnterDelay = 0.15,
    mouseLeaveDelay = 0.1,
    autoAdjustOverflow = true
  } = props;
  if (process.env.NODE_ENV !== 'production') {
    [['visible', 'open'], ['onVisibleChange', 'onOpenChange']].forEach(_ref2 => {
      let [deprecatedName, newName] = _ref2;
      process.env.NODE_ENV !== "production" ? (0, _warning.default)(!(deprecatedName in props), 'Dropdown', `\`${deprecatedName}\` is deprecated, please use \`${newName}\` instead.`) : void 0;
    });
  }
  const prefixCls = getPrefixCls('dropdown', customizePrefixCls);
  const [wrapSSR, hashId] = (0, _style.default)(prefixCls);
  const {
    token
  } = _theme.default.useToken();
  const child = React.Children.only(children);
  const dropdownTrigger = (0, _reactNode.cloneElement)(child, {
    className: (0, _classnames.default)(`${prefixCls}-trigger`, {
      [`${prefixCls}-rtl`]: direction === 'rtl'
    }, child.props.className),
    disabled
  });
  const triggerActions = disabled ? [] : trigger;
  let alignPoint;
  if (triggerActions && triggerActions.includes('contextMenu')) {
    alignPoint = true;
  }
  // =========================== Open ============================
  const [mergedOpen, setOpen] = (0, _useMergedState.default)(false, {
    value: open !== null && open !== void 0 ? open : visible
  });
  const onInnerOpenChange = (0, _useEvent.default)(nextOpen => {
    onOpenChange === null || onOpenChange === void 0 ? void 0 : onOpenChange(nextOpen);
    onVisibleChange === null || onVisibleChange === void 0 ? void 0 : onVisibleChange(nextOpen);
    setOpen(nextOpen);
  });
  // =========================== Overlay ============================
  const overlayClassNameCustomized = (0, _classnames.default)(overlayClassName, rootClassName, hashId, {
    [`${prefixCls}-rtl`]: direction === 'rtl'
  });
  const builtinPlacements = (0, _placements.default)({
    arrowPointAtCenter: typeof arrow === 'object' && arrow.pointAtCenter,
    autoAdjustOverflow,
    offset: token.marginXXS,
    arrowWidth: arrow ? token.sizePopupArrow : 0,
    borderRadius: token.borderRadius
  });
  const onMenuClick = React.useCallback(() => {
    setOpen(false);
  }, []);
  const renderOverlay = () => {
    // rc-dropdown already can process the function of overlay, but we have check logic here.
    // So we need render the element to check and pass back to rc-dropdown.
    const {
      overlay
    } = props;
    let overlayNode;
    if (menu === null || menu === void 0 ? void 0 : menu.items) {
      overlayNode = /*#__PURE__*/React.createElement(_menu.default, Object.assign({}, menu));
    } else if (typeof overlay === 'function') {
      overlayNode = overlay();
    } else {
      overlayNode = overlay;
    }
    if (dropdownRender) {
      overlayNode = dropdownRender(overlayNode);
    }
    overlayNode = React.Children.only(typeof overlayNode === 'string' ? /*#__PURE__*/React.createElement("span", null, overlayNode) : overlayNode);
    return /*#__PURE__*/React.createElement(_OverrideContext.OverrideProvider, {
      prefixCls: `${prefixCls}-menu`,
      expandIcon: /*#__PURE__*/React.createElement("span", {
        className: `${prefixCls}-menu-submenu-arrow`
      }, /*#__PURE__*/React.createElement(_RightOutlined.default, {
        className: `${prefixCls}-menu-submenu-arrow-icon`
      })),
      mode: "vertical",
      selectable: false,
      onClick: onMenuClick,
      validator: _ref3 => {
        let {
          mode
        } = _ref3;
        // Warning if use other mode
        process.env.NODE_ENV !== "production" ? (0, _warning.default)(!mode || mode === 'vertical', 'Dropdown', `mode="${mode}" is not supported for Dropdown's Menu.`) : void 0;
      }
    }, /*#__PURE__*/React.createElement(_Compact.NoCompactStyle, null, overlayNode));
  };
  // ============================ Render ============================
  return wrapSSR( /*#__PURE__*/React.createElement(_rcDropdown.default, Object.assign({
    alignPoint: alignPoint
  }, (0, _omit.default)(props, ['rootClassName']), {
    mouseEnterDelay: mouseEnterDelay,
    mouseLeaveDelay: mouseLeaveDelay,
    visible: mergedOpen,
    builtinPlacements: builtinPlacements,
    arrow: !!arrow,
    overlayClassName: overlayClassNameCustomized,
    prefixCls: prefixCls,
    getPopupContainer: getPopupContainer || getContextPopupContainer,
    transitionName: getTransitionName(),
    trigger: triggerActions,
    overlay: renderOverlay,
    placement: getPlacement(),
    onVisibleChange: onInnerOpenChange
  }), dropdownTrigger));
};
Dropdown.Button = _dropdownButton.default;
// We don't care debug panel
const PurePanel = (0, _PurePanel.default)(Dropdown, 'dropdown', prefixCls => prefixCls);
/* istanbul ignore next */
const WrapPurePanel = props => /*#__PURE__*/React.createElement(PurePanel, Object.assign({}, props), /*#__PURE__*/React.createElement("span", null));
Dropdown._InternalPanelDoNotUseOrYouWillBeFired = WrapPurePanel;
if (process.env.NODE_ENV !== 'production') {
  Dropdown.displayName = 'Dropdown';
}
var _default = Dropdown;
exports.default = _default;