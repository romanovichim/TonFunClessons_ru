import * as React from 'react';
import type { FloatButtonProps, FloatButtonGroupProps } from './interface';
export interface PureFloatButtonProps extends Omit<FloatButtonProps, 'target'> {
    backTop?: boolean;
}
export interface PurePanelProps extends PureFloatButtonProps, Omit<FloatButtonGroupProps, 'children'> {
    /** Convert to FloatGroup when configured */
    items?: PureFloatButtonProps[];
}
declare function PurePanel({ className, items, ...props }: PurePanelProps): JSX.Element;
declare const _default: React.MemoExoticComponent<typeof PurePanel>;
export default _default;
