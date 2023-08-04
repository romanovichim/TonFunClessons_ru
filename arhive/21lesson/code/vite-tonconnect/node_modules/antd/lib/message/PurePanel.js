"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PureContent = PureContent;
exports.TypeIcon = void 0;
exports.default = PurePanel;
var React = _interopRequireWildcard(require("react"));
var _LoadingOutlined = _interopRequireDefault(require("@ant-design/icons/LoadingOutlined"));
var _ExclamationCircleFilled = _interopRequireDefault(require("@ant-design/icons/ExclamationCircleFilled"));
var _CloseCircleFilled = _interopRequireDefault(require("@ant-design/icons/CloseCircleFilled"));
var _CheckCircleFilled = _interopRequireDefault(require("@ant-design/icons/CheckCircleFilled"));
var _InfoCircleFilled = _interopRequireDefault(require("@ant-design/icons/InfoCircleFilled"));
var _rcNotification = require("rc-notification");
var _classnames = _interopRequireDefault(require("classnames"));
var _style = _interopRequireDefault(require("./style"));
var _configProvider = require("../config-provider");
var __rest = void 0 && (void 0).__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
const TypeIcon = {
  info: /*#__PURE__*/React.createElement(_InfoCircleFilled.default, null),
  success: /*#__PURE__*/React.createElement(_CheckCircleFilled.default, null),
  error: /*#__PURE__*/React.createElement(_CloseCircleFilled.default, null),
  warning: /*#__PURE__*/React.createElement(_ExclamationCircleFilled.default, null),
  loading: /*#__PURE__*/React.createElement(_LoadingOutlined.default, null)
};
exports.TypeIcon = TypeIcon;
function PureContent(_ref) {
  let {
    prefixCls,
    type,
    icon,
    children
  } = _ref;
  return /*#__PURE__*/React.createElement("div", {
    className: (0, _classnames.default)(`${prefixCls}-custom-content`, `${prefixCls}-${type}`)
  }, icon || TypeIcon[type], /*#__PURE__*/React.createElement("span", null, children));
}
/** @private Internal Component. Do not use in your production. */
function PurePanel(props) {
  const {
      prefixCls: staticPrefixCls,
      className,
      type,
      icon,
      content
    } = props,
    restProps = __rest(props, ["prefixCls", "className", "type", "icon", "content"]);
  const {
    getPrefixCls
  } = React.useContext(_configProvider.ConfigContext);
  const prefixCls = staticPrefixCls || getPrefixCls('message');
  const [, hashId] = (0, _style.default)(prefixCls);
  return /*#__PURE__*/React.createElement(_rcNotification.Notice, Object.assign({}, restProps, {
    prefixCls: prefixCls,
    className: (0, _classnames.default)(className, hashId, `${prefixCls}-notice-pure-panel`),
    eventKey: "pure",
    duration: null,
    content: /*#__PURE__*/React.createElement(PureContent, {
      prefixCls: prefixCls,
      type: type,
      icon: icon
    }, content)
  }));
}