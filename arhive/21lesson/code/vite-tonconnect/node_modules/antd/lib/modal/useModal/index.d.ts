import * as React from 'react';
import type { ModalStaticFunctions } from '../confirm';
declare function useModal(): readonly [
    instance: Omit<ModalStaticFunctions, 'warn'>,
    contextHolder: React.ReactElement
];
export default useModal;
