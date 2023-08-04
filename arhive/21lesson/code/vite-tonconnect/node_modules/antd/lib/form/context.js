"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NoStyleItemContext = exports.NoFormStyle = exports.FormProvider = exports.FormItemPrefixContext = exports.FormItemInputContext = exports.FormContext = void 0;
var _rcFieldForm = require("rc-field-form");
var _omit = _interopRequireDefault(require("rc-util/lib/omit"));
var React = _interopRequireWildcard(require("react"));
const FormContext = /*#__PURE__*/React.createContext({
  labelAlign: 'right',
  vertical: false,
  itemRef: () => {}
});
exports.FormContext = FormContext;
const NoStyleItemContext = /*#__PURE__*/React.createContext(null);
exports.NoStyleItemContext = NoStyleItemContext;
const FormProvider = props => {
  const providerProps = (0, _omit.default)(props, ['prefixCls']);
  return /*#__PURE__*/React.createElement(_rcFieldForm.FormProvider, Object.assign({}, providerProps));
};
exports.FormProvider = FormProvider;
const FormItemPrefixContext = /*#__PURE__*/React.createContext({
  prefixCls: ''
});
exports.FormItemPrefixContext = FormItemPrefixContext;
const FormItemInputContext = /*#__PURE__*/React.createContext({});
exports.FormItemInputContext = FormItemInputContext;
const NoFormStyle = _ref => {
  let {
    children,
    status,
    override
  } = _ref;
  const formItemInputContext = (0, React.useContext)(FormItemInputContext);
  const newFormItemInputContext = (0, React.useMemo)(() => {
    const newContext = Object.assign({}, formItemInputContext);
    if (override) {
      delete newContext.isFormItemInput;
    }
    if (status) {
      delete newContext.status;
      delete newContext.hasFeedback;
      delete newContext.feedbackIcon;
    }
    return newContext;
  }, [status, override, formItemInputContext]);
  return /*#__PURE__*/React.createElement(FormItemInputContext.Provider, {
    value: newFormItemInputContext
  }, children);
};
exports.NoFormStyle = NoFormStyle;