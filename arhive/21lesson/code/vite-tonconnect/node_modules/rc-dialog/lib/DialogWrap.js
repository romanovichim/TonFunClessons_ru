"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var React = _interopRequireWildcard(require("react"));
var _portal = _interopRequireDefault(require("@rc-component/portal"));
var _Dialog = _interopRequireDefault(require("./Dialog"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
// fix issue #10656
/*
 * getContainer remarks
 * Custom container should not be return, because in the Portal component, it will remove the
 * return container element here, if the custom container is the only child of it's component,
 * like issue #10656, It will has a conflict with removeChild method in react-dom.
 * So here should add a child (div element) to custom container.
 * */
var DialogWrap = function DialogWrap(props) {
  var visible = props.visible,
    getContainer = props.getContainer,
    forceRender = props.forceRender,
    _props$destroyOnClose = props.destroyOnClose,
    destroyOnClose = _props$destroyOnClose === void 0 ? false : _props$destroyOnClose,
    _afterClose = props.afterClose;
  var _React$useState = React.useState(visible),
    _React$useState2 = (0, _slicedToArray2.default)(_React$useState, 2),
    animatedVisible = _React$useState2[0],
    setAnimatedVisible = _React$useState2[1];
  React.useEffect(function () {
    if (visible) {
      setAnimatedVisible(true);
    }
  }, [visible]);
  // // 渲染在当前 dom 里；
  // if (getContainer === false) {
  //   return (
  //     <Dialog
  //       {...props}
  //       getOpenCount={() => 2} // 不对 body 做任何操作。。
  //     />
  //   );
  // }
  // Destroy on close will remove wrapped div
  if (!forceRender && destroyOnClose && !animatedVisible) {
    return null;
  }
  return /*#__PURE__*/React.createElement(_portal.default, {
    open: visible || forceRender || animatedVisible,
    autoDestroy: false,
    getContainer: getContainer,
    autoLock: visible || animatedVisible
  }, /*#__PURE__*/React.createElement(_Dialog.default, (0, _extends2.default)({}, props, {
    destroyOnClose: destroyOnClose,
    afterClose: function afterClose() {
      _afterClose === null || _afterClose === void 0 ? void 0 : _afterClose();
      setAnimatedVisible(false);
    }
  })));
};
DialogWrap.displayName = 'Dialog';
var _default = DialogWrap;
exports.default = _default;