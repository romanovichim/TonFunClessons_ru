"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useShowArrow;
/**
 * Since Select, TreeSelect, Cascader is same Select like component.
 * We just use same hook to handle this logic.
 *
 * If `showArrow` not configured, always show it.
 */
function useShowArrow(showArrow) {
  return showArrow !== null && showArrow !== void 0 ? showArrow : true;
}