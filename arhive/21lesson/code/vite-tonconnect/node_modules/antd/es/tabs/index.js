var __rest = this && this.__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
import CloseOutlined from "@ant-design/icons/es/icons/CloseOutlined";
import EllipsisOutlined from "@ant-design/icons/es/icons/EllipsisOutlined";
import PlusOutlined from "@ant-design/icons/es/icons/PlusOutlined";
import classNames from 'classnames';
import RcTabs from 'rc-tabs';
import * as React from 'react';
import { ConfigContext } from '../config-provider';
import SizeContext from '../config-provider/SizeContext';
import warning from '../_util/warning';
import useAnimateConfig from './hooks/useAnimateConfig';
import useLegacyItems from './hooks/useLegacyItems';
import TabPane from './TabPane';
import useStyle from './style';
function Tabs(_a) {
  var {
      type,
      className,
      rootClassName,
      size: propSize,
      onEdit,
      hideAdd,
      centered,
      addIcon,
      popupClassName,
      children,
      items,
      animated
    } = _a,
    props = __rest(_a, ["type", "className", "rootClassName", "size", "onEdit", "hideAdd", "centered", "addIcon", "popupClassName", "children", "items", "animated"]);
  const {
    prefixCls: customizePrefixCls,
    moreIcon = /*#__PURE__*/React.createElement(EllipsisOutlined, null)
  } = props;
  const {
    direction,
    getPrefixCls,
    getPopupContainer
  } = React.useContext(ConfigContext);
  const prefixCls = getPrefixCls('tabs', customizePrefixCls);
  const [wrapSSR, hashId] = useStyle(prefixCls);
  let editable;
  if (type === 'editable-card') {
    editable = {
      onEdit: (editType, _ref) => {
        let {
          key,
          event
        } = _ref;
        onEdit === null || onEdit === void 0 ? void 0 : onEdit(editType === 'add' ? event : key, editType);
      },
      removeIcon: /*#__PURE__*/React.createElement(CloseOutlined, null),
      addIcon: addIcon || /*#__PURE__*/React.createElement(PlusOutlined, null),
      showAdd: hideAdd !== true
    };
  }
  const rootPrefixCls = getPrefixCls();
  process.env.NODE_ENV !== "production" ? warning(!('onPrevClick' in props) && !('onNextClick' in props), 'Tabs', '`onPrevClick` and `onNextClick` has been removed. Please use `onTabScroll` instead.') : void 0;
  const mergedItems = useLegacyItems(items, children);
  const mergedAnimated = useAnimateConfig(prefixCls, animated);
  const contextSize = React.useContext(SizeContext);
  const size = propSize !== undefined ? propSize : contextSize;
  return wrapSSR( /*#__PURE__*/React.createElement(RcTabs, Object.assign({
    direction: direction,
    getPopupContainer: getPopupContainer,
    moreTransitionName: `${rootPrefixCls}-slide-up`
  }, props, {
    items: mergedItems,
    className: classNames({
      [`${prefixCls}-${size}`]: size,
      [`${prefixCls}-card`]: ['card', 'editable-card'].includes(type),
      [`${prefixCls}-editable-card`]: type === 'editable-card',
      [`${prefixCls}-centered`]: centered
    }, className, rootClassName, hashId),
    popupClassName: classNames(popupClassName, hashId),
    editable: editable,
    moreIcon: moreIcon,
    prefixCls: prefixCls,
    animated: mergedAnimated
  })));
}
Tabs.TabPane = TabPane;
if (process.env.NODE_ENV !== 'production') {
  Tabs.displayName = 'Tabs';
}
export default Tabs;