import * as React from 'react';
import type { ValidateStatus } from './FormItem';
export interface ErrorListProps {
    fieldId?: string;
    help?: React.ReactNode;
    helpStatus?: ValidateStatus;
    errors?: React.ReactNode[];
    warnings?: React.ReactNode[];
    className?: string;
    onVisibleChanged?: (visible: boolean) => void;
}
export default function ErrorList({ help, helpStatus, errors, warnings, className: rootClassName, fieldId, onVisibleChanged, }: ErrorListProps): JSX.Element;
