import * as React from 'react';
import type { Breakpoint } from '../_util/responsiveObserver';
export interface DescriptionsContextProps {
    labelStyle?: React.CSSProperties;
    contentStyle?: React.CSSProperties;
}
export declare const DescriptionsContext: React.Context<DescriptionsContextProps>;
export interface DescriptionsProps {
    prefixCls?: string;
    className?: string;
    rootClassName?: string;
    style?: React.CSSProperties;
    bordered?: boolean;
    size?: 'middle' | 'small' | 'default';
    children?: React.ReactNode;
    title?: React.ReactNode;
    extra?: React.ReactNode;
    column?: number | Partial<Record<Breakpoint, number>>;
    layout?: 'horizontal' | 'vertical';
    colon?: boolean;
    labelStyle?: React.CSSProperties;
    contentStyle?: React.CSSProperties;
}
declare function Descriptions({ prefixCls: customizePrefixCls, title, extra, column, colon, bordered, layout, children, className, rootClassName, style, size, labelStyle, contentStyle, ...restProps }: DescriptionsProps): React.ReactElement<any, string | React.JSXElementConstructor<any>>;
declare namespace Descriptions {
    var displayName: string;
    var Item: React.FC<import("./Item").DescriptionsItemProps>;
}
export default Descriptions;
