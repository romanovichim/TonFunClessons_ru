import * as React from 'react';
import type { DescriptionsItemProps } from './Item';
export interface RowProps {
    prefixCls: string;
    vertical: boolean;
    row: React.ReactElement<DescriptionsItemProps>[];
    bordered?: boolean;
    colon: boolean;
    index: number;
    children?: React.ReactNode;
}
declare const Row: React.FC<RowProps>;
export default Row;
