import type { FullToken } from '../../theme/internal';
/** Component only token. Which will handle additional calculation of alias token */
export interface ComponentToken {
    sizeMarginHeadingVerticalStart: number | string;
    sizeMarginHeadingVerticalEnd: number | string;
}
export type TypographyToken = FullToken<'Typography'>;
declare const _default: (prefixCls: string) => import("../../theme/internal").UseComponentStyleResult;
export default _default;
