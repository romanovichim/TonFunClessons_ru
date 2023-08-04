import * as React from 'react';
import type { UploadProps } from './interface';
export type DraggerProps = UploadProps & {
    height?: number;
};
declare const Dragger: React.ForwardRefExoticComponent<UploadProps<any> & {
    height?: number | undefined;
} & React.RefAttributes<unknown>>;
export default Dragger;
