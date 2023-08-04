/// <reference types="react" />
declare type TransformType = {
    x: number;
    y: number;
    rotate: number;
    scale: number;
    flipX: boolean;
    flipY: boolean;
};
export default function useImageTransform(imgRef: React.MutableRefObject<HTMLImageElement>): {
    transform: {
        x: number;
        y: number;
        rotate: number;
        scale: number;
        flipX: boolean;
        flipY: boolean;
    };
    resetTransform: () => void;
    updateTransform: (newTransform: Partial<TransformType>) => void;
    dispatchZoomChange: (ratio: number, clientX?: number, clientY?: number) => void;
};
export {};
