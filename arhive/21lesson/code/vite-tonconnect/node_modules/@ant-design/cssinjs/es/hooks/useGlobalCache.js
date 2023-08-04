import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import _toConsumableArray from "@babel/runtime/helpers/esm/toConsumableArray";
import * as React from 'react';
import StyleContext from "../StyleContext";
import useHMR from "./useHMR";
export default function useClientCache(prefix, keyPath, cacheFn, onCacheRemove) {
  var _React$useContext = React.useContext(StyleContext),
    globalCache = _React$useContext.cache;
  var fullPath = [prefix].concat(_toConsumableArray(keyPath));
  var HMRUpdate = useHMR();

  // Create cache
  React.useMemo(function () {
    globalCache.update(fullPath, function (prevCache) {
      var _ref = prevCache || [],
        _ref2 = _slicedToArray(_ref, 2),
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
          _ref4 = _slicedToArray(_ref3, 2),
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