import React from 'react';
import type { ConfigConsumerProps } from '../config-provider';
export interface AffixProps {
    /** 距离窗口顶部达到指定偏移量后触发 */
    offsetTop?: number;
    /** 距离窗口底部达到指定偏移量后触发 */
    offsetBottom?: number;
    style?: React.CSSProperties;
    /** 固定状态改变时触发的回调函数 */
    onChange?: (affixed?: boolean) => void;
    /** 设置 Affix 需要监听其滚动事件的元素，值为一个返回对应 DOM 元素的函数 */
    target?: () => Window | HTMLElement | null;
    prefixCls?: string;
    className?: string;
    rootClassName?: string;
    children: React.ReactNode;
}
interface InternalAffixProps extends AffixProps {
    affixPrefixCls: string;
}
declare enum AffixStatus {
    None = 0,
    Prepare = 1
}
export interface AffixState {
    affixStyle?: React.CSSProperties;
    placeholderStyle?: React.CSSProperties;
    status: AffixStatus;
    lastAffix: boolean;
    prevTarget: Window | HTMLElement | null;
}
declare class InternalAffix extends React.Component<InternalAffixProps, AffixState> {
    static contextType: React.Context<ConfigConsumerProps>;
    state: AffixState;
    private placeholderNodeRef;
    private fixedNodeRef;
    private timer;
    context: ConfigConsumerProps;
    private getTargetFunc;
    componentDidMount(): void;
    componentDidUpdate(prevProps: AffixProps): void;
    componentWillUnmount(): void;
    getOffsetTop: () => number | undefined;
    getOffsetBottom: () => number | undefined;
    measure: () => void;
    prepareMeasure: () => void;
    updatePosition: ((...args: any[]) => void) & {
        cancel: () => void;
    };
    lazyUpdatePosition: ((...args: any[]) => void) & {
        cancel: () => void;
    };
    render(): JSX.Element;
}
export type InternalAffixClass = InternalAffix;
declare const Affix: React.ForwardRefExoticComponent<AffixProps & React.RefAttributes<InternalAffix>>;
export default Affix;
