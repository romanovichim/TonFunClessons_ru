import type { FullToken, UseComponentStyleResult } from '../../theme/internal';
/** Component only token. Which will handle additional calculation of alias token */
export interface ComponentToken {
    dropdownWidth: number;
    zIndexPopup: number;
    colorGroupTitle: string;
    radiusItem: number;
    radiusSubMenuItem: number;
    colorItemText: string;
    colorItemTextHover: string;
    colorItemTextHoverHorizontal: string;
    colorItemTextSelected: string;
    colorItemTextSelectedHorizontal: string;
    colorItemTextDisabled: string;
    colorDangerItemText: string;
    colorDangerItemTextHover: string;
    colorDangerItemTextSelected: string;
    colorDangerItemBgActive: string;
    colorDangerItemBgSelected: string;
    colorItemBg: string;
    colorItemBgHover: string;
    colorSubItemBg: string;
    colorItemBgActive: string;
    colorItemBgSelected: string;
    colorItemBgSelectedHorizontal: string;
    colorActiveBarWidth: number;
    colorActiveBarHeight: number;
    colorActiveBarBorderSize: number;
    itemMarginInline: number;
}
export interface MenuToken extends FullToken<'Menu'> {
    menuItemHeight: number;
    menuHorizontalHeight: number;
    menuItemPaddingInline: number;
    menuArrowSize: number;
    menuArrowOffset: string;
    menuPanelMaskInset: number;
    menuSubMenuBg: string;
}
declare const _default: (prefixCls: string, injectStyle: boolean) => UseComponentStyleResult;
export default _default;
