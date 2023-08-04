"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.DescriptionsContext = void 0;
var _classnames = _interopRequireDefault(require("classnames"));
var _toArray = _interopRequireDefault(require("rc-util/lib/Children/toArray"));
var React = _interopRequireWildcard(require("react"));
var _configProvider = require("../config-provider");
var _reactNode = require("../_util/reactNode");
var _responsiveObserver = _interopRequireWildcard(require("../_util/responsiveObserver"));
var _warning = _interopRequireDefault(require("../_util/warning"));
var _Item = _interopRequireDefault(require("./Item"));
var _Row = _interopRequireDefault(require("./Row"));
var _style = _interopRequireDefault(require("./style"));
var __rest = void 0 && (void 0).__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
/* eslint-disable react/no-array-index-key */

const DescriptionsContext = /*#__PURE__*/React.createContext({});
exports.DescriptionsContext = DescriptionsContext;
const DEFAULT_COLUMN_MAP = {
  xxl: 3,
  xl: 3,
  lg: 3,
  md: 3,
  sm: 2,
  xs: 1
};
function getColumn(column, screens) {
  if (typeof column === 'number') {
    return column;
  }
  if (typeof column === 'object') {
    for (let i = 0; i < _responsiveObserver.responsiveArray.length; i++) {
      const breakpoint = _responsiveObserver.responsiveArray[i];
      if (screens[breakpoint] && column[breakpoint] !== undefined) {
        return column[breakpoint] || DEFAULT_COLUMN_MAP[breakpoint];
      }
    }
  }
  return 3;
}
function getFilledItem(node, rowRestCol, span) {
  let clone = node;
  if (span === undefined || span > rowRestCol) {
    clone = (0, _reactNode.cloneElement)(node, {
      span: rowRestCol
    });
    process.env.NODE_ENV !== "production" ? (0, _warning.default)(span === undefined, 'Descriptions', 'Sum of column `span` in a line not match `column` of Descriptions.') : void 0;
  }
  return clone;
}
function getRows(children, column) {
  const childNodes = (0, _toArray.default)(children).filter(n => n);
  const rows = [];
  let tmpRow = [];
  let rowRestCol = column;
  childNodes.forEach((node, index) => {
    var _a;
    const span = (_a = node.props) === null || _a === void 0 ? void 0 : _a.span;
    const mergedSpan = span || 1;
    // Additional handle last one
    if (index === childNodes.length - 1) {
      tmpRow.push(getFilledItem(node, rowRestCol, span));
      rows.push(tmpRow);
      return;
    }
    if (mergedSpan < rowRestCol) {
      rowRestCol -= mergedSpan;
      tmpRow.push(node);
    } else {
      tmpRow.push(getFilledItem(node, rowRestCol, mergedSpan));
      rows.push(tmpRow);
      rowRestCol = column;
      tmpRow = [];
    }
  });
  return rows;
}
function Descriptions(_a) {
  var {
      prefixCls: customizePrefixCls,
      title,
      extra,
      column = DEFAULT_COLUMN_MAP,
      colon = true,
      bordered,
      layout,
      children,
      className,
      rootClassName,
      style,
      size,
      labelStyle,
      contentStyle
    } = _a,
    restProps = __rest(_a, ["prefixCls", "title", "extra", "column", "colon", "bordered", "layout", "children", "className", "rootClassName", "style", "size", "labelStyle", "contentStyle"]);
  const {
    getPrefixCls,
    direction
  } = React.useContext(_configProvider.ConfigContext);
  const prefixCls = getPrefixCls('descriptions', customizePrefixCls);
  const [screens, setScreens] = React.useState({});
  const mergedColumn = getColumn(column, screens);
  const [wrapSSR, hashId] = (0, _style.default)(prefixCls);
  const responsiveObserver = (0, _responsiveObserver.default)();
  // Responsive
  React.useEffect(() => {
    const token = responsiveObserver.subscribe(newScreens => {
      if (typeof column !== 'object') {
        return;
      }
      setScreens(newScreens);
    });
    return () => {
      responsiveObserver.unsubscribe(token);
    };
  }, []);
  // Children
  const rows = getRows(children, mergedColumn);
  const contextValue = React.useMemo(() => ({
    labelStyle,
    contentStyle
  }), [labelStyle, contentStyle]);
  return wrapSSR( /*#__PURE__*/React.createElement(DescriptionsContext.Provider, {
    value: contextValue
  }, /*#__PURE__*/React.createElement("div", Object.assign({
    className: (0, _classnames.default)(prefixCls, {
      [`${prefixCls}-${size}`]: size && size !== 'default',
      [`${prefixCls}-bordered`]: !!bordered,
      [`${prefixCls}-rtl`]: direction === 'rtl'
    }, className, rootClassName, hashId),
    style: style
  }, restProps), (title || extra) && /*#__PURE__*/React.createElement("div", {
    className: `${prefixCls}-header`
  }, title && /*#__PURE__*/React.createElement("div", {
    className: `${prefixCls}-title`
  }, title), extra && /*#__PURE__*/React.createElement("div", {
    className: `${prefixCls}-extra`
  }, extra)), /*#__PURE__*/React.createElement("div", {
    className: `${prefixCls}-view`
  }, /*#__PURE__*/React.createElement("table", null, /*#__PURE__*/React.createElement("tbody", null, rows.map((row, index) => /*#__PURE__*/React.createElement(_Row.default, {
    key: index,
    index: index,
    colon: colon,
    prefixCls: prefixCls,
    vertical: layout === 'vertical',
    bordered: bordered,
    row: row
  }))))))));
}
if (process.env.NODE_ENV !== 'production') {
  Descriptions.displayName = 'Descriptions';
}
Descriptions.Item = _Item.default;
var _default = Descriptions;
exports.default = _default;