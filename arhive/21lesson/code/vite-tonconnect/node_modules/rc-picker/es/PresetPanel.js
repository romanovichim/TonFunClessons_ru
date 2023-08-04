import * as React from 'react';
export default function PresetPanel(props) {
  var prefixCls = props.prefixCls,
    presets = props.presets,
    _onClick = props.onClick,
    onHover = props.onHover;
  if (!presets.length) {
    return null;
  }
  return /*#__PURE__*/React.createElement("div", {
    className: "".concat(prefixCls, "-presets")
  }, /*#__PURE__*/React.createElement("ul", null, presets.map(function (_ref, index) {
    var label = _ref.label,
      value = _ref.value;
    return /*#__PURE__*/React.createElement("li", {
      key: index,
      onClick: function onClick() {
        _onClick(value);
      },
      onMouseEnter: function onMouseEnter() {
        onHover === null || onHover === void 0 ? void 0 : onHover(value);
      },
      onMouseLeave: function onMouseLeave() {
        onHover === null || onHover === void 0 ? void 0 : onHover(null);
      }
    }, label);
  })));
}