"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _RightOutlined = _interopRequireDefault(require("@ant-design/icons/RightOutlined"));
var _classnames = _interopRequireDefault(require("classnames"));
var _rcCollapse = _interopRequireDefault(require("rc-collapse"));
var React = _interopRequireWildcard(require("react"));
var _toArray = _interopRequireDefault(require("rc-util/lib/Children/toArray"));
var _omit = _interopRequireDefault(require("rc-util/lib/omit"));
var _configProvider = require("../config-provider");
var _motion = _interopRequireDefault(require("../_util/motion"));
var _reactNode = require("../_util/reactNode");
var _warning = _interopRequireDefault(require("../_util/warning"));
var _SizeContext = _interopRequireDefault(require("../config-provider/SizeContext"));
var _CollapsePanel = _interopRequireDefault(require("./CollapsePanel"));
var _style = _interopRequireDefault(require("./style"));
const Collapse = /*#__PURE__*/React.forwardRef((props, ref) => {
  const {
    getPrefixCls,
    direction
  } = React.useContext(_configProvider.ConfigContext);
  const size = React.useContext(_SizeContext.default);
  const {
    prefixCls: customizePrefixCls,
    className,
    rootClassName,
    bordered = true,
    ghost,
    size: customizeSize,
    expandIconPosition = 'start'
  } = props;
  const mergedSize = customizeSize || size || 'middle';
  const prefixCls = getPrefixCls('collapse', customizePrefixCls);
  const rootPrefixCls = getPrefixCls();
  const [wrapSSR, hashId] = (0, _style.default)(prefixCls);
  // Warning if use legacy type `expandIconPosition`
  process.env.NODE_ENV !== "production" ? (0, _warning.default)(expandIconPosition !== 'left' && expandIconPosition !== 'right', 'Collapse', '`expandIconPosition` with `left` or `right` is deprecated. Please use `start` or `end` instead.') : void 0;
  // Align with logic position
  const mergedExpandIconPosition = React.useMemo(() => {
    if (expandIconPosition === 'left') {
      return 'start';
    }
    return expandIconPosition === 'right' ? 'end' : expandIconPosition;
  }, [expandIconPosition]);
  const renderExpandIcon = function () {
    let panelProps = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    const {
      expandIcon
    } = props;
    const icon = expandIcon ? expandIcon(panelProps) : /*#__PURE__*/React.createElement(_RightOutlined.default, {
      rotate: panelProps.isActive ? 90 : undefined
    });
    return (0, _reactNode.cloneElement)(icon, () => ({
      className: (0, _classnames.default)(icon.props.className, `${prefixCls}-arrow`)
    }));
  };
  const collapseClassName = (0, _classnames.default)(`${prefixCls}-icon-position-${mergedExpandIconPosition}`, {
    [`${prefixCls}-borderless`]: !bordered,
    [`${prefixCls}-rtl`]: direction === 'rtl',
    [`${prefixCls}-ghost`]: !!ghost,
    [`${prefixCls}-${mergedSize}`]: mergedSize !== 'middle'
  }, className, rootClassName, hashId);
  const openMotion = Object.assign(Object.assign({}, (0, _motion.default)(rootPrefixCls)), {
    motionAppear: false,
    leavedClassName: `${prefixCls}-content-hidden`
  });
  const getItems = () => {
    const {
      children
    } = props;
    return (0, _toArray.default)(children).map((child, index) => {
      var _a;
      if ((_a = child.props) === null || _a === void 0 ? void 0 : _a.disabled) {
        const key = child.key || String(index);
        const {
          disabled,
          collapsible
        } = child.props;
        const childProps = Object.assign(Object.assign({}, (0, _omit.default)(child.props, ['disabled'])), {
          key,
          collapsible: collapsible !== null && collapsible !== void 0 ? collapsible : disabled ? 'disabled' : undefined
        });
        return (0, _reactNode.cloneElement)(child, childProps);
      }
      return child;
    });
  };
  return wrapSSR( /*#__PURE__*/React.createElement(_rcCollapse.default, Object.assign({
    ref: ref,
    openMotion: openMotion
  }, (0, _omit.default)(props, ['rootClassName']), {
    expandIcon: renderExpandIcon,
    prefixCls: prefixCls,
    className: collapseClassName
  }), getItems()));
});
if (process.env.NODE_ENV !== 'production') {
  Collapse.displayName = 'Collapse';
}
var _default = Object.assign(Collapse, {
  Panel: _CollapsePanel.default
});
exports.default = _default;