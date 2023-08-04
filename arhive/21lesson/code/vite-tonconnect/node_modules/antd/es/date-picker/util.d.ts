import type { PickerMode } from 'rc-picker/lib/interface';
import type { DirectionType } from '../config-provider';
import type { SelectCommonPlacement } from '../_util/motion';
import type { PickerLocale } from './generatePicker';
export declare function getPlaceholder(locale: PickerLocale, picker?: PickerMode, customizePlaceholder?: string): string;
export declare function getRangePlaceholder(locale: PickerLocale, picker?: PickerMode, customizePlaceholder?: [string, string]): [string, string] | undefined;
export declare function transPlacement2DropdownAlign(direction: DirectionType, placement?: SelectCommonPlacement): {
    points: string[];
    offset: number[];
    overflow: {
        adjustX: number;
        adjustY: number;
    };
};
