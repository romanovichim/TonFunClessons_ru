import * as React from 'react';
import warning from "rc-util/es/warning";
export default function usePresets(presets, legacyRanges) {
  return React.useMemo(function () {
    if (presets) {
      return presets;
    }
    if (legacyRanges) {
      warning(false, '`ranges` is deprecated. Please use `presets` instead.');
      var rangeLabels = Object.keys(legacyRanges);
      return rangeLabels.map(function (label) {
        var range = legacyRanges[label];
        var newValues = typeof range === 'function' ? range() : range;
        return {
          label: label,
          value: newValues
        };
      });
    }
    return [];
  }, [presets, legacyRanges]);
}