import PickerButton from '../PickerButton';
import generateRangePicker from './generateRangePicker';
import generateSinglePicker from './generateSinglePicker';
export const Components = {
  button: PickerButton
};
function toArray(list) {
  if (!list) {
    return [];
  }
  return Array.isArray(list) ? list : [list];
}
export function getTimeProps(props) {
  const {
    format,
    picker,
    showHour,
    showMinute,
    showSecond,
    use12Hours
  } = props;
  const firstFormat = toArray(format)[0];
  const showTimeObj = Object.assign({}, props);
  if (firstFormat && typeof firstFormat === 'string') {
    if (!firstFormat.includes('s') && showSecond === undefined) {
      showTimeObj.showSecond = false;
    }
    if (!firstFormat.includes('m') && showMinute === undefined) {
      showTimeObj.showMinute = false;
    }
    if (!firstFormat.includes('H') && !firstFormat.includes('h') && showHour === undefined) {
      showTimeObj.showHour = false;
    }
    if ((firstFormat.includes('a') || firstFormat.includes('A')) && use12Hours === undefined) {
      showTimeObj.use12Hours = true;
    }
  }
  if (picker === 'time') {
    return showTimeObj;
  }
  if (typeof firstFormat === 'function') {
    // format of showTime should use default when format is custom format function
    delete showTimeObj.format;
  }
  return {
    showTime: showTimeObj
  };
}
const DataPickerPlacements = ['bottomLeft', 'bottomRight', 'topLeft', 'topRight'];
const HourStep = [0.5, 1, 1.5, 2, 3, 4, 6, 8, 12];
function generatePicker(generateConfig) {
  // =========================== Picker ===========================
  const {
    DatePicker,
    WeekPicker,
    MonthPicker,
    YearPicker,
    TimePicker,
    QuarterPicker
  } = generateSinglePicker(generateConfig);
  // ======================== Range Picker ========================
  const RangePicker = generateRangePicker(generateConfig);
  const MergedDatePicker = DatePicker;
  MergedDatePicker.WeekPicker = WeekPicker;
  MergedDatePicker.MonthPicker = MonthPicker;
  MergedDatePicker.YearPicker = YearPicker;
  MergedDatePicker.RangePicker = RangePicker;
  MergedDatePicker.TimePicker = TimePicker;
  MergedDatePicker.QuarterPicker = QuarterPicker;
  return MergedDatePicker;
}
export default generatePicker;