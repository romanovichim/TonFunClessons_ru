import nacl from 'tweetnacl-util';
import nacl$1 from 'tweetnacl';

var CONNECT_EVENT_ERROR_CODES;
(function (CONNECT_EVENT_ERROR_CODES) {
    CONNECT_EVENT_ERROR_CODES[CONNECT_EVENT_ERROR_CODES["UNKNOWN_ERROR"] = 0] = "UNKNOWN_ERROR";
    CONNECT_EVENT_ERROR_CODES[CONNECT_EVENT_ERROR_CODES["BAD_REQUEST_ERROR"] = 1] = "BAD_REQUEST_ERROR";
    CONNECT_EVENT_ERROR_CODES[CONNECT_EVENT_ERROR_CODES["MANIFEST_NOT_FOUND_ERROR"] = 2] = "MANIFEST_NOT_FOUND_ERROR";
    CONNECT_EVENT_ERROR_CODES[CONNECT_EVENT_ERROR_CODES["MANIFEST_CONTENT_ERROR"] = 3] = "MANIFEST_CONTENT_ERROR";
    CONNECT_EVENT_ERROR_CODES[CONNECT_EVENT_ERROR_CODES["UNKNOWN_APP_ERROR"] = 100] = "UNKNOWN_APP_ERROR";
    CONNECT_EVENT_ERROR_CODES[CONNECT_EVENT_ERROR_CODES["USER_REJECTS_ERROR"] = 300] = "USER_REJECTS_ERROR";
    CONNECT_EVENT_ERROR_CODES[CONNECT_EVENT_ERROR_CODES["METHOD_NOT_SUPPORTED"] = 400] = "METHOD_NOT_SUPPORTED";
})(CONNECT_EVENT_ERROR_CODES || (CONNECT_EVENT_ERROR_CODES = {}));
var CONNECT_ITEM_ERROR_CODES;
(function (CONNECT_ITEM_ERROR_CODES) {
    CONNECT_ITEM_ERROR_CODES[CONNECT_ITEM_ERROR_CODES["UNKNOWN_ERROR"] = 0] = "UNKNOWN_ERROR";
    CONNECT_ITEM_ERROR_CODES[CONNECT_ITEM_ERROR_CODES["METHOD_NOT_SUPPORTED"] = 400] = "METHOD_NOT_SUPPORTED";
})(CONNECT_ITEM_ERROR_CODES || (CONNECT_ITEM_ERROR_CODES = {}));

var SEND_TRANSACTION_ERROR_CODES;
(function (SEND_TRANSACTION_ERROR_CODES) {
    SEND_TRANSACTION_ERROR_CODES[SEND_TRANSACTION_ERROR_CODES["UNKNOWN_ERROR"] = 0] = "UNKNOWN_ERROR";
    SEND_TRANSACTION_ERROR_CODES[SEND_TRANSACTION_ERROR_CODES["BAD_REQUEST_ERROR"] = 1] = "BAD_REQUEST_ERROR";
    SEND_TRANSACTION_ERROR_CODES[SEND_TRANSACTION_ERROR_CODES["UNKNOWN_APP_ERROR"] = 100] = "UNKNOWN_APP_ERROR";
    SEND_TRANSACTION_ERROR_CODES[SEND_TRANSACTION_ERROR_CODES["USER_REJECTS_ERROR"] = 300] = "USER_REJECTS_ERROR";
    SEND_TRANSACTION_ERROR_CODES[SEND_TRANSACTION_ERROR_CODES["METHOD_NOT_SUPPORTED"] = 400] = "METHOD_NOT_SUPPORTED";
})(SEND_TRANSACTION_ERROR_CODES || (SEND_TRANSACTION_ERROR_CODES = {}));

var SIGN_DATA_ERROR_CODES;
(function (SIGN_DATA_ERROR_CODES) {
    SIGN_DATA_ERROR_CODES[SIGN_DATA_ERROR_CODES["UNKNOWN_ERROR"] = 0] = "UNKNOWN_ERROR";
    SIGN_DATA_ERROR_CODES[SIGN_DATA_ERROR_CODES["BAD_REQUEST_ERROR"] = 1] = "BAD_REQUEST_ERROR";
    SIGN_DATA_ERROR_CODES[SIGN_DATA_ERROR_CODES["UNKNOWN_APP_ERROR"] = 100] = "UNKNOWN_APP_ERROR";
    SIGN_DATA_ERROR_CODES[SIGN_DATA_ERROR_CODES["USER_REJECTS_ERROR"] = 300] = "USER_REJECTS_ERROR";
    SIGN_DATA_ERROR_CODES[SIGN_DATA_ERROR_CODES["METHOD_NOT_SUPPORTED"] = 400] = "METHOD_NOT_SUPPORTED";
})(SIGN_DATA_ERROR_CODES || (SIGN_DATA_ERROR_CODES = {}));

