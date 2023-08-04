import type { CSSObject } from '@ant-design/cssinjs';
import type { InputToken } from '../../input/style';
import type { GlobalToken } from '../../theme/interface';
import type { FullToken } from '../../theme/internal';
import type { TokenWithCommonCls } from '../../theme/util/genComponentStyleHook';
export interface ComponentToken {
    presetsWidth: number;
    presetsMaxWidth: number;
    zIndexPopup: number;
}
export type PickerPanelToken = {
    pickerCellCls: string;
    pickerCellInnerCls: string;
    pickerTextHeight: number;
    pickerPanelCellWidth: number;
    pickerPanelCellHeight: number;
    pickerDateHoverRangeBorderColor: string;
    pickerBasicCellHoverWithRangeColor: string;
    pickerPanelWithoutTimeCellHeight: number;
    pickerDatePanelPaddingHorizontal: number;
    pickerYearMonthCellWidth: number;
    pickerTimePanelColumnHeight: number;
    pickerTimePanelColumnWidth: number;
    pickerTimePanelCellHeight: number;
    pickerCellPaddingVertical: number;
    pickerQuarterPanelContentHeight: number;
    pickerCellBorderGap: number;
    pickerControlIconSize: number;
    pickerControlIconBorderWidth: number;
};
type PickerToken = InputToken<FullToken<'DatePicker'>> & PickerPanelToken;
type SharedPickerToken = Omit<PickerToken, 'zIndexPopup' | 'presetsWidth' | 'presetsMaxWidth'>;
export declare const genPanelStyle: (token: SharedPickerToken) => CSSObject;
export declare const initPickerPanelToken: (token: TokenWithCommonCls<GlobalToken>) => PickerPanelToken;
declare const _default: (prefixCls: string) => import("../../theme/internal").UseComponentStyleResult;
export default _default;
