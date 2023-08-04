import * as React from 'react';
import type { NoticeProps } from 'rc-notification/lib/Notice';
import type { IconType } from './interface';
export declare const TypeIcon: {
    info: JSX.Element;
    success: JSX.Element;
    error: JSX.Element;
    warning: JSX.Element;
    loading: JSX.Element;
};
export declare function getCloseIcon(prefixCls: string, closeIcon?: React.ReactNode): string | number | true | React.ReactFragment | JSX.Element;
export interface PureContentProps {
    prefixCls: string;
    icon?: React.ReactNode;
    message?: React.ReactNode;
    description?: React.ReactNode;
    btn?: React.ReactNode;
    type?: IconType;
}
export declare function PureContent({ prefixCls, icon, type, message, description, btn, }: PureContentProps): JSX.Element;
export interface PurePanelProps extends Omit<NoticeProps, 'prefixCls' | 'eventKey'>, Omit<PureContentProps, 'prefixCls' | 'children'> {
    prefixCls?: string;
}
/** @private Internal Component. Do not use in your production. */
export default function PurePanel(props: PurePanelProps): JSX.Element;
