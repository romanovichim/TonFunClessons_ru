"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _DownOutlined = _interopRequireDefault(require("@ant-design/icons/DownOutlined"));
var React = _interopRequireWildcard(require("react"));
var _configProvider = require("../config-provider");
var _dropdown = _interopRequireDefault(require("../dropdown/dropdown"));
var _warning = _interopRequireDefault(require("../_util/warning"));
var _BreadcrumbSeparator = _interopRequireDefault(require("./BreadcrumbSeparator"));
var __rest = void 0 && (void 0).__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
const BreadcrumbItem = props => {
  const {
      prefixCls: customizePrefixCls,
      separator = '/',
      children,
      menu,
      overlay,
      dropdownProps,
      href
    } = props,
    restProps = __rest(props, ["prefixCls", "separator", "children", "menu", "overlay", "dropdownProps", "href"]);
  const {
    getPrefixCls
  } = React.useContext(_configProvider.ConfigContext);
  const prefixCls = getPrefixCls('breadcrumb', customizePrefixCls);
  // Warning for deprecated usage
  if (process.env.NODE_ENV !== 'production') {
    process.env.NODE_ENV !== "production" ? (0, _warning.default)(!('overlay' in props), 'Breadcrumb.Item', '`overlay` is deprecated. Please use `menu` instead.') : void 0;
  }
  /** If overlay is have Wrap a Dropdown */
  const renderBreadcrumbNode = breadcrumbItem => {
    if (menu || overlay) {
      const mergeDropDownProps = Object.assign({}, dropdownProps);
      if (menu) {
        const _a = menu || {},
          {
            items
          } = _a,
          menuProps = __rest(_a, ["items"]);
        mergeDropDownProps.menu = Object.assign(Object.assign({}, menuProps), {
          items: items === null || items === void 0 ? void 0 : items.map((_a, index) => {
            var {
                title,
                label,
                path
              } = _a,
              itemProps = __rest(_a, ["title", "label", "path"]);
            let mergedLabel = label !== null && label !== void 0 ? label : title;
            if (path) {
              mergedLabel = /*#__PURE__*/React.createElement("a", {
                href: `${href}${path}`
              }, mergedLabel);
            }
            return Object.assign(Object.assign({}, itemProps), {
              key: index,
              label: mergedLabel
            });
          })
        });
      } else if (overlay) {
        mergeDropDownProps.overlay = overlay;
      }
      return /*#__PURE__*/React.createElement(_dropdown.default, Object.assign({
        placement: "bottom"
      }, mergeDropDownProps), /*#__PURE__*/React.createElement("span", {
        className: `${prefixCls}-overlay-link`
      }, breadcrumbItem, /*#__PURE__*/React.createElement(_DownOutlined.default, null)));
    }
    return breadcrumbItem;
  };
  let link;
  if (href !== undefined) {
    link = /*#__PURE__*/React.createElement("a", Object.assign({
      className: `${prefixCls}-link`,
      href: href
    }, restProps), children);
  } else {
    link = /*#__PURE__*/React.createElement("span", Object.assign({
      className: `${prefixCls}-link`
    }, restProps), children);
  }
  // wrap to dropDown
  link = renderBreadcrumbNode(link);
  if (children !== undefined && children !== null) {
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("li", null, link), separator && /*#__PURE__*/React.createElement(_BreadcrumbSeparator.default, null, separator));
  }
  return null;
};
BreadcrumbItem.__ANT_BREADCRUMB_ITEM = true;
var _default = BreadcrumbItem;
exports.default = _default;