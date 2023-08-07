/// <reference types="node" />
export declare function pbkdf2_sha512(key: string | Buffer, salt: string | Buffer, iterations: number, keyLen: number): Promise<Buffer>;
