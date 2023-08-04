import { Summary, EXPAND_COLUMN } from 'rc-table';
import Column from './Column';
import ColumnGroup from './ColumnGroup';
import type { RefTable } from './interface';
import { SELECTION_COLUMN } from './hooks/useSelection';
declare const ForwardTable: RefTable & {
    SELECTION_COLUMN: typeof SELECTION_COLUMN;
    EXPAND_COLUMN: typeof EXPAND_COLUMN;
    SELECTION_ALL: 'SELECT_ALL';
    SELECTION_INVERT: 'SELECT_INVERT';
    SELECTION_NONE: 'SELECT_NONE';
    Column: typeof Column;
    ColumnGroup: typeof ColumnGroup;
    Summary: typeof Summary;
};
export default ForwardTable;
