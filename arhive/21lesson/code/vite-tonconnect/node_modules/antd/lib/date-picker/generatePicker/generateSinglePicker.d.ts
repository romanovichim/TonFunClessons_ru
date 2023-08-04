import type { GenerateConfig } from 'rc-picker/lib/generate/index';
import type { PickerProps } from '.';
import type { PickerComponentClass } from './interface';
export default function generatePicker<DateType>(generateConfig: GenerateConfig<DateType>): {
    DatePicker: PickerComponentClass<PickerProps<DateType> & {
        status?: "" | "warning" | "error" | undefined;
        hashId?: string | undefined;
        popupClassName?: string | undefined;
        rootClassName?: string | undefined;
    }, unknown>;
    WeekPicker: PickerComponentClass<Omit<PickerProps<DateType> & {
        status?: "" | "warning" | "error" | undefined;
        hashId?: string | undefined;
        popupClassName?: string | undefined;
        rootClassName?: string | undefined;
    }, "picker">, unknown>;
    MonthPicker: PickerComponentClass<Omit<PickerProps<DateType> & {
        status?: "" | "warning" | "error" | undefined;
        hashId?: string | undefined;
        popupClassName?: string | undefined;
        rootClassName?: string | undefined;
    }, "picker">, unknown>;
    YearPicker: PickerComponentClass<Omit<PickerProps<DateType> & {
        status?: "" | "warning" | "error" | undefined;
        hashId?: string | undefined;
        popupClassName?: string | undefined;
        rootClassName?: string | undefined;
    }, "picker">, unknown>;
    TimePicker: PickerComponentClass<Omit<Omit<import("rc-picker/lib/Picker").PickerTimeProps<DateType>, "locale" | "generateConfig" | "hideHeader" | "components" | "hourStep"> & {
        locale?: import(".").PickerLocale | undefined;
        size?: import("../../config-provider/SizeContext").SizeType;
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
    QuarterPicker: PickerComponentClass<Omit<Omit<import("rc-picker/lib/Picker").PickerTimeProps<DateType>, "locale" | "generateConfig" | "hideHeader" | "components" | "hourStep"> & {
        locale?: import(".").PickerLocale | undefined;
        size?: import("../../config-provider/SizeContext").SizeType;
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
};
