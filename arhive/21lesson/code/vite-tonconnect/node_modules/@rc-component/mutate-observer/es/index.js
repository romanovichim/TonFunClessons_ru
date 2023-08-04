import React, { useEffect, useRef } from 'react';
import { composeRef, supportRef } from "rc-util/es/ref";
import findDOMNode from "rc-util/es/Dom/findDOMNode";
import canUseDom from "rc-util/es/Dom/canUseDom";
import useEvent from "rc-util/es/hooks/useEvent";
import DomWrapper from "./wapper";
var defOptions = {
  subtree: true,
  childList: true,
  attributeFilter: ['style', 'class']
};

var MutateObserver = function MutateObserver(props) {
  var children = props.children,
      _props$options = props.options,
      options = _props$options === void 0 ? defOptions : _props$options,
      _props$onMutate = props.onMutate,
      onMutate = _props$onMutate === void 0 ? function () {} : _props$onMutate;
  var callback = useEvent(onMutate);
  var wrapperRef = useRef(null);
  var elementRef = React.useRef(null);
  var canRef = /*#__PURE__*/React.isValidElement(children) && supportRef(children);
  var originRef = canRef ? children === null || children === void 0 ? void 0 : children.ref : null;
  var mergedRef = React.useMemo(function () {
    return composeRef(originRef, elementRef);
  }, [originRef, elementRef]);
  useEffect(function () {
    if (!canUseDom()) {
      return;
    }

    var instance;
    var currentElement = findDOMNode(originRef === null || originRef === void 0 ? void 0 : originRef.current) || findDOMNode(wrapperRef === null || wrapperRef === void 0 ? void 0 : wrapperRef.current);

    if (currentElement && 'MutationObserver' in window) {
      instance = new MutationObserver(callback);
      instance.observe(currentElement, options);
    }

    return function () {
      var _instance, _instance2;

      (_instance = instance) === null || _instance === void 0 ? void 0 : _instance.takeRecords();
      (_instance2 = instance) === null || _instance2 === void 0 ? void 0 : _instance2.disconnect();
    }; // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options, originRef]);

  if (!children) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('MutationObserver need children props');
    }

    return null;
  }

  return /*#__PURE__*/React.createElement(DomWrapper, {
    ref: wrapperRef
  }, canRef ? /*#__PURE__*/React.cloneElement(children, {
    ref: mergedRef
  }) : children);
};

export default MutateObserver;