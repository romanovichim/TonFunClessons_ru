"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _cssinjs = require("@ant-design/cssinjs");
var _style = require("../../style");
var _internal = require("../../theme/internal");
const useStyle = iconPrefixCls => {
  const [theme, token] = (0, _internal.useToken)();
  // Generate style for icons
  return (0, _cssinjs.useStyleRegister)({
    theme,
    token,
    hashId: '',
    path: ['ant-design-icons', iconPrefixCls]
  }, () => [{
    [`.${iconPrefixCls}`]: Object.assign(Object.assign({}, (0, _style.resetIcon)()), {
      [`.${iconPrefixCls} .${iconPrefixCls}-icon`]: {
        display: 'block'
      }
    })
  }]);
};
var _default = useStyle;
exports.default = _default;