"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = require("react");
var _context = require("../context");
var _warning = _interopRequireDefault(require("../../_util/warning"));
const useFormItemStatus = () => {
  const {
    status
  } = (0, _react.useContext)(_context.FormItemInputContext);
  process.env.NODE_ENV !== "production" ? (0, _warning.default)(status !== undefined, 'Form.Item', 'Form.Item.useStatus should be used under Form.Item component. For more information: https://u.ant.design/form-item-usestatus') : void 0;
  return {
    status
  };
};
// Only used for compatible package. Not promise this will work on future version.
useFormItemStatus.Context = _context.FormItemInputContext;
var _default = useFormItemStatus;
exports.default = _default;