/**
 * We trade Map as deps which may change with same value but different ref object.
 * We should make it as hash for deps
 * */
export function stringify(obj) {
  var tgt;
  if (obj instanceof Map) {
    tgt = {};
    obj.forEach(function (v, k) {
      tgt[k] = v;
    });
  } else {
    tgt = obj;
  }
  return JSON.stringify(tgt);
}
var RC_TABS_DOUBLE_QUOTE = 'TABS_DQ';
export function genDataNodeKey(key) {
  return String(key).replace(/"/g, RC_TABS_DOUBLE_QUOTE);
}