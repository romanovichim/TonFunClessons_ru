import type { CSSInterpolation, Theme } from '@ant-design/cssinjs';
import { useStyleRegister } from '@ant-design/cssinjs';
import React from 'react';
import type { AliasToken, GlobalToken, MapToken, OverrideToken, PresetColorType, PresetColorKey, SeedToken } from './interface';
import { PresetColors } from './interface';
import type { FullToken } from './util/genComponentStyleHook';
import genComponentStyleHook from './util/genComponentStyleHook';
import statisticToken, { merge as mergeToken, statistic } from './util/statistic';
export { PresetColors, statistic, statisticToken, mergeToken, useStyleRegister, genComponentStyleHook, };
export type { SeedToken, AliasToken, PresetColorType, PresetColorKey, AliasToken as DerivativeToken, FullToken, };
export declare const defaultConfig: {
    token: SeedToken;
    hashed: boolean;
};
export declare const DesignTokenContext: React.Context<{
    token: Partial<AliasToken>;
    theme?: Theme<SeedToken, MapToken> | undefined;
    components?: OverrideToken | undefined;
    hashed?: string | boolean | undefined;
}>;
export declare function useToken(): [Theme<SeedToken, MapToken>, GlobalToken, string];
export type UseComponentStyleResult = [(node: React.ReactNode) => React.ReactElement, string];
export type GenerateStyle<ComponentToken extends object = AliasToken, ReturnType = CSSInterpolation> = (token: ComponentToken) => ReturnType;
