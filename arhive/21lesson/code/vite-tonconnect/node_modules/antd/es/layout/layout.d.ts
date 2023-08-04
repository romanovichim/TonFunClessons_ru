import * as React from 'react';
export interface GeneratorProps {
    suffixCls?: string;
    tagName: 'header' | 'footer' | 'main' | 'section';
    displayName: string;
}
export interface BasicProps extends React.HTMLAttributes<HTMLDivElement> {
    prefixCls?: string;
    suffixCls?: string;
    rootClassName?: string;
    hasSider?: boolean;
}
export interface LayoutContextProps {
    siderHook: {
        addSider: (id: string) => void;
        removeSider: (id: string) => void;
    };
}
export declare const LayoutContext: React.Context<LayoutContextProps>;
declare const Layout: React.ForwardRefExoticComponent<BasicProps & React.RefAttributes<HTMLElement>>;
declare const Header: React.ForwardRefExoticComponent<BasicProps & React.RefAttributes<HTMLElement>>;
declare const Footer: React.ForwardRefExoticComponent<BasicProps & React.RefAttributes<HTMLElement>>;
declare const Content: React.ForwardRefExoticComponent<BasicProps & React.RefAttributes<HTMLElement>>;
export { Header, Footer, Content };
export default Layout;
