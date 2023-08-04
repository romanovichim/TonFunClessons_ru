"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useTreeSelectStyle;
var _style = require("../../checkbox/style");
var _internal = require("../../theme/internal");
var _style2 = require("../../tree/style");
// =============================== Base ===============================
const genBaseStyle = token => {
  const {
    componentCls,
    treePrefixCls,
    colorBgElevated
  } = token;
  const treeCls = `.${treePrefixCls}`;
  return [
  // ======================================================
  // ==                     Dropdown                     ==
  // ======================================================
  {
    [`${componentCls}-dropdown`]: [{
      padding: `${token.paddingXS}px ${token.paddingXS / 2}px`
    },
    // ====================== Tree ======================
    (0, _style2.genTreeStyle)(treePrefixCls, (0, _internal.mergeToken)(token, {
      colorBgContainer: colorBgElevated
    })), {
      [treeCls]: {
        borderRadius: 0,
        '&-list-holder-inner': {
          alignItems: 'stretch',
          [`${treeCls}-treenode`]: {
            [`${treeCls}-node-content-wrapper`]: {
              flex: 'auto'
            }
          }
        }
      }
    },
    // ==================== Checkbox ====================
    (0, _style.getStyle)(`${treePrefixCls}-checkbox`, token),
    // ====================== RTL =======================
    {
      '&-rtl': {
        direction: 'rtl',
        [`${treeCls}-switcher${treeCls}-switcher_close`]: {
          [`${treeCls}-switcher-icon svg`]: {
            transform: 'rotate(90deg)'
          }
        }
      }
    }]
  }];
};
// ============================== Export ==============================
function useTreeSelectStyle(prefixCls, treePrefixCls) {
  return (0, _internal.genComponentStyleHook)('TreeSelect', token => {
    const treeSelectToken = (0, _internal.mergeToken)(token, {
      treePrefixCls
    });
    return [genBaseStyle(treeSelectToken)];
  })(prefixCls);
}