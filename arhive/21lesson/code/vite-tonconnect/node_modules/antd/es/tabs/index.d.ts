import type { TabsProps as RcTabsProps } from 'rc-tabs';
import * as React from 'react';
import type { SizeType } from '../config-provider/SizeContext';
import { type TabPaneProps } from './TabPane';
export type TabsType = 'line' | 'card' | 'editable-card';
export type TabsPosition = 'top' | 'right' | 'bottom' | 'left';
export type { TabPaneProps };
export interface TabsProps extends Omit<RcTabsProps, 'editable'> {
    rootClassName?: string;
    type?: TabsType;
    size?: SizeType;
    hideAdd?: boolean;
    centered?: boolean;
    addIcon?: React.ReactNode;
    onEdit?: (e: React.MouseEvent | React.KeyboardEvent | string, action: 'add' | 'remove') => void;
    children?: React.ReactNode;
}
declare function Tabs({ type, className, rootClassName, size: propSize, onEdit, hideAdd, centered, addIcon, popupClassName, children, items, animated, ...props }: TabsProps): React.ReactElement<any, string | React.JSXElementConstructor<any>>;
declare namespace Tabs {
    var TabPane: React.FC<TabPaneProps>;
    var displayName: string;
}
export default Tabs;
