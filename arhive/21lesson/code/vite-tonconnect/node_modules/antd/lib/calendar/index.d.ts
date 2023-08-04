/// <reference types="react" />
import type { Dayjs } from 'dayjs';
import type { CalendarProps } from './generateCalendar';
declare const Calendar: {
    (props: CalendarProps<Dayjs>): import("react").ReactElement<any, string | import("react").JSXElementConstructor<any>>;
    displayName: string;
};
export type { CalendarProps };
export default Calendar;