var DISCONNECT_ERROR_CODES;
(function (DISCONNECT_ERROR_CODES) {
    DISCONNECT_ERROR_CODES[DISCONNECT_ERROR_CODES["UNKNOWN_ERROR"] = 0] = "UNKNOWN_ERROR";
    DISCONNECT_ERROR_CODES[DISCONNECT_ERROR_CODES["BAD_REQUEST_ERROR"] = 1] = "BAD_REQUEST_ERROR";
    DISCONNECT_ERROR_CODES[DISCONNECT_ERROR_CODES["UNKNOWN_APP_ERROR"] = 100] = "UNKNOWN_APP_ERROR";
    DISCONNECT_ERROR_CODES[DISCONNECT_ERROR_CODES["METHOD_NOT_SUPPORTED"] = 400] = "METHOD_NOT_SUPPORTED";
})(DISCONNECT_ERROR_CODES || (DISCONNECT_ERROR_CODES = {}));

var CHAIN;
(function (CHAIN) {
    CHAIN["MAINNET"] = "-239";
    CHAIN["TESTNET"] = "-3";
})(CHAIN || (CHAIN = {}));

function encodeUint8Array(value, urlSafe) {
    const encoded = nacl.encodeBase64(value);
    if (!urlSafe) {
        return encoded;
    }
    return encodeURIComponent(encoded);
}
function decodeToUint8Array(value, urlSafe) {
    if (urlSafe) {
        value = decodeURIComponent(value);
    }
    return nacl.decodeBase64(value);
}
function encode(value, urlSafe = false) {
    let uint8Array;
    if (value instanceof Uint8Array) {
        uint8Array = value;
    }
    else {
        if (typeof value !== 'string') {
            value = JSON.stringify(value);
        }
        uint8Array = nacl.decodeUTF8(value);
    }
    return encodeUint8Array(uint8Array, urlSafe);
}
function decode(value, urlSafe = false) {
    const decodedUint8Array = decodeToUint8Array(value, urlSafe);
    return {
        toString() {
            return nacl.encodeUTF8(decodedUint8Array);
        },
        toObject() {
            try {
                return JSON.parse(nacl.encodeUTF8(decodedUint8Array));
            }
            catch (e) {
                return null;
            }
        },
        toUint8Array() {
            return decodedUint8Array;
        }
    };
}
const Base64 = {
    encode,
    decode
};

function concatUint8Arrays(buffer1, buffer2) {
    const mergedArray = new Uint8Array(buffer1.length + buffer2.length);
    mergedArray.set(buffer1);
    mergedArray.set(buffer2, buffer1.length);
    return mergedArray;
}
function splitToUint8Arrays(array, index) {
    if (index >= array.length) {
        throw new Error('Index is out of buffer');
    }
    const subArray1 = array.slice(0, index);
    const subArray2 = array.slice(index);
    return [subArray1, subArray2];
}
function toHexString(byteArray) {
    let hexString = '';
    byteArray.forEach(byte => {
        hexString += ('0' + (byte & 0xff).toString(16)).slice(-2);
    });
    return hexString;
}
function hexToByteArray(hexString) {
    if (hexString.length % 2 !== 0) {
        throw new Error(`Cannot convert ${hexString} to bytesArray`);
    }
    const result = new Uint8Array(hexString.length / 2);
    for (let i = 0; i < hexString.length; i += 2) {
        result[i / 2] = parseInt(hexString.slice(i, i + 2), 16);
    }
    return result;
}

function isNode() {
    return (typeof process !== 'undefined' && process.versions != null && process.versions.node != null);
}

class SessionCrypto {
    constructor(keyPair) {
        this.nonceLength = 24;
        this.keyPair = keyPair ? this.createKeypairFromString(keyPair) : this.createKeypair();
        this.sessionId = toHexString(this.keyPair.publicKey);
    }
    createKeypair() {
        return nacl$1.box.keyPair();
    }
    createKeypairFromString(keyPair) {
        return {
            publicKey: hexToByteArray(keyPair.publicKey),
            secretKey: hexToByteArray(keyPair.secretKey)
        };
    }
    createNonce() {
        return nacl$1.randomBytes(this.nonceLength);
    }
    encrypt(message, receiverPublicKey) {
        const encodedMessage = new TextEncoder().encode(message);
        const nonce = this.createNonce();
        const encrypted = nacl$1.box(encodedMessage, nonce, receiverPublicKey, this.keyPair.secretKey);
        return concatUint8Arrays(nonce, encrypted);
    }
    decrypt(message, senderPublicKey) {
        const [nonce, internalMessage] = splitToUint8Arrays(message, this.nonceLength);
        const decrypted = nacl$1.box.open(internalMessage, nonce, senderPublicKey, this.keyPair.secretKey);
        if (!decrypted) {
            throw new Error(`Decryption error: \n message: ${message.toString()} \n sender pubkey: ${senderPublicKey.toString()} \n keypair pubkey: ${this.keyPair.publicKey.toString()} \n keypair secretkey: ${this.keyPair.secretKey.toString()}`);
        }
        return new TextDecoder().decode(decrypted);
    }
    stringifyKeypair() {
        return {
            publicKey: toHexString(this.keyPair.publicKey),
            secretKey: toHexString(this.keyPair.secretKey)
        };
    }
}

export { Base64, CHAIN, CONNECT_EVENT_ERROR_CODES, CONNECT_ITEM_ERROR_CODES, DISCONNECT_ERROR_CODES, SEND_TRANSACTION_ERROR_CODES, SIGN_DATA_ERROR_CODES, SessionCrypto, concatUint8Arrays, hexToByteArray, isNode, splitToUint8Arrays, toHexString };
//# sourceMappingURL=index.mjs.map
