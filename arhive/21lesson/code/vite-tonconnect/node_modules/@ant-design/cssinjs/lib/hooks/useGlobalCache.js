"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useClientCache;
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));
var React = _interopRequireWildcard(require("react"));
var _StyleContext = _interopRequireDefault(require("../StyleContext"));
var _useHMR = _interopRequireDefault(require("./useHMR"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function useClientCache(prefix, keyPath, cacheFn, onCacheRemove) {
  var _React$useContext = React.useContext(_StyleContext.default),
    globalCache = _React$useContext.cache;
  var fullPath = [prefix].concat((0, _toConsumableArray2.default)(keyPath));
  var HMRUpdate = (0, _useHMR.default)();

  // Create cache
  React.useMemo(function () {
    globalCache.update(fullPath, function (prevCache) {
      var _ref = prevCache || [],
        _ref2 = (0, _slicedToArray2.default)(_ref, 2),
        _ref2$ = _ref2[0],
        times = _ref2$ === void 0 ? 0 : _ref2$,
        cache = _ref2[1];

      // HMR should always ignore cache since developer may change it
      var tmpCache = cache;
      if (process.env.NODE_ENV !== 'production' && cache && HMRUpdate) {
        onCacheRemove === null || onCacheRemove === void 0 ? void 0 : onCacheRemove(tmpCache, HMRUpdate);
        tmpCache = null;
      }
      var mergedCache = tmpCache || cacheFn();
      return [times + 1, mergedCache];
    });
  }, /* eslint-disable react-hooks/exhaustive-deps */
  [fullPath.join('_')]
  /* eslint-enable */);

  // Remove if no need anymore
  React.useEffect(function () {
    return function () {
      globalCache.update(fullPath, function (prevCache) {
        var _ref3 = prevCache || [],
          _ref4 = (0, _slicedToArray2.default)(_ref3, 2),
          _ref4$ = _ref4[0],
          times = _ref4$ === void 0 ? 0 : _ref4$,
          cache = _ref4[1];
        var nextCount = times - 1;
        if (nextCount === 0) {
          onCacheRemove === null || onCacheRemove === void 0 ? void 0 : onCacheRemove(cache, false);
          return null;
        }
        return [times - 1, cache];
      });
    };
  }, fullPath);
  return globalCache.get(fullPath)[1];
}