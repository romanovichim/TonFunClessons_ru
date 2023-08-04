import type { FullToken } from '../../theme/internal';
export interface ComponentToken {
    zIndexPopup: number;
}
export interface TabsToken extends FullToken<'Tabs'> {
    tabsCardHorizontalPadding: string;
    tabsCardHeight: number;
    tabsCardGutter: number;
    tabsHoverColor: string;
    tabsActiveColor: string;
    tabsHorizontalGutter: number;
    tabsCardHeadBackground: string;
    dropdownEdgeChildVerticalPadding: number;
    tabsNavWrapPseudoWidth: number;
    tabsActiveTextShadow: string;
    tabsDropdownHeight: number;
    tabsDropdownWidth: number;
}
declare const _default: (prefixCls: string) => import("../../theme/internal").UseComponentStyleResult;
export default _default;
