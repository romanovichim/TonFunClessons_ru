import { useStyleRegister } from '@ant-design/cssinjs';
import { useContext } from 'react';
import { genCommonStyle, genLinkStyle } from '../../style';
import { ConfigContext } from '../../config-provider/context';
import { mergeToken, statisticToken, useToken } from '../internal';
export default function genComponentStyleHook(component, styleFn, getDefaultToken) {
  return prefixCls => {
    const [theme, token, hashId] = useToken();
    const {
      getPrefixCls,
      iconPrefixCls
    } = useContext(ConfigContext);
    const rootPrefixCls = getPrefixCls();
    // Generate style for all a tags in antd component.
    useStyleRegister({
      theme,
      token,
      hashId,
      path: ['Shared', rootPrefixCls]
    }, () => [{
      // Link
      '&': genLinkStyle(token)
    }]);
    return [useStyleRegister({
      theme,
      token,
      hashId,
      path: [component, prefixCls, iconPrefixCls]
    }, () => {
      const {
        token: proxyToken,
        flush
      } = statisticToken(token);
      const defaultComponentToken = typeof getDefaultToken === 'function' ? getDefaultToken(proxyToken) : getDefaultToken;
      const mergedComponentToken = Object.assign(Object.assign({}, defaultComponentToken), token[component]);
      const componentCls = `.${prefixCls}`;
      const mergedToken = mergeToken(proxyToken, {
        componentCls,
        prefixCls,
        iconCls: `.${iconPrefixCls}`,
        antCls: `.${rootPrefixCls}`
      }, mergedComponentToken);
      const styleInterpolation = styleFn(mergedToken, {
        hashId,
        prefixCls,
        rootPrefixCls,
        iconPrefixCls,
        overrideComponentToken: token[component]
      });
      flush(component, mergedComponentToken);
      return [genCommonStyle(token, prefixCls), styleInterpolation];
    }), hashId];
  };
}