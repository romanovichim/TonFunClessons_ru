import type { MenuItemProps as RcMenuItemProps } from 'rc-menu';
import * as React from 'react';
export interface MenuItemProps extends Omit<RcMenuItemProps, 'title'> {
    icon?: React.ReactNode;
    danger?: boolean;
    title?: React.ReactNode;
}
declare const MenuItem: React.FC<MenuItemProps>;
export default MenuItem;
