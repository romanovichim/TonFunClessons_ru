"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _classnames = _interopRequireDefault(require("classnames"));
var _rcPicker = require("rc-picker");
var _useMergedState = _interopRequireDefault(require("rc-util/lib/hooks/useMergedState"));
var React = _interopRequireWildcard(require("react"));
var _configProvider = require("../config-provider");
var _useLocale = _interopRequireDefault(require("../locale/useLocale"));
var _Header = _interopRequireDefault(require("./Header"));
var _en_US = _interopRequireDefault(require("./locale/en_US"));
var _style = _interopRequireDefault(require("./style"));
function generateCalendar(generateConfig) {
  function isSameYear(date1, date2) {
    return date1 && date2 && generateConfig.getYear(date1) === generateConfig.getYear(date2);
  }
  function isSameMonth(date1, date2) {
    return isSameYear(date1, date2) && generateConfig.getMonth(date1) === generateConfig.getMonth(date2);
  }
  function isSameDate(date1, date2) {
    return isSameMonth(date1, date2) && generateConfig.getDate(date1) === generateConfig.getDate(date2);
  }
  const Calendar = props => {
    const {
      prefixCls: customizePrefixCls,
      className,
      rootClassName,
      style,
      dateFullCellRender,
      dateCellRender,
      monthFullCellRender,
      monthCellRender,
      headerRender,
      value,
      defaultValue,
      disabledDate,
      mode,
      validRange,
      fullscreen = true,
      onChange,
      onPanelChange,
      onSelect
    } = props;
    const {
      getPrefixCls,
      direction
    } = React.useContext(_configProvider.ConfigContext);
    const prefixCls = getPrefixCls('picker', customizePrefixCls);
    const calendarPrefixCls = `${prefixCls}-calendar`;
    const [wrapSSR, hashId] = (0, _style.default)(prefixCls);
    const today = generateConfig.getNow();
    // ====================== State =======================
    // Value
    const [mergedValue, setMergedValue] = (0, _useMergedState.default)(() => value || generateConfig.getNow(), {
      defaultValue,
      value
    });
    // Mode
    const [mergedMode, setMergedMode] = (0, _useMergedState.default)('month', {
      value: mode
    });
    const panelMode = React.useMemo(() => mergedMode === 'year' ? 'month' : 'date', [mergedMode]);
    // Disabled Date
    const mergedDisabledDate = React.useCallback(date => {
      const notInRange = validRange ? generateConfig.isAfter(validRange[0], date) || generateConfig.isAfter(date, validRange[1]) : false;
      return notInRange || !!(disabledDate === null || disabledDate === void 0 ? void 0 : disabledDate(date));
    }, [disabledDate, validRange]);
    // ====================== Events ======================
    const triggerPanelChange = (date, newMode) => {
      onPanelChange === null || onPanelChange === void 0 ? void 0 : onPanelChange(date, newMode);
    };
    const triggerChange = date => {
      setMergedValue(date);
      if (!isSameDate(date, mergedValue)) {
        // Trigger when month panel switch month
        if (panelMode === 'date' && !isSameMonth(date, mergedValue) || panelMode === 'month' && !isSameYear(date, mergedValue)) {
          triggerPanelChange(date, mergedMode);
        }
        onChange === null || onChange === void 0 ? void 0 : onChange(date);
      }
    };
    const triggerModeChange = newMode => {
      setMergedMode(newMode);
      triggerPanelChange(mergedValue, newMode);
    };
    const onInternalSelect = date => {
      triggerChange(date);
      onSelect === null || onSelect === void 0 ? void 0 : onSelect(date);
    };
    // ====================== Locale ======================
    const getDefaultLocale = () => {
      const {
        locale
      } = props;
      const result = Object.assign(Object.assign({}, _en_US.default), locale);
      result.lang = Object.assign(Object.assign({}, result.lang), (locale || {}).lang);
      return result;
    };
    // ====================== Render ======================
    const dateRender = React.useCallback(date => {
      if (dateFullCellRender) {
        return dateFullCellRender(date);
      }
      return /*#__PURE__*/React.createElement("div", {
        className: (0, _classnames.default)(`${prefixCls}-cell-inner`, `${calendarPrefixCls}-date`, {
          [`${calendarPrefixCls}-date-today`]: isSameDate(today, date)
        })
      }, /*#__PURE__*/React.createElement("div", {
        className: `${calendarPrefixCls}-date-value`
      }, String(generateConfig.getDate(date)).padStart(2, '0')), /*#__PURE__*/React.createElement("div", {
        className: `${calendarPrefixCls}-date-content`
      }, dateCellRender && dateCellRender(date)));
    }, [dateFullCellRender, dateCellRender]);
    const monthRender = React.useCallback((date, locale) => {
      if (monthFullCellRender) {
        return monthFullCellRender(date);
      }
      const months = locale.shortMonths || generateConfig.locale.getShortMonths(locale.locale);
      return /*#__PURE__*/React.createElement("div", {
        className: (0, _classnames.default)(`${prefixCls}-cell-inner`, `${calendarPrefixCls}-date`, {
          [`${calendarPrefixCls}-date-today`]: isSameMonth(today, date)
        })
      }, /*#__PURE__*/React.createElement("div", {
        className: `${calendarPrefixCls}-date-value`
      }, months[generateConfig.getMonth(date)]), /*#__PURE__*/React.createElement("div", {
        className: `${calendarPrefixCls}-date-content`
      }, monthCellRender && monthCellRender(date)));
    }, [monthFullCellRender, monthCellRender]);
    const [contextLocale] = (0, _useLocale.default)('Calendar', getDefaultLocale);
    return wrapSSR( /*#__PURE__*/React.createElement("div", {
      className: (0, _classnames.default)(calendarPrefixCls, {
        [`${calendarPrefixCls}-full`]: fullscreen,
        [`${calendarPrefixCls}-mini`]: !fullscreen,
        [`${calendarPrefixCls}-rtl`]: direction === 'rtl'
      }, className, rootClassName, hashId),
      style: style
    }, headerRender ? headerRender({
      value: mergedValue,
      type: mergedMode,
      onChange: onInternalSelect,
      onTypeChange: triggerModeChange
    }) : /*#__PURE__*/React.createElement(_Header.default, {
      prefixCls: calendarPrefixCls,
      value: mergedValue,
      generateConfig: generateConfig,
      mode: mergedMode,
      fullscreen: fullscreen,
      locale: contextLocale === null || contextLocale === void 0 ? void 0 : contextLocale.lang,
      validRange: validRange,
      onChange: onInternalSelect,
      onModeChange: triggerModeChange
    }), /*#__PURE__*/React.createElement(_rcPicker.PickerPanel, {
      value: mergedValue,
      prefixCls: prefixCls,
      locale: contextLocale === null || contextLocale === void 0 ? void 0 : contextLocale.lang,
      generateConfig: generateConfig,
      dateRender: dateRender,
      monthCellRender: date => monthRender(date, contextLocale === null || contextLocale === void 0 ? void 0 : contextLocale.lang),
      onSelect: onInternalSelect,
      mode: panelMode,
      picker: panelMode,
      disabledDate: mergedDisabledDate,
      hideHeader: true
    })));
  };
  if (process.env.NODE_ENV !== 'production') {
    Calendar.displayName = 'Calendar';
  }
  return Calendar;
}
var _default = generateCalendar;
exports.default = _default;