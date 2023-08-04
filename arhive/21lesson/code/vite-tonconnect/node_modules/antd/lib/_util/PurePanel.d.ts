import * as React from 'react';
export interface BaseProps {
    prefixCls?: string;
    style?: React.CSSProperties;
}
export default function genPurePanel<ComponentProps extends BaseProps>(Component: any, defaultPrefixCls?: string, getDropdownCls?: (prefixCls: string) => string): any;
