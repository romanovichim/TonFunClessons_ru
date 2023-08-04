import * as React from 'react';
import type { DrawerProps as RCDrawerProps } from 'rc-drawer';
export interface DrawerPanelProps {
    prefixCls: string;
    title?: React.ReactNode;
    footer?: React.ReactNode;
    extra?: React.ReactNode;
    closable?: boolean;
    closeIcon?: React.ReactNode;
    onClose?: RCDrawerProps['onClose'];
    /** Wrapper dom node style of header and body */
    drawerStyle?: React.CSSProperties;
    headerStyle?: React.CSSProperties;
    bodyStyle?: React.CSSProperties;
    footerStyle?: React.CSSProperties;
    children?: React.ReactNode;
}
export default function DrawerPanel(props: DrawerPanelProps): JSX.Element;
