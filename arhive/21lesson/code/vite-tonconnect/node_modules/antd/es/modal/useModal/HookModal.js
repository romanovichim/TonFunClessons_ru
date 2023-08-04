import _toConsumableArray from "@babel/runtime/helpers/esm/toConsumableArray";
import * as React from 'react';
import { ConfigContext } from '../../config-provider';
import defaultLocale from '../../locale/en_US';
import useLocale from '../../locale/useLocale';
import ConfirmDialog from '../ConfirmDialog';
const HookModal = (_ref, ref) => {
  let {
    afterClose,
    config
  } = _ref;
  var _a;
  const [open, setOpen] = React.useState(true);
  const [innerConfig, setInnerConfig] = React.useState(config);
  const {
    direction,
    getPrefixCls
  } = React.useContext(ConfigContext);
  const prefixCls = getPrefixCls('modal');
  const rootPrefixCls = getPrefixCls();
  const close = function () {
    setOpen(false);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    const triggerCancel = args.some(param => param && param.triggerCancel);
    if (innerConfig.onCancel && triggerCancel) {
      innerConfig.onCancel.apply(innerConfig, [() => {}].concat(_toConsumableArray(args.slice(1))));
    }
  };
  React.useImperativeHandle(ref, () => ({
    destroy: close,
    update: newConfig => {
      setInnerConfig(originConfig => Object.assign(Object.assign({}, originConfig), newConfig));
    }
  }));
  const mergedOkCancel = (_a = innerConfig.okCancel) !== null && _a !== void 0 ? _a : innerConfig.type === 'confirm';
  const [contextLocale] = useLocale('Modal', defaultLocale.Modal);
  return /*#__PURE__*/React.createElement(ConfirmDialog, Object.assign({
    prefixCls: prefixCls,
    rootPrefixCls: rootPrefixCls
  }, innerConfig, {
    close: close,
    open: open,
    afterClose: afterClose,
    okText: innerConfig.okText || (mergedOkCancel ? contextLocale === null || contextLocale === void 0 ? void 0 : contextLocale.okText : contextLocale === null || contextLocale === void 0 ? void 0 : contextLocale.justOkText),
    direction: direction,
    cancelText: innerConfig.cancelText || (contextLocale === null || contextLocale === void 0 ? void 0 : contextLocale.cancelText)
  }));
};
export default /*#__PURE__*/React.forwardRef(HookModal);