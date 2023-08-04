import { createTheme, useCacheToken, useStyleRegister } from '@ant-design/cssinjs';
import React from 'react';
import version from '../version';
import { PresetColors } from './interface';
import defaultDerivative from './themes/default';
import defaultSeedToken from './themes/seed';
import formatToken from './util/alias';
import genComponentStyleHook from './util/genComponentStyleHook';
import statisticToken, { merge as mergeToken, statistic } from './util/statistic';
const defaultTheme = createTheme(defaultDerivative);
export {
// colors
PresetColors,
// Statistic
statistic, statisticToken, mergeToken,
// hooks
useStyleRegister, genComponentStyleHook };
// ================================ Context =================================
// To ensure snapshot stable. We disable hashed in test env.
export const defaultConfig = {
  token: defaultSeedToken,
  hashed: true
};
export const DesignTokenContext = /*#__PURE__*/React.createContext(defaultConfig);
// ================================== Hook ==================================
export function useToken() {
  const {
    token: rootDesignToken,
    hashed,
    theme,
    components
  } = React.useContext(DesignTokenContext);
  const salt = `${version}-${hashed || ''}`;
  const mergedTheme = theme || defaultTheme;
  const [token, hashId] = useCacheToken(mergedTheme, [defaultSeedToken, rootDesignToken], {
    salt,
    override: Object.assign({
      override: rootDesignToken
    }, components),
    formatToken
  });
  return [mergedTheme, token, hashed ? hashId : ''];
}