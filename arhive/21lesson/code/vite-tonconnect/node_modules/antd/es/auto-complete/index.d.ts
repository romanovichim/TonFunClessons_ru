/**
 * TODO: 4.0
 *
 * - Remove `dataSource`
 * - `size` not work with customizeInput
 * - CustomizeInput not feedback `ENTER` key since accessibility enhancement
 */
import type { BaseSelectRef } from 'rc-select';
import * as React from 'react';
import type { BaseOptionType, DefaultOptionType, InternalSelectProps } from '../select';
import type { InputStatus } from '../_util/statusUtils';
declare const Option: import("rc-select/lib/Option").OptionFC;
export interface DataSourceItemObject {
    value: string;
    text: string;
}
export type DataSourceItemType = DataSourceItemObject | React.ReactNode;
export interface AutoCompleteProps<ValueType = any, OptionType extends BaseOptionType | DefaultOptionType = DefaultOptionType> extends Omit<InternalSelectProps<ValueType, OptionType>, 'inputIcon' | 'loading' | 'mode' | 'optionLabelProp' | 'labelInValue'> {
    dataSource?: DataSourceItemType[];
    status?: InputStatus;
    popupClassName?: string;
    /** @deprecated Please use `popupClassName` instead */
    dropdownClassName?: string;
}
declare const RefAutoComplete: (<ValueType = any, OptionType extends BaseOptionType | DefaultOptionType = DefaultOptionType>(props: AutoCompleteProps<ValueType, OptionType> & {
    children?: React.ReactNode;
} & {
    ref?: React.Ref<BaseSelectRef> | undefined;
}) => React.ReactElement) & {
    Option: typeof Option;
    _InternalPanelDoNotUseOrYouWillBeFired: typeof PurePanel;
};
declare const PurePanel: any;
export default RefAutoComplete;
