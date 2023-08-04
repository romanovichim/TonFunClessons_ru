import * as React from 'react';
export interface EllipsisProps {
    enabledMeasure?: boolean;
    text?: React.ReactNode;
    width: number;
    fontSize: number;
    rows: number;
    children: (cutChildren: React.ReactNode[], needEllipsis: boolean) => React.ReactNode;
    onEllipsis: (isEllipsis: boolean) => void;
}
declare const Ellipsis: {
    ({ enabledMeasure, children, text, width, fontSize, rows, onEllipsis, }: EllipsisProps): JSX.Element;
    displayName: string;
};
export default Ellipsis;
