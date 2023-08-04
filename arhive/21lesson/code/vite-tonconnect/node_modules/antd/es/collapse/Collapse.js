import RightOutlined from "@ant-design/icons/es/icons/RightOutlined";
import classNames from 'classnames';
import RcCollapse from 'rc-collapse';
import * as React from 'react';
import toArray from "rc-util/es/Children/toArray";
import omit from "rc-util/es/omit";
import { ConfigContext } from '../config-provider';
import initCollapseMotion from '../_util/motion';
import { cloneElement } from '../_util/reactNode';
import warning from '../_util/warning';
import SizeContext from '../config-provider/SizeContext';
import CollapsePanel from './CollapsePanel';
import useStyle from './style';
const Collapse = /*#__PURE__*/React.forwardRef((props, ref) => {
  const {
    getPrefixCls,
    direction
  } = React.useContext(ConfigContext);
  const size = React.useContext(SizeContext);
  const {
    prefixCls: customizePrefixCls,
    className,
    rootClassName,
    bordered = true,
    ghost,
    size: customizeSize,
    expandIconPosition = 'start'
  } = props;
  const mergedSize = customizeSize || size || 'middle';
  const prefixCls = getPrefixCls('collapse', customizePrefixCls);
  const rootPrefixCls = getPrefixCls();
  const [wrapSSR, hashId] = useStyle(prefixCls);
  // Warning if use legacy type `expandIconPosition`
  process.env.NODE_ENV !== "production" ? warning(expandIconPosition !== 'left' && expandIconPosition !== 'right', 'Collapse', '`expandIconPosition` with `left` or `right` is deprecated. Please use `start` or `end` instead.') : void 0;
  // Align with logic position
  const mergedExpandIconPosition = React.useMemo(() => {
    if (expandIconPosition === 'left') {
      return 'start';
    }
    return expandIconPosition === 'right' ? 'end' : expandIconPosition;
  }, [expandIconPosition]);
  const renderExpandIcon = function () {
    let panelProps = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    const {
      expandIcon
    } = props;
    const icon = expandIcon ? expandIcon(panelProps) : /*#__PURE__*/React.createElement(RightOutlined, {
      rotate: panelProps.isActive ? 90 : undefined
    });
    return cloneElement(icon, () => ({
      className: classNames(icon.props.className, `${prefixCls}-arrow`)
    }));
  };
  const collapseClassName = classNames(`${prefixCls}-icon-position-${mergedExpandIconPosition}`, {
    [`${prefixCls}-borderless`]: !bordered,
    [`${prefixCls}-rtl`]: direction === 'rtl',
    [`${prefixCls}-ghost`]: !!ghost,
    [`${prefixCls}-${mergedSize}`]: mergedSize !== 'middle'
  }, className, rootClassName, hashId);
  const openMotion = Object.assign(Object.assign({}, initCollapseMotion(rootPrefixCls)), {
    motionAppear: false,
    leavedClassName: `${prefixCls}-content-hidden`
  });
  const getItems = () => {
    const {
      children
    } = props;
    return toArray(children).map((child, index) => {
      var _a;
      if ((_a = child.props) === null || _a === void 0 ? void 0 : _a.disabled) {
        const key = child.key || String(index);
        const {
          disabled,
          collapsible
        } = child.props;
        const childProps = Object.assign(Object.assign({}, omit(child.props, ['disabled'])), {
          key,
          collapsible: collapsible !== null && collapsible !== void 0 ? collapsible : disabled ? 'disabled' : undefined
        });
        return cloneElement(child, childProps);
      }
      return child;
    });
  };
  return wrapSSR( /*#__PURE__*/React.createElement(RcCollapse, Object.assign({
    ref: ref,
    openMotion: openMotion
  }, omit(props, ['rootClassName']), {
    expandIcon: renderExpandIcon,
    prefixCls: prefixCls,
    className: collapseClassName
  }), getItems()));
});
if (process.env.NODE_ENV !== 'production') {
  Collapse.displayName = 'Collapse';
}
export default Object.assign(Collapse, {
  Panel: CollapsePanel
});