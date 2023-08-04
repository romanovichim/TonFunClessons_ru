"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.OmitProps = void 0;
var _classnames = _interopRequireDefault(require("classnames"));
var React = _interopRequireWildcard(require("react"));
var _pagination = _interopRequireDefault(require("../pagination"));
var _ListItem = _interopRequireDefault(require("./ListItem"));
const OmitProps = ['handleFilter', 'handleClear', 'checkedKeys'];
exports.OmitProps = OmitProps;
const parsePagination = pagination => {
  if (!pagination) {
    return null;
  }
  const defaultPagination = {
    pageSize: 10,
    simple: true,
    showSizeChanger: false,
    showLessItems: false
  };
  if (typeof pagination === 'object') {
    return Object.assign(Object.assign({}, defaultPagination), pagination);
  }
  return defaultPagination;
};
const TransferListBody = (props, ref) => {
  const {
    prefixCls,
    filteredRenderItems,
    selectedKeys,
    disabled: globalDisabled,
    showRemove,
    pagination,
    onScroll,
    onItemSelect,
    onItemRemove
  } = props;
  const [current, setCurrent] = React.useState(1);
  React.useEffect(() => {
    const mergedPagination = parsePagination(pagination);
    if (mergedPagination) {
      const maxPageCount = Math.ceil(filteredRenderItems.length / mergedPagination.pageSize);
      setCurrent(Math.min(current, maxPageCount));
    }
  }, [filteredRenderItems, pagination]);
  const onClick = item => {
    onItemSelect === null || onItemSelect === void 0 ? void 0 : onItemSelect(item.key, !selectedKeys.includes(item.key));
  };
  const onRemove = item => {
    onItemRemove === null || onItemRemove === void 0 ? void 0 : onItemRemove([item.key]);
  };
  const onPageChange = cur => {
    setCurrent(cur);
  };
  const memoizedItems = React.useMemo(() => {
    const mergedPagination = parsePagination(pagination);
    const displayItems = mergedPagination ? filteredRenderItems.slice((current - 1) * mergedPagination.pageSize, current * mergedPagination.pageSize) : filteredRenderItems;
    return displayItems;
  }, [current, filteredRenderItems, pagination]);
  React.useImperativeHandle(ref, () => ({
    items: memoizedItems
  }));
  const mergedPagination = parsePagination(pagination);
  const paginationNode = mergedPagination ? /*#__PURE__*/React.createElement(_pagination.default, {
    size: "small",
    disabled: globalDisabled,
    simple: mergedPagination.simple,
    pageSize: mergedPagination.pageSize,
    showLessItems: mergedPagination.showLessItems,
    showSizeChanger: mergedPagination.showSizeChanger,
    className: `${prefixCls}-pagination`,
    total: filteredRenderItems.length,
    current: current,
    onChange: onPageChange
  }) : null;
  const cls = (0, _classnames.default)(`${prefixCls}-content`, {
    [`${prefixCls}-content-show-remove`]: showRemove
  });
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("ul", {
    className: cls,
    onScroll: onScroll
  }, (memoizedItems || []).map(_ref => {
    let {
      renderedEl,
      renderedText,
      item
    } = _ref;
    return /*#__PURE__*/React.createElement(_ListItem.default, {
      key: item.key,
      item: item,
      renderedText: renderedText,
      renderedEl: renderedEl,
      prefixCls: prefixCls,
      showRemove: showRemove,
      onClick: onClick,
      onRemove: onRemove,
      checked: selectedKeys.includes(item.key),
      disabled: globalDisabled || item.disabled
    });
  })), paginationNode);
};
if (process.env.NODE_ENV !== 'production') {
  TransferListBody.displayName = 'TransferListBody';
}
var _default = /*#__PURE__*/React.forwardRef(TransferListBody);
exports.default = _default;