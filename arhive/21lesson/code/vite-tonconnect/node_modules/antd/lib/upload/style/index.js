"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _internal = require("../../theme/internal");
var _dragger = _interopRequireDefault(require("./dragger"));
var _list = _interopRequireDefault(require("./list"));
var _motion = _interopRequireDefault(require("./motion"));
var _picture = require("./picture");
var _rtl = _interopRequireDefault(require("./rtl"));
var _style = require("../../style");
var _motion2 = require("../../style/motion");
const genBaseStyle = token => {
  const {
    componentCls,
    colorTextDisabled
  } = token;
  return {
    [`${componentCls}-wrapper`]: Object.assign(Object.assign({}, (0, _style.resetComponent)(token)), {
      [componentCls]: {
        outline: 0,
        "input[type='file']": {
          cursor: 'pointer'
        }
      },
      [`${componentCls}-select`]: {
        display: 'inline-block'
      },
      [`${componentCls}-disabled`]: {
        color: colorTextDisabled,
        cursor: 'not-allowed'
      }
    })
  };
};
// ============================== Export ==============================
var _default = (0, _internal.genComponentStyleHook)('Upload', token => {
  const {
    fontSizeHeading3,
    fontSize,
    lineHeight,
    lineWidth,
    controlHeightLG
  } = token;
  const listItemHeightSM = Math.round(fontSize * lineHeight);
  const uploadToken = (0, _internal.mergeToken)(token, {
    uploadThumbnailSize: fontSizeHeading3 * 2,
    uploadProgressOffset: listItemHeightSM / 2 + lineWidth,
    uploadPicCardSize: controlHeightLG * 2.55
  });
  return [genBaseStyle(uploadToken), (0, _dragger.default)(uploadToken), (0, _picture.genPictureStyle)(uploadToken), (0, _picture.genPictureCardStyle)(uploadToken), (0, _list.default)(uploadToken), (0, _motion.default)(uploadToken), (0, _rtl.default)(uploadToken), (0, _motion2.genCollapseMotion)(uploadToken)];
});
exports.default = _default;