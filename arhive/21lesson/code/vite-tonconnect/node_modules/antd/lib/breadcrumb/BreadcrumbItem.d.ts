import * as React from 'react';
import type { DropdownProps } from '../dropdown/dropdown';
export interface SeparatorType {
    separator?: React.ReactNode;
    key?: React.Key;
}
type MenuType = DropdownProps['menu'];
interface MenuItem {
    title?: React.ReactNode;
    label?: React.ReactNode;
    path?: string;
    href?: string;
}
export interface BreadcrumbItemProps extends SeparatorType {
    prefixCls?: string;
    href?: string;
    menu?: Omit<MenuType, 'items'> & {
        items?: MenuItem[];
    };
    dropdownProps?: DropdownProps;
    onClick?: React.MouseEventHandler<HTMLAnchorElement | HTMLSpanElement>;
    className?: string;
    children?: React.ReactNode;
    /** @deprecated Please use `menu` instead */
    overlay?: DropdownProps['overlay'];
}
type CompoundedComponent = React.FC<BreadcrumbItemProps> & {
    __ANT_BREADCRUMB_ITEM: boolean;
};
declare const BreadcrumbItem: CompoundedComponent;
export default BreadcrumbItem;
