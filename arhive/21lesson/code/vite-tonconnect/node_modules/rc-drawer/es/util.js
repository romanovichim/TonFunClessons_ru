import warning from "rc-util/es/warning";
export function parseWidthHeight(value) {
  if (typeof value === 'string' && String(Number(value)) === value) {
    warning(false, 'Invalid value type of `width` or `height` which should be number type instead.');
    return Number(value);
  }
  return value;
}
export function warnCheck(props) {
  warning(!('wrapperClassName' in props), "'wrapperClassName' is removed. Please use 'rootClassName' instead.");
}