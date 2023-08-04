import * as React from 'react';
import type { PopconfirmProps } from '.';
export interface PopconfirmLocale {
    okText: string;
    cancelText: string;
}
export interface OverlayProps extends Pick<PopconfirmProps, 'icon' | 'okButtonProps' | 'cancelButtonProps' | 'cancelText' | 'okText' | 'okType' | 'showCancel' | 'title' | 'description'> {
    prefixCls: string;
    close?: Function;
    onConfirm?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
    onCancel?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
}
export declare const Overlay: React.FC<OverlayProps>;
export interface PurePanelProps extends Omit<OverlayProps, 'prefixCls'>, Pick<PopconfirmProps, 'placement'> {
    className?: string;
    style?: React.CSSProperties;
    prefixCls?: string;
}
export default function PurePanel(props: PurePanelProps): React.ReactElement<any, string | React.JSXElementConstructor<any>>;
