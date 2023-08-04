import * as React from 'react';
import type { MenuProps } from './menu';
export interface OverrideContextProps {
    prefixCls?: string;
    expandIcon?: React.ReactNode;
    mode?: MenuProps['mode'];
    selectable?: boolean;
    validator?: (menuProps: Pick<MenuProps, 'mode'>) => void;
    onClick?: () => void;
}
export default OverrideContext;
