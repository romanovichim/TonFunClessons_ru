import type { FullToken } from '../../theme/internal';
/** Component only token. Which will handle additional calculation of alias token */
export interface ComponentToken {
    zIndexPopup: number;
    width: number;
}
export interface NotificationToken extends FullToken<'Notification'> {
    notificationBg: string;
    notificationPaddingVertical: number;
    notificationPaddingHorizontal: number;
    notificationPadding: string;
    notificationMarginBottom: number;
    notificationMarginEdge: number;
    animationMaxHeight: number;
    notificationIconSize: number;
    notificationCloseButtonSize: number;
}
declare const _default: (prefixCls: string) => import("../../theme/internal").UseComponentStyleResult;
export default _default;
