"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _rcTree = require("rc-tree");
var _Tree = _interopRequireDefault(require("./Tree"));
var _DirectoryTree = _interopRequireDefault(require("./DirectoryTree"));
const Tree = _Tree.default;
Tree.DirectoryTree = _DirectoryTree.default;
Tree.TreeNode = _rcTree.TreeNode;
var _default = Tree;
exports.default = _default;