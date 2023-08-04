import type { CSSInterpolation } from '@ant-design/cssinjs';
import type { UseComponentStyleResult } from '../internal';
import type { ComponentTokenMap, GlobalToken } from '../interface';
export type OverrideTokenWithoutDerivative = ComponentTokenMap;
export type OverrideComponent = keyof OverrideTokenWithoutDerivative;
export type GlobalTokenWithComponent<ComponentName extends OverrideComponent> = GlobalToken & ComponentTokenMap[ComponentName];
export interface StyleInfo<ComponentName extends OverrideComponent> {
    hashId: string;
    prefixCls: string;
    rootPrefixCls: string;
    iconPrefixCls: string;
    overrideComponentToken: ComponentTokenMap[ComponentName];
}
export type TokenWithCommonCls<T> = T & {
    /** Wrap component class with `.` prefix */
    componentCls: string;
    /** Origin prefix which do not have `.` prefix */
    prefixCls: string;
    /** Wrap icon class with `.` prefix */
    iconCls: string;
    /** Wrap ant prefixCls class with `.` prefix */
    antCls: string;
};
export type FullToken<ComponentName extends OverrideComponent> = TokenWithCommonCls<GlobalTokenWithComponent<ComponentName>>;
export default function genComponentStyleHook<ComponentName extends OverrideComponent>(component: ComponentName, styleFn: (token: FullToken<ComponentName>, info: StyleInfo<ComponentName>) => CSSInterpolation, getDefaultToken?: OverrideTokenWithoutDerivative[ComponentName] | ((token: GlobalToken) => OverrideTokenWithoutDerivative[ComponentName])): (prefixCls: string) => UseComponentStyleResult;
