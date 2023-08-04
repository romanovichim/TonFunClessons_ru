/// <reference types="node" />
export declare function sha256_sync(source: Buffer | string): Buffer;
export declare function sha256_fallback(source: Buffer | string): Promise<Buffer>;
export declare function sha256(source: Buffer | string): Promise<Buffer>;
