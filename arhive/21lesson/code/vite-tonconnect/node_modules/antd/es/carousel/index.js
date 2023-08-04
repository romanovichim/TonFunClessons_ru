var __rest = this && this.__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
import SlickCarousel from '@ant-design/react-slick';
import classNames from 'classnames';
import * as React from 'react';
import { ConfigContext } from '../config-provider';
import useStyle from './style';
const Carousel = /*#__PURE__*/React.forwardRef((_a, ref) => {
  var {
      dots = true,
      arrows = false,
      draggable = false,
      dotPosition = 'bottom',
      vertical = dotPosition === 'left' || dotPosition === 'right',
      rootClassName
    } = _a,
    props = __rest(_a, ["dots", "arrows", "draggable", "dotPosition", "vertical", "rootClassName"]);
  const {
    getPrefixCls,
    direction
  } = React.useContext(ConfigContext);
  const slickRef = React.useRef();
  const goTo = function (slide) {
    let dontAnimate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    slickRef.current.slickGoTo(slide, dontAnimate);
  };
  React.useImperativeHandle(ref, () => ({
    goTo,
    autoPlay: slickRef.current.innerSlider.autoPlay,
    innerSlider: slickRef.current.innerSlider,
    prev: slickRef.current.slickPrev,
    next: slickRef.current.slickNext
  }), [slickRef.current]);
  const prevCount = React.useRef(React.Children.count(props.children));
  React.useEffect(() => {
    if (prevCount.current !== React.Children.count(props.children)) {
      goTo(props.initialSlide || 0, false);
      prevCount.current = React.Children.count(props.children);
    }
  }, [props.children]);
  const newProps = Object.assign({
    vertical
  }, props);
  if (newProps.effect === 'fade') {
    newProps.fade = true;
  }
  const prefixCls = getPrefixCls('carousel', newProps.prefixCls);
  const dotsClass = 'slick-dots';
  const enableDots = !!dots;
  const dsClass = classNames(dotsClass, `${dotsClass}-${dotPosition}`, typeof dots === 'boolean' ? false : dots === null || dots === void 0 ? void 0 : dots.className);
  const [wrapSSR, hashId] = useStyle(prefixCls);
  const className = classNames(prefixCls, {
    [`${prefixCls}-rtl`]: direction === 'rtl',
    [`${prefixCls}-vertical`]: newProps.vertical
  }, hashId, rootClassName);
  return wrapSSR( /*#__PURE__*/React.createElement("div", {
    className: className
  }, /*#__PURE__*/React.createElement(SlickCarousel, Object.assign({
    ref: slickRef
  }, newProps, {
    dots: enableDots,
    dotsClass: dsClass,
    arrows: arrows,
    draggable: draggable
  }))));
});
if (process.env.NODE_ENV !== 'production') {
  Carousel.displayName = 'Carousel';
}
export default Carousel;