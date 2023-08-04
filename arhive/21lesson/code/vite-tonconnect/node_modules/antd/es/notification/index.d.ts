import * as React from 'react';
import type { ArgsProps } from './interface';
import PurePanel from './PurePanel';
import useNotification from './useNotification';
interface BaseMethods {
    open: (config: ArgsProps) => void;
    destroy: (key?: React.Key) => void;
    config: any;
    useNotification: typeof useNotification;
    /** @private Internal Component. Do not use in your production. */
    _InternalPanelDoNotUseOrYouWillBeFired: typeof PurePanel;
}
type StaticFn = (config: ArgsProps) => void;
interface NoticeMethods {
    success: StaticFn;
    info: StaticFn;
    warning: StaticFn;
    error: StaticFn;
}
declare const staticMethods: NoticeMethods & BaseMethods;
/** @private Only Work in test env */
export declare let actWrapper: (wrapper: any) => void;
export default staticMethods;
