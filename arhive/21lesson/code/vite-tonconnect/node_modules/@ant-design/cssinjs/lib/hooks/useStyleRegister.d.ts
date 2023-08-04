import type * as CSS from 'csstype';
import * as React from 'react';
import type { Theme, Transformer } from '..';
import type Cache from '../Cache';
import type Keyframes from '../Keyframes';
import type { Linter } from '../linters';
import type { HashPriority } from '../StyleContext';
declare const SKIP_CHECK = "_skip_check_";
export declare type CSSProperties = Omit<CSS.PropertiesFallback<number | string>, 'animationName'> & {
    animationName?: CSS.PropertiesFallback<number | string>['animationName'] | Keyframes;
};
export declare type CSSPropertiesWithMultiValues = {
    [K in keyof CSSProperties]: CSSProperties[K] | Extract<CSSProperties[K], string>[] | {
        [SKIP_CHECK]: boolean;
        value: CSSProperties[K] | Extract<CSSProperties[K], string>[];
    };
};
export declare type CSSPseudos = {
    [K in CSS.Pseudos]?: CSSObject;
};
declare type ArrayCSSInterpolation = CSSInterpolation[];
export declare type InterpolationPrimitive = null | undefined | boolean | number | string | CSSObject;
export declare type CSSInterpolation = InterpolationPrimitive | ArrayCSSInterpolation | Keyframes;
export declare type CSSOthersObject = Record<string, CSSInterpolation>;
export interface CSSObject extends CSSPropertiesWithMultiValues, CSSPseudos, CSSOthersObject {
}
export declare function normalizeStyle(styleStr: string): string;
export interface ParseConfig {
    hashId?: string;
    hashPriority?: HashPriority;
    layer?: string;
    path?: string;
    transformers?: Transformer[];
    linters?: Linter[];
}
export interface ParseInfo {
    root?: boolean;
    injectHash?: boolean;
    parentSelectors: string[];
}
/**
 * @private Test only. Clear the global effect style keys.
 */
export declare const _cf: (() => void) | undefined;
export declare const parseStyle: (interpolation: CSSInterpolation, config?: ParseConfig, { root, injectHash, parentSelectors }?: ParseInfo) => [parsedStr: string, effectStyle: Record<string, string>];
/**
 * Register a style to the global style sheet.
 */
export default function useStyleRegister(info: {
    theme: Theme<any, any>;
    token: any;
    path: string[];
    hashId?: string;
    layer?: string;
}, styleFn: () => CSSInterpolation): (node: React.ReactElement) => JSX.Element;
export declare function extractStyle(cache: Cache): string;
export {};
