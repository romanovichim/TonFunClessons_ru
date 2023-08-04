import type { FullToken } from '../../theme/internal';
export interface ComponentToken {
}
export interface UploadToken extends FullToken<'Upload'> {
    uploadThumbnailSize: number;
    uploadProgressOffset: number;
    uploadPicCardSize: number;
}
declare const _default: (prefixCls: string) => import("../../theme/internal").UseComponentStyleResult;
export default _default;
