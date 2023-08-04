"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPixelRatio = getPixelRatio;
exports.getStyleStr = getStyleStr;
exports.reRendering = void 0;
exports.rotateWatermark = rotateWatermark;
exports.toLowercaseSeparator = toLowercaseSeparator;
/** converting camel-cased strings to be lowercase and link it with Separato */
function toLowercaseSeparator(key) {
  return key.replace(/([A-Z])/g, '-$1').toLowerCase();
}
function getStyleStr(style) {
  return Object.keys(style).map(key => `${toLowercaseSeparator(key)}: ${style[key]};`).join(' ');
}
/** Returns the ratio of the device's physical pixel resolution to the css pixel resolution */
function getPixelRatio() {
  return window.devicePixelRatio || 1;
}
/** Rotate with the watermark as the center point */
function rotateWatermark(ctx, rotateX, rotateY, rotate) {
  ctx.translate(rotateX, rotateY);
  ctx.rotate(Math.PI / 180 * Number(rotate));
  ctx.translate(-rotateX, -rotateY);
}
/** Whether to re-render the watermark */
const reRendering = (mutation, watermarkElement) => {
  let flag = false;
  // Whether to delete the watermark node
  if (mutation.removedNodes.length) {
    flag = Array.from(mutation.removedNodes).some(node => node === watermarkElement);
  }
  // Whether the watermark dom property value has been modified
  if (mutation.type === 'attributes' && mutation.target === watermarkElement) {
    flag = true;
  }
  return flag;
};
exports.reRendering = reRendering;