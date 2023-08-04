import * as React from 'react';
import type { PresetColorKey } from '../theme/internal';
import type { PresetStatusColorType } from '../_util/colors';
import type { LiteralUnion } from '../_util/type';
import Ribbon from './Ribbon';
export type { ScrollNumberProps } from './ScrollNumber';
type CompoundedComponent = React.FC<BadgeProps> & {
    Ribbon: typeof Ribbon;
};
export interface BadgeProps {
    /** Number to show in badge */
    count?: React.ReactNode;
    showZero?: boolean;
    /** Max count to show */
    overflowCount?: number;
    /** Whether to show red dot without number */
    dot?: boolean;
    style?: React.CSSProperties;
    prefixCls?: string;
    scrollNumberPrefixCls?: string;
    className?: string;
    rootClassName?: string;
    status?: PresetStatusColorType;
    color?: LiteralUnion<PresetColorKey>;
    text?: React.ReactNode;
    size?: 'default' | 'small';
    offset?: [number | string, number | string];
    title?: string;
    children?: React.ReactNode;
}
declare const Badge: CompoundedComponent;
export default Badge;
