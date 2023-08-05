"use strict";
/**
 * Copyright (c) Whales Corp.
 * All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Codecs = exports.Functions = void 0;
exports.Functions = {
    liteServer_getMasterchainInfo: {
        encodeRequest: (src, encoder) => { encoder.writeInt32(-1984567762); exports.Codecs.liteServer_getMasterchainInfo.encode(src, encoder); },
        decodeResponse: (decoder) => exports.Codecs.liteServer_MasterchainInfo.decode(decoder)
    },
    liteServer_getMasterchainInfoExt: {
        encodeRequest: (src, encoder) => { encoder.writeInt32(1889956319); exports.Codecs.liteServer_getMasterchainInfoExt.encode(src, encoder); },
        decodeResponse: (decoder) => exports.Codecs.liteServer_MasterchainInfoExt.decode(decoder)
    },
    liteServer_getTime: {
        encodeRequest: (src, encoder) => { encoder.writeInt32(380459572); exports.Codecs.liteServer_getTime.encode(src, encoder); },
        decodeResponse: (decoder) => exports.Codecs.liteServer_CurrentTime.decode(decoder)
    },
    liteServer_getVersion: {
        encodeRequest: (src, encoder) => { encoder.writeInt32(590058507); exports.Codecs.liteServer_getVersion.encode(src, encoder); },
        decodeResponse: (decoder) => exports.Codecs.liteServer_Version.decode(decoder)
    },
    liteServer_getBlock: {
        encodeRequest: (src, encoder) => { encoder.writeInt32(1668796173); exports.Codecs.liteServer_getBlock.encode(src, encoder); },
        decodeResponse: (decoder) => exports.Codecs.liteServer_BlockData.decode(decoder)
    },
    liteServer_getState: {
        encodeRequest: (src, encoder) => { encoder.writeInt32(-1167184202); exports.Codecs.liteServer_getState.encode(src, encoder); },
        decodeResponse: (decoder) => exports.Codecs.liteServer_BlockState.decode(decoder)
    },
    liteServer_getBlockHeader: {
        encodeRequest: (src, encoder) => { encoder.writeInt32(569116318); exports.Codecs.liteServer_getBlockHeader.encode(src, encoder); },
        decodeResponse: (decoder) => exports.Codecs.liteServer_BlockHeader.decode(decoder)
    },
    liteServer_sendMessage: {
        encodeRequest: (src, encoder) => { encoder.writeInt32(1762317442); exports.Codecs.liteServer_sendMessage.encode(src, encoder); },
        decodeResponse: (decoder) => exports.Codecs.liteServer_SendMsgStatus.decode(decoder)
    },
    liteServer_getAccountState: {
        encodeRequest: (src, encoder) => { encoder.writeInt32(1804144165); exports.Codecs.liteServer_getAccountState.encode(src, encoder); },
        decodeResponse: (decoder) => exports.Codecs.liteServer_AccountState.decode(decoder)
    },
    liteServer_getAccountStatePrunned: {
        encodeRequest: (src, encoder) => { encoder.writeInt32(1516864775); exports.Codecs.liteServer_getAccountStatePrunned.encode(src, encoder); },
        decodeResponse: (decoder) => exports.Codecs.liteServer_AccountState.decode(decoder)
    },
    liteServer_runSmcMethod: {
        encodeRequest: (src, encoder) => { encoder.writeInt32(1556504018); exports.Codecs.liteServer_runSmcMethod.encode(src, encoder); },
        decodeResponse: (decoder) => exports.Codecs.liteServer_RunMethodResult.decode(decoder)
    },
    liteServer_getShardInfo: {
        encodeRequest: (src, encoder) => { encoder.writeInt32(1185084453); exports.Codecs.liteServer_getShardInfo.encode(src, encoder); },
        decodeResponse: (decoder) => exports.Codecs.liteServer_ShardInfo.decode(decoder)
    },
    liteServer_getAllShardsInfo: {
        encodeRequest: (src, encoder) => { encoder.writeInt32(1960050027); exports.Codecs.liteServer_getAllShardsInfo.encode(src, encoder); },
        decodeResponse: (decoder) => exports.Codecs.liteServer_AllShardsInfo.decode(decoder)
    },
    liteServer_getOneTransaction: {
        encodeRequest: (src, encoder) => { encoder.writeInt32(-737205014); exports.Codecs.liteServer_getOneTransaction.encode(src, encoder); },
        decodeResponse: (decoder) => exports.Codecs.liteServer_TransactionInfo.decode(decoder)
    },
    liteServer_getTransactions: {
        encodeRequest: (src, encoder) => { encoder.writeInt32(474015649); exports.Codecs.liteServer_getTransactions.encode(src, encoder); },
        decodeResponse: (decoder) => exports.Codecs.liteServer_TransactionList.decode(decoder)
    },
    liteServer_lookupBlock: {
        encodeRequest: (src, encoder) => { encoder.writeInt32(-87492834); exports.Codecs.liteServer_lookupBlock.encode(src, encoder); },
        decodeResponse: (decoder) => exports.Codecs.liteServer_BlockHeader.decode(decoder)
    },
    liteServer_listBlockTransactions: {
        encodeRequest: (src, encoder) => { encoder.writeInt32(-1375942694); exports.Codecs.liteServer_listBlockTransactions.encode(src, encoder); },
        decodeResponse: (decoder) => exports.Codecs.liteServer_BlockTransactions.decode(decoder)
    },
    liteServer_getBlockProof: {
        encodeRequest: (src, encoder) => { encoder.writeInt32(-1964336060); exports.Codecs.liteServer_getBlockProof.encode(src, encoder); },
        decodeResponse: (decoder) => exports.Codecs.liteServer_PartialBlockProof.decode(decoder)
    },
    liteServer_getConfigAll: {
        encodeRequest: (src, encoder) => { encoder.writeInt32(-1860491593); exports.Codecs.liteServer_getConfigAll.encode(src, encoder); },
        decodeResponse: (decoder) => exports.Codecs.liteServer_ConfigInfo.decode(decoder)
    },
    liteServer_getConfigParams: {
        encodeRequest: (src, encoder) => { encoder.writeInt32(705764377); exports.Codecs.liteServer_getConfigParams.encode(src, encoder); },
        decodeResponse: (decoder) => exports.Codecs.liteServer_ConfigInfo.decode(decoder)
    },
    liteServer_getValidatorStats: {
        encodeRequest: (src, encoder) => { encoder.writeInt32(-416991591); exports.Codecs.liteServer_getValidatorStats.encode(src, encoder); },
        decodeResponse: (decoder) => exports.Codecs.liteServer_ValidatorStats.decode(decoder)
    },
    liteServer_getLibraries: {
        encodeRequest: (src, encoder) => { encoder.writeInt32(-786254238); exports.Codecs.liteServer_getLibraries.encode(src, encoder); },
        decodeResponse: (decoder) => exports.Codecs.liteServer_LibraryResult.decode(decoder)
    },
    liteServer_getShardBlockProof: {
        encodeRequest: (src, encoder) => { encoder.writeInt32(1285948240); exports.Codecs.liteServer_getShardBlockProof.encode(src, encoder); },
        decodeResponse: (decoder) => exports.Codecs.liteServer_ShardBlockProof.decode(decoder)
    },
    liteServer_queryPrefix: {
        encodeRequest: (src, encoder) => { encoder.writeInt32(1926489734); exports.Codecs.liteServer_queryPrefix.encode(src, encoder); },
        decodeResponse: (decoder) => decoder.readObject()
    },
    liteServer_query: {
        encodeRequest: (src, encoder) => { encoder.writeInt32(2039219935); exports.Codecs.liteServer_query.encode(src, encoder); },
        decodeResponse: (decoder) => decoder.readObject()
    },
    liteServer_waitMasterchainSeqno: {
        encodeRequest: (src, encoder) => { encoder.writeInt32(-1159022446); exports.Codecs.liteServer_waitMasterchainSeqno.encode(src, encoder); },
        decodeResponse: (decoder) => decoder.readObject()
    },
};
//
// Codecs
//
exports.Codecs = {
    tonNode_blockId: {
        encode: (src, encoder) => {
            encoder.writeInt32(src.workchain);
            encoder.writeInt64(src.shard);
            encoder.writeInt32(src.seqno);
        },
        decode: (decoder) => {
            let workchain = decoder.readInt32();
            let shard = decoder.readInt64();
            let seqno = decoder.readInt32();
            return { kind: 'tonNode.blockId', workchain, shard, seqno };
        },
    },
    tonNode_blockIdExt: {
        encode: (src, encoder) => {
            encoder.writeInt32(src.workchain);
            encoder.writeInt64(src.shard);
            encoder.writeInt32(src.seqno);
            encoder.writeInt256(src.rootHash);
            encoder.writeInt256(src.fileHash);
        },
        decode: (decoder) => {
            let workchain = decoder.readInt32();
            let shard = decoder.readInt64();
            let seqno = decoder.readInt32();
            let rootHash = decoder.readInt256();
            let fileHash = decoder.readInt256();
            return { kind: 'tonNode.blockIdExt', workchain, shard, seqno, rootHash, fileHash };
        },
    },
    tonNode_zeroStateIdExt: {
        encode: (src, encoder) => {
            encoder.writeInt32(src.workchain);
            encoder.writeInt256(src.rootHash);
            encoder.writeInt256(src.fileHash);
        },
        decode: (decoder) => {
            let workchain = decoder.readInt32();
            let rootHash = decoder.readInt256();
            let fileHash = decoder.readInt256();
            return { kind: 'tonNode.zeroStateIdExt', workchain, rootHash, fileHash };
        },
    },
    adnl_message_query: {
        encode: (src, encoder) => {
            encoder.writeInt256(src.queryId);
            encoder.writeBuffer(src.query);
        },
        decode: (decoder) => {
            let queryId = decoder.readInt256();
            let query = decoder.readBuffer();
            return { kind: 'adnl.message.query', queryId, query };
        },
    },
    adnl_message_answer: {
        encode: (src, encoder) => {
            encoder.writeInt256(src.queryId);
            encoder.writeBuffer(src.answer);
        },
        decode: (decoder) => {
            let queryId = decoder.readInt256();
            let answer = decoder.readBuffer();
            return { kind: 'adnl.message.answer', queryId, answer };
        },
    },
    liteServer_error: {
        encode: (src, encoder) => {
            encoder.writeInt32(src.code);
            encoder.writeString(src.message);
        },
        decode: (decoder) => {
            let code = decoder.readInt32();
            let message = decoder.readString();
            return { kind: 'liteServer.error', code, message };
        },
    },
    liteServer_accountId: {
        encode: (src, encoder) => {
            encoder.writeInt32(src.workchain);
            encoder.writeInt256(src.id);
        },
        decode: (decoder) => {
            let workchain = decoder.readInt32();
            let id = decoder.readInt256();
            return { kind: 'liteServer.accountId', workchain, id };
        },
    },
    liteServer_libraryEntry: {
        encode: (src, encoder) => {
            encoder.writeInt256(src.hash);
            encoder.writeBuffer(src.data);
        },
        decode: (decoder) => {
            let hash = decoder.readInt256();
            let data = decoder.readBuffer();
            return { kind: 'liteServer.libraryEntry', hash, data };
        },
    },
    liteServer_masterchainInfo: {
        encode: (src, encoder) => {
            exports.Codecs.tonNode_blockIdExt.encode(src.last, encoder);
            encoder.writeInt256(src.stateRootHash);
            exports.Codecs.tonNode_zeroStateIdExt.encode(src.init, encoder);
        },
        decode: (decoder) => {
            let last = exports.Codecs.tonNode_blockIdExt.decode(decoder);
            let stateRootHash = decoder.readInt256();
            let init = exports.Codecs.tonNode_zeroStateIdExt.decode(decoder);
            return { kind: 'liteServer.masterchainInfo', last, stateRootHash, init };
        },
    },
    liteServer_masterchainInfoExt: {
        encode: (src, encoder) => {
            encoder.writeUInt32(src.mode);
            encoder.writeInt32(src.version);
            encoder.writeInt64(src.capabilities);
            exports.Codecs.tonNode_blockIdExt.encode(src.last, encoder);
            encoder.writeInt32(src.lastUtime);
            encoder.writeInt32(src.now);
            encoder.writeInt256(src.stateRootHash);
            exports.Codecs.tonNode_zeroStateIdExt.encode(src.init, encoder);
        },
        decode: (decoder) => {
            let mode = decoder.readUInt32();
            let version = decoder.readInt32();
            let capabilities = decoder.readInt64();
            let last = exports.Codecs.tonNode_blockIdExt.decode(decoder);
            let lastUtime = decoder.readInt32();
            let now = decoder.readInt32();
            let stateRootHash = decoder.readInt256();
            let init = exports.Codecs.tonNode_zeroStateIdExt.decode(decoder);
            return { kind: 'liteServer.masterchainInfoExt', mode, version, capabilities, last, lastUtime, now, stateRootHash, init };
        },
    },
    liteServer_currentTime: {
        encode: (src, encoder) => {
            encoder.writeInt32(src.now);
        },
        decode: (decoder) => {
            let now = decoder.readInt32();
            return { kind: 'liteServer.currentTime', now };
        },
    },
    liteServer_version: {
        encode: (src, encoder) => {
            encoder.writeUInt32(src.mode);
            encoder.writeInt32(src.version);
            encoder.writeInt64(src.capabilities);
            encoder.writeInt32(src.now);
        },
        decode: (decoder) => {
            let mode = decoder.readUInt32();
            let version = decoder.readInt32();
            let capabilities = decoder.readInt64();
            let now = decoder.readInt32();
            return { kind: 'liteServer.version', mode, version, capabilities, now };
        },
    },
    liteServer_blockData: {
        encode: (src, encoder) => {
            exports.Codecs.tonNode_blockIdExt.encode(src.id, encoder);
            encoder.writeBuffer(src.data);
        },
        decode: (decoder) => {
            let id = exports.Codecs.tonNode_blockIdExt.decode(decoder);
            let data = decoder.readBuffer();
            return { kind: 'liteServer.blockData', id, data };
        },
    },
    liteServer_blockState: {
        encode: (src, encoder) => {
            exports.Codecs.tonNode_blockIdExt.encode(src.id, encoder);
            encoder.writeInt256(src.rootHash);
            encoder.writeInt256(src.fileHash);
            encoder.writeBuffer(src.data);
        },
        decode: (decoder) => {
            let id = exports.Codecs.tonNode_blockIdExt.decode(decoder);
            let rootHash = decoder.readInt256();
            let fileHash = decoder.readInt256();
            let data = decoder.readBuffer();
            return { kind: 'liteServer.blockState', id, rootHash, fileHash, data };
        },
    },
    liteServer_blockHeader: {
        encode: (src, encoder) => {
            exports.Codecs.tonNode_blockIdExt.encode(src.id, encoder);
            encoder.writeUInt32(src.mode);
            encoder.writeBuffer(src.headerProof);
        },
        decode: (decoder) => {
            let id = exports.Codecs.tonNode_blockIdExt.decode(decoder);
            let mode = decoder.readUInt32();
            let headerProof = decoder.readBuffer();
            return { kind: 'liteServer.blockHeader', id, mode, headerProof };
        },
    },
    liteServer_sendMsgStatus: {
        encode: (src, encoder) => {
            encoder.writeInt32(src.status);
        },
        decode: (decoder) => {
            let status = decoder.readInt32();
            return { kind: 'liteServer.sendMsgStatus', status };
        },
    },
    liteServer_accountState: {
        encode: (src, encoder) => {
            exports.Codecs.tonNode_blockIdExt.encode(src.id, encoder);
            exports.Codecs.tonNode_blockIdExt.encode(src.shardblk, encoder);
            encoder.writeBuffer(src.shardProof);
            encoder.writeBuffer(src.proof);
            encoder.writeBuffer(src.state);
        },
        decode: (decoder) => {
            let id = exports.Codecs.tonNode_blockIdExt.decode(decoder);
            let shardblk = exports.Codecs.tonNode_blockIdExt.decode(decoder);
            let shardProof = decoder.readBuffer();
            let proof = decoder.readBuffer();
            let state = decoder.readBuffer();
            return { kind: 'liteServer.accountState', id, shardblk, shardProof, proof, state };
        },
    },
    liteServer_runMethodResult: {
        encode: (src, encoder) => {
            encoder.writeUInt32(src.mode);
            exports.Codecs.tonNode_blockIdExt.encode(src.id, encoder);
            exports.Codecs.tonNode_blockIdExt.encode(src.shardblk, encoder);
            (src.mode & (1 << 0)) && !!src.shardProof && encoder.writeBuffer(src.shardProof);
            (src.mode & (1 << 0)) && !!src.proof && encoder.writeBuffer(src.proof);
            (src.mode & (1 << 1)) && !!src.stateProof && encoder.writeBuffer(src.stateProof);
            (src.mode & (1 << 3)) && !!src.initC7 && encoder.writeBuffer(src.initC7);
            (src.mode & (1 << 4)) && !!src.libExtras && encoder.writeBuffer(src.libExtras);
            encoder.writeInt32(src.exitCode);
            (src.mode & (1 << 2)) && !!src.result && encoder.writeBuffer(src.result);
        },
        decode: (decoder) => {
            let mode = decoder.readUInt32();
            let id = exports.Codecs.tonNode_blockIdExt.decode(decoder);
            let shardblk = exports.Codecs.tonNode_blockIdExt.decode(decoder);
            let shardProof = (mode & (1 << 0)) ? decoder.readBuffer() : null;
            let proof = (mode & (1 << 0)) ? decoder.readBuffer() : null;
            let stateProof = (mode & (1 << 1)) ? decoder.readBuffer() : null;
            let initC7 = (mode & (1 << 3)) ? decoder.readBuffer() : null;
            let libExtras = (mode & (1 << 4)) ? decoder.readBuffer() : null;
            let exitCode = decoder.readInt32();
            let result = (mode & (1 << 2)) ? decoder.readBuffer() : null;
            return { kind: 'liteServer.runMethodResult', mode, id, shardblk, shardProof, proof, stateProof, initC7, libExtras, exitCode, result };
        },
    },
    liteServer_shardInfo: {
        encode: (src, encoder) => {
            exports.Codecs.tonNode_blockIdExt.encode(src.id, encoder);
            exports.Codecs.tonNode_blockIdExt.encode(src.shardblk, encoder);
            encoder.writeBuffer(src.shardProof);
            encoder.writeBuffer(src.shardDescr);
        },
        decode: (decoder) => {
            let id = exports.Codecs.tonNode_blockIdExt.decode(decoder);
            let shardblk = exports.Codecs.tonNode_blockIdExt.decode(decoder);
            let shardProof = decoder.readBuffer();
            let shardDescr = decoder.readBuffer();
            return { kind: 'liteServer.shardInfo', id, shardblk, shardProof, shardDescr };
        },
    },
    liteServer_allShardsInfo: {
        encode: (src, encoder) => {
            exports.Codecs.tonNode_blockIdExt.encode(src.id, encoder);
            encoder.writeBuffer(src.proof);
            encoder.writeBuffer(src.data);
        },
        decode: (decoder) => {
            let id = exports.Codecs.tonNode_blockIdExt.decode(decoder);
            let proof = decoder.readBuffer();
            let data = decoder.readBuffer();
            return { kind: 'liteServer.allShardsInfo', id, proof, data };
        },
    },
    liteServer_transactionInfo: {
        encode: (src, encoder) => {
            exports.Codecs.tonNode_blockIdExt.encode(src.id, encoder);
            encoder.writeBuffer(src.proof);
            encoder.writeBuffer(src.transaction);
        },
        decode: (decoder) => {
            let id = exports.Codecs.tonNode_blockIdExt.decode(decoder);
            let proof = decoder.readBuffer();
            let transaction = decoder.readBuffer();
            return { kind: 'liteServer.transactionInfo', id, proof, transaction };
        },
    },
    liteServer_transactionList: {
        encode: (src, encoder) => {
            encoder.writeVector(exports.Codecs.tonNode_blockIdExt.encode, src.ids);
            encoder.writeBuffer(src.transactions);
        },
        decode: (decoder) => {
            let ids = decoder.readVector(exports.Codecs.tonNode_blockIdExt.decode);
            let transactions = decoder.readBuffer();
            return { kind: 'liteServer.transactionList', ids, transactions };
        },
    },
    liteServer_transactionId: {
        encode: (src, encoder) => {
            encoder.writeUInt32(src.mode);
            (src.mode & (1 << 0)) && !!src.account && encoder.writeInt256(src.account);
            (src.mode & (1 << 1)) && !!src.lt && encoder.writeInt64(src.lt);
            (src.mode & (1 << 2)) && !!src.hash && encoder.writeInt256(src.hash);
        },
        decode: (decoder) => {
            let mode = decoder.readUInt32();
            let account = (mode & (1 << 0)) ? decoder.readInt256() : null;
            let lt = (mode & (1 << 1)) ? decoder.readInt64() : null;
            let hash = (mode & (1 << 2)) ? decoder.readInt256() : null;
            return { kind: 'liteServer.transactionId', mode, account, lt, hash };
        },
    },
    liteServer_transactionId3: {
        encode: (src, encoder) => {
            encoder.writeInt256(src.account);
            encoder.writeInt64(src.lt);
        },
        decode: (decoder) => {
            let account = decoder.readInt256();
            let lt = decoder.readInt64();
            return { kind: 'liteServer.transactionId3', account, lt };
        },
    },
    liteServer_blockTransactions: {
        encode: (src, encoder) => {
            exports.Codecs.tonNode_blockIdExt.encode(src.id, encoder);
            encoder.writeUInt32(src.reqCount);
            encoder.writeBool(src.incomplete);
            encoder.writeVector(exports.Codecs.liteServer_transactionId.encode, src.ids);
            encoder.writeBuffer(src.proof);
        },
        decode: (decoder) => {
            let id = exports.Codecs.tonNode_blockIdExt.decode(decoder);
            let reqCount = decoder.readUInt32();
            let incomplete = decoder.readBool();
            let ids = decoder.readVector(exports.Codecs.liteServer_transactionId.decode);
            let proof = decoder.readBuffer();
            return { kind: 'liteServer.blockTransactions', id, reqCount, incomplete, ids, proof };
        },
    },
    liteServer_signature: {
        encode: (src, encoder) => {
            encoder.writeInt256(src.nodeIdShort);
            encoder.writeBuffer(src.signature);
        },
        decode: (decoder) => {
            let nodeIdShort = decoder.readInt256();
            let signature = decoder.readBuffer();
            return { kind: 'liteServer.signature', nodeIdShort, signature };
        },
    },
    liteServer_signatureSet: {
        encode: (src, encoder) => {
            encoder.writeInt32(src.validatorSetHash);
            encoder.writeInt32(src.catchainSeqno);
            encoder.writeVector(exports.Codecs.liteServer_signature.encode, src.signatures);
        },
        decode: (decoder) => {
            let validatorSetHash = decoder.readInt32();
            let catchainSeqno = decoder.readInt32();
            let signatures = decoder.readVector(exports.Codecs.liteServer_signature.decode);
            return { kind: 'liteServer.signatureSet', validatorSetHash, catchainSeqno, signatures };
        },
    },
    liteServer_blockLinkBack: {
        encode: (src, encoder) => {
            encoder.writeBool(src.toKeyBlock);
            exports.Codecs.tonNode_blockIdExt.encode(src.from, encoder);
            exports.Codecs.tonNode_blockIdExt.encode(src.to, encoder);
            encoder.writeBuffer(src.destProof);
            encoder.writeBuffer(src.proof);
            encoder.writeBuffer(src.stateProof);
        },
        decode: (decoder) => {
            let toKeyBlock = decoder.readBool();
            let from = exports.Codecs.tonNode_blockIdExt.decode(decoder);
            let to = exports.Codecs.tonNode_blockIdExt.decode(decoder);
            let destProof = decoder.readBuffer();
            let proof = decoder.readBuffer();
            let stateProof = decoder.readBuffer();
            return { kind: 'liteServer.blockLinkBack', toKeyBlock, from, to, destProof, proof, stateProof };
        },
    },
    liteServer_blockLinkForward: {
        encode: (src, encoder) => {
            encoder.writeBool(src.toKeyBlock);
            exports.Codecs.tonNode_blockIdExt.encode(src.from, encoder);
            exports.Codecs.tonNode_blockIdExt.encode(src.to, encoder);
            encoder.writeBuffer(src.destProof);
            encoder.writeBuffer(src.configProof);
            exports.Codecs.liteServer_SignatureSet.encode(src.signatures, encoder);
        },
        decode: (decoder) => {
            let toKeyBlock = decoder.readBool();
            let from = exports.Codecs.tonNode_blockIdExt.decode(decoder);
            let to = exports.Codecs.tonNode_blockIdExt.decode(decoder);
            let destProof = decoder.readBuffer();
            let configProof = decoder.readBuffer();
            let signatures = exports.Codecs.liteServer_SignatureSet.decode(decoder);
            return { kind: 'liteServer.blockLinkForward', toKeyBlock, from, to, destProof, configProof, signatures };
        },
    },
    liteServer_partialBlockProof: {
        encode: (src, encoder) => {
            encoder.writeBool(src.complete);
            exports.Codecs.tonNode_blockIdExt.encode(src.from, encoder);
            exports.Codecs.tonNode_blockIdExt.encode(src.to, encoder);
            encoder.writeVector(exports.Codecs.liteServer_BlockLink.encode, src.steps);
        },
        decode: (decoder) => {
            let complete = decoder.readBool();
            let from = exports.Codecs.tonNode_blockIdExt.decode(decoder);
            let to = exports.Codecs.tonNode_blockIdExt.decode(decoder);
            let steps = decoder.readVector(exports.Codecs.liteServer_BlockLink.decode);
            return { kind: 'liteServer.partialBlockProof', complete, from, to, steps };
        },
    },
    liteServer_configInfo: {
        encode: (src, encoder) => {
            encoder.writeUInt32(src.mode);
            exports.Codecs.tonNode_blockIdExt.encode(src.id, encoder);
            encoder.writeBuffer(src.stateProof);
            encoder.writeBuffer(src.configProof);
        },
        decode: (decoder) => {
            let mode = decoder.readUInt32();
            let id = exports.Codecs.tonNode_blockIdExt.decode(decoder);
            let stateProof = decoder.readBuffer();
            let configProof = decoder.readBuffer();
            return { kind: 'liteServer.configInfo', mode, id, stateProof, configProof };
        },
    },
    liteServer_validatorStats: {
        encode: (src, encoder) => {
            encoder.writeUInt32(src.mode);
            exports.Codecs.tonNode_blockIdExt.encode(src.id, encoder);
            encoder.writeInt32(src.count);
            encoder.writeBool(src.complete);
            encoder.writeBuffer(src.stateProof);
            encoder.writeBuffer(src.dataProof);
        },
        decode: (decoder) => {
            let mode = decoder.readUInt32();
            let id = exports.Codecs.tonNode_blockIdExt.decode(decoder);
            let count = decoder.readInt32();
            let complete = decoder.readBool();
            let stateProof = decoder.readBuffer();
            let dataProof = decoder.readBuffer();
            return { kind: 'liteServer.validatorStats', mode, id, count, complete, stateProof, dataProof };
        },
    },
    liteServer_libraryResult: {
        encode: (src, encoder) => {
            encoder.writeVector(exports.Codecs.liteServer_libraryEntry.encode, src.result);
        },
        decode: (decoder) => {
            let result = decoder.readVector(exports.Codecs.liteServer_libraryEntry.decode);
            return { kind: 'liteServer.libraryResult', result };
        },
    },
    liteServer_shardBlockLink: {
        encode: (src, encoder) => {
            exports.Codecs.tonNode_blockIdExt.encode(src.id, encoder);
            encoder.writeBuffer(src.proof);
        },
        decode: (decoder) => {
            let id = exports.Codecs.tonNode_blockIdExt.decode(decoder);
            let proof = decoder.readBuffer();
            return { kind: 'liteServer.shardBlockLink', id, proof };
        },
    },
    liteServer_shardBlockProof: {
        encode: (src, encoder) => {
            exports.Codecs.tonNode_blockIdExt.encode(src.masterchainId, encoder);
            encoder.writeVector(exports.Codecs.liteServer_shardBlockLink.encode, src.links);
        },
        decode: (decoder) => {
            let masterchainId = exports.Codecs.tonNode_blockIdExt.decode(decoder);
            let links = decoder.readVector(exports.Codecs.liteServer_shardBlockLink.decode);
            return { kind: 'liteServer.shardBlockProof', masterchainId, links };
        },
    },
    liteServer_debug_verbosity: {
        encode: (src, encoder) => {
            encoder.writeInt32(src.value);
        },
        decode: (decoder) => {
            let value = decoder.readInt32();
            return { kind: 'liteServer.debug.verbosity', value };
        },
    },
    liteServer_getMasterchainInfo: {
        encode: (src, encoder) => {
        },
        decode: (decoder) => {
            return { kind: 'liteServer.getMasterchainInfo', };
        },
    },
    liteServer_getMasterchainInfoExt: {
        encode: (src, encoder) => {
            encoder.writeUInt32(src.mode);
        },
        decode: (decoder) => {
            let mode = decoder.readUInt32();
            return { kind: 'liteServer.getMasterchainInfoExt', mode };
        },
    },
    liteServer_getTime: {
        encode: (src, encoder) => {
        },
        decode: (decoder) => {
            return { kind: 'liteServer.getTime', };
        },
    },
    liteServer_getVersion: {
        encode: (src, encoder) => {
        },
        decode: (decoder) => {
            return { kind: 'liteServer.getVersion', };
        },
    },
    liteServer_getBlock: {
        encode: (src, encoder) => {
            exports.Codecs.tonNode_blockIdExt.encode(src.id, encoder);
        },
        decode: (decoder) => {
            let id = exports.Codecs.tonNode_blockIdExt.decode(decoder);
            return { kind: 'liteServer.getBlock', id };
        },
    },
    liteServer_getState: {
        encode: (src, encoder) => {
            exports.Codecs.tonNode_blockIdExt.encode(src.id, encoder);
        },
        decode: (decoder) => {
            let id = exports.Codecs.tonNode_blockIdExt.decode(decoder);
            return { kind: 'liteServer.getState', id };
        },
    },
    liteServer_getBlockHeader: {
        encode: (src, encoder) => {
            exports.Codecs.tonNode_blockIdExt.encode(src.id, encoder);
            encoder.writeUInt32(src.mode);
        },
        decode: (decoder) => {
            let id = exports.Codecs.tonNode_blockIdExt.decode(decoder);
            let mode = decoder.readUInt32();
            return { kind: 'liteServer.getBlockHeader', id, mode };
        },
    },
    liteServer_sendMessage: {
        encode: (src, encoder) => {
            encoder.writeBuffer(src.body);
        },
        decode: (decoder) => {
            let body = decoder.readBuffer();
            return { kind: 'liteServer.sendMessage', body };
        },
    },
    liteServer_getAccountState: {
        encode: (src, encoder) => {
            exports.Codecs.tonNode_blockIdExt.encode(src.id, encoder);
            exports.Codecs.liteServer_accountId.encode(src.account, encoder);
        },
        decode: (decoder) => {
            let id = exports.Codecs.tonNode_blockIdExt.decode(decoder);
            let account = exports.Codecs.liteServer_accountId.decode(decoder);
            return { kind: 'liteServer.getAccountState', id, account };
        },
    },
    liteServer_getAccountStatePrunned: {
        encode: (src, encoder) => {
            exports.Codecs.tonNode_blockIdExt.encode(src.id, encoder);
            exports.Codecs.liteServer_accountId.encode(src.account, encoder);
        },
        decode: (decoder) => {
            let id = exports.Codecs.tonNode_blockIdExt.decode(decoder);
            let account = exports.Codecs.liteServer_accountId.decode(decoder);
            return { kind: 'liteServer.getAccountStatePrunned', id, account };
        },
    },
    liteServer_runSmcMethod: {
        encode: (src, encoder) => {
            encoder.writeUInt32(src.mode);
            exports.Codecs.tonNode_blockIdExt.encode(src.id, encoder);
            exports.Codecs.liteServer_accountId.encode(src.account, encoder);
            encoder.writeInt64(src.methodId);
            encoder.writeBuffer(src.params);
        },
        decode: (decoder) => {
            let mode = decoder.readUInt32();
            let id = exports.Codecs.tonNode_blockIdExt.decode(decoder);
            let account = exports.Codecs.liteServer_accountId.decode(decoder);
            let methodId = decoder.readInt64();
            let params = decoder.readBuffer();
            return { kind: 'liteServer.runSmcMethod', mode, id, account, methodId, params };
        },
    },
    liteServer_getShardInfo: {
        encode: (src, encoder) => {
            exports.Codecs.tonNode_blockIdExt.encode(src.id, encoder);
            encoder.writeInt32(src.workchain);
            encoder.writeInt64(src.shard);
            encoder.writeBool(src.exact);
        },
        decode: (decoder) => {
            let id = exports.Codecs.tonNode_blockIdExt.decode(decoder);
            let workchain = decoder.readInt32();
            let shard = decoder.readInt64();
            let exact = decoder.readBool();
            return { kind: 'liteServer.getShardInfo', id, workchain, shard, exact };
        },
    },
    liteServer_getAllShardsInfo: {
        encode: (src, encoder) => {
            exports.Codecs.tonNode_blockIdExt.encode(src.id, encoder);
        },
        decode: (decoder) => {
            let id = exports.Codecs.tonNode_blockIdExt.decode(decoder);
            return { kind: 'liteServer.getAllShardsInfo', id };
        },
    },
    liteServer_getOneTransaction: {
        encode: (src, encoder) => {
            exports.Codecs.tonNode_blockIdExt.encode(src.id, encoder);
            exports.Codecs.liteServer_accountId.encode(src.account, encoder);
            encoder.writeInt64(src.lt);
        },
        decode: (decoder) => {
            let id = exports.Codecs.tonNode_blockIdExt.decode(decoder);
            let account = exports.Codecs.liteServer_accountId.decode(decoder);
            let lt = decoder.readInt64();
            return { kind: 'liteServer.getOneTransaction', id, account, lt };
        },
    },
    liteServer_getTransactions: {
        encode: (src, encoder) => {
            encoder.writeUInt32(src.count);
            exports.Codecs.liteServer_accountId.encode(src.account, encoder);
            encoder.writeInt64(src.lt);
            encoder.writeInt256(src.hash);
        },
        decode: (decoder) => {
            let count = decoder.readUInt32();
            let account = exports.Codecs.liteServer_accountId.decode(decoder);
            let lt = decoder.readInt64();
            let hash = decoder.readInt256();
            return { kind: 'liteServer.getTransactions', count, account, lt, hash };
        },
    },
    liteServer_lookupBlock: {
        encode: (src, encoder) => {
            encoder.writeUInt32(src.mode);
            exports.Codecs.tonNode_blockId.encode(src.id, encoder);
            (src.mode & (1 << 1)) && !!src.lt && encoder.writeInt64(src.lt);
            (src.mode & (1 << 2)) && !!src.utime && encoder.writeInt32(src.utime);
        },
        decode: (decoder) => {
            let mode = decoder.readUInt32();
            let id = exports.Codecs.tonNode_blockId.decode(decoder);
            let lt = (mode & (1 << 1)) ? decoder.readInt64() : null;
            let utime = (mode & (1 << 2)) ? decoder.readInt32() : null;
            return { kind: 'liteServer.lookupBlock', mode, id, lt, utime };
        },
    },
    liteServer_listBlockTransactions: {
        encode: (src, encoder) => {
            exports.Codecs.tonNode_blockIdExt.encode(src.id, encoder);
            encoder.writeUInt32(src.mode);
            encoder.writeUInt32(src.count);
            (src.mode & (1 << 7)) && !!src.after && exports.Codecs.liteServer_transactionId3.encode(src.after, encoder);
            (src.mode & (1 << 6)) && !!src.reverseOrder && encoder.writeBool(src.reverseOrder);
            (src.mode & (1 << 5)) && !!src.wantProof && encoder.writeBool(src.wantProof);
        },
        decode: (decoder) => {
            let id = exports.Codecs.tonNode_blockIdExt.decode(decoder);
            let mode = decoder.readUInt32();
            let count = decoder.readUInt32();
            let after = (mode & (1 << 7)) ? exports.Codecs.liteServer_transactionId3.decode(decoder) : null;
            let reverseOrder = (mode & (1 << 6)) ? decoder.readBool() : null;
            let wantProof = (mode & (1 << 5)) ? decoder.readBool() : null;
            return { kind: 'liteServer.listBlockTransactions', id, mode, count, after, reverseOrder, wantProof };
        },
    },
    liteServer_getBlockProof: {
        encode: (src, encoder) => {
            encoder.writeUInt32(src.mode);
            exports.Codecs.tonNode_blockIdExt.encode(src.knownBlock, encoder);
            (src.mode & (1 << 0)) && !!src.targetBlock && exports.Codecs.tonNode_blockIdExt.encode(src.targetBlock, encoder);
        },
        decode: (decoder) => {
            let mode = decoder.readUInt32();
            let knownBlock = exports.Codecs.tonNode_blockIdExt.decode(decoder);
            let targetBlock = (mode & (1 << 0)) ? exports.Codecs.tonNode_blockIdExt.decode(decoder) : null;
            return { kind: 'liteServer.getBlockProof', mode, knownBlock, targetBlock };
        },
    },
    liteServer_getConfigAll: {
        encode: (src, encoder) => {
            encoder.writeUInt32(src.mode);
            exports.Codecs.tonNode_blockIdExt.encode(src.id, encoder);
        },
        decode: (decoder) => {
            let mode = decoder.readUInt32();
            let id = exports.Codecs.tonNode_blockIdExt.decode(decoder);
            return { kind: 'liteServer.getConfigAll', mode, id };
        },
    },
    liteServer_getConfigParams: {
        encode: (src, encoder) => {
            encoder.writeUInt32(src.mode);
            exports.Codecs.tonNode_blockIdExt.encode(src.id, encoder);
            encoder.writeVector((s, d) => d.writeInt32(s), src.paramList);
        },
        decode: (decoder) => {
            let mode = decoder.readUInt32();
            let id = exports.Codecs.tonNode_blockIdExt.decode(decoder);
            let paramList = decoder.readVector((d) => d.readInt32());
            return { kind: 'liteServer.getConfigParams', mode, id, paramList };
        },
    },
    liteServer_getValidatorStats: {
        encode: (src, encoder) => {
            encoder.writeUInt32(src.mode);
            exports.Codecs.tonNode_blockIdExt.encode(src.id, encoder);
            encoder.writeInt32(src.limit);
            (src.mode & (1 << 0)) && !!src.startAfter && encoder.writeInt256(src.startAfter);
            (src.mode & (1 << 2)) && !!src.modifiedAfter && encoder.writeInt32(src.modifiedAfter);
        },
        decode: (decoder) => {
            let mode = decoder.readUInt32();
            let id = exports.Codecs.tonNode_blockIdExt.decode(decoder);
            let limit = decoder.readInt32();
            let startAfter = (mode & (1 << 0)) ? decoder.readInt256() : null;
            let modifiedAfter = (mode & (1 << 2)) ? decoder.readInt32() : null;
            return { kind: 'liteServer.getValidatorStats', mode, id, limit, startAfter, modifiedAfter };
        },
    },
    liteServer_getLibraries: {
        encode: (src, encoder) => {
            encoder.writeVector((s, d) => d.writeInt256(s), src.libraryList);
        },
        decode: (decoder) => {
            let libraryList = decoder.readVector((d) => d.readInt256());
            return { kind: 'liteServer.getLibraries', libraryList };
        },
    },
    liteServer_getShardBlockProof: {
        encode: (src, encoder) => {
            exports.Codecs.tonNode_blockIdExt.encode(src.id, encoder);
        },
        decode: (decoder) => {
            let id = exports.Codecs.tonNode_blockIdExt.decode(decoder);
            return { kind: 'liteServer.getShardBlockProof', id };
        },
    },
    liteServer_queryPrefix: {
        encode: (src, encoder) => {
        },
        decode: (decoder) => {
            return { kind: 'liteServer.queryPrefix', };
        },
    },
    liteServer_query: {
        encode: (src, encoder) => {
            encoder.writeBuffer(src.data);
        },
        decode: (decoder) => {
            let data = decoder.readBuffer();
            return { kind: 'liteServer.query', data };
        },
    },
    liteServer_waitMasterchainSeqno: {
        encode: (src, encoder) => {
            encoder.writeInt32(src.seqno);
            encoder.writeInt32(src.timeoutMs);
        },
        decode: (decoder) => {
            let seqno = decoder.readInt32();
            let timeoutMs = decoder.readInt32();
            return { kind: 'liteServer.waitMasterchainSeqno', seqno, timeoutMs };
        },
    },
    tonNode_BlockId: {
        encode: (src, encoder) => {
            const kind = src.kind;
            if (kind === 'tonNode.blockId') {
                encoder.writeInt32(-1211256473);
                exports.Codecs.tonNode_blockId.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder) => {
            const kind = decoder.readInt32();
            if (kind === -1211256473) {
                return exports.Codecs.tonNode_blockId.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    },
    tonNode_BlockIdExt: {
        encode: (src, encoder) => {
            const kind = src.kind;
            if (kind === 'tonNode.blockIdExt') {
                encoder.writeInt32(1733487480);
                exports.Codecs.tonNode_blockIdExt.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder) => {
            const kind = decoder.readInt32();
            if (kind === 1733487480) {
                return exports.Codecs.tonNode_blockIdExt.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    },
    tonNode_ZeroStateIdExt: {
        encode: (src, encoder) => {
            const kind = src.kind;
            if (kind === 'tonNode.zeroStateIdExt') {
                encoder.writeInt32(494024110);
                exports.Codecs.tonNode_zeroStateIdExt.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder) => {
            const kind = decoder.readInt32();
            if (kind === 494024110) {
                return exports.Codecs.tonNode_zeroStateIdExt.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    },
    adnl_Message: {
        encode: (src, encoder) => {
            const kind = src.kind;
            if (kind === 'adnl.message.query') {
                encoder.writeInt32(-1265895046);
                exports.Codecs.adnl_message_query.encode(src, encoder);
                return;
            }
            if (kind === 'adnl.message.answer') {
                encoder.writeInt32(262964246);
                exports.Codecs.adnl_message_answer.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder) => {
            const kind = decoder.readInt32();
            if (kind === -1265895046) {
                return exports.Codecs.adnl_message_query.decode(decoder);
            }
            if (kind === 262964246) {
                return exports.Codecs.adnl_message_answer.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    },
    liteServer_Error: {
        encode: (src, encoder) => {
            const kind = src.kind;
            if (kind === 'liteServer.error') {
                encoder.writeInt32(-1146494648);
                exports.Codecs.liteServer_error.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder) => {
            const kind = decoder.readInt32();
            if (kind === -1146494648) {
                return exports.Codecs.liteServer_error.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    },
    liteServer_AccountId: {
        encode: (src, encoder) => {
            const kind = src.kind;
            if (kind === 'liteServer.accountId') {
                encoder.writeInt32(1973478085);
                exports.Codecs.liteServer_accountId.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder) => {
            const kind = decoder.readInt32();
            if (kind === 1973478085) {
                return exports.Codecs.liteServer_accountId.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    },
    liteServer_LibraryEntry: {
        encode: (src, encoder) => {
            const kind = src.kind;
            if (kind === 'liteServer.libraryEntry') {
                encoder.writeInt32(-1962990522);
                exports.Codecs.liteServer_libraryEntry.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder) => {
            const kind = decoder.readInt32();
            if (kind === -1962990522) {
                return exports.Codecs.liteServer_libraryEntry.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    },
    liteServer_MasterchainInfo: {
        encode: (src, encoder) => {
            const kind = src.kind;
            if (kind === 'liteServer.masterchainInfo') {
                encoder.writeInt32(-2055001983);
                exports.Codecs.liteServer_masterchainInfo.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder) => {
            const kind = decoder.readInt32();
            if (kind === -2055001983) {
                return exports.Codecs.liteServer_masterchainInfo.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    },
    liteServer_MasterchainInfoExt: {
        encode: (src, encoder) => {
            const kind = src.kind;
            if (kind === 'liteServer.masterchainInfoExt') {
                encoder.writeInt32(-1462968075);
                exports.Codecs.liteServer_masterchainInfoExt.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder) => {
            const kind = decoder.readInt32();
            if (kind === -1462968075) {
                return exports.Codecs.liteServer_masterchainInfoExt.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    },
    liteServer_CurrentTime: {
        encode: (src, encoder) => {
            const kind = src.kind;
            if (kind === 'liteServer.currentTime') {
                encoder.writeInt32(-380436467);
                exports.Codecs.liteServer_currentTime.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder) => {
            const kind = decoder.readInt32();
            if (kind === -380436467) {
                return exports.Codecs.liteServer_currentTime.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    },
    liteServer_Version: {
        encode: (src, encoder) => {
            const kind = src.kind;
            if (kind === 'liteServer.version') {
                encoder.writeInt32(1510248933);
                exports.Codecs.liteServer_version.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder) => {
            const kind = decoder.readInt32();
            if (kind === 1510248933) {
                return exports.Codecs.liteServer_version.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    },
    liteServer_BlockData: {
        encode: (src, encoder) => {
            const kind = src.kind;
            if (kind === 'liteServer.blockData') {
                encoder.writeInt32(-1519063700);
                exports.Codecs.liteServer_blockData.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder) => {
            const kind = decoder.readInt32();
            if (kind === -1519063700) {
                return exports.Codecs.liteServer_blockData.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    },
    liteServer_BlockState: {
        encode: (src, encoder) => {
            const kind = src.kind;
            if (kind === 'liteServer.blockState') {
                encoder.writeInt32(-1414669300);
                exports.Codecs.liteServer_blockState.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder) => {
            const kind = decoder.readInt32();
            if (kind === -1414669300) {
                return exports.Codecs.liteServer_blockState.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    },
    liteServer_BlockHeader: {
        encode: (src, encoder) => {
            const kind = src.kind;
            if (kind === 'liteServer.blockHeader') {
                encoder.writeInt32(1965916697);
                exports.Codecs.liteServer_blockHeader.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder) => {
            const kind = decoder.readInt32();
            if (kind === 1965916697) {
                return exports.Codecs.liteServer_blockHeader.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    },
    liteServer_SendMsgStatus: {
        encode: (src, encoder) => {
            const kind = src.kind;
            if (kind === 'liteServer.sendMsgStatus') {
                encoder.writeInt32(961602967);
                exports.Codecs.liteServer_sendMsgStatus.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder) => {
            const kind = decoder.readInt32();
            if (kind === 961602967) {
                return exports.Codecs.liteServer_sendMsgStatus.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    },
    liteServer_AccountState: {
        encode: (src, encoder) => {
            const kind = src.kind;
            if (kind === 'liteServer.accountState') {
                encoder.writeInt32(1887029073);
                exports.Codecs.liteServer_accountState.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder) => {
            const kind = decoder.readInt32();
            if (kind === 1887029073) {
                return exports.Codecs.liteServer_accountState.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    },
    liteServer_RunMethodResult: {
        encode: (src, encoder) => {
            const kind = src.kind;
            if (kind === 'liteServer.runMethodResult') {
                encoder.writeInt32(-1550163605);
                exports.Codecs.liteServer_runMethodResult.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder) => {
            const kind = decoder.readInt32();
            if (kind === -1550163605) {
                return exports.Codecs.liteServer_runMethodResult.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    },
    liteServer_ShardInfo: {
        encode: (src, encoder) => {
            const kind = src.kind;
            if (kind === 'liteServer.shardInfo') {
                encoder.writeInt32(-1612264060);
                exports.Codecs.liteServer_shardInfo.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder) => {
            const kind = decoder.readInt32();
            if (kind === -1612264060) {
                return exports.Codecs.liteServer_shardInfo.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    },
    liteServer_AllShardsInfo: {
        encode: (src, encoder) => {
            const kind = src.kind;
            if (kind === 'liteServer.allShardsInfo') {
                encoder.writeInt32(160425773);
                exports.Codecs.liteServer_allShardsInfo.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder) => {
            const kind = decoder.readInt32();
            if (kind === 160425773) {
                return exports.Codecs.liteServer_allShardsInfo.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    },
    liteServer_TransactionInfo: {
        encode: (src, encoder) => {
            const kind = src.kind;
            if (kind === 'liteServer.transactionInfo') {
                encoder.writeInt32(249490759);
                exports.Codecs.liteServer_transactionInfo.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder) => {
            const kind = decoder.readInt32();
            if (kind === 249490759) {
                return exports.Codecs.liteServer_transactionInfo.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    },
    liteServer_TransactionList: {
        encode: (src, encoder) => {
            const kind = src.kind;
            if (kind === 'liteServer.transactionList') {
                encoder.writeInt32(1864812043);
                exports.Codecs.liteServer_transactionList.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder) => {
            const kind = decoder.readInt32();
            if (kind === 1864812043) {
                return exports.Codecs.liteServer_transactionList.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    },
    liteServer_TransactionId: {
        encode: (src, encoder) => {
            const kind = src.kind;
            if (kind === 'liteServer.transactionId') {
                encoder.writeInt32(-1322293841);
                exports.Codecs.liteServer_transactionId.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder) => {
            const kind = decoder.readInt32();
            if (kind === -1322293841) {
                return exports.Codecs.liteServer_transactionId.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    },
    liteServer_TransactionId3: {
        encode: (src, encoder) => {
            const kind = src.kind;
            if (kind === 'liteServer.transactionId3') {
                encoder.writeInt32(746707575);
                exports.Codecs.liteServer_transactionId3.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder) => {
            const kind = decoder.readInt32();
            if (kind === 746707575) {
                return exports.Codecs.liteServer_transactionId3.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    },
    liteServer_BlockTransactions: {
        encode: (src, encoder) => {
            const kind = src.kind;
            if (kind === 'liteServer.blockTransactions') {
                encoder.writeInt32(-1114854101);
                exports.Codecs.liteServer_blockTransactions.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder) => {
            const kind = decoder.readInt32();
            if (kind === -1114854101) {
                return exports.Codecs.liteServer_blockTransactions.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    },
    liteServer_Signature: {
        encode: (src, encoder) => {
            const kind = src.kind;
            if (kind === 'liteServer.signature') {
                encoder.writeInt32(-1545668523);
                exports.Codecs.liteServer_signature.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder) => {
            const kind = decoder.readInt32();
            if (kind === -1545668523) {
                return exports.Codecs.liteServer_signature.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    },
    liteServer_SignatureSet: {
        encode: (src, encoder) => {
            const kind = src.kind;
            if (kind === 'liteServer.signatureSet') {
                encoder.writeInt32(-163272986);
                exports.Codecs.liteServer_signatureSet.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder) => {
            const kind = decoder.readInt32();
            if (kind === -163272986) {
                return exports.Codecs.liteServer_signatureSet.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    },
    liteServer_BlockLink: {
        encode: (src, encoder) => {
            const kind = src.kind;
            if (kind === 'liteServer.blockLinkBack') {
                encoder.writeInt32(-276947985);
                exports.Codecs.liteServer_blockLinkBack.encode(src, encoder);
                return;
            }
            if (kind === 'liteServer.blockLinkForward') {
                encoder.writeInt32(1376767516);
                exports.Codecs.liteServer_blockLinkForward.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder) => {
            const kind = decoder.readInt32();
            if (kind === -276947985) {
                return exports.Codecs.liteServer_blockLinkBack.decode(decoder);
            }
            if (kind === 1376767516) {
                return exports.Codecs.liteServer_blockLinkForward.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    },
    liteServer_PartialBlockProof: {
        encode: (src, encoder) => {
            const kind = src.kind;
            if (kind === 'liteServer.partialBlockProof') {
                encoder.writeInt32(-1898917183);
                exports.Codecs.liteServer_partialBlockProof.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder) => {
            const kind = decoder.readInt32();
            if (kind === -1898917183) {
                return exports.Codecs.liteServer_partialBlockProof.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    },
    liteServer_ConfigInfo: {
        encode: (src, encoder) => {
            const kind = src.kind;
            if (kind === 'liteServer.configInfo') {
                encoder.writeInt32(-1367660753);
                exports.Codecs.liteServer_configInfo.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder) => {
            const kind = decoder.readInt32();
            if (kind === -1367660753) {
                return exports.Codecs.liteServer_configInfo.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    },
    liteServer_ValidatorStats: {
        encode: (src, encoder) => {
            const kind = src.kind;
            if (kind === 'liteServer.validatorStats') {
                encoder.writeInt32(-1174956328);
                exports.Codecs.liteServer_validatorStats.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder) => {
            const kind = decoder.readInt32();
            if (kind === -1174956328) {
                return exports.Codecs.liteServer_validatorStats.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    },
    liteServer_LibraryResult: {
        encode: (src, encoder) => {
            const kind = src.kind;
            if (kind === 'liteServer.libraryResult') {
                encoder.writeInt32(293255531);
                exports.Codecs.liteServer_libraryResult.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder) => {
            const kind = decoder.readInt32();
            if (kind === 293255531) {
                return exports.Codecs.liteServer_libraryResult.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    },
    liteServer_ShardBlockLink: {
        encode: (src, encoder) => {
            const kind = src.kind;
            if (kind === 'liteServer.shardBlockLink') {
                encoder.writeInt32(-754069646);
                exports.Codecs.liteServer_shardBlockLink.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder) => {
            const kind = decoder.readInt32();
            if (kind === -754069646) {
                return exports.Codecs.liteServer_shardBlockLink.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    },
    liteServer_ShardBlockProof: {
        encode: (src, encoder) => {
            const kind = src.kind;
            if (kind === 'liteServer.shardBlockProof') {
                encoder.writeInt32(493002874);
                exports.Codecs.liteServer_shardBlockProof.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder) => {
            const kind = decoder.readInt32();
            if (kind === 493002874) {
                return exports.Codecs.liteServer_shardBlockProof.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    },
    liteServer_debug_Verbosity: {
        encode: (src, encoder) => {
            const kind = src.kind;
            if (kind === 'liteServer.debug.verbosity') {
                encoder.writeInt32(1564493619);
                exports.Codecs.liteServer_debug_verbosity.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder) => {
            const kind = decoder.readInt32();
            if (kind === 1564493619) {
                return exports.Codecs.liteServer_debug_verbosity.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    },
};
