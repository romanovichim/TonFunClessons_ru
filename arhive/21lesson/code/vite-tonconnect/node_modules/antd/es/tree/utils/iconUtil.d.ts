import * as React from 'react';
import type { AntTreeNodeProps, TreeLeafIcon, SwitcherIcon } from '../Tree';
export default function renderSwitcherIcon(prefixCls: string, switcherIcon: SwitcherIcon, treeNodeProps: AntTreeNodeProps, showLine?: boolean | {
    showLeafIcon: boolean | TreeLeafIcon;
}): React.ReactNode;
