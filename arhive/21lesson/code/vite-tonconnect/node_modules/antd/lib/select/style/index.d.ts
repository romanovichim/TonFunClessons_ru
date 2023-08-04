import type { FullToken } from '../../theme/internal';
export interface ComponentToken {
    zIndexPopup: number;
}
export interface SelectToken extends FullToken<'Select'> {
    rootPrefixCls: string;
    inputPaddingHorizontalBase: number;
}
declare const _default: (prefixCls: string) => import("../../theme/internal").UseComponentStyleResult;
export default _default;
