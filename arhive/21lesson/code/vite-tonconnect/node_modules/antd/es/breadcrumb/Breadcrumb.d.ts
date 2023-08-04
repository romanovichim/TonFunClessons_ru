import * as React from 'react';
import type { BreadcrumbItemProps } from './BreadcrumbItem';
import BreadcrumbItem from './BreadcrumbItem';
import BreadcrumbSeparator from './BreadcrumbSeparator';
/** @deprecated New of Breadcrumb using `items` instead of `routes` */
export interface Route {
    path: string;
    breadcrumbName: string;
    children?: Omit<Route, 'children'>[];
}
export interface BreadcrumbItemType {
    key?: React.Key;
    /**
     * Different with `path`. Directly set the link of this item.
     */
    href?: string;
    /**
     * Different with `href`. It will concat all prev `path` to the current one.
     */
    path?: string;
    title: React.ReactNode;
    menu?: BreadcrumbItemProps['menu'];
    /** @deprecated Please use `menu` instead */
    overlay?: React.ReactNode;
    className?: string;
    onClick?: React.MouseEventHandler<HTMLAnchorElement | HTMLSpanElement>;
}
export interface BreadcrumbSeparatorType {
    type: 'separator';
    separator?: React.ReactNode;
}
export type ItemType = BreadcrumbItemType | BreadcrumbSeparatorType;
export interface BaseBreadcrumbProps {
    prefixCls?: string;
    params?: any;
    separator?: React.ReactNode;
    style?: React.CSSProperties;
    className?: string;
    rootClassName?: string;
    children?: React.ReactNode;
}
export interface LegacyBreadcrumbProps extends BaseBreadcrumbProps {
    /** @deprecated Please use `items` instead */
    routes: Route[];
    itemRender?: (route: Route, params: any, routes: Route[], paths: string[]) => React.ReactNode;
}
export interface NewBreadcrumbProps extends BaseBreadcrumbProps {
    items: ItemType[];
    itemRender?: (route: ItemType, params: any, routes: ItemType[], paths: string[]) => React.ReactNode;
}
export type BreadcrumbProps = BaseBreadcrumbProps | LegacyBreadcrumbProps | NewBreadcrumbProps;
type CompoundedComponent = React.FC<BreadcrumbProps> & {
    Item: typeof BreadcrumbItem;
    Separator: typeof BreadcrumbSeparator;
};
declare const Breadcrumb: CompoundedComponent;
export default Breadcrumb;
