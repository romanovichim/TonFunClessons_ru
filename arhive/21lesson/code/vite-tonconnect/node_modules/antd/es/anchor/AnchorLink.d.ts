import * as React from 'react';
export interface AnchorLinkBaseProps {
    prefixCls?: string;
    href: string;
    target?: string;
    title: React.ReactNode;
    className?: string;
}
export interface AnchorLinkProps extends AnchorLinkBaseProps {
    children?: React.ReactNode;
}
declare const AnchorLink: React.FC<AnchorLinkProps>;
export default AnchorLink;
