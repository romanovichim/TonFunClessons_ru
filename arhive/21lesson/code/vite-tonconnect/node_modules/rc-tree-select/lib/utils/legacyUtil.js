"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.convertChildrenToData = convertChildrenToData;
exports.fillAdditionalInfo = fillAdditionalInfo;
exports.fillLegacyProps = fillLegacyProps;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread2"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var React = _interopRequireWildcard(require("react"));

var _toArray = _interopRequireDefault(require("rc-util/lib/Children/toArray"));

var _warning = _interopRequireDefault(require("rc-util/lib/warning"));

var _TreeNode = _interopRequireDefault(require("../TreeNode"));

var _excluded = ["children", "value"];

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function convertChildrenToData(nodes) {
  return (0, _toArray.default)(nodes).map(function (node) {
    if (! /*#__PURE__*/React.isValidElement(node) || !node.type) {
      return null;
    }

    var _ref = node,
        key = _ref.key,
        _ref$props = _ref.props,
        children = _ref$props.children,
        value = _ref$props.value,
        restProps = (0, _objectWithoutProperties2.default)(_ref$props, _excluded);
    var data = (0, _objectSpread2.default)({
      key: key,
      value: value
    }, restProps);
    var childData = convertChildrenToData(children);

    if (childData.length) {
      data.children = childData;
    }

    return data;
  }).filter(function (data) {
    return data;
  });
}

function fillLegacyProps(dataNode) {
  if (!dataNode) {
    return dataNode;
  }

  var cloneNode = (0, _objectSpread2.default)({}, dataNode);

  if (!('props' in cloneNode)) {
    Object.defineProperty(cloneNode, 'props', {
      get: function get() {
        (0, _warning.default)(false, 'New `rc-tree-select` not support return node instance as argument anymore. Please consider to remove `props` access.');
        return cloneNode;
      }
    });
  }

  return cloneNode;
}

function fillAdditionalInfo(extra, triggerValue, checkedValues, treeData, showPosition, fieldNames) {
  var triggerNode = null;
  var nodeList = null;

  function generateMap() {
    function dig(list) {
      var level = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '0';
      var parentIncluded = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      return list.map(function (option, index) {
        var pos = "".concat(level, "-").concat(index);
        var value = option[fieldNames.value];
        var included = checkedValues.includes(value);
        var children = dig(option[fieldNames.children] || [], pos, included);
        var node = /*#__PURE__*/React.createElement(_TreeNode.default, option, children.map(function (child) {
          return child.node;
        })); // Link with trigger node

        if (triggerValue === value) {
          triggerNode = node;
        }

        if (included) {
          var checkedNode = {
            pos: pos,
            node: node,
            children: children
          };

          if (!parentIncluded) {
            nodeList.push(checkedNode);
          }

          return checkedNode;
        }

        return null;
      }).filter(function (node) {
        return node;
      });
    }

    if (!nodeList) {
      nodeList = [];
      dig(treeData); // Sort to keep the checked node length

      nodeList.sort(function (_ref2, _ref3) {
        var val1 = _ref2.node.props.value;
        var val2 = _ref3.node.props.value;
        var index1 = checkedValues.indexOf(val1);
        var index2 = checkedValues.indexOf(val2);
        return index1 - index2;
      });
    }
  }

  Object.defineProperty(extra, 'triggerNode', {
    get: function get() {
      (0, _warning.default)(false, '`triggerNode` is deprecated. Please consider decoupling data with node.');
      generateMap();
      return triggerNode;
    }
  });
  Object.defineProperty(extra, 'allCheckedNodes', {
    get: function get() {
      (0, _warning.default)(false, '`allCheckedNodes` is deprecated. Please consider decoupling data with node.');
      generateMap();

      if (showPosition) {
        return nodeList;
      }

      return nodeList.map(function (_ref4) {
        var node = _ref4.node;
        return node;
      });
    }
  });
}