import * as React from 'react';
import type { ModalFuncProps, ModalLocale } from './Modal';
interface ConfirmDialogProps extends ModalFuncProps {
    afterClose?: () => void;
    close?: (...args: any[]) => void;
    autoFocusButton?: null | 'ok' | 'cancel';
    rootPrefixCls: string;
    iconPrefixCls?: string;
    /** @private Internal Usage. Do not override this */
    locale?: ModalLocale;
}
export declare function ConfirmContent(props: ConfirmDialogProps & {
    confirmPrefixCls: string;
}): JSX.Element;
declare const ConfirmDialog: React.FC<ConfirmDialogProps>;
export default ConfirmDialog;
