import type { PanelProps } from 'rc-dialog/lib/Dialog/Content/Panel';
import * as React from 'react';
import type { ModalFuncProps, ModalProps } from './Modal';
export interface PurePanelProps extends Omit<PanelProps, 'prefixCls'>, Pick<ModalFuncProps, 'type'> {
    prefixCls?: string;
    style?: React.CSSProperties;
}
export declare function renderCloseIcon(prefixCls: string, closeIcon?: React.ReactNode): JSX.Element;
interface FooterProps {
    onOk?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
    onCancel?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
}
export declare const Footer: React.FC<FooterProps & Pick<ModalProps, 'footer' | 'okText' | 'okType' | 'cancelText' | 'confirmLoading' | 'okButtonProps' | 'cancelButtonProps'>>;
declare const PurePanel: React.FC<PurePanelProps>;
export default PurePanel;
