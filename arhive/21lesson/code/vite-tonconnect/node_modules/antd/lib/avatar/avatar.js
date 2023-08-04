"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _classnames = _interopRequireDefault(require("classnames"));
var _rcResizeObserver = _interopRequireDefault(require("rc-resize-observer"));
var _ref = require("rc-util/lib/ref");
var React = _interopRequireWildcard(require("react"));
var _configProvider = require("../config-provider");
var _useBreakpoint = _interopRequireDefault(require("../grid/hooks/useBreakpoint"));
var _responsiveObserver = require("../_util/responsiveObserver");
var _warning = _interopRequireDefault(require("../_util/warning"));
var _SizeContext = _interopRequireDefault(require("./SizeContext"));
var _style = _interopRequireDefault(require("./style"));
var __rest = void 0 && (void 0).__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
const InternalAvatar = (props, ref) => {
  const groupSize = React.useContext(_SizeContext.default);
  const [scale, setScale] = React.useState(1);
  const [mounted, setMounted] = React.useState(false);
  const [isImgExist, setIsImgExist] = React.useState(true);
  const avatarNodeRef = React.useRef(null);
  const avatarChildrenRef = React.useRef(null);
  const avatarNodeMergeRef = (0, _ref.composeRef)(ref, avatarNodeRef);
  const {
    getPrefixCls
  } = React.useContext(_configProvider.ConfigContext);
  const setScaleParam = () => {
    if (!avatarChildrenRef.current || !avatarNodeRef.current) {
      return;
    }
    const childrenWidth = avatarChildrenRef.current.offsetWidth; // offsetWidth avoid affecting be transform scale
    const nodeWidth = avatarNodeRef.current.offsetWidth;
    // denominator is 0 is no meaning
    if (childrenWidth !== 0 && nodeWidth !== 0) {
      const {
        gap = 4
      } = props;
      if (gap * 2 < nodeWidth) {
        setScale(nodeWidth - gap * 2 < childrenWidth ? (nodeWidth - gap * 2) / childrenWidth : 1);
      }
    }
  };
  React.useEffect(() => {
    setMounted(true);
  }, []);
  React.useEffect(() => {
    setIsImgExist(true);
    setScale(1);
  }, [props.src]);
  React.useEffect(() => {
    setScaleParam();
  }, [props.gap]);
  const handleImgLoadError = () => {
    const {
      onError
    } = props;
    const errorFlag = onError ? onError() : undefined;
    if (errorFlag !== false) {
      setIsImgExist(false);
    }
  };
  const {
      prefixCls: customizePrefixCls,
      shape = 'circle',
      size: customSize = 'default',
      src,
      srcSet,
      icon,
      className,
      rootClassName,
      alt,
      draggable,
      children,
      crossOrigin
    } = props,
    others = __rest(props, ["prefixCls", "shape", "size", "src", "srcSet", "icon", "className", "rootClassName", "alt", "draggable", "children", "crossOrigin"]);
  const size = customSize === 'default' ? groupSize : customSize;
  const needResponsive = Object.keys(typeof size === 'object' ? size || {} : {}).some(key => ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'].includes(key));
  const screens = (0, _useBreakpoint.default)(needResponsive);
  const responsiveSizeStyle = React.useMemo(() => {
    if (typeof size !== 'object') {
      return {};
    }
    const currentBreakpoint = _responsiveObserver.responsiveArray.find(screen => screens[screen]);
    const currentSize = size[currentBreakpoint];
    return currentSize ? {
      width: currentSize,
      height: currentSize,
      lineHeight: `${currentSize}px`,
      fontSize: icon ? currentSize / 2 : 18
    } : {};
  }, [screens, size]);
  process.env.NODE_ENV !== "production" ? (0, _warning.default)(!(typeof icon === 'string' && icon.length > 2), 'Avatar', `\`icon\` is using ReactNode instead of string naming in v4. Please check \`${icon}\` at https://ant.design/components/icon`) : void 0;
  const prefixCls = getPrefixCls('avatar', customizePrefixCls);
  const [wrapSSR, hashId] = (0, _style.default)(prefixCls);
  const sizeCls = (0, _classnames.default)({
    [`${prefixCls}-lg`]: size === 'large',
    [`${prefixCls}-sm`]: size === 'small'
  });
  const hasImageElement = /*#__PURE__*/React.isValidElement(src);
  const classString = (0, _classnames.default)(prefixCls, sizeCls, {
    [`${prefixCls}-${shape}`]: !!shape,
    [`${prefixCls}-image`]: hasImageElement || src && isImgExist,
    [`${prefixCls}-icon`]: !!icon
  }, className, rootClassName, hashId);
  const sizeStyle = typeof size === 'number' ? {
    width: size,
    height: size,
    lineHeight: `${size}px`,
    fontSize: icon ? size / 2 : 18
  } : {};
  let childrenToRender;
  if (typeof src === 'string' && isImgExist) {
    childrenToRender = /*#__PURE__*/React.createElement("img", {
      src: src,
      draggable: draggable,
      srcSet: srcSet,
      onError: handleImgLoadError,
      alt: alt,
      crossOrigin: crossOrigin
    });
  } else if (hasImageElement) {
    childrenToRender = src;
  } else if (icon) {
    childrenToRender = icon;
  } else if (mounted || scale !== 1) {
    const transformString = `scale(${scale}) translateX(-50%)`;
    const childrenStyle = {
      msTransform: transformString,
      WebkitTransform: transformString,
      transform: transformString
    };
    const sizeChildrenStyle = typeof size === 'number' ? {
      lineHeight: `${size}px`
    } : {};
    childrenToRender = /*#__PURE__*/React.createElement(_rcResizeObserver.default, {
      onResize: setScaleParam
    }, /*#__PURE__*/React.createElement("span", {
      className: `${prefixCls}-string`,
      ref: avatarChildrenRef,
      style: Object.assign(Object.assign({}, sizeChildrenStyle), childrenStyle)
    }, children));
  } else {
    childrenToRender = /*#__PURE__*/React.createElement("span", {
      className: `${prefixCls}-string`,
      style: {
        opacity: 0
      },
      ref: avatarChildrenRef
    }, children);
  }
  // The event is triggered twice from bubbling up the DOM tree.
  // see https://codesandbox.io/s/kind-snow-9lidz
  delete others.onError;
  delete others.gap;
  return wrapSSR( /*#__PURE__*/React.createElement("span", Object.assign({}, others, {
    style: Object.assign(Object.assign(Object.assign({}, sizeStyle), responsiveSizeStyle), others.style),
    className: classString,
    ref: avatarNodeMergeRef
  }), childrenToRender));
};
const Avatar = /*#__PURE__*/React.forwardRef(InternalAvatar);
if (process.env.NODE_ENV !== 'production') {
  Avatar.displayName = 'Avatar';
}
var _default = Avatar;
exports.default = _default;