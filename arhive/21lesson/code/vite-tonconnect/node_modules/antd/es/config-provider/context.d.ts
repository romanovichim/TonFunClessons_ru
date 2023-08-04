import * as React from 'react';
import type { DerivativeFunc } from '@ant-design/cssinjs';
import type { Options } from 'scroll-into-view-if-needed';
import type { RequiredMark } from '../form/Form';
import type { Locale } from '../locale';
import type { AliasToken, MapToken, OverrideToken, SeedToken } from '../theme/interface';
import type { RenderEmptyHandler } from './defaultRenderEmpty';
import type { SizeType } from './SizeContext';
export declare const defaultIconPrefixCls = "anticon";
export interface Theme {
    primaryColor?: string;
    infoColor?: string;
    successColor?: string;
    processingColor?: string;
    errorColor?: string;
    warningColor?: string;
}
export interface CSPConfig {
    nonce?: string;
}
export type DirectionType = 'ltr' | 'rtl' | undefined;
export type MappingAlgorithm = DerivativeFunc<SeedToken, MapToken>;
export interface ThemeConfig {
    token?: Partial<AliasToken>;
    components?: OverrideToken;
    algorithm?: MappingAlgorithm | MappingAlgorithm[];
    hashed?: boolean;
    inherit?: boolean;
}
export interface ConfigConsumerProps {
    getTargetContainer?: () => HTMLElement;
    getPopupContainer?: (triggerNode?: HTMLElement) => HTMLElement;
    rootPrefixCls?: string;
    iconPrefixCls: string;
    getPrefixCls: (suffixCls?: string, customizePrefixCls?: string) => string;
    renderEmpty?: RenderEmptyHandler;
    csp?: CSPConfig;
    autoInsertSpaceInButton?: boolean;
    input?: {
        autoComplete?: string;
    };
    pagination?: {
        showSizeChanger?: boolean;
    };
    locale?: Locale;
    pageHeader?: {
        ghost: boolean;
    };
    direction?: DirectionType;
    space?: {
        size?: SizeType | number;
    };
    virtual?: boolean;
    dropdownMatchSelectWidth?: boolean;
    form?: {
        requiredMark?: RequiredMark;
        colon?: boolean;
        scrollToFirstError?: Options | boolean;
    };
    theme?: ThemeConfig;
    select?: {
        showSearch?: boolean;
    };
}
export declare const ConfigContext: React.Context<ConfigConsumerProps>;
export declare const ConfigConsumer: React.Consumer<ConfigConsumerProps>;
