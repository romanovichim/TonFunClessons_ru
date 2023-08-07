import util from './dist/inspect.js';

export default util;

export const {
  // The commented out things are not visible from normal node's util.
  // identicalSequenceRange,
  inspect,
  // inspectDefaultOptions,
  format,
  formatWithOptions,
  // getStringWidth,
  stripVTControlCharacters,
  // isZeroWidthCodePoint,
  stylizeWithColor,
  stylizeWithHTML,
  Proxy,
} = util;
