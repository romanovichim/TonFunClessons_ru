"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _EyeOutlined = _interopRequireDefault(require("@ant-design/icons/EyeOutlined"));
var _classnames = _interopRequireDefault(require("classnames"));
var _rcImage = _interopRequireDefault(require("rc-image"));
var React = _interopRequireWildcard(require("react"));
var _configProvider = require("../config-provider");
var _en_US = _interopRequireDefault(require("../locale/en_US"));
var _motion = require("../_util/motion");
var _PreviewGroup = _interopRequireWildcard(require("./PreviewGroup"));
var _style = _interopRequireDefault(require("./style"));
var __rest = void 0 && (void 0).__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
const Image = _a => {
  var {
      prefixCls: customizePrefixCls,
      preview,
      rootClassName
    } = _a,
    otherProps = __rest(_a, ["prefixCls", "preview", "rootClassName"]);
  const {
    getPrefixCls,
    locale: contextLocale = _en_US.default,
    getPopupContainer: getContextPopupContainer
  } = React.useContext(_configProvider.ConfigContext);
  const prefixCls = getPrefixCls('image', customizePrefixCls);
  const rootPrefixCls = getPrefixCls();
  const imageLocale = contextLocale.Image || _en_US.default.Image;
  // Style
  const [wrapSSR, hashId] = (0, _style.default)(prefixCls);
  const mergedRootClassName = (0, _classnames.default)(rootClassName, hashId);
  const mergedPreview = React.useMemo(() => {
    if (preview === false) {
      return preview;
    }
    const _preview = typeof preview === 'object' ? preview : {};
    const {
        getContainer
      } = _preview,
      restPreviewProps = __rest(_preview, ["getContainer"]);
    return Object.assign(Object.assign({
      mask: /*#__PURE__*/React.createElement("div", {
        className: `${prefixCls}-mask-info`
      }, /*#__PURE__*/React.createElement(_EyeOutlined.default, null), imageLocale === null || imageLocale === void 0 ? void 0 : imageLocale.preview),
      icons: _PreviewGroup.icons
    }, restPreviewProps), {
      getContainer: getContainer || getContextPopupContainer,
      transitionName: (0, _motion.getTransitionName)(rootPrefixCls, 'zoom', _preview.transitionName),
      maskTransitionName: (0, _motion.getTransitionName)(rootPrefixCls, 'fade', _preview.maskTransitionName)
    });
  }, [preview, imageLocale]);
  return wrapSSR( /*#__PURE__*/React.createElement(_rcImage.default, Object.assign({
    prefixCls: `${prefixCls}`,
    preview: mergedPreview,
    rootClassName: mergedRootClassName
  }, otherProps)));
};
Image.PreviewGroup = _PreviewGroup.default;
if (process.env.NODE_ENV !== 'production') {
  Image.displayName = 'Image';
}
var _default = Image;
exports.default = _default;