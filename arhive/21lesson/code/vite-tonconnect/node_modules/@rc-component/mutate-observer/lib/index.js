"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _ref = require("rc-util/lib/ref");

var _findDOMNode = _interopRequireDefault(require("rc-util/lib/Dom/findDOMNode"));

var _canUseDom = _interopRequireDefault(require("rc-util/lib/Dom/canUseDom"));

var _useEvent = _interopRequireDefault(require("rc-util/lib/hooks/useEvent"));

var _wapper = _interopRequireDefault(require("./wapper"));

var defOptions = {
  subtree: true,
  childList: true,
  attributeFilter: ['style', 'class']
};

var MutateObserver = function MutateObserver(props) {
  var children = props.children,
      _props$options = props.options,
      options = _props$options === void 0 ? defOptions : _props$options,
      _props$onMutate = props.onMutate,
      onMutate = _props$onMutate === void 0 ? function () {} : _props$onMutate;
  var callback = (0, _useEvent.default)(onMutate);
  var wrapperRef = (0, _react.useRef)(null);

  var elementRef = _react.default.useRef(null);

  var canRef = /*#__PURE__*/_react.default.isValidElement(children) && (0, _ref.supportRef)(children);
  var originRef = canRef ? children === null || children === void 0 ? void 0 : children.ref : null;

  var mergedRef = _react.default.useMemo(function () {
    return (0, _ref.composeRef)(originRef, elementRef);
  }, [originRef, elementRef]);

  (0, _react.useEffect)(function () {
    if (!(0, _canUseDom.default)()) {
      return;
    }

    var instance;
    var currentElement = (0, _findDOMNode.default)(originRef === null || originRef === void 0 ? void 0 : originRef.current) || (0, _findDOMNode.default)(wrapperRef === null || wrapperRef === void 0 ? void 0 : wrapperRef.current);

    if (currentElement && 'MutationObserver' in window) {
      instance = new MutationObserver(callback);
      instance.observe(currentElement, options);
    }

    return function () {
      var _instance, _instance2;

      (_instance = instance) === null || _instance === void 0 ? void 0 : _instance.takeRecords();
      (_instance2 = instance) === null || _instance2 === void 0 ? void 0 : _instance2.disconnect();
    }; // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options, originRef]);

  if (!children) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('MutationObserver need children props');
    }

    return null;
  }

  return /*#__PURE__*/_react.default.createElement(_wapper.default, {
    ref: wrapperRef
  }, canRef ? /*#__PURE__*/_react.default.cloneElement(children, {
    ref: mergedRef
  }) : children);
};

var _default = MutateObserver;
exports.default = _default;