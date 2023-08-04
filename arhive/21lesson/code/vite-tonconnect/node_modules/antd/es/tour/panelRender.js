import _toConsumableArray from "@babel/runtime/helpers/esm/toConsumableArray";
import CloseOutlined from "@ant-design/icons/es/icons/CloseOutlined";
import classNames from 'classnames';
import React from 'react';
import Button from '../button';
import defaultLocale from '../locale/en_US';
import useLocale from '../locale/useLocale';
function isValidNode(node) {
  return node !== undefined && node !== null;
}
const TourPanel = _ref => {
  let {
    stepProps,
    current,
    type,
    indicatorsRender
  } = _ref;
  var _a, _b;
  const {
    prefixCls,
    total = 1,
    title,
    onClose,
    onPrev,
    onNext,
    onFinish,
    cover,
    description,
    nextButtonProps,
    prevButtonProps,
    type: stepType,
    arrow,
    className
  } = stepProps;
  const mergedType = typeof stepType !== 'undefined' ? stepType : type;
  const isLastStep = current === total - 1;
  const prevBtnClick = () => {
    var _a;
    onPrev === null || onPrev === void 0 ? void 0 : onPrev();
    (_a = prevButtonProps === null || prevButtonProps === void 0 ? void 0 : prevButtonProps.onClick) === null || _a === void 0 ? void 0 : _a.call(prevButtonProps);
  };
  const nextBtnClick = () => {
    var _a;
    if (isLastStep) {
      onFinish === null || onFinish === void 0 ? void 0 : onFinish();
    } else {
      onNext === null || onNext === void 0 ? void 0 : onNext();
    }
    (_a = nextButtonProps === null || nextButtonProps === void 0 ? void 0 : nextButtonProps.onClick) === null || _a === void 0 ? void 0 : _a.call(nextButtonProps);
  };
  const headerNode = isValidNode(title) ? /*#__PURE__*/React.createElement("div", {
    className: `${prefixCls}-header`
  }, /*#__PURE__*/React.createElement("div", {
    className: `${prefixCls}-title`
  }, title)) : null;
  const descriptionNode = isValidNode(description) ? /*#__PURE__*/React.createElement("div", {
    className: `${prefixCls}-description`
  }, description) : null;
  const coverNode = isValidNode(cover) ? /*#__PURE__*/React.createElement("div", {
    className: `${prefixCls}-cover`
  }, cover) : null;
  let mergeIndicatorNode;
  if (indicatorsRender) {
    mergeIndicatorNode = indicatorsRender(current, total);
  } else {
    mergeIndicatorNode = _toConsumableArray(Array.from({
      length: total
    }).keys()).map((stepItem, index) => /*#__PURE__*/React.createElement("span", {
      key: stepItem,
      className: classNames(index === current && `${prefixCls}-indicator-active`, `${prefixCls}-indicator`)
    }));
  }
  const mainBtnType = mergedType === 'primary' ? 'default' : 'primary';
  const secondaryBtnProps = {
    type: 'default',
    ghost: mergedType === 'primary'
  };
  const [contextLocale] = useLocale('Tour', defaultLocale.Tour);
  return /*#__PURE__*/React.createElement("div", {
    className: classNames(mergedType === 'primary' ? `${prefixCls}-primary` : '', className, `${prefixCls}-content`)
  }, arrow && /*#__PURE__*/React.createElement("div", {
    className: `${prefixCls}-arrow`,
    key: "arrow"
  }), /*#__PURE__*/React.createElement("div", {
    className: `${prefixCls}-inner`
  }, /*#__PURE__*/React.createElement(CloseOutlined, {
    className: `${prefixCls}-close`,
    onClick: onClose
  }), coverNode, headerNode, descriptionNode, /*#__PURE__*/React.createElement("div", {
    className: `${prefixCls}-footer`
  }, total > 1 && /*#__PURE__*/React.createElement("div", {
    className: `${prefixCls}-indicators`
  }, mergeIndicatorNode), /*#__PURE__*/React.createElement("div", {
    className: `${prefixCls}-buttons`
  }, current !== 0 ? /*#__PURE__*/React.createElement(Button, Object.assign({}, secondaryBtnProps, prevButtonProps, {
    onClick: prevBtnClick,
    size: "small",
    className: classNames(`${prefixCls}-prev-btn`, prevButtonProps === null || prevButtonProps === void 0 ? void 0 : prevButtonProps.className)
  }), (_a = prevButtonProps === null || prevButtonProps === void 0 ? void 0 : prevButtonProps.children) !== null && _a !== void 0 ? _a : contextLocale === null || contextLocale === void 0 ? void 0 : contextLocale.Previous) : null, /*#__PURE__*/React.createElement(Button, Object.assign({
    type: mainBtnType
  }, nextButtonProps, {
    onClick: nextBtnClick,
    size: "small",
    className: classNames(`${prefixCls}-next-btn`, nextButtonProps === null || nextButtonProps === void 0 ? void 0 : nextButtonProps.className)
  }), (_b = nextButtonProps === null || nextButtonProps === void 0 ? void 0 : nextButtonProps.children) !== null && _b !== void 0 ? _b : isLastStep ? contextLocale === null || contextLocale === void 0 ? void 0 : contextLocale.Finish : contextLocale === null || contextLocale === void 0 ? void 0 : contextLocale.Next)))));
};
export default TourPanel;