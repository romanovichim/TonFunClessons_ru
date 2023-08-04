import React from 'react';
import type { KeyWiseTransferItem, RenderResult, SelectAllLabel, TransferDirection, TransferLocale } from './index';
import type { PaginationType } from './interface';
import type { TransferListBodyProps } from './ListBody';
export interface RenderedItem<RecordType> {
    renderedText: string;
    renderedEl: React.ReactNode;
    item: RecordType;
}
type RenderListFunction<T> = (props: TransferListBodyProps<T>) => React.ReactNode;
export interface TransferListProps<RecordType> extends TransferLocale {
    prefixCls: string;
    titleText: React.ReactNode;
    dataSource: RecordType[];
    filterOption?: (filterText: string, item: RecordType) => boolean;
    style?: React.CSSProperties;
    checkedKeys: string[];
    handleFilter: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onItemSelect: (key: string, check: boolean) => void;
    onItemSelectAll: (dataSource: string[], checkAll: boolean) => void;
    onItemRemove?: (keys: string[]) => void;
    handleClear: () => void;
    /** Render item */
    render?: (item: RecordType) => RenderResult;
    showSearch?: boolean;
    searchPlaceholder: string;
    itemUnit: string;
    itemsUnit: string;
    renderList?: RenderListFunction<RecordType>;
    footer?: (props: TransferListProps<RecordType>, info?: {
        direction: TransferDirection;
    }) => React.ReactNode;
    onScroll: (e: React.UIEvent<HTMLUListElement, UIEvent>) => void;
    disabled?: boolean;
    direction: TransferDirection;
    showSelectAll?: boolean;
    selectAllLabel?: SelectAllLabel;
    showRemove?: boolean;
    pagination?: PaginationType;
}
declare const TransferList: {
    <RecordType extends KeyWiseTransferItem>(props: TransferListProps<RecordType>): JSX.Element;
    displayName: string;
};
export default TransferList;
