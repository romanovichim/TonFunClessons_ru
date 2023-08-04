import type { FullToken } from '../../theme/internal';
export interface FormToken extends FullToken<'Form'> {
    formItemCls: string;
    rootPrefixCls: string;
}
declare const _default: (prefixCls: string) => import("../../theme/internal").UseComponentStyleResult;
export default _default;
