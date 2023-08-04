"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _HolderOutlined = _interopRequireDefault(require("@ant-design/icons/HolderOutlined"));
var _classnames = _interopRequireDefault(require("classnames"));
var _rcTree = _interopRequireDefault(require("rc-tree"));
var _react = _interopRequireDefault(require("react"));
var _configProvider = require("../config-provider");
var _motion = _interopRequireDefault(require("../_util/motion"));
var _dropIndicator = _interopRequireDefault(require("./utils/dropIndicator"));
var _iconUtil = _interopRequireDefault(require("./utils/iconUtil"));
var _style = _interopRequireDefault(require("./style"));
const Tree = /*#__PURE__*/_react.default.forwardRef((props, ref) => {
  const {
    getPrefixCls,
    direction,
    virtual
  } = _react.default.useContext(_configProvider.ConfigContext);
  const {
    prefixCls: customizePrefixCls,
    className,
    showIcon = false,
    showLine,
    switcherIcon,
    blockNode = false,
    children,
    checkable = false,
    selectable = true,
    draggable,
    motion: customMotion
  } = props;
  const prefixCls = getPrefixCls('tree', customizePrefixCls);
  const rootPrefixCls = getPrefixCls();
  const motion = customMotion !== null && customMotion !== void 0 ? customMotion : Object.assign(Object.assign({}, (0, _motion.default)(rootPrefixCls)), {
    motionAppear: false
  });
  const newProps = Object.assign(Object.assign({}, props), {
    checkable,
    selectable,
    showIcon,
    motion,
    blockNode,
    showLine: Boolean(showLine),
    dropIndicatorRender: _dropIndicator.default
  });
  const [wrapSSR, hashId] = (0, _style.default)(prefixCls);
  const draggableConfig = _react.default.useMemo(() => {
    if (!draggable) {
      return false;
    }
    let mergedDraggable = {};
    switch (typeof draggable) {
      case 'function':
        mergedDraggable.nodeDraggable = draggable;
        break;
      case 'object':
        mergedDraggable = Object.assign({}, draggable);
        break;
      default:
        break;
      // Do nothing
    }

    if (mergedDraggable.icon !== false) {
      mergedDraggable.icon = mergedDraggable.icon || /*#__PURE__*/_react.default.createElement(_HolderOutlined.default, null);
    }
    return mergedDraggable;
  }, [draggable]);
  return wrapSSR( /*#__PURE__*/_react.default.createElement(_rcTree.default, Object.assign({
    itemHeight: 20,
    ref: ref,
    virtual: virtual
  }, newProps, {
    prefixCls: prefixCls,
    className: (0, _classnames.default)({
      [`${prefixCls}-icon-hide`]: !showIcon,
      [`${prefixCls}-block-node`]: blockNode,
      [`${prefixCls}-unselectable`]: !selectable,
      [`${prefixCls}-rtl`]: direction === 'rtl'
    }, className, hashId),
    direction: direction,
    checkable: checkable ? /*#__PURE__*/_react.default.createElement("span", {
      className: `${prefixCls}-checkbox-inner`
    }) : checkable,
    selectable: selectable,
    switcherIcon: nodeProps => (0, _iconUtil.default)(prefixCls, switcherIcon, nodeProps, showLine),
    draggable: draggableConfig
  }), children));
});
if (process.env.NODE_ENV !== 'production') {
  Tree.displayName = 'Tree';
}
var _default = Tree;
exports.default = _default;