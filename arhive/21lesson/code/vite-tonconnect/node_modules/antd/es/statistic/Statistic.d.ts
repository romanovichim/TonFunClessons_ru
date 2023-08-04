import * as React from 'react';
import type { FormatConfig, valueType } from './utils';
import Countdown from './Countdown';
export interface StatisticProps extends FormatConfig {
    prefixCls?: string;
    className?: string;
    rootClassName?: string;
    style?: React.CSSProperties;
    value?: valueType;
    valueStyle?: React.CSSProperties;
    valueRender?: (node: React.ReactNode) => React.ReactNode;
    title?: React.ReactNode;
    prefix?: React.ReactNode;
    suffix?: React.ReactNode;
    loading?: boolean;
    onMouseEnter?: React.MouseEventHandler<HTMLDivElement>;
    onMouseLeave?: React.MouseEventHandler<HTMLDivElement>;
}
type CompoundedComponent = {
    Countdown: typeof Countdown;
};
declare const Statistic: React.FC<StatisticProps> & CompoundedComponent;
export default Statistic;
