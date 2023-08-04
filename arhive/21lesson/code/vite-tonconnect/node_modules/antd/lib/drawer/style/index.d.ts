import type { FullToken } from '../../theme/internal';
export interface ComponentToken {
    zIndexPopup: number;
}
export interface DrawerToken extends FullToken<'Drawer'> {
    drawerFooterPaddingVertical: number;
    drawerFooterPaddingHorizontal: number;
}
declare const _default: (prefixCls: string) => import("../../theme/internal").UseComponentStyleResult;
export default _default;
