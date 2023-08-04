"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));
var React = _interopRequireWildcard(require("react"));
var _usePatchElement = _interopRequireDefault(require("../../_util/hooks/usePatchElement"));
var _confirm = require("../confirm");
var _HookModal = _interopRequireDefault(require("./HookModal"));
var _destroyFns = _interopRequireDefault(require("../destroyFns"));
let uuid = 0;
const ElementsHolder = /*#__PURE__*/React.memo( /*#__PURE__*/React.forwardRef((_props, ref) => {
  const [elements, patchElement] = (0, _usePatchElement.default)();
  React.useImperativeHandle(ref, () => ({
    patchElement
  }), []);
  // eslint-disable-next-line react/jsx-no-useless-fragment
  return /*#__PURE__*/React.createElement(React.Fragment, null, elements);
}));
function useModal() {
  const holderRef = React.useRef(null);
  // ========================== Effect ==========================
  const [actionQueue, setActionQueue] = React.useState([]);
  React.useEffect(() => {
    if (actionQueue.length) {
      const cloneQueue = (0, _toConsumableArray2.default)(actionQueue);
      cloneQueue.forEach(action => {
        action();
      });
      setActionQueue([]);
    }
  }, [actionQueue]);
  // =========================== Hook ===========================
  const getConfirmFunc = React.useCallback(withFunc => function hookConfirm(config) {
    var _a;
    uuid += 1;
    const modalRef = /*#__PURE__*/React.createRef();
    let closeFunc;
    const modal = /*#__PURE__*/React.createElement(_HookModal.default, {
      key: `modal-${uuid}`,
      config: withFunc(config),
      ref: modalRef,
      afterClose: () => {
        closeFunc === null || closeFunc === void 0 ? void 0 : closeFunc();
      }
    });
    closeFunc = (_a = holderRef.current) === null || _a === void 0 ? void 0 : _a.patchElement(modal);
    if (closeFunc) {
      _destroyFns.default.push(closeFunc);
    }
    return {
      destroy: () => {
        function destroyAction() {
          var _a;
          (_a = modalRef.current) === null || _a === void 0 ? void 0 : _a.destroy();
        }
        if (modalRef.current) {
          destroyAction();
        } else {
          setActionQueue(prev => [].concat((0, _toConsumableArray2.default)(prev), [destroyAction]));
        }
      },
      update: newConfig => {
        function updateAction() {
          var _a;
          (_a = modalRef.current) === null || _a === void 0 ? void 0 : _a.update(newConfig);
        }
        if (modalRef.current) {
          updateAction();
        } else {
          setActionQueue(prev => [].concat((0, _toConsumableArray2.default)(prev), [updateAction]));
        }
      }
    };
  }, []);
  const fns = React.useMemo(() => ({
    info: getConfirmFunc(_confirm.withInfo),
    success: getConfirmFunc(_confirm.withSuccess),
    error: getConfirmFunc(_confirm.withError),
    warning: getConfirmFunc(_confirm.withWarn),
    confirm: getConfirmFunc(_confirm.withConfirm)
  }), []);
  return [fns, /*#__PURE__*/React.createElement(ElementsHolder, {
    key: "modal-holder",
    ref: holderRef
  })];
}
var _default = useModal;
exports.default = _default;