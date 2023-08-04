"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useImageTransform;
var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread2"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _react = require("react");
var _raf = _interopRequireDefault(require("rc-util/lib/raf"));
var _css = require("rc-util/lib/Dom/css");
var _previewConfig = require("../previewConfig");
var initialTransform = {
  x: 0,
  y: 0,
  rotate: 0,
  scale: 1,
  flipX: false,
  flipY: false
};
function useImageTransform(imgRef) {
  var frame = (0, _react.useRef)(null);
  var queue = (0, _react.useRef)([]);
  var _useState = (0, _react.useState)(initialTransform),
    _useState2 = (0, _slicedToArray2.default)(_useState, 2),
    transform = _useState2[0],
    setTransform = _useState2[1];
  var resetTransform = function resetTransform() {
    setTransform(initialTransform);
  };

  /** Direct update transform */
  var updateTransform = function updateTransform(newTransform) {
    if (frame.current === null) {
      queue.current = [];
      frame.current = (0, _raf.default)(function () {
        setTransform(function (preState) {
          var memoState = preState;
          queue.current.forEach(function (queueState) {
            memoState = (0, _objectSpread2.default)((0, _objectSpread2.default)({}, memoState), queueState);
          });
          frame.current = null;
          return memoState;
        });
      });
    }
    queue.current.push((0, _objectSpread2.default)((0, _objectSpread2.default)({}, transform), newTransform));
  };

  /** Scale according to the position of clientX and clientY */
  var dispatchZoomChange = function dispatchZoomChange(ratio, clientX, clientY) {
    var _imgRef$current = imgRef.current,
      width = _imgRef$current.width,
      height = _imgRef$current.height,
      offsetWidth = _imgRef$current.offsetWidth,
      offsetHeight = _imgRef$current.offsetHeight,
      offsetLeft = _imgRef$current.offsetLeft,
      offsetTop = _imgRef$current.offsetTop;
    var newRatio = ratio;
    var newScale = transform.scale * ratio;
    if (newScale > _previewConfig.MAX_SCALE) {
      newRatio = _previewConfig.MAX_SCALE / transform.scale;
      newScale = _previewConfig.MAX_SCALE;
    } else if (newScale < _previewConfig.MIN_SCALE) {
      newRatio = _previewConfig.MIN_SCALE / transform.scale;
      newScale = _previewConfig.MIN_SCALE;
    }

    /** Default center point scaling */
    var mergedClientX = clientX !== null && clientX !== void 0 ? clientX : innerWidth / 2;
    var mergedClientY = clientY !== null && clientY !== void 0 ? clientY : innerHeight / 2;
    var diffRatio = newRatio - 1;
    /** Deviation calculated from image size */
    var diffImgX = diffRatio * width * 0.5;
    var diffImgY = diffRatio * height * 0.5;
    /** The difference between the click position and the edge of the document */
    var diffOffsetLeft = diffRatio * (mergedClientX - transform.x - offsetLeft);
    var diffOffsetTop = diffRatio * (mergedClientY - transform.y - offsetTop);
    /** Final positioning */
    var newX = transform.x - (diffOffsetLeft - diffImgX);
    var newY = transform.y - (diffOffsetTop - diffImgY);

    /**
     * When zooming the image
     * When the image size is smaller than the width and height of the window, the position is initialized
     */
    if (ratio < 1 && newScale === 1) {
      var mergedWidth = offsetWidth * newScale;
      var mergedHeight = offsetHeight * newScale;
      var _getClientSize = (0, _css.getClientSize)(),
        clientWidth = _getClientSize.width,
        clientHeight = _getClientSize.height;
      if (mergedWidth <= clientWidth && mergedHeight <= clientHeight) {
        newX = 0;
        newY = 0;
      }
    }
    updateTransform({
      x: newX,
      y: newY,
      scale: newScale
    });
  };
  return {
    transform: transform,
    resetTransform: resetTransform,
    updateTransform: updateTransform,
    dispatchZoomChange: dispatchZoomChange
  };
}
;