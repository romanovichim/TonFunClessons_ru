import * as React from 'react';
import KeyCode from "rc-util/es/KeyCode";
const onKeyDown = event => {
  const {
    keyCode
  } = event;
  if (keyCode === KeyCode.ENTER) {
    event.stopPropagation();
  }
};
const FilterDropdownMenuWrapper = props => /*#__PURE__*/React.createElement("div", {
  className: props.className,
  onClick: e => e.stopPropagation(),
  onKeyDown: onKeyDown
}, props.children);
export default FilterDropdownMenuWrapper;