import type { CSSObject } from '@ant-design/cssinjs';
import type { FullToken, GenerateStyle } from '../../theme/internal';
export interface ComponentToken {
    zIndexPopup: number;
}
export interface ImageToken extends FullToken<'Image'> {
    previewCls: string;
    modalMaskBg: string;
    imagePreviewOperationDisabledColor: string;
    imagePreviewOperationSize: number;
    imagePreviewSwitchSize: number;
    imagePreviewOperationColor: string;
}
export type PositionType = 'static' | 'relative' | 'fixed' | 'absolute' | 'sticky' | undefined;
export declare const genBoxStyle: (position?: PositionType) => CSSObject;
export declare const genImageMaskStyle: (token: ImageToken) => CSSObject;
export declare const genPreviewOperationsStyle: (token: ImageToken) => CSSObject;
export declare const genPreviewSwitchStyle: (token: ImageToken) => CSSObject;
export declare const genImagePreviewStyle: GenerateStyle<ImageToken>;
declare const _default: (prefixCls: string) => import("../../theme/internal").UseComponentStyleResult;
export default _default;
