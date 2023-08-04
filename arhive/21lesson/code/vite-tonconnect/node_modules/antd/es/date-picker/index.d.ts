import type { Dayjs } from 'dayjs';
import type { PickerDateProps, PickerProps, RangePickerProps as BaseRangePickerProps } from './generatePicker';
export type DatePickerProps = PickerProps<Dayjs>;
export type MonthPickerProps = Omit<PickerDateProps<Dayjs>, 'picker'>;
export type WeekPickerProps = Omit<PickerDateProps<Dayjs>, 'picker'>;
export type RangePickerProps = BaseRangePickerProps<Dayjs>;
declare const PurePanel: any;
declare const PureRangePanel: any;
declare const _default: import("./generatePicker/interface").PickerComponentClass<PickerProps<Dayjs> & {
    status?: "" | "warning" | "error" | undefined;
    hashId?: string | undefined;
    popupClassName?: string | undefined;
    rootClassName?: string | undefined;
}, unknown> & {
    WeekPicker: import("./generatePicker/interface").PickerComponentClass<Omit<PickerProps<Dayjs> & {
        status?: "" | "warning" | "error" | undefined;
        hashId?: string | undefined;
        popupClassName?: string | undefined;
        rootClassName?: string | undefined;
    }, "picker">, unknown>;
    MonthPicker: import("./generatePicker/interface").PickerComponentClass<Omit<PickerProps<Dayjs> & {
        status?: "" | "warning" | "error" | undefined;
        hashId?: string | undefined;
        popupClassName?: string | undefined;
        rootClassName?: string | undefined;
    }, "picker">, unknown>;
    YearPicker: import("./generatePicker/interface").PickerComponentClass<Omit<PickerProps<Dayjs> & {
        status?: "" | "warning" | "error" | undefined;
        hashId?: string | undefined;
        popupClassName?: string | undefined;
        rootClassName?: string | undefined;
    }, "picker">, unknown>;
    RangePicker: import("./generatePicker/interface").PickerComponentClass<BaseRangePickerProps<Dayjs> & {
        dropdownClassName?: string | undefined;
        popupClassName?: string | undefined;
    }, unknown>;
    TimePicker: import("./generatePicker/interface").PickerComponentClass<Omit<Omit<import("rc-picker/lib/Picker").PickerTimeProps<Dayjs>, "locale" | "generateConfig" | "hideHeader" | "components" | "hourStep"> & {
        locale?: import("./generatePicker").PickerLocale | undefined;
        size?: import("../button").ButtonSize;
        placement?: "bottomLeft" | "bottomRight" | "topLeft" | "topRight" | undefined;
        bordered?: boolean | undefined;
        status?: "" | "warning" | "error" | undefined;
        hourStep?: 2 | 1 | 3 | 4 | 6 | 8 | 0.5 | 1.5 | 12 | undefined;
    } & {
        status?: "" | "warning" | "error" | undefined;
        hashId?: string | undefined;
        popupClassName?: string | undefined;
        rootClassName?: string | undefined;
    }, "picker">, unknown>;
    QuarterPicker: import("./generatePicker/interface").PickerComponentClass<Omit<Omit<import("rc-picker/lib/Picker").PickerTimeProps<Dayjs>, "locale" | "generateConfig" | "hideHeader" | "components" | "hourStep"> & {
        locale?: import("./generatePicker").PickerLocale | undefined;
        size?: import("../button").ButtonSize;
        placement?: "bottomLeft" | "bottomRight" | "topLeft" | "topRight" | undefined;
        bordered?: boolean | undefined;
        status?: "" | "warning" | "error" | undefined;
        hourStep?: 2 | 1 | 3 | 4 | 6 | 8 | 0.5 | 1.5 | 12 | undefined;
    } & {
        status?: "" | "warning" | "error" | undefined;
        hashId?: string | undefined;
        popupClassName?: string | undefined;
        rootClassName?: string | undefined;
    }, "picker">, unknown>;
} & {
    _InternalPanelDoNotUseOrYouWillBeFired: typeof PurePanel;
    _InternalRangePanelDoNotUseOrYouWillBeFired: typeof PureRangePanel;
};
export default _default;
