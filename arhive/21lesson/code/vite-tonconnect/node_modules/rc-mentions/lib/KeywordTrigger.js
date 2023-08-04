"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _trigger = _interopRequireDefault(require("@rc-component/trigger"));
var React = _interopRequireWildcard(require("react"));
var _DropdownMenu = _interopRequireDefault(require("./DropdownMenu"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var BUILT_IN_PLACEMENTS = {
  bottomRight: {
    points: ['tl', 'br'],
    offset: [0, 4],
    overflow: {
      adjustX: 1,
      adjustY: 1
    }
  },
  bottomLeft: {
    points: ['tr', 'bl'],
    offset: [0, 4],
    overflow: {
      adjustX: 1,
      adjustY: 1
    }
  },
  topRight: {
    points: ['bl', 'tr'],
    offset: [0, -4],
    overflow: {
      adjustX: 1,
      adjustY: 1
    }
  },
  topLeft: {
    points: ['br', 'tl'],
    offset: [0, -4],
    overflow: {
      adjustX: 1,
      adjustY: 1
    }
  }
};
var KeywordTrigger = function KeywordTrigger(props) {
  var prefixCls = props.prefixCls,
    options = props.options,
    children = props.children,
    visible = props.visible,
    transitionName = props.transitionName,
    getPopupContainer = props.getPopupContainer,
    dropdownClassName = props.dropdownClassName,
    direction = props.direction,
    placement = props.placement;
  var dropdownPrefix = "".concat(prefixCls, "-dropdown");
  var dropdownElement = /*#__PURE__*/React.createElement(_DropdownMenu.default, {
    prefixCls: dropdownPrefix,
    options: options
  });
  var dropdownPlacement = (0, React.useMemo)(function () {
    var popupPlacement;
    if (direction === 'rtl') {
      popupPlacement = placement === 'top' ? 'topLeft' : 'bottomLeft';
    } else {
      popupPlacement = placement === 'top' ? 'topRight' : 'bottomRight';
    }
    return popupPlacement;
  }, [direction, placement]);
  return /*#__PURE__*/React.createElement(_trigger.default, {
    prefixCls: dropdownPrefix,
    popupVisible: visible,
    popup: dropdownElement,
    popupPlacement: dropdownPlacement,
    popupTransitionName: transitionName,
    builtinPlacements: BUILT_IN_PLACEMENTS,
    getPopupContainer: getPopupContainer,
    popupClassName: dropdownClassName
  }, children);
};
var _default = KeywordTrigger;
exports.default = _default;