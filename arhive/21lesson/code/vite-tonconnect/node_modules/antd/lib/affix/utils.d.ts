import type { InternalAffixClass } from '.';
export type BindElement = HTMLElement | Window | null | undefined;
export declare function getTargetRect(target: BindElement): DOMRect;
export declare function getFixedTop(placeholderRect: DOMRect, targetRect: DOMRect, offsetTop?: number): number | undefined;
export declare function getFixedBottom(placeholderRect: DOMRect, targetRect: DOMRect, offsetBottom?: number): number | undefined;
interface ObserverEntity {
    target: HTMLElement | Window;
    affixList: any[];
    eventHandlers: {
        [eventName: string]: any;
    };
}
export declare function getObserverEntities(): ObserverEntity[];
export declare function addObserveTarget<T extends InternalAffixClass>(target: HTMLElement | Window | null, affix?: T): void;
export declare function removeObserveTarget<T extends InternalAffixClass>(affix: T): void;
export {};
