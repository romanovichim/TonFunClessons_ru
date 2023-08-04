"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.genPresetColor = genPresetColor;
var _internal = require("../theme/internal");
function genPresetColor(token, genCss) {
  return _internal.PresetColors.reduce((prev, colorKey) => {
    const lightColor = token[`${colorKey}1`];
    const lightBorderColor = token[`${colorKey}3`];
    const darkColor = token[`${colorKey}6`];
    const textColor = token[`${colorKey}7`];
    return Object.assign(Object.assign({}, prev), genCss(colorKey, {
      lightColor,
      lightBorderColor,
      darkColor,
      textColor
    }));
  }, {});
}