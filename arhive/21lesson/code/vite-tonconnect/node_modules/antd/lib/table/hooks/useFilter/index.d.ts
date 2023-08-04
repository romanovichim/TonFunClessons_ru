import type { ColumnFilterItem, ColumnsType, ColumnType, FilterKey, FilterValue, GetPopupContainer, Key, TableLocale, TransformColumns } from '../../interface';
export interface FilterState<RecordType> {
    column: ColumnType<RecordType>;
    key: Key;
    filteredKeys?: FilterKey;
    forceFiltered?: boolean;
}
export declare function flattenKeys(filters?: ColumnFilterItem[]): FilterValue;
export declare function getFilterData<RecordType>(data: RecordType[], filterStates: FilterState<RecordType>[]): RecordType[];
interface FilterConfig<RecordType> {
    prefixCls: string;
    dropdownPrefixCls: string;
    mergedColumns: ColumnsType<RecordType>;
    locale: TableLocale;
    onFilterChange: (filters: Record<string, FilterValue | null>, filterStates: FilterState<RecordType>[]) => void;
    getPopupContainer?: GetPopupContainer;
}
declare function useFilter<RecordType>({ prefixCls, dropdownPrefixCls, mergedColumns: rawMergedColumns, onFilterChange, getPopupContainer, locale: tableLocale, }: FilterConfig<RecordType>): [
    TransformColumns<RecordType>,
    FilterState<RecordType>[],
    Record<string, FilterValue | null>
];
export default useFilter;
