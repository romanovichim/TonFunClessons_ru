"use strict";
/**
 * Copyright
 *  (c) 2022 Whales Corp.
 *  (c) 2023 TrueCarry <truecarry@gmail.com>
 * All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _LiteSingleEngine_currentClient, _LiteSingleEngine_ready, _LiteSingleEngine_closed, _LiteSingleEngine_queries, _LiteSingleEngine_clientType, _LiteSingleEngine_reconnectTimeout;
Object.defineProperty(exports, "__esModule", { value: true });
exports.LiteSingleEngine = void 0;
const tweetnacl_1 = require("tweetnacl");
const ton_tl_1 = require("ton-tl");
const adnl_1 = require("adnl");
const schema_1 = require("../schema");
const events_1 = __importDefault(require("events"));
const defaultArgs = { timeout: 5000 };
class LiteSingleEngine extends events_1.default {
    constructor(args) {
        super();
        _LiteSingleEngine_currentClient.set(this, null);
        _LiteSingleEngine_ready.set(this, false);
        _LiteSingleEngine_closed.set(this, true);
        _LiteSingleEngine_queries.set(this, new Map());
        _LiteSingleEngine_clientType.set(this, void 0);
        _LiteSingleEngine_reconnectTimeout.set(this, void 0);
        this.onConencted = () => {
            __classPrivateFieldSet(this, _LiteSingleEngine_closed, false, "f");
        };
        this.onReady = () => {
            __classPrivateFieldSet(this, _LiteSingleEngine_ready, true, "f");
            // Write all pendings
            for (let q of __classPrivateFieldGet(this, _LiteSingleEngine_queries, "f")) {
                __classPrivateFieldGet(this, _LiteSingleEngine_currentClient, "f").write(q[1].packet);
            }
        };
        this.onData = (data) => {
            let answer = schema_1.Codecs.adnl_Message.decode(new ton_tl_1.TLReadBuffer(data));
            if (answer.kind === 'adnl.message.answer') {
                let id = answer.queryId.toString('hex');
                let q = __classPrivateFieldGet(this, _LiteSingleEngine_queries, "f").get(id);
                if (q) {
                    __classPrivateFieldGet(this, _LiteSingleEngine_queries, "f").delete(id);
                    // Decode response
                    if (answer.answer.readInt32LE(0) === -1146494648) {
                        q.reject(new Error(schema_1.Codecs.liteServer_Error.decode(new ton_tl_1.TLReadBuffer(answer.answer)).message));
                    }
                    else {
                        try {
                            let decoded = q.f.decodeResponse(new ton_tl_1.TLReadBuffer(answer.answer));
                            // Resolve
                            q.resolver(decoded);
                        }
                        catch (e) {
                            // Reject
                            q.reject(e);
                        }
                    }
                }
            }
        };
        this.onClosed = () => {
            __classPrivateFieldSet(this, _LiteSingleEngine_currentClient, null, "f");
            __classPrivateFieldSet(this, _LiteSingleEngine_ready, false, "f");
            setTimeout(() => {
                if (!__classPrivateFieldGet(this, _LiteSingleEngine_closed, "f")) {
                    this.connect();
                }
            }, __classPrivateFieldGet(this, _LiteSingleEngine_reconnectTimeout, "f"));
        };
        this.host = args.host;
        this.publicKey = args.publicKey;
        __classPrivateFieldSet(this, _LiteSingleEngine_clientType, args.client || 'tcp', "f");
        __classPrivateFieldSet(this, _LiteSingleEngine_reconnectTimeout, args.reconnectTimeout || 10000, "f");
        this.connect();
    }
    isClosed() {
        return __classPrivateFieldGet(this, _LiteSingleEngine_closed, "f");
    }
    isReady() {
        return __classPrivateFieldGet(this, _LiteSingleEngine_ready, "f");
    }
    async query(f, req, queryArgs) {
        if (__classPrivateFieldGet(this, _LiteSingleEngine_closed, "f")) {
            throw new Error('Engine is closed');
        }
        const args = { ...defaultArgs, ...queryArgs };
        let id = Buffer.from((0, tweetnacl_1.randomBytes)(32));
        // Request
        let writer = new ton_tl_1.TLWriteBuffer();
        if (args.awaitSeqno !== undefined) {
            schema_1.Functions.liteServer_waitMasterchainSeqno.encodeRequest({ kind: 'liteServer.waitMasterchainSeqno', seqno: args.awaitSeqno, timeoutMs: args.timeout }, writer);
        }
        f.encodeRequest(req, writer);
        let body = writer.build();
        // Lite server query
        let lsQuery = new ton_tl_1.TLWriteBuffer();
        schema_1.Functions.liteServer_query.encodeRequest({ kind: 'liteServer.query', data: body }, lsQuery);
        let lsbody = lsQuery.build();
        // ADNL body
        let adnlWriter = new ton_tl_1.TLWriteBuffer();
        schema_1.Codecs.adnl_Message.encode({ kind: 'adnl.message.query', queryId: id, query: lsbody }, adnlWriter);
        const packet = adnlWriter.build();
        return new Promise((resolve, reject) => {
            // Send
            if (__classPrivateFieldGet(this, _LiteSingleEngine_ready, "f")) {
                __classPrivateFieldGet(this, _LiteSingleEngine_currentClient, "f").write(packet);
            }
            // Register query
            __classPrivateFieldGet(this, _LiteSingleEngine_queries, "f").set(id.toString('hex'), { resolver: resolve, reject, f, packet, timeout: args.timeout });
            // Query timeout
            setTimeout(() => {
                let ex = __classPrivateFieldGet(this, _LiteSingleEngine_queries, "f").get(id.toString('hex'));
                if (ex) {
                    __classPrivateFieldGet(this, _LiteSingleEngine_queries, "f").delete(id.toString('hex'));
                    ex.reject(new Error('Timeout'));
                }
            }, args.timeout);
        });
    }
    close() {
        __classPrivateFieldSet(this, _LiteSingleEngine_closed, true, "f");
        if (__classPrivateFieldGet(this, _LiteSingleEngine_currentClient, "f")) {
            let c = __classPrivateFieldGet(this, _LiteSingleEngine_currentClient, "f");
            __classPrivateFieldSet(this, _LiteSingleEngine_ready, false, "f");
            __classPrivateFieldSet(this, _LiteSingleEngine_currentClient, null, "f");
            c.end();
        }
    }
    connect() {
        // Configure new client
        const client = __classPrivateFieldGet(this, _LiteSingleEngine_clientType, "f") === 'ws' ? new adnl_1.ADNLClientWS(this.host, this.publicKey) : new adnl_1.ADNLClientTCP(this.host, this.publicKey);
        client.connect();
        client.on('connect', () => {
            if (__classPrivateFieldGet(this, _LiteSingleEngine_currentClient, "f") === client) {
                this.onConencted();
                this.emit('connect');
            }
        });
        client.on('close', () => {
            if (__classPrivateFieldGet(this, _LiteSingleEngine_currentClient, "f") === client) {
                this.onClosed();
                this.emit('close');
            }
        });
        client.on('data', (data) => {
            if (__classPrivateFieldGet(this, _LiteSingleEngine_currentClient, "f") === client) {
                this.onData(data);
            }
        });
        client.on('ready', async () => {
            if (__classPrivateFieldGet(this, _LiteSingleEngine_currentClient, "f") === client) {
                this.onReady();
                this.emit('ready');
            }
        });
        client.on('error', (err) => {
            this.close();
            this.emit('error');
            setTimeout(() => {
                __classPrivateFieldSet(this, _LiteSingleEngine_closed, false, "f");
                this.connect();
            }, 30000);
        });
        // Persist client
        __classPrivateFieldSet(this, _LiteSingleEngine_currentClient, client, "f");
    }
}
exports.LiteSingleEngine = LiteSingleEngine;
_LiteSingleEngine_currentClient = new WeakMap(), _LiteSingleEngine_ready = new WeakMap(), _LiteSingleEngine_closed = new WeakMap(), _LiteSingleEngine_queries = new WeakMap(), _LiteSingleEngine_clientType = new WeakMap(), _LiteSingleEngine_reconnectTimeout = new WeakMap();
