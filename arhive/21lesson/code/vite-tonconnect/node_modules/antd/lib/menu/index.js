"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _rcMenu = require("rc-menu");
var React = _interopRequireWildcard(require("react"));
var _menu = _interopRequireDefault(require("./menu"));
var _Sider = require("../layout/Sider");
var _MenuDivider = _interopRequireDefault(require("./MenuDivider"));
var _MenuItem = _interopRequireDefault(require("./MenuItem"));
var _SubMenu = _interopRequireDefault(require("./SubMenu"));
const Menu = /*#__PURE__*/(0, React.forwardRef)((props, ref) => {
  const menuRef = (0, React.useRef)(null);
  const context = React.useContext(_Sider.SiderContext);
  (0, React.useImperativeHandle)(ref, () => ({
    menu: menuRef.current,
    focus: options => {
      var _a;
      (_a = menuRef.current) === null || _a === void 0 ? void 0 : _a.focus(options);
    }
  }));
  return /*#__PURE__*/React.createElement(_menu.default, Object.assign({
    ref: menuRef
  }, props, context));
});
Menu.Item = _MenuItem.default;
Menu.SubMenu = _SubMenu.default;
Menu.Divider = _MenuDivider.default;
Menu.ItemGroup = _rcMenu.ItemGroup;
if (process.env.NODE_ENV !== 'production') {
  Menu.displayName = 'Menu';
}
var _default = Menu;
exports.default = _default;