"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof3 = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.context = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var _useMergedState5 = _interopRequireDefault(require("rc-util/lib/hooks/useMergedState"));
var React = _interopRequireWildcard(require("react"));
var _Preview = _interopRequireDefault(require("./Preview"));
var _excluded = ["visible", "onVisibleChange", "getContainer", "current", "countRender", "onChange"];
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof3(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/* istanbul ignore next */
var context = /*#__PURE__*/React.createContext({
  previewUrls: new Map(),
  setPreviewUrls: function setPreviewUrls() {
    return null;
  },
  current: null,
  setCurrent: function setCurrent() {
    return null;
  },
  setShowPreview: function setShowPreview() {
    return null;
  },
  setMousePosition: function setMousePosition() {
    return null;
  },
  registerImage: function registerImage() {
    return function () {
      return null;
    };
  },
  rootClassName: ''
});
exports.context = context;
var Provider = context.Provider;
function getSafeIndex(keys, key) {
  if (key === undefined) return undefined;
  var index = keys.indexOf(key);
  if (index === -1) return undefined;
  return index;
}
var Group = function Group(_ref) {
  var _ref$previewPrefixCls = _ref.previewPrefixCls,
    previewPrefixCls = _ref$previewPrefixCls === void 0 ? 'rc-image-preview' : _ref$previewPrefixCls,
    children = _ref.children,
    _ref$icons = _ref.icons,
    icons = _ref$icons === void 0 ? {} : _ref$icons,
    preview = _ref.preview;
  var _ref2 = (0, _typeof2.default)(preview) === 'object' ? preview : {},
    _ref2$visible = _ref2.visible,
    previewVisible = _ref2$visible === void 0 ? undefined : _ref2$visible,
    _ref2$onVisibleChange = _ref2.onVisibleChange,
    onPreviewVisibleChange = _ref2$onVisibleChange === void 0 ? undefined : _ref2$onVisibleChange,
    _ref2$getContainer = _ref2.getContainer,
    getContainer = _ref2$getContainer === void 0 ? undefined : _ref2$getContainer,
    _ref2$current = _ref2.current,
    currentIndex = _ref2$current === void 0 ? 0 : _ref2$current,
    _ref2$countRender = _ref2.countRender,
    countRender = _ref2$countRender === void 0 ? undefined : _ref2$countRender,
    _ref2$onChange = _ref2.onChange,
    _onChange = _ref2$onChange === void 0 ? undefined : _ref2$onChange,
    dialogProps = (0, _objectWithoutProperties2.default)(_ref2, _excluded);
  var _useState = (0, React.useState)(new Map()),
    _useState2 = (0, _slicedToArray2.default)(_useState, 2),
    previewUrls = _useState2[0],
    setPreviewUrls = _useState2[1];
  var previewUrlsKeys = Array.from(previewUrls.keys());
  var prevCurrent = React.useRef();
  var _useMergedState = (0, _useMergedState5.default)(undefined, {
      onChange: function onChange(val, prev) {
        if (prevCurrent.current !== undefined) {
          _onChange === null || _onChange === void 0 ? void 0 : _onChange(getSafeIndex(previewUrlsKeys, val), getSafeIndex(previewUrlsKeys, prev));
        }
        prevCurrent.current = prev;
      }
    }),
    _useMergedState2 = (0, _slicedToArray2.default)(_useMergedState, 2),
    current = _useMergedState2[0],
    setCurrent = _useMergedState2[1];
  var _useMergedState3 = (0, _useMergedState5.default)(!!previewVisible, {
      value: previewVisible,
      onChange: function onChange(val, prevVal) {
        onPreviewVisibleChange === null || onPreviewVisibleChange === void 0 ? void 0 : onPreviewVisibleChange(val, prevVal, getSafeIndex(previewUrlsKeys, current));
        prevCurrent.current = val ? current : undefined;
      }
    }),
    _useMergedState4 = (0, _slicedToArray2.default)(_useMergedState3, 2),
    isShowPreview = _useMergedState4[0],
    setShowPreview = _useMergedState4[1];
  var _useState3 = (0, React.useState)(null),
    _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
    mousePosition = _useState4[0],
    setMousePosition = _useState4[1];
  var isControlled = previewVisible !== undefined;
  var currentControlledKey = previewUrlsKeys[currentIndex];
  var canPreviewUrls = new Map(Array.from(previewUrls).filter(function (_ref3) {
    var _ref4 = (0, _slicedToArray2.default)(_ref3, 2),
      canPreview = _ref4[1].canPreview;
    return !!canPreview;
  }).map(function (_ref5) {
    var _ref6 = (0, _slicedToArray2.default)(_ref5, 2),
      id = _ref6[0],
      url = _ref6[1].url;
    return [id, url];
  }));
  var registerImage = function registerImage(id, url) {
    var canPreview = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
    var unRegister = function unRegister() {
      setPreviewUrls(function (oldPreviewUrls) {
        var clonePreviewUrls = new Map(oldPreviewUrls);
        var deleteResult = clonePreviewUrls.delete(id);
        return deleteResult ? clonePreviewUrls : oldPreviewUrls;
      });
    };
    setPreviewUrls(function (oldPreviewUrls) {
      return new Map(oldPreviewUrls).set(id, {
        url: url,
        canPreview: canPreview
      });
    });
    return unRegister;
  };
  var onPreviewClose = function onPreviewClose(e) {
    e.stopPropagation();
    setShowPreview(false);
    setMousePosition(null);
  };
  React.useEffect(function () {
    setCurrent(currentControlledKey);
  }, [currentControlledKey]);
  React.useEffect(function () {
    if (!isShowPreview && isControlled) {
      setCurrent(currentControlledKey);
    }
  }, [currentControlledKey, isControlled, isShowPreview]);
  return /*#__PURE__*/React.createElement(Provider, {
    value: {
      isPreviewGroup: true,
      previewUrls: canPreviewUrls,
      setPreviewUrls: setPreviewUrls,
      current: current,
      setCurrent: setCurrent,
      setShowPreview: setShowPreview,
      setMousePosition: setMousePosition,
      registerImage: registerImage
    }
  }, children, /*#__PURE__*/React.createElement(_Preview.default, (0, _extends2.default)({
    "aria-hidden": !isShowPreview,
    visible: isShowPreview,
    prefixCls: previewPrefixCls,
    onClose: onPreviewClose,
    mousePosition: mousePosition,
    src: canPreviewUrls.get(current),
    icons: icons,
    getContainer: getContainer,
    countRender: countRender
  }, dialogProps)));
};
var _default = Group;
exports.default = _default;