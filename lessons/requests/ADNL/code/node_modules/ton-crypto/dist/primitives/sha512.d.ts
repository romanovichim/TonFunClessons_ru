/// <reference types="node" />
export declare function sha512_sync(source: Buffer | string): Buffer;
export declare function sha512_fallback(source: Buffer | string): Promise<Buffer>;
export declare function sha512(source: Buffer | string): Promise<Buffer>;
