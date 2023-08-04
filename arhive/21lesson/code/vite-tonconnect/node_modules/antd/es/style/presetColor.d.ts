import type { CSSObject } from '@ant-design/cssinjs';
import type { AliasToken, PresetColorKey } from '../theme/internal';
import type { TokenWithCommonCls } from '../theme/util/genComponentStyleHook';
interface CalcColor {
    /** token[`${colorKey}-1`] */
    lightColor: string;
    /** token[`${colorKey}-3`] */
    lightBorderColor: string;
    /** token[`${colorKey}-6`] */
    darkColor: string;
    /** token[`${colorKey}-7`] */
    textColor: string;
}
type GenCSS = (colorKey: PresetColorKey, calcColor: CalcColor) => CSSObject;
export declare function genPresetColor<Token extends TokenWithCommonCls<AliasToken>>(token: Token, genCss: GenCSS): CSSObject;
export {};
