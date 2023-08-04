import * as React from 'react';
import type { ScreenSizeMap } from '../_util/responsiveObserver';
export type AvatarSize = 'large' | 'small' | 'default' | number | ScreenSizeMap;
declare const SizeContext: React.Context<AvatarSize>;
export interface SizeContextProps {
    size?: AvatarSize;
    children?: React.ReactNode;
}
export declare const SizeContextProvider: React.FC<SizeContextProps>;
export default SizeContext;
