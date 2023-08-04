"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _internal = require("../../theme/internal");
var _compact = _interopRequireDefault(require("./compact"));
const genSpaceStyle = token => {
  const {
    componentCls
  } = token;
  return {
    [componentCls]: {
      display: 'inline-flex',
      '&-rtl': {
        direction: 'rtl'
      },
      '&-vertical': {
        flexDirection: 'column'
      },
      '&-align': {
        flexDirection: 'column',
        '&-center': {
          alignItems: 'center'
        },
        '&-start': {
          alignItems: 'flex-start'
        },
        '&-end': {
          alignItems: 'flex-end'
        },
        '&-baseline': {
          alignItems: 'baseline'
        }
      },
      [`${componentCls}-item`]: {
        '&:empty': {
          display: 'none'
        }
      }
    }
  };
};
// ============================== Export ==============================
var _default = (0, _internal.genComponentStyleHook)('Space', token => [genSpaceStyle(token), (0, _compact.default)(token)]);
exports.default = _default;