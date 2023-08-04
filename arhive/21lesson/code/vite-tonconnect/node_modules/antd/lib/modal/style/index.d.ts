import type { AliasToken, FullToken, GenerateStyle } from '../../theme/internal';
import type { TokenWithCommonCls } from '../../theme/util/genComponentStyleHook';
/** Component only token. Which will handle additional calculation of alias token */
export interface ComponentToken {
}
export interface ModalToken extends FullToken<'Modal'> {
    modalBodyPadding: number;
    modalHeaderBg: string;
    modalHeaderPadding: string;
    modalHeaderBorderWidth: number;
    modalHeaderBorderStyle: string;
    modalHeaderTitleLineHeight: number;
    modalHeaderTitleFontSize: number;
    modalHeaderBorderColorSplit: string;
    modalHeaderCloseSize: number;
    modalContentBg: string;
    modalHeadingColor: string;
    modalCloseColor: string;
    modalCloseBtnSize: number;
    modalFooterBg: string;
    modalFooterBorderColorSplit: string;
    modalFooterBorderStyle: string;
    modalFooterPaddingVertical: number;
    modalFooterPaddingHorizontal: number;
    modalFooterBorderWidth: number;
    modalConfirmTitleFontSize: number;
    modalIconHoverColor: string;
    modalConfirmIconSize: number;
}
export declare const genModalMaskStyle: GenerateStyle<TokenWithCommonCls<AliasToken>>;
declare const _default: (prefixCls: string) => import("../../theme/internal").UseComponentStyleResult;
export default _default;
