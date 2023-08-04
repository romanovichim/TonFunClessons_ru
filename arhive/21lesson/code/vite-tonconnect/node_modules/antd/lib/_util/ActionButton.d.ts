import * as React from 'react';
import type { ButtonProps, LegacyButtonType } from '../button/button';
export interface ActionButtonProps {
    type?: LegacyButtonType;
    actionFn?: (...args: any[]) => any | PromiseLike<any>;
    close?: Function;
    autoFocus?: boolean;
    prefixCls: string;
    buttonProps?: ButtonProps;
    emitEvent?: boolean;
    quitOnNullishReturnValue?: boolean;
    children?: React.ReactNode;
}
declare const ActionButton: React.FC<ActionButtonProps>;
export default ActionButton;
