import * as React from 'react';
import Select from '../select';
const MiniSelect = props => /*#__PURE__*/React.createElement(Select, Object.assign({}, props, {
  size: "small"
}));
const MiddleSelect = props => /*#__PURE__*/React.createElement(Select, Object.assign({}, props, {
  size: "middle"
}));
MiniSelect.Option = Select.Option;
MiddleSelect.Option = Select.Option;
export { MiniSelect, MiddleSelect };