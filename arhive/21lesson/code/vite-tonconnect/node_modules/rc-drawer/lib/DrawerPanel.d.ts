import * as React from 'react';
export interface DrawerPanelRef {
    focus: VoidFunction;
}
export interface DrawerPanelProps {
    prefixCls: string;
    className?: string;
    style?: React.CSSProperties;
    children?: React.ReactNode;
    containerRef?: React.Ref<HTMLDivElement>;
}
declare const DrawerPanel: {
    (props: DrawerPanelProps): JSX.Element;
    displayName: string;
};
export default DrawerPanel;
