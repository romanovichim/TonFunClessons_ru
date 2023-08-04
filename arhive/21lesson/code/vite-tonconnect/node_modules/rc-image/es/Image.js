import _extends from "@babel/runtime/helpers/esm/extends";
import _objectSpread from "@babel/runtime/helpers/esm/objectSpread2";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import _typeof from "@babel/runtime/helpers/esm/typeof";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
var _excluded = ["src", "alt", "onPreviewClose", "prefixCls", "previewPrefixCls", "placeholder", "fallback", "width", "height", "style", "preview", "className", "onClick", "onError", "wrapperClassName", "wrapperStyle", "rootClassName", "crossOrigin", "decoding", "loading", "referrerPolicy", "sizes", "srcSet", "useMap", "draggable"],
  _excluded2 = ["src", "visible", "onVisibleChange", "getContainer", "mask", "maskClassName", "icons", "scaleStep"];
import * as React from 'react';
import { useState } from 'react';
import cn from 'classnames';
import { getOffset } from "rc-util/es/Dom/css";
import useMergedState from "rc-util/es/hooks/useMergedState";
import Preview from "./Preview";
import PreviewGroup, { context } from "./PreviewGroup";
var uuid = 0;
function isImageValid(src) {
  return new Promise(function (resolve) {
    var img = document.createElement('img');
    img.onerror = function () {
      return resolve(false);
    };
    img.onload = function () {
      return resolve(true);
    };
    img.src = src;
  });
}
var ImageInternal = function ImageInternal(_ref) {
  var _imgCommonProps$style;
  var imgSrc = _ref.src,
    alt = _ref.alt,
    onInitialPreviewClose = _ref.onPreviewClose,
    _ref$prefixCls = _ref.prefixCls,
    prefixCls = _ref$prefixCls === void 0 ? 'rc-image' : _ref$prefixCls,
    _ref$previewPrefixCls = _ref.previewPrefixCls,
    previewPrefixCls = _ref$previewPrefixCls === void 0 ? "".concat(prefixCls, "-preview") : _ref$previewPrefixCls,
    placeholder = _ref.placeholder,
    fallback = _ref.fallback,
    width = _ref.width,
    height = _ref.height,
    style = _ref.style,
    _ref$preview = _ref.preview,
    preview = _ref$preview === void 0 ? true : _ref$preview,
    className = _ref.className,
    onClick = _ref.onClick,
    onError = _ref.onError,
    wrapperClassName = _ref.wrapperClassName,
    wrapperStyle = _ref.wrapperStyle,
    rootClassName = _ref.rootClassName,
    crossOrigin = _ref.crossOrigin,
    decoding = _ref.decoding,
    loading = _ref.loading,
    referrerPolicy = _ref.referrerPolicy,
    sizes = _ref.sizes,
    srcSet = _ref.srcSet,
    useMap = _ref.useMap,
    draggable = _ref.draggable,
    otherProps = _objectWithoutProperties(_ref, _excluded);
  var isCustomPlaceholder = placeholder && placeholder !== true;
  var _ref2 = _typeof(preview) === 'object' ? preview : {},
    previewSrc = _ref2.src,
    _ref2$visible = _ref2.visible,
    previewVisible = _ref2$visible === void 0 ? undefined : _ref2$visible,
    _ref2$onVisibleChange = _ref2.onVisibleChange,
    onPreviewVisibleChange = _ref2$onVisibleChange === void 0 ? onInitialPreviewClose : _ref2$onVisibleChange,
    _ref2$getContainer = _ref2.getContainer,
    getPreviewContainer = _ref2$getContainer === void 0 ? undefined : _ref2$getContainer,
    previewMask = _ref2.mask,
    maskClassName = _ref2.maskClassName,
    icons = _ref2.icons,
    scaleStep = _ref2.scaleStep,
    dialogProps = _objectWithoutProperties(_ref2, _excluded2);
  var src = previewSrc !== null && previewSrc !== void 0 ? previewSrc : imgSrc;
  var isControlled = previewVisible !== undefined;
  var _useMergedState = useMergedState(!!previewVisible, {
      value: previewVisible,
      onChange: onPreviewVisibleChange
    }),
    _useMergedState2 = _slicedToArray(_useMergedState, 2),
    isShowPreview = _useMergedState2[0],
    setShowPreview = _useMergedState2[1];
  var _useState = useState(isCustomPlaceholder ? 'loading' : 'normal'),
    _useState2 = _slicedToArray(_useState, 2),
    status = _useState2[0],
    setStatus = _useState2[1];
  var _useState3 = useState(null),
    _useState4 = _slicedToArray(_useState3, 2),
    mousePosition = _useState4[0],
    setMousePosition = _useState4[1];
  var isError = status === 'error';
  var _React$useContext = React.useContext(context),
    isPreviewGroup = _React$useContext.isPreviewGroup,
    setCurrent = _React$useContext.setCurrent,
    setGroupShowPreview = _React$useContext.setShowPreview,
    setGroupMousePosition = _React$useContext.setMousePosition,
    registerImage = _React$useContext.registerImage;
  var _React$useState = React.useState(function () {
      uuid += 1;
      return uuid;
    }),
    _React$useState2 = _slicedToArray(_React$useState, 1),
    currentId = _React$useState2[0];
  var canPreview = !!preview;
  var isLoaded = React.useRef(false);
  var onLoad = function onLoad() {
    setStatus('normal');
  };
  var onPreview = function onPreview(e) {
    if (!isControlled) {
      var _getOffset = getOffset(e.target),
        left = _getOffset.left,
        top = _getOffset.top;
      if (isPreviewGroup) {
        setCurrent(currentId);
        setGroupMousePosition({
          x: left,
          y: top
        });
      } else {
        setMousePosition({
          x: left,
          y: top
        });
      }
    }
    if (isPreviewGroup) {
      setGroupShowPreview(true);
    } else {
      setShowPreview(true);
    }
    onClick === null || onClick === void 0 ? void 0 : onClick(e);
  };
  var onPreviewClose = function onPreviewClose(e) {
    e.stopPropagation();
    setShowPreview(false);
    if (!isControlled) {
      setMousePosition(null);
    }
  };
  var getImgRef = function getImgRef(img) {
    isLoaded.current = false;
    if (status !== 'loading') return;
    if (img !== null && img !== void 0 && img.complete && (img.naturalWidth || img.naturalHeight)) {
      isLoaded.current = true;
      onLoad();
    }
  };
  React.useEffect(function () {
    isImageValid(src).then(function (isValid) {
      if (!isValid) {
        setStatus('error');
      }
    });
  }, [src]);

  // Keep order start
  // Resolve https://github.com/ant-design/ant-design/issues/28881
  // Only need unRegister when component unMount
  React.useEffect(function () {
    var unRegister = registerImage(currentId, src);
    return unRegister;
  }, []);
  React.useEffect(function () {
    registerImage(currentId, src, canPreview);
  }, [src, canPreview]);
  // Keep order end

  React.useEffect(function () {
    if (isError) {
      setStatus('normal');
    }
    if (isCustomPlaceholder && !isLoaded.current) {
      setStatus('loading');
    }
  }, [imgSrc]);
  var wrapperClass = cn(prefixCls, wrapperClassName, rootClassName, _defineProperty({}, "".concat(prefixCls, "-error"), isError));
  var mergedSrc = isError && fallback ? fallback : src;
  var imgCommonProps = {
    crossOrigin: crossOrigin,
    decoding: decoding,
    draggable: draggable,
    loading: loading,
    referrerPolicy: referrerPolicy,
    sizes: sizes,
    srcSet: srcSet,
    useMap: useMap,
    onError: onError,
    alt: alt,
    className: cn("".concat(prefixCls, "-img"), _defineProperty({}, "".concat(prefixCls, "-img-placeholder"), placeholder === true), className),
    style: _objectSpread({
      height: height
    }, style)
  };
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", _extends({}, otherProps, {
    className: wrapperClass,
    onClick: canPreview ? onPreview : onClick,
    style: _objectSpread({
      width: width,
      height: height
    }, wrapperStyle)
  }), /*#__PURE__*/React.createElement("img", _extends({}, imgCommonProps, {
    ref: getImgRef
  }, isError && fallback ? {
    src: fallback
  } : {
    onLoad: onLoad,
    src: imgSrc
  }, {
    width: width,
    height: height
  })), status === 'loading' && /*#__PURE__*/React.createElement("div", {
    "aria-hidden": "true",
    className: "".concat(prefixCls, "-placeholder")
  }, placeholder), previewMask && canPreview && /*#__PURE__*/React.createElement("div", {
    className: cn("".concat(prefixCls, "-mask"), maskClassName),
    style: {
      display: ((_imgCommonProps$style = imgCommonProps.style) === null || _imgCommonProps$style === void 0 ? void 0 : _imgCommonProps$style.display) === 'none' ? 'none' : undefined
    }
  }, previewMask)), !isPreviewGroup && canPreview && /*#__PURE__*/React.createElement(Preview, _extends({
    "aria-hidden": !isShowPreview,
    visible: isShowPreview,
    prefixCls: previewPrefixCls,
    onClose: onPreviewClose,
    mousePosition: mousePosition,
    src: mergedSrc,
    alt: alt,
    getContainer: getPreviewContainer,
    icons: icons,
    scaleStep: scaleStep,
    rootClassName: rootClassName
  }, dialogProps)));
};
ImageInternal.PreviewGroup = PreviewGroup;
ImageInternal.displayName = 'Image';
export default ImageInternal;