"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.genCalendarStyles = exports.default = void 0;
var _style = require("../../style");
var _style2 = require("../../date-picker/style");
var _style3 = require("../../input/style");
var _internal = require("../../theme/internal");
const genCalendarStyles = token => {
  const {
    calendarCls,
    componentCls,
    calendarFullBg,
    calendarFullPanelBg,
    calendarItemActiveBg
  } = token;
  return {
    [calendarCls]: Object.assign(Object.assign(Object.assign({}, (0, _style2.genPanelStyle)(token)), (0, _style.resetComponent)(token)), {
      background: calendarFullBg,
      '&-rtl': {
        direction: 'rtl'
      },
      [`${calendarCls}-header`]: {
        display: 'flex',
        justifyContent: 'flex-end',
        padding: `${token.paddingSM}px 0`,
        [`${calendarCls}-year-select`]: {
          minWidth: token.yearControlWidth
        },
        [`${calendarCls}-month-select`]: {
          minWidth: token.monthControlWidth,
          marginInlineStart: token.marginXS
        },
        [`${calendarCls}-mode-switch`]: {
          marginInlineStart: token.marginXS
        }
      }
    }),
    [`${calendarCls} ${componentCls}-panel`]: {
      background: calendarFullPanelBg,
      border: 0,
      borderTop: `${token.lineWidth}px ${token.lineType} ${token.colorSplit}`,
      borderRadius: 0,
      [`${componentCls}-month-panel, ${componentCls}-date-panel`]: {
        width: 'auto'
      },
      [`${componentCls}-body`]: {
        padding: `${token.paddingXS}px 0`
      },
      [`${componentCls}-content`]: {
        width: '100%'
      }
    },
    [`${calendarCls}-mini`]: {
      borderRadius: token.borderRadiusLG,
      [`${calendarCls}-header`]: {
        paddingInlineEnd: token.paddingXS,
        paddingInlineStart: token.paddingXS
      },
      [`${componentCls}-panel`]: {
        borderRadius: `0 0 ${token.borderRadiusLG}px ${token.borderRadiusLG}px`
      },
      [`${componentCls}-content`]: {
        height: token.miniContentHeight,
        th: {
          height: 'auto',
          padding: 0,
          lineHeight: `${token.weekHeight}px`
        }
      },
      [`${componentCls}-cell::before`]: {
        pointerEvents: 'none'
      }
    },
    [`${calendarCls}${calendarCls}-full`]: {
      [`${componentCls}-panel`]: {
        display: 'block',
        width: '100%',
        textAlign: 'end',
        background: calendarFullBg,
        border: 0,
        [`${componentCls}-body`]: {
          'th, td': {
            padding: 0
          },
          th: {
            height: 'auto',
            paddingInlineEnd: token.paddingSM,
            paddingBottom: token.paddingXXS,
            lineHeight: `${token.weekHeight}px`
          }
        }
      },
      [`${componentCls}-cell`]: {
        '&::before': {
          display: 'none'
        },
        '&:hover': {
          [`${calendarCls}-date`]: {
            background: token.controlItemBgHover
          }
        },
        [`${calendarCls}-date-today::before`]: {
          display: 'none'
        },
        // >>> Selected
        [`&-in-view${componentCls}-cell-selected`]: {
          [`${calendarCls}-date, ${calendarCls}-date-today`]: {
            background: calendarItemActiveBg
          }
        },
        '&-selected, &-selected:hover': {
          [`${calendarCls}-date, ${calendarCls}-date-today`]: {
            [`${calendarCls}-date-value`]: {
              color: token.colorPrimary
            }
          }
        }
      },
      [`${calendarCls}-date`]: {
        display: 'block',
        width: 'auto',
        height: 'auto',
        margin: `0 ${token.marginXS / 2}px`,
        padding: `${token.paddingXS / 2}px ${token.paddingXS}px 0`,
        border: 0,
        borderTop: `${token.lineWidthBold}px ${token.lineType} ${token.colorSplit}`,
        borderRadius: 0,
        transition: `background ${token.motionDurationSlow}`,
        '&-value': {
          lineHeight: `${token.dateValueHeight}px`,
          transition: `color ${token.motionDurationSlow}`
        },
        '&-content': {
          position: 'static',
          width: 'auto',
          height: token.dateContentHeight,
          overflowY: 'auto',
          color: token.colorText,
          lineHeight: token.lineHeight,
          textAlign: 'start'
        },
        '&-today': {
          borderColor: token.colorPrimary,
          [`${calendarCls}-date-value`]: {
            color: token.colorText
          }
        }
      }
    },
    [`@media only screen and (max-width: ${token.screenXS}px) `]: {
      [`${calendarCls}`]: {
        [`${calendarCls}-header`]: {
          display: 'block',
          [`${calendarCls}-year-select`]: {
            width: '50%'
          },
          [`${calendarCls}-month-select`]: {
            width: `calc(50% - ${token.paddingXS}px)`
          },
          [`${calendarCls}-mode-switch`]: {
            width: '100%',
            marginTop: token.marginXS,
            marginInlineStart: 0,
            '> label': {
              width: '50%',
              textAlign: 'center'
            }
          }
        }
      }
    }
  };
};
exports.genCalendarStyles = genCalendarStyles;
var _default = (0, _internal.genComponentStyleHook)('Calendar', token => {
  const calendarCls = `${token.componentCls}-calendar`;
  const calendarToken = (0, _internal.mergeToken)((0, _style3.initInputToken)(token), (0, _style2.initPickerPanelToken)(token), {
    calendarCls,
    pickerCellInnerCls: `${token.componentCls}-cell-inner`,
    calendarFullBg: token.colorBgContainer,
    calendarFullPanelBg: token.colorBgContainer,
    calendarItemActiveBg: token.controlItemBgActive,
    dateValueHeight: token.controlHeightSM,
    weekHeight: token.controlHeightSM * 0.75,
    dateContentHeight: (token.fontSizeSM * token.lineHeightSM + token.marginXS) * 3 + token.lineWidth * 2
  });
  return [genCalendarStyles(calendarToken)];
}, {
  yearControlWidth: 80,
  monthControlWidth: 70,
  miniContentHeight: 256
});
exports.default = _default;