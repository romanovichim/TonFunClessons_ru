import type { FullToken } from '../../theme/internal';
export interface ComponentToken {
    zIndexPopup: number;
}
export interface DropdownToken extends FullToken<'Dropdown'> {
    rootPrefixCls: string;
    dropdownArrowDistance: number;
    dropdownArrowOffset: number;
    dropdownPaddingVertical: number;
    dropdownEdgeChildPadding: number;
    menuCls: string;
}
declare const _default: (prefixCls: string) => import("../../theme/internal").UseComponentStyleResult;
export default _default;
