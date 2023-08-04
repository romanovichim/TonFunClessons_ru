import CalendarLocale from "rc-picker/es/locale/vi_VN";
import TimePickerLocale from '../../time-picker/locale/vi_VN';
// Merge into a locale object
const locale = {
  lang: Object.assign({
    placeholder: 'Chọn thời điểm',
    rangePlaceholder: ['Ngày bắt đầu', 'Ngày kết thúc']
  }, CalendarLocale),
  timePickerLocale: Object.assign({}, TimePickerLocale)
};
// All settings at:
// https://github.com/ant-design/ant-design/blob/master/components/date-picker/locale/example.json
export default locale;