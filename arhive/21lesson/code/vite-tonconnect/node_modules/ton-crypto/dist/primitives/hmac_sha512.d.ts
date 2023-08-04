/// <reference types="node" />
export declare function hmac_sha512_fallback(key: string | Buffer, data: string | Buffer): Promise<Buffer>;
export declare function hmac_sha512(key: string | Buffer, data: string | Buffer): Promise<Buffer>;
