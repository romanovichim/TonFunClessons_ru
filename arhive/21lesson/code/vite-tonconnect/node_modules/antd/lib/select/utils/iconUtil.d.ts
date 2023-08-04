import type { ReactNode } from 'react';
import * as React from 'react';
type RenderNode = React.ReactNode | ((props: any) => React.ReactNode);
export default function getIcons({ suffixIcon, clearIcon, menuItemSelectedIcon, removeIcon, loading, multiple, hasFeedback, prefixCls, showArrow, feedbackIcon, }: {
    suffixIcon?: React.ReactNode;
    clearIcon?: RenderNode;
    menuItemSelectedIcon?: RenderNode;
    removeIcon?: RenderNode;
    loading?: boolean;
    multiple?: boolean;
    hasFeedback?: boolean;
    feedbackIcon?: ReactNode;
    prefixCls: string;
    showArrow?: boolean;
}): {
    clearIcon: string | number | boolean | React.ReactFragment | JSX.Element | ((props: any) => ReactNode);
    suffixIcon: JSX.Element | (({ open, showSearch }: {
        open: boolean;
        showSearch: boolean;
    }) => JSX.Element);
    itemIcon: string | number | boolean | React.ReactFragment | JSX.Element | ((props: any) => ReactNode) | null;
    removeIcon: string | number | boolean | React.ReactFragment | JSX.Element | ((props: any) => ReactNode) | null;
};
export {};
