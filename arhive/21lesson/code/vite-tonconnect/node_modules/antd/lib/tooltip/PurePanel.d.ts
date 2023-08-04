import * as React from 'react';
import type { TooltipProps } from '.';
export interface PurePanelProps extends Omit<TooltipProps, 'children'> {
}
export default function PurePanel(props: PurePanelProps): React.ReactElement<any, string | React.JSXElementConstructor<any>>;
