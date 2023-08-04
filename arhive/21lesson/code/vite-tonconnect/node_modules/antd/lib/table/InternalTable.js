"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _classnames = _interopRequireDefault(require("classnames"));
var _useColumns = require("rc-table/lib/hooks/useColumns");
var _Table = require("rc-table/lib/Table");
var _omit = _interopRequireDefault(require("rc-util/lib/omit"));
var React = _interopRequireWildcard(require("react"));
var _context = require("../config-provider/context");
var _defaultRenderEmpty = _interopRequireDefault(require("../config-provider/defaultRenderEmpty"));
var _SizeContext = _interopRequireDefault(require("../config-provider/SizeContext"));
var _useBreakpoint = _interopRequireDefault(require("../grid/hooks/useBreakpoint"));
var _en_US = _interopRequireDefault(require("../locale/en_US"));
var _pagination = _interopRequireDefault(require("../pagination"));
var _spin = _interopRequireDefault(require("../spin"));
var _scrollTo = _interopRequireDefault(require("../_util/scrollTo"));
var _warning = _interopRequireDefault(require("../_util/warning"));
var _ExpandIcon = _interopRequireDefault(require("./ExpandIcon"));
var _useFilter = _interopRequireWildcard(require("./hooks/useFilter"));
var _useLazyKVMap = _interopRequireDefault(require("./hooks/useLazyKVMap"));
var _usePagination = _interopRequireWildcard(require("./hooks/usePagination"));
var _useSelection = _interopRequireDefault(require("./hooks/useSelection"));
var _useSorter = _interopRequireWildcard(require("./hooks/useSorter"));
var _useTitleColumns = _interopRequireDefault(require("./hooks/useTitleColumns"));
var _RcTable = _interopRequireDefault(require("./RcTable"));
var _style = _interopRequireDefault(require("./style"));
const EMPTY_LIST = [];
function InternalTable(props, ref) {
  const {
    getPopupContainer: getContextPopupContainer
  } = React.useContext(_context.ConfigContext);
  const {
    prefixCls: customizePrefixCls,
    className,
    rootClassName,
    style,
    size: customizeSize,
    bordered,
    dropdownPrefixCls: customizeDropdownPrefixCls,
    dataSource,
    pagination,
    rowSelection,
    rowKey = 'key',
    rowClassName,
    columns,
    children,
    childrenColumnName: legacyChildrenColumnName,
    onChange,
    getPopupContainer,
    loading,
    expandIcon,
    expandable,
    expandedRowRender,
    expandIconColumnIndex,
    indentSize,
    scroll,
    sortDirections,
    locale,
    showSorterTooltip = true
  } = props;
  if (process.env.NODE_ENV !== 'production') {
    process.env.NODE_ENV !== "production" ? (0, _warning.default)(!(typeof rowKey === 'function' && rowKey.length > 1), 'Table', '`index` parameter of `rowKey` function is deprecated. There is no guarantee that it will work as expected.') : void 0;
  }
  const baseColumns = React.useMemo(() => columns || (0, _useColumns.convertChildrenToColumns)(children), [columns, children]);
  const needResponsive = React.useMemo(() => baseColumns.some(col => col.responsive), [baseColumns]);
  const screens = (0, _useBreakpoint.default)(needResponsive);
  const mergedColumns = React.useMemo(() => {
    const matched = new Set(Object.keys(screens).filter(m => screens[m]));
    return baseColumns.filter(c => !c.responsive || c.responsive.some(r => matched.has(r)));
  }, [baseColumns, screens]);
  const tableProps = (0, _omit.default)(props, ['className', 'style', 'columns']);
  const size = React.useContext(_SizeContext.default);
  const {
    locale: contextLocale = _en_US.default,
    direction,
    renderEmpty,
    getPrefixCls
  } = React.useContext(_context.ConfigContext);
  const mergedSize = customizeSize || size;
  const tableLocale = Object.assign(Object.assign({}, contextLocale.Table), locale);
  const rawData = dataSource || EMPTY_LIST;
  const prefixCls = getPrefixCls('table', customizePrefixCls);
  const dropdownPrefixCls = getPrefixCls('dropdown', customizeDropdownPrefixCls);
  const mergedExpandable = Object.assign({
    childrenColumnName: legacyChildrenColumnName,
    expandIconColumnIndex
  }, expandable);
  const {
    childrenColumnName = 'children'
  } = mergedExpandable;
  const expandType = React.useMemo(() => {
    if (rawData.some(item => item === null || item === void 0 ? void 0 : item[childrenColumnName])) {
      return 'nest';
    }
    if (expandedRowRender || expandable && expandable.expandedRowRender) {
      return 'row';
    }
    return null;
  }, [rawData]);
  const internalRefs = {
    body: React.useRef()
  };
  // ============================ RowKey ============================
  const getRowKey = React.useMemo(() => {
    if (typeof rowKey === 'function') {
      return rowKey;
    }
    return record => record === null || record === void 0 ? void 0 : record[rowKey];
  }, [rowKey]);
  const [getRecordByKey] = (0, _useLazyKVMap.default)(rawData, childrenColumnName, getRowKey);
  // ============================ Events =============================
  const changeEventInfo = {};
  const triggerOnChange = function (info, action) {
    let reset = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    const changeInfo = Object.assign(Object.assign({}, changeEventInfo), info);
    if (reset) {
      changeEventInfo.resetPagination();
      // Reset event param
      if (changeInfo.pagination.current) {
        changeInfo.pagination.current = 1;
      }
      // Trigger pagination events
      if (pagination && pagination.onChange) {
        pagination.onChange(1, changeInfo.pagination.pageSize);
      }
    }
    if (scroll && scroll.scrollToFirstRowOnChange !== false && internalRefs.body.current) {
      (0, _scrollTo.default)(0, {
        getContainer: () => internalRefs.body.current
      });
    }
    onChange === null || onChange === void 0 ? void 0 : onChange(changeInfo.pagination, changeInfo.filters, changeInfo.sorter, {
      currentDataSource: (0, _useFilter.getFilterData)((0, _useSorter.getSortData)(rawData, changeInfo.sorterStates, childrenColumnName), changeInfo.filterStates),
      action
    });
  };
  /**
   * Controlled state in `columns` is not a good idea that makes too many code (1000+ line?) to read
   * state out and then put it back to title render. Move these code into `hooks` but still too
   * complex. We should provides Table props like `sorter` & `filter` to handle control in next big
   * version.
   */
  // ============================ Sorter =============================
  const onSorterChange = (sorter, sorterStates) => {
    triggerOnChange({
      sorter,
      sorterStates
    }, 'sort', false);
  };
  const [transformSorterColumns, sortStates, sorterTitleProps, getSorters] = (0, _useSorter.default)({
    prefixCls,
    mergedColumns,
    onSorterChange,
    sortDirections: sortDirections || ['ascend', 'descend'],
    tableLocale,
    showSorterTooltip
  });
  const sortedData = React.useMemo(() => (0, _useSorter.getSortData)(rawData, sortStates, childrenColumnName), [rawData, sortStates]);
  changeEventInfo.sorter = getSorters();
  changeEventInfo.sorterStates = sortStates;
  // ============================ Filter ============================
  const onFilterChange = (filters, filterStates) => {
    triggerOnChange({
      filters,
      filterStates
    }, 'filter', true);
  };
  const [transformFilterColumns, filterStates, filters] = (0, _useFilter.default)({
    prefixCls,
    locale: tableLocale,
    dropdownPrefixCls,
    mergedColumns,
    onFilterChange,
    getPopupContainer: getPopupContainer || getContextPopupContainer
  });
  const mergedData = (0, _useFilter.getFilterData)(sortedData, filterStates);
  changeEventInfo.filters = filters;
  changeEventInfo.filterStates = filterStates;
  // ============================ Column ============================
  const columnTitleProps = React.useMemo(() => {
    const mergedFilters = {};
    Object.keys(filters).forEach(filterKey => {
      if (filters[filterKey] !== null) {
        mergedFilters[filterKey] = filters[filterKey];
      }
    });
    return Object.assign(Object.assign({}, sorterTitleProps), {
      filters: mergedFilters
    });
  }, [sorterTitleProps, filters]);
  const [transformTitleColumns] = (0, _useTitleColumns.default)(columnTitleProps);
  // ========================== Pagination ==========================
  const onPaginationChange = (current, pageSize) => {
    triggerOnChange({
      pagination: Object.assign(Object.assign({}, changeEventInfo.pagination), {
        current,
        pageSize
      })
    }, 'paginate');
  };
  const [mergedPagination, resetPagination] = (0, _usePagination.default)(mergedData.length, onPaginationChange, pagination);
  changeEventInfo.pagination = pagination === false ? {} : (0, _usePagination.getPaginationParam)(mergedPagination, pagination);
  changeEventInfo.resetPagination = resetPagination;
  // ============================= Data =============================
  const pageData = React.useMemo(() => {
    if (pagination === false || !mergedPagination.pageSize) {
      return mergedData;
    }
    const {
      current = 1,
      total,
      pageSize = _usePagination.DEFAULT_PAGE_SIZE
    } = mergedPagination;
    process.env.NODE_ENV !== "production" ? (0, _warning.default)(current > 0, 'Table', '`current` should be positive number.') : void 0;
    // Dynamic table data
    if (mergedData.length < total) {
      if (mergedData.length > pageSize) {
        process.env.NODE_ENV !== "production" ? (0, _warning.default)(false, 'Table', '`dataSource` length is less than `pagination.total` but large than `pagination.pageSize`. Please make sure your config correct data with async mode.') : void 0;
        return mergedData.slice((current - 1) * pageSize, current * pageSize);
      }
      return mergedData;
    }
    return mergedData.slice((current - 1) * pageSize, current * pageSize);
  }, [!!pagination, mergedData, mergedPagination && mergedPagination.current, mergedPagination && mergedPagination.pageSize, mergedPagination && mergedPagination.total]);
  // ========================== Selections ==========================
  const [transformSelectionColumns, selectedKeySet] = (0, _useSelection.default)({
    prefixCls,
    data: mergedData,
    pageData,
    getRowKey,
    getRecordByKey,
    expandType,
    childrenColumnName,
    locale: tableLocale,
    getPopupContainer: getPopupContainer || getContextPopupContainer
  }, rowSelection);
  const internalRowClassName = (record, index, indent) => {
    let mergedRowClassName;
    if (typeof rowClassName === 'function') {
      mergedRowClassName = (0, _classnames.default)(rowClassName(record, index, indent));
    } else {
      mergedRowClassName = (0, _classnames.default)(rowClassName);
    }
    return (0, _classnames.default)({
      [`${prefixCls}-row-selected`]: selectedKeySet.has(getRowKey(record, index))
    }, mergedRowClassName);
  };
  // ========================== Expandable ==========================
  // Pass origin render status into `rc-table`, this can be removed when refactor with `rc-table`
  mergedExpandable.__PARENT_RENDER_ICON__ = mergedExpandable.expandIcon;
  // Customize expandable icon
  mergedExpandable.expandIcon = mergedExpandable.expandIcon || expandIcon || (0, _ExpandIcon.default)(tableLocale);
  // Adjust expand icon index, no overwrite expandIconColumnIndex if set.
  if (expandType === 'nest' && mergedExpandable.expandIconColumnIndex === undefined) {
    mergedExpandable.expandIconColumnIndex = rowSelection ? 1 : 0;
  } else if (mergedExpandable.expandIconColumnIndex > 0 && rowSelection) {
    mergedExpandable.expandIconColumnIndex -= 1;
  }
  // Indent size
  if (typeof mergedExpandable.indentSize !== 'number') {
    mergedExpandable.indentSize = typeof indentSize === 'number' ? indentSize : 15;
  }
  // ============================ Render ============================
  const transformColumns = React.useCallback(innerColumns => transformTitleColumns(transformSelectionColumns(transformFilterColumns(transformSorterColumns(innerColumns)))), [transformSorterColumns, transformFilterColumns, transformSelectionColumns]);
  let topPaginationNode;
  let bottomPaginationNode;
  if (pagination !== false && (mergedPagination === null || mergedPagination === void 0 ? void 0 : mergedPagination.total)) {
    let paginationSize;
    if (mergedPagination.size) {
      paginationSize = mergedPagination.size;
    } else {
      paginationSize = mergedSize === 'small' || mergedSize === 'middle' ? 'small' : undefined;
    }
    const renderPagination = position => /*#__PURE__*/React.createElement(_pagination.default, Object.assign({}, mergedPagination, {
      className: (0, _classnames.default)(`${prefixCls}-pagination ${prefixCls}-pagination-${position}`, mergedPagination.className),
      size: paginationSize
    }));
    const defaultPosition = direction === 'rtl' ? 'left' : 'right';
    const {
      position
    } = mergedPagination;
    if (position !== null && Array.isArray(position)) {
      const topPos = position.find(p => p.includes('top'));
      const bottomPos = position.find(p => p.includes('bottom'));
      const isDisable = position.every(p => `${p}` === 'none');
      if (!topPos && !bottomPos && !isDisable) {
        bottomPaginationNode = renderPagination(defaultPosition);
      }
      if (topPos) {
        topPaginationNode = renderPagination(topPos.toLowerCase().replace('top', ''));
      }
      if (bottomPos) {
        bottomPaginationNode = renderPagination(bottomPos.toLowerCase().replace('bottom', ''));
      }
    } else {
      bottomPaginationNode = renderPagination(defaultPosition);
    }
  }
  // >>>>>>>>> Spinning
  let spinProps;
  if (typeof loading === 'boolean') {
    spinProps = {
      spinning: loading
    };
  } else if (typeof loading === 'object') {
    spinProps = Object.assign({
      spinning: true
    }, loading);
  }
  // Style
  const [wrapSSR, hashId] = (0, _style.default)(prefixCls);
  const wrapperClassNames = (0, _classnames.default)(`${prefixCls}-wrapper`, {
    [`${prefixCls}-wrapper-rtl`]: direction === 'rtl'
  }, className, rootClassName, hashId);
  const emptyText = locale && locale.emptyText || (renderEmpty === null || renderEmpty === void 0 ? void 0 : renderEmpty('Table')) || /*#__PURE__*/React.createElement(_defaultRenderEmpty.default, {
    componentName: "Table"
  });
  return wrapSSR( /*#__PURE__*/React.createElement("div", {
    ref: ref,
    className: wrapperClassNames,
    style: style
  }, /*#__PURE__*/React.createElement(_spin.default, Object.assign({
    spinning: false
  }, spinProps), topPaginationNode, /*#__PURE__*/React.createElement(_RcTable.default, Object.assign({}, tableProps, {
    columns: mergedColumns,
    direction: direction,
    expandable: mergedExpandable,
    prefixCls: prefixCls,
    className: (0, _classnames.default)({
      [`${prefixCls}-middle`]: mergedSize === 'middle',
      [`${prefixCls}-small`]: mergedSize === 'small',
      [`${prefixCls}-bordered`]: bordered,
      [`${prefixCls}-empty`]: rawData.length === 0
    }),
    data: pageData,
    rowKey: getRowKey,
    rowClassName: internalRowClassName,
    emptyText: emptyText,
    // Internal
    internalHooks: _Table.INTERNAL_HOOKS,
    internalRefs: internalRefs,
    transformColumns: transformColumns
  })), bottomPaginationNode)));
}
var _default = /*#__PURE__*/React.forwardRef(InternalTable);
exports.default = _default;