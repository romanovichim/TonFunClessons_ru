import type { ExpandType, GetPopupContainer, GetRowKey, Key, SelectionItem, TableLocale, TableRowSelection, TransformColumns } from '../interface';
export declare const SELECTION_COLUMN: {};
export declare const SELECTION_ALL: "SELECT_ALL";
export declare const SELECTION_INVERT: "SELECT_INVERT";
export declare const SELECTION_NONE: "SELECT_NONE";
interface UseSelectionConfig<RecordType> {
    prefixCls: string;
    pageData: RecordType[];
    data: RecordType[];
    getRowKey: GetRowKey<RecordType>;
    getRecordByKey: (key: Key) => RecordType;
    expandType: ExpandType;
    childrenColumnName: string;
    locale: TableLocale;
    getPopupContainer?: GetPopupContainer;
}
export type INTERNAL_SELECTION_ITEM = SelectionItem | typeof SELECTION_ALL | typeof SELECTION_INVERT | typeof SELECTION_NONE;
declare function useSelection<RecordType>(config: UseSelectionConfig<RecordType>, rowSelection?: TableRowSelection<RecordType>): readonly [TransformColumns<RecordType>, Set<Key>];
export default useSelection;
