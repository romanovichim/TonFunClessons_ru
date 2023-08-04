"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread2"));
var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var React = _interopRequireWildcard(require("react"));
var _reactDom = require("react-dom");
var _rcMotion = require("rc-motion");
var _classnames = _interopRequireDefault(require("classnames"));
var _Notice = _interopRequireDefault(require("./Notice"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
// ant-notification ant-notification-topRight
var Notifications = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var _props$prefixCls = props.prefixCls,
    prefixCls = _props$prefixCls === void 0 ? 'rc-notification' : _props$prefixCls,
    container = props.container,
    motion = props.motion,
    maxCount = props.maxCount,
    className = props.className,
    style = props.style,
    onAllRemoved = props.onAllRemoved;
  var _React$useState = React.useState([]),
    _React$useState2 = (0, _slicedToArray2.default)(_React$useState, 2),
    configList = _React$useState2[0],
    setConfigList = _React$useState2[1];
  // ======================== Close =========================
  var onNoticeClose = function onNoticeClose(key) {
    var _config$onClose;
    // Trigger close event
    var config = configList.find(function (item) {
      return item.key === key;
    });
    config === null || config === void 0 ? void 0 : (_config$onClose = config.onClose) === null || _config$onClose === void 0 ? void 0 : _config$onClose.call(config);
    setConfigList(function (list) {
      return list.filter(function (item) {
        return item.key !== key;
      });
    });
  };
  // ========================= Refs =========================
  React.useImperativeHandle(ref, function () {
    return {
      open: function open(config) {
        setConfigList(function (list) {
          var clone = (0, _toConsumableArray2.default)(list);
          // Replace if exist
          var index = clone.findIndex(function (item) {
            return item.key === config.key;
          });
          var innerConfig = (0, _objectSpread2.default)({}, config);
          if (index >= 0) {
            var _list$index;
            innerConfig.times = (((_list$index = list[index]) === null || _list$index === void 0 ? void 0 : _list$index.times) || 0) + 1;
            clone[index] = innerConfig;
          } else {
            innerConfig.times = 0;
            clone.push(innerConfig);
          }
          if (maxCount > 0 && clone.length > maxCount) {
            clone = clone.slice(-maxCount);
          }
          return clone;
        });
      },
      close: function close(key) {
        onNoticeClose(key);
      },
      destroy: function destroy() {
        setConfigList([]);
      }
    };
  });
  // ====================== Placements ======================
  var _React$useState3 = React.useState({}),
    _React$useState4 = (0, _slicedToArray2.default)(_React$useState3, 2),
    placements = _React$useState4[0],
    setPlacements = _React$useState4[1];
  React.useEffect(function () {
    var nextPlacements = {};
    configList.forEach(function (config) {
      var _config$placement = config.placement,
        placement = _config$placement === void 0 ? 'topRight' : _config$placement;
      if (placement) {
        nextPlacements[placement] = nextPlacements[placement] || [];
        nextPlacements[placement].push(config);
      }
    });
    // Fill exist placements to avoid empty list causing remove without motion
    Object.keys(placements).forEach(function (placement) {
      nextPlacements[placement] = nextPlacements[placement] || [];
    });
    setPlacements(nextPlacements);
  }, [configList]);
  // Clean up container if all notices fade out
  var onAllNoticeRemoved = function onAllNoticeRemoved(placement) {
    setPlacements(function (originPlacements) {
      var clone = (0, _objectSpread2.default)({}, originPlacements);
      var list = clone[placement] || [];
      if (!list.length) {
        delete clone[placement];
      }
      return clone;
    });
  };
  // Effect tell that placements is empty now
  var emptyRef = React.useRef(false);
  React.useEffect(function () {
    if (Object.keys(placements).length > 0) {
      emptyRef.current = true;
    } else if (emptyRef.current) {
      // Trigger only when from exist to empty
      onAllRemoved === null || onAllRemoved === void 0 ? void 0 : onAllRemoved();
      emptyRef.current = false;
    }
  }, [placements]);
  // ======================== Render ========================
  if (!container) {
    return null;
  }
  var placementList = Object.keys(placements);
  return /*#__PURE__*/(0, _reactDom.createPortal)( /*#__PURE__*/React.createElement(React.Fragment, null, placementList.map(function (placement) {
    var placementConfigList = placements[placement];
    var keys = placementConfigList.map(function (config) {
      return {
        config: config,
        key: config.key
      };
    });
    var placementMotion = typeof motion === 'function' ? motion(placement) : motion;
    return /*#__PURE__*/React.createElement(_rcMotion.CSSMotionList, (0, _extends2.default)({
      key: placement,
      className: (0, _classnames.default)(prefixCls, "".concat(prefixCls, "-").concat(placement), className === null || className === void 0 ? void 0 : className(placement)),
      style: style === null || style === void 0 ? void 0 : style(placement),
      keys: keys,
      motionAppear: true
    }, placementMotion, {
      onAllRemoved: function onAllRemoved() {
        onAllNoticeRemoved(placement);
      }
    }), function (_ref, nodeRef) {
      var config = _ref.config,
        motionClassName = _ref.className,
        motionStyle = _ref.style;
      var key = config.key,
        times = config.times;
      var configClassName = config.className,
        configStyle = config.style;
      return /*#__PURE__*/React.createElement(_Notice.default, (0, _extends2.default)({}, config, {
        ref: nodeRef,
        prefixCls: prefixCls,
        className: (0, _classnames.default)(motionClassName, configClassName),
        style: (0, _objectSpread2.default)((0, _objectSpread2.default)({}, motionStyle), configStyle),
        times: times,
        key: key,
        eventKey: key,
        onNoticeClose: onNoticeClose
      }));
    });
  })), container);
});
if (process.env.NODE_ENV !== 'production') {
  Notifications.displayName = 'Notifications';
}
var _default = Notifications;
exports.default = _default;