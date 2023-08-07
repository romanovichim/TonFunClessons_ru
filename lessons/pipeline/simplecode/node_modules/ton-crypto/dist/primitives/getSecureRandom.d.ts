/// <reference types="node" />
export declare function getSecureRandomBytes(size: number): Promise<Buffer>;
export declare function getSecureRandomWords(size: number): Promise<Uint16Array>;
export declare function getSecureRandomNumber(min: number, max: number): Promise<number>;
