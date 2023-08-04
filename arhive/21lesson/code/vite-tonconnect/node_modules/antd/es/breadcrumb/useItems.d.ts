import type { BreadcrumbItemType, BreadcrumbSeparatorType, ItemType, Route } from './Breadcrumb';
type MergedType = BreadcrumbItemType & {
    children?: Route['children'];
};
export default function useItems(items?: ItemType[], routes?: Route[]): Partial<MergedType & BreadcrumbSeparatorType>[] | null;
export {};
