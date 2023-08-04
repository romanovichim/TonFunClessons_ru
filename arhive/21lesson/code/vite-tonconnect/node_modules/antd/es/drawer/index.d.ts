import type { DrawerProps as RcDrawerProps } from 'rc-drawer';
import * as React from 'react';
import type { DrawerPanelProps } from './DrawerPanel';
declare const SizeTypes: readonly ["default", "large"];
type sizeType = typeof SizeTypes[number];
export interface PushState {
    distance: string | number;
}
export interface DrawerProps extends RcDrawerProps, Omit<DrawerPanelProps, 'prefixCls'> {
    size?: sizeType;
    open?: boolean;
    afterOpenChange?: (open: boolean) => void;
    /** @deprecated Please use `open` instead */
    visible?: boolean;
    /** @deprecated Please use `afterOpenChange` instead */
    afterVisibleChange?: (open: boolean) => void;
}
declare function Drawer(props: DrawerProps): React.ReactElement<any, string | React.JSXElementConstructor<any>>;
declare namespace Drawer {
    var displayName: string;
    var _InternalPanelDoNotUseOrYouWillBeFired: typeof PurePanel;
}
declare function PurePanel({ prefixCls: customizePrefixCls, style, className, placement, ...restProps }: Omit<DrawerPanelProps, 'prefixCls' | 'drawerStyle'> & {
    prefixCls?: string;
    style?: React.CSSProperties;
    className?: string;
    placement?: DrawerProps['placement'];
}): React.ReactElement<any, string | React.JSXElementConstructor<any>>;
export default Drawer;
