import _objectSpread from "@babel/runtime/helpers/esm/objectSpread2";
import * as React from 'react';
import classNames from 'classnames';
var DrawerPanel = function DrawerPanel(props) {
  var prefixCls = props.prefixCls,
    className = props.className,
    style = props.style,
    children = props.children,
    containerRef = props.containerRef;
  // =============================== Render ===============================
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: classNames("".concat(prefixCls, "-content"), className),
    style: _objectSpread({}, style),
    "aria-modal": "true",
    role: "dialog",
    ref: containerRef
  }, children));
};
if (process.env.NODE_ENV !== 'production') {
  DrawerPanel.displayName = 'DrawerPanel';
}
export default DrawerPanel;