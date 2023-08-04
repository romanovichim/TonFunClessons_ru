/// <reference types="react" />
import type { MenuProps } from 'rc-menu';
import type { DirectionType } from '../config-provider';
export type MenuTheme = 'light' | 'dark';
export interface MenuContextProps {
    prefixCls: string;
    inlineCollapsed: boolean;
    direction?: DirectionType;
    mode?: MenuProps['mode'];
    theme?: MenuTheme;
    firstLevel: boolean;
}
declare const MenuContext: import("react").Context<MenuContextProps>;
export default MenuContext;
