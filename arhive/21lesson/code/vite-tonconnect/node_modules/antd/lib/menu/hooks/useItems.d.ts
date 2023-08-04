import type { MenuDividerType as RcMenuDividerType, MenuItemGroupType as RcMenuItemGroupType, MenuItemType as RcMenuItemType, SubMenuType as RcSubMenuType } from 'rc-menu/lib/interface';
import * as React from 'react';
export interface MenuItemType extends RcMenuItemType {
    danger?: boolean;
    icon?: React.ReactNode;
    title?: string;
}
export interface SubMenuType extends Omit<RcSubMenuType, 'children'> {
    icon?: React.ReactNode;
    theme?: 'dark' | 'light';
    children: ItemType[];
}
export interface MenuItemGroupType extends Omit<RcMenuItemGroupType, 'children'> {
    children?: ItemType[];
    key?: React.Key;
}
export interface MenuDividerType extends RcMenuDividerType {
    dashed?: boolean;
    key?: React.Key;
}
export type ItemType = MenuItemType | SubMenuType | MenuItemGroupType | MenuDividerType | null;
/**
 * We simply convert `items` to ReactNode for reuse origin component logic. But we need move all the
 * logic from component into this hooks when in v5
 */
export default function useItems(items?: ItemType[]): (JSX.Element | null)[] | undefined;
