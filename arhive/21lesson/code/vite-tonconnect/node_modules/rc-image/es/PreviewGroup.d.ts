import * as React from 'react';
import type { ImagePreviewType } from './Image';
import type { PreviewProps } from './Preview';
export interface PreviewGroupPreview extends Omit<ImagePreviewType, 'icons' | 'mask' | 'maskClassName'> {
    /**
     * If Preview the show img index
     * @default 0
     */
    current?: number;
    countRender?: (current: number, total: number) => string;
    onChange?: (current: number, prevCurrent: number) => void;
}
export interface GroupConsumerProps {
    previewPrefixCls?: string;
    icons?: PreviewProps['icons'];
    preview?: boolean | PreviewGroupPreview;
    children?: React.ReactNode;
}
interface PreviewUrl {
    url: string;
    canPreview: boolean;
}
export interface GroupConsumerValue extends GroupConsumerProps {
    isPreviewGroup?: boolean;
    previewUrls: Map<number, string>;
    setPreviewUrls: React.Dispatch<React.SetStateAction<Map<number, PreviewUrl>>>;
    current: number;
    setCurrent: React.Dispatch<React.SetStateAction<number>>;
    setShowPreview: React.Dispatch<React.SetStateAction<boolean>>;
    setMousePosition: React.Dispatch<React.SetStateAction<null | {
        x: number;
        y: number;
    }>>;
    registerImage: (id: number, url: string, canPreview?: boolean) => () => void;
    rootClassName?: string;
}
export declare const context: React.Context<GroupConsumerValue>;
declare const Group: React.FC<GroupConsumerProps>;
export default Group;
