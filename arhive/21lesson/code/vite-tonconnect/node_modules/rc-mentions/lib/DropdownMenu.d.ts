/// <reference types="react" />
import type { DataDrivenOptionProps } from './Mentions';
interface DropdownMenuProps {
    prefixCls?: string;
    options: DataDrivenOptionProps[];
}
/**
 * We only use Menu to display the candidate.
 * The focus is controlled by textarea to make accessibility easy.
 */
declare function DropdownMenu(props: DropdownMenuProps): JSX.Element;
export default DropdownMenu;
