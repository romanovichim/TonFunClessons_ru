import type { ValueType } from '@rc-component/mini-decimal';
import type { InputNumberProps as RcInputNumberProps } from 'rc-input-number';
import * as React from 'react';
import type { SizeType } from '../config-provider/SizeContext';
import type { InputStatus } from '../_util/statusUtils';
export interface InputNumberProps<T extends ValueType = ValueType> extends Omit<RcInputNumberProps<T>, 'prefix' | 'size' | 'controls'> {
    prefixCls?: string;
    rootClassName?: string;
    addonBefore?: React.ReactNode;
    addonAfter?: React.ReactNode;
    prefix?: React.ReactNode;
    size?: SizeType;
    disabled?: boolean;
    bordered?: boolean;
    status?: InputStatus;
    controls?: boolean | {
        upIcon?: React.ReactNode;
        downIcon?: React.ReactNode;
    };
}
declare const TypedInputNumber: (<T extends ValueType = ValueType>(props: InputNumberProps<T> & {
    children?: React.ReactNode;
} & {
    ref?: React.Ref<HTMLInputElement> | undefined;
}) => React.ReactElement) & {
    displayName?: string | undefined;
    _InternalPanelDoNotUseOrYouWillBeFired: typeof PureInputNumber;
};
declare const PureInputNumber: (props: InputNumberProps<any>) => JSX.Element;
export default TypedInputNumber;
