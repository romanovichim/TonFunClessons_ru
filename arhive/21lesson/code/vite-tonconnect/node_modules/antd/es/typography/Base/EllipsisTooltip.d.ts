import * as React from 'react';
import type { TooltipProps } from '../../tooltip';
export interface EllipsisTooltipProps {
    tooltipProps?: TooltipProps;
    enabledEllipsis: boolean;
    isEllipsis?: boolean;
    children: React.ReactElement;
}
declare const EllipsisTooltip: {
    ({ enabledEllipsis, isEllipsis, children, tooltipProps, }: EllipsisTooltipProps): JSX.Element;
    displayName: string;
};
export default EllipsisTooltip;
