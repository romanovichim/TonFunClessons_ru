import * as React from 'react';
import type { CollapsibleType } from './CollapsePanel';
import type { SizeType } from '../config-provider/SizeContext';
/** @deprecated Please use `start` | `end` instead */
type ExpandIconPositionLegacy = 'left' | 'right';
export type ExpandIconPosition = 'start' | 'end' | ExpandIconPositionLegacy | undefined;
export interface CollapseProps {
    activeKey?: Array<string | number> | string | number;
    defaultActiveKey?: Array<string | number> | string | number;
    /** 手风琴效果 */
    accordion?: boolean;
    destroyInactivePanel?: boolean;
    onChange?: (key: string | string[]) => void;
    style?: React.CSSProperties;
    className?: string;
    rootClassName?: string;
    bordered?: boolean;
    prefixCls?: string;
    expandIcon?: (panelProps: PanelProps) => React.ReactNode;
    expandIconPosition?: ExpandIconPosition;
    ghost?: boolean;
    size?: SizeType;
    collapsible?: CollapsibleType;
    children?: React.ReactNode;
}
interface PanelProps {
    isActive?: boolean;
    header?: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
    showArrow?: boolean;
    forceRender?: boolean;
    /** @deprecated Use `collapsible="disabled"` instead */
    disabled?: boolean;
    extra?: React.ReactNode;
    collapsible?: CollapsibleType;
}
declare const _default: React.ForwardRefExoticComponent<CollapseProps & React.RefAttributes<HTMLDivElement>> & {
    Panel: React.ForwardRefExoticComponent<import("./CollapsePanel").CollapsePanelProps & React.RefAttributes<HTMLDivElement>>;
};
export default _default;
