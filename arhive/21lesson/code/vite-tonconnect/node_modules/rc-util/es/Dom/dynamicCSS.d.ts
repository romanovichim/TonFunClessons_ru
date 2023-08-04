export declare type ContainerType = Element | ShadowRoot;
export declare type Prepend = boolean | 'queue';
export declare type AppendType = 'prependQueue' | 'append' | 'prepend';
interface Options {
    attachTo?: ContainerType;
    csp?: {
        nonce?: string;
    };
    prepend?: Prepend;
    mark?: string;
}
export declare function injectCSS(css: string, option?: Options): HTMLStyleElement;
export declare function removeCSS(key: string, option?: Options): void;
/**
 * manually clear container cache to avoid global cache in unit testes
 */
export declare function clearContainerCache(): void;
export declare function updateCSS(css: string, key: string, option?: Options): HTMLStyleElement;
export {};
