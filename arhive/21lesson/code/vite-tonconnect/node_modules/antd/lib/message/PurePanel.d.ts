import * as React from 'react';
import type { NoticeProps } from 'rc-notification/lib/Notice';
import type { NoticeType } from './interface';
export declare const TypeIcon: {
    info: JSX.Element;
    success: JSX.Element;
    error: JSX.Element;
    warning: JSX.Element;
    loading: JSX.Element;
};
export interface PureContentProps {
    prefixCls: string;
    type?: NoticeType;
    icon?: React.ReactNode;
    children: React.ReactNode;
}
export declare function PureContent({ prefixCls, type, icon, children }: PureContentProps): JSX.Element;
export interface PurePanelProps extends Omit<NoticeProps, 'prefixCls' | 'eventKey'>, Omit<PureContentProps, 'prefixCls' | 'children'> {
    prefixCls?: string;
}
/** @private Internal Component. Do not use in your production. */
export default function PurePanel(props: PurePanelProps): JSX.Element;
