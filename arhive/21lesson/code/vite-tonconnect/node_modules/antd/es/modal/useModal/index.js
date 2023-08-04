import _toConsumableArray from "@babel/runtime/helpers/esm/toConsumableArray";
import * as React from 'react';
import usePatchElement from '../../_util/hooks/usePatchElement';
import { withConfirm, withError, withInfo, withSuccess, withWarn } from '../confirm';
import HookModal from './HookModal';
import destroyFns from '../destroyFns';
let uuid = 0;
const ElementsHolder = /*#__PURE__*/React.memo( /*#__PURE__*/React.forwardRef((_props, ref) => {
  const [elements, patchElement] = usePatchElement();
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
      const cloneQueue = _toConsumableArray(actionQueue);
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
    const modal = /*#__PURE__*/React.createElement(HookModal, {
      key: `modal-${uuid}`,
      config: withFunc(config),
      ref: modalRef,
      afterClose: () => {
        closeFunc === null || closeFunc === void 0 ? void 0 : closeFunc();
      }
    });
    closeFunc = (_a = holderRef.current) === null || _a === void 0 ? void 0 : _a.patchElement(modal);
    if (closeFunc) {
      destroyFns.push(closeFunc);
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
          setActionQueue(prev => [].concat(_toConsumableArray(prev), [destroyAction]));
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
          setActionQueue(prev => [].concat(_toConsumableArray(prev), [updateAction]));
        }
      }
    };
  }, []);
  const fns = React.useMemo(() => ({
    info: getConfirmFunc(withInfo),
    success: getConfirmFunc(withSuccess),
    error: getConfirmFunc(withError),
    warning: getConfirmFunc(withWarn),
    confirm: getConfirmFunc(withConfirm)
  }), []);
  return [fns, /*#__PURE__*/React.createElement(ElementsHolder, {
    key: "modal-holder",
    ref: holderRef
  })];
}
export default useModal;