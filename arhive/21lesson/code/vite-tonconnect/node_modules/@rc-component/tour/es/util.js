export function isInViewPort(element) {
  var viewWidth = window.innerWidth || document.documentElement.clientWidth;
  var viewHeight = window.innerHeight || document.documentElement.clientHeight;

  var _element$getBoundingC = element.getBoundingClientRect(),
      top = _element$getBoundingC.top,
      right = _element$getBoundingC.right,
      bottom = _element$getBoundingC.bottom,
      left = _element$getBoundingC.left;

  return top >= 0 && left >= 0 && right <= viewWidth && bottom <= viewHeight;
}