import * as React from 'react';
import type { PreviewProps } from './Preview';
interface OperationsProps extends Pick<PreviewProps, 'visible' | 'maskTransitionName' | 'getContainer' | 'prefixCls' | 'rootClassName' | 'icons' | 'countRender' | 'onClose'> {
    showSwitch: boolean;
    showProgress: boolean;
    current: number;
    count: number;
    scale: number;
    onSwitchLeft: React.MouseEventHandler<HTMLDivElement>;
    onSwitchRight: React.MouseEventHandler<HTMLDivElement>;
    onZoomIn: () => void;
    onZoomOut: () => void;
    onRotateRight: () => void;
    onRotateLeft: () => void;
    onFlipX: () => void;
    onFlipY: () => void;
}
declare const Operations: React.FC<OperationsProps>;
export default Operations;
