"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.geekblue = exports.cyan = exports.blue = void 0;
Object.defineProperty(exports, "generate", {
  enumerable: true,
  get: function get() {
    return _generate.default;
  }
});
exports.yellow = exports.volcano = exports.red = exports.purple = exports.presetPrimaryColors = exports.presetPalettes = exports.presetDarkPalettes = exports.orange = exports.magenta = exports.lime = exports.grey = exports.green = exports.gray = exports.gold = void 0;

var _generate = _interopRequireDefault(require("./generate"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var presetPrimaryColors = {
  red: '#F5222D',
  volcano: '#FA541C',
  orange: '#FA8C16',
  gold: '#FAAD14',
  yellow: '#FADB14',
  lime: '#A0D911',
  green: '#52C41A',
  cyan: '#13C2C2',
  blue: '#1677FF',
  geekblue: '#2F54EB',
  purple: '#722ED1',
  magenta: '#EB2F96',
  grey: '#666666'
};
exports.presetPrimaryColors = presetPrimaryColors;
var presetPalettes = {};
exports.presetPalettes = presetPalettes;
var presetDarkPalettes = {};
exports.presetDarkPalettes = presetDarkPalettes;
Object.keys(presetPrimaryColors).forEach(function (key) {
  presetPalettes[key] = (0, _generate.default)(presetPrimaryColors[key]);
  presetPalettes[key].primary = presetPalettes[key][5]; // dark presetPalettes

  presetDarkPalettes[key] = (0, _generate.default)(presetPrimaryColors[key], {
    theme: 'dark',
    backgroundColor: '#141414'
  });
  presetDarkPalettes[key].primary = presetDarkPalettes[key][5];
});
var red = presetPalettes.red;
exports.red = red;
var volcano = presetPalettes.volcano;
exports.volcano = volcano;
var gold = presetPalettes.gold;
exports.gold = gold;
var orange = presetPalettes.orange;
exports.orange = orange;
var yellow = presetPalettes.yellow;
exports.yellow = yellow;
var lime = presetPalettes.lime;
exports.lime = lime;
var green = presetPalettes.green;
exports.green = green;
var cyan = presetPalettes.cyan;
exports.cyan = cyan;
var blue = presetPalettes.blue;
exports.blue = blue;
var geekblue = presetPalettes.geekblue;
exports.geekblue = geekblue;
var purple = presetPalettes.purple;
exports.purple = purple;
var magenta = presetPalettes.magenta;
exports.magenta = magenta;
var grey = presetPalettes.grey;
exports.grey = grey;
var gray = presetPalettes.grey;
exports.gray = gray;