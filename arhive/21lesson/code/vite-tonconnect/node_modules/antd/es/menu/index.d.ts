import type { MenuRef as RcMenuRef } from 'rc-menu';
import { ItemGroup } from 'rc-menu';
import * as React from 'react';
import type { MenuProps } from './menu';
import type { MenuTheme } from './MenuContext';
import MenuDivider from './MenuDivider';
import Item, { type MenuItemProps } from './MenuItem';
import SubMenu, { type SubMenuProps } from './SubMenu';
export type { MenuItemGroupProps } from 'rc-menu';
export type { MenuDividerProps } from './MenuDivider';
export type { MenuTheme, SubMenuProps, MenuItemProps, MenuProps };
export type MenuRef = {
    menu: RcMenuRef | null;
    focus: (options?: FocusOptions) => void;
};
type CompoundedComponent = React.ForwardRefExoticComponent<MenuProps & React.RefAttributes<MenuRef>> & {
    Item: typeof Item;
    SubMenu: typeof SubMenu;
    Divider: typeof MenuDivider;
    ItemGroup: typeof ItemGroup;
};
declare const Menu: CompoundedComponent;
export default Menu;
