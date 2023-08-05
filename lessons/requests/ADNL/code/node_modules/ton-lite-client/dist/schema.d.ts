/**
 * Copyright (c) Whales Corp.
 * All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
/// <reference types="node" />
import { TLFlag, TLInt, TLString, TLLong, TLInt256, TLBytes, TLBool, TLCodec, TLFunction } from "ton-tl";
export interface tonNode_blockId {
    readonly kind: 'tonNode.blockId';
    readonly workchain: TLInt;
    readonly shard: TLLong;
    readonly seqno: TLInt;
}
export interface tonNode_blockIdExt {
    readonly kind: 'tonNode.blockIdExt';
    readonly workchain: TLInt;
    readonly shard: TLLong;
    readonly seqno: TLInt;
    readonly rootHash: TLInt256;
    readonly fileHash: TLInt256;
}
export interface tonNode_zeroStateIdExt {
    readonly kind: 'tonNode.zeroStateIdExt';
    readonly workchain: TLInt;
    readonly rootHash: TLInt256;
    readonly fileHash: TLInt256;
}
export interface adnl_message_query {
    readonly kind: 'adnl.message.query';
    readonly queryId: TLInt256;
    readonly query: TLBytes;
}
export interface adnl_message_answer {
    readonly kind: 'adnl.message.answer';
    readonly queryId: TLInt256;
    readonly answer: TLBytes;
}
export interface liteServer_error {
    readonly kind: 'liteServer.error';
    readonly code: TLInt;
    readonly message: TLString;
}
export interface liteServer_accountId {
    readonly kind: 'liteServer.accountId';
    readonly workchain: TLInt;
    readonly id: TLInt256;
}
export interface liteServer_libraryEntry {
    readonly kind: 'liteServer.libraryEntry';
    readonly hash: TLInt256;
    readonly data: TLBytes;
}
export interface liteServer_masterchainInfo {
    readonly kind: 'liteServer.masterchainInfo';
    readonly last: tonNode_blockIdExt;
    readonly stateRootHash: TLInt256;
    readonly init: tonNode_zeroStateIdExt;
}
export interface liteServer_masterchainInfoExt {
    readonly kind: 'liteServer.masterchainInfoExt';
    readonly mode: TLFlag;
    readonly version: TLInt;
    readonly capabilities: TLLong;
    readonly last: tonNode_blockIdExt;
    readonly lastUtime: TLInt;
    readonly now: TLInt;
    readonly stateRootHash: TLInt256;
    readonly init: tonNode_zeroStateIdExt;
}
export interface liteServer_currentTime {
    readonly kind: 'liteServer.currentTime';
    readonly now: TLInt;
}
export interface liteServer_version {
    readonly kind: 'liteServer.version';
    readonly mode: TLFlag;
    readonly version: TLInt;
    readonly capabilities: TLLong;
    readonly now: TLInt;
}
export interface liteServer_blockData {
    readonly kind: 'liteServer.blockData';
    readonly id: tonNode_blockIdExt;
    readonly data: TLBytes;
}
export interface liteServer_blockState {
    readonly kind: 'liteServer.blockState';
    readonly id: tonNode_blockIdExt;
    readonly rootHash: TLInt256;
    readonly fileHash: TLInt256;
    readonly data: TLBytes;
}
export interface liteServer_blockHeader {
    readonly kind: 'liteServer.blockHeader';
    readonly id: tonNode_blockIdExt;
    readonly mode: TLFlag;
    readonly headerProof: TLBytes;
}
export interface liteServer_sendMsgStatus {
    readonly kind: 'liteServer.sendMsgStatus';
    readonly status: TLInt;
}
export interface liteServer_accountState {
    readonly kind: 'liteServer.accountState';
    readonly id: tonNode_blockIdExt;
    readonly shardblk: tonNode_blockIdExt;
    readonly shardProof: TLBytes;
    readonly proof: TLBytes;
    readonly state: TLBytes;
}
export interface liteServer_runMethodResult {
    readonly kind: 'liteServer.runMethodResult';
    readonly mode: TLFlag;
    readonly id: tonNode_blockIdExt;
    readonly shardblk: tonNode_blockIdExt;
    readonly shardProof: TLBytes | null;
    readonly proof: TLBytes | null;
    readonly stateProof: TLBytes | null;
    readonly initC7: TLBytes | null;
    readonly libExtras: TLBytes | null;
    readonly exitCode: TLInt;
    readonly result: TLBytes | null;
}
export interface liteServer_shardInfo {
    readonly kind: 'liteServer.shardInfo';
    readonly id: tonNode_blockIdExt;
    readonly shardblk: tonNode_blockIdExt;
    readonly shardProof: TLBytes;
    readonly shardDescr: TLBytes;
}
export interface liteServer_allShardsInfo {
    readonly kind: 'liteServer.allShardsInfo';
    readonly id: tonNode_blockIdExt;
    readonly proof: TLBytes;
    readonly data: TLBytes;
}
export interface liteServer_transactionInfo {
    readonly kind: 'liteServer.transactionInfo';
    readonly id: tonNode_blockIdExt;
    readonly proof: TLBytes;
    readonly transaction: TLBytes;
}
export interface liteServer_transactionList {
    readonly kind: 'liteServer.transactionList';
    readonly ids: tonNode_blockIdExt[];
    readonly transactions: TLBytes;
}
export interface liteServer_transactionId {
    readonly kind: 'liteServer.transactionId';
    readonly mode: TLFlag;
    readonly account: TLInt256 | null;
    readonly lt: TLLong | null;
    readonly hash: TLInt256 | null;
}
export interface liteServer_transactionId3 {
    readonly kind: 'liteServer.transactionId3';
    readonly account: TLInt256;
    readonly lt: TLLong;
}
export interface liteServer_blockTransactions {
    readonly kind: 'liteServer.blockTransactions';
    readonly id: tonNode_blockIdExt;
    readonly reqCount: TLFlag;
    readonly incomplete: TLBool;
    readonly ids: liteServer_transactionId[];
    readonly proof: TLBytes;
}
export interface liteServer_signature {
    readonly kind: 'liteServer.signature';
    readonly nodeIdShort: TLInt256;
    readonly signature: TLBytes;
}
export interface liteServer_signatureSet {
    readonly kind: 'liteServer.signatureSet';
    readonly validatorSetHash: TLInt;
    readonly catchainSeqno: TLInt;
    readonly signatures: liteServer_signature[];
}
export interface liteServer_blockLinkBack {
    readonly kind: 'liteServer.blockLinkBack';
    readonly toKeyBlock: TLBool;
    readonly from: tonNode_blockIdExt;
    readonly to: tonNode_blockIdExt;
    readonly destProof: TLBytes;
    readonly proof: TLBytes;
    readonly stateProof: TLBytes;
}
export interface liteServer_blockLinkForward {
    readonly kind: 'liteServer.blockLinkForward';
    readonly toKeyBlock: TLBool;
    readonly from: tonNode_blockIdExt;
    readonly to: tonNode_blockIdExt;
    readonly destProof: TLBytes;
    readonly configProof: TLBytes;
    readonly signatures: liteServer_SignatureSet;
}
export interface liteServer_partialBlockProof {
    readonly kind: 'liteServer.partialBlockProof';
    readonly complete: TLBool;
    readonly from: tonNode_blockIdExt;
    readonly to: tonNode_blockIdExt;
    readonly steps: liteServer_BlockLink[];
}
export interface liteServer_configInfo {
    readonly kind: 'liteServer.configInfo';
    readonly mode: TLFlag;
    readonly id: tonNode_blockIdExt;
    readonly stateProof: TLBytes;
    readonly configProof: TLBytes;
}
export interface liteServer_validatorStats {
    readonly kind: 'liteServer.validatorStats';
    readonly mode: TLFlag;
    readonly id: tonNode_blockIdExt;
    readonly count: TLInt;
    readonly complete: TLBool;
    readonly stateProof: TLBytes;
    readonly dataProof: TLBytes;
}
export interface liteServer_libraryResult {
    readonly kind: 'liteServer.libraryResult';
    readonly result: liteServer_libraryEntry[];
}
export interface liteServer_shardBlockLink {
    readonly kind: 'liteServer.shardBlockLink';
    readonly id: tonNode_blockIdExt;
    readonly proof: TLBytes;
}
export interface liteServer_shardBlockProof {
    readonly kind: 'liteServer.shardBlockProof';
    readonly masterchainId: tonNode_blockIdExt;
    readonly links: liteServer_shardBlockLink[];
}
export interface liteServer_debug_verbosity {
    readonly kind: 'liteServer.debug.verbosity';
    readonly value: TLInt;
}
export type tonNode_BlockId = tonNode_blockId;
export type tonNode_BlockIdExt = tonNode_blockIdExt;
export type tonNode_ZeroStateIdExt = tonNode_zeroStateIdExt;
export type adnl_Message = adnl_message_query | adnl_message_answer;
export type liteServer_Error = liteServer_error;
export type liteServer_AccountId = liteServer_accountId;
export type liteServer_LibraryEntry = liteServer_libraryEntry;
export type liteServer_MasterchainInfo = liteServer_masterchainInfo;
export type liteServer_MasterchainInfoExt = liteServer_masterchainInfoExt;
export type liteServer_CurrentTime = liteServer_currentTime;
export type liteServer_Version = liteServer_version;
export type liteServer_BlockData = liteServer_blockData;
export type liteServer_BlockState = liteServer_blockState;
export type liteServer_BlockHeader = liteServer_blockHeader;
export type liteServer_SendMsgStatus = liteServer_sendMsgStatus;
export type liteServer_AccountState = liteServer_accountState;
export type liteServer_RunMethodResult = liteServer_runMethodResult;
export type liteServer_ShardInfo = liteServer_shardInfo;
export type liteServer_AllShardsInfo = liteServer_allShardsInfo;
export type liteServer_TransactionInfo = liteServer_transactionInfo;
export type liteServer_TransactionList = liteServer_transactionList;
export type liteServer_TransactionId = liteServer_transactionId;
export type liteServer_TransactionId3 = liteServer_transactionId3;
export type liteServer_BlockTransactions = liteServer_blockTransactions;
export type liteServer_Signature = liteServer_signature;
export type liteServer_SignatureSet = liteServer_signatureSet;
export type liteServer_BlockLink = liteServer_blockLinkBack | liteServer_blockLinkForward;
export type liteServer_PartialBlockProof = liteServer_partialBlockProof;
export type liteServer_ConfigInfo = liteServer_configInfo;
export type liteServer_ValidatorStats = liteServer_validatorStats;
export type liteServer_LibraryResult = liteServer_libraryResult;
export type liteServer_ShardBlockLink = liteServer_shardBlockLink;
export type liteServer_ShardBlockProof = liteServer_shardBlockProof;
export type liteServer_debug_Verbosity = liteServer_debug_verbosity;
export interface liteServer_getMasterchainInfo {
    readonly kind: 'liteServer.getMasterchainInfo';
}
export interface liteServer_getMasterchainInfoExt {
    readonly kind: 'liteServer.getMasterchainInfoExt';
    readonly mode: TLFlag;
}
export interface liteServer_getTime {
    readonly kind: 'liteServer.getTime';
}
export interface liteServer_getVersion {
    readonly kind: 'liteServer.getVersion';
}
export interface liteServer_getBlock {
    readonly kind: 'liteServer.getBlock';
    readonly id: tonNode_blockIdExt;
}
export interface liteServer_getState {
    readonly kind: 'liteServer.getState';
    readonly id: tonNode_blockIdExt;
}
export interface liteServer_getBlockHeader {
    readonly kind: 'liteServer.getBlockHeader';
    readonly id: tonNode_blockIdExt;
    readonly mode: TLFlag;
}
export interface liteServer_sendMessage {
    readonly kind: 'liteServer.sendMessage';
    readonly body: TLBytes;
}
export interface liteServer_getAccountState {
    readonly kind: 'liteServer.getAccountState';
    readonly id: tonNode_blockIdExt;
    readonly account: liteServer_accountId;
}
export interface liteServer_getAccountStatePrunned {
    readonly kind: 'liteServer.getAccountStatePrunned';
    readonly id: tonNode_blockIdExt;
    readonly account: liteServer_accountId;
}
export interface liteServer_runSmcMethod {
    readonly kind: 'liteServer.runSmcMethod';
    readonly mode: TLFlag;
    readonly id: tonNode_blockIdExt;
    readonly account: liteServer_accountId;
    readonly methodId: TLLong;
    readonly params: TLBytes;
}
export interface liteServer_getShardInfo {
    readonly kind: 'liteServer.getShardInfo';
    readonly id: tonNode_blockIdExt;
    readonly workchain: TLInt;
    readonly shard: TLLong;
    readonly exact: TLBool;
}
export interface liteServer_getAllShardsInfo {
    readonly kind: 'liteServer.getAllShardsInfo';
    readonly id: tonNode_blockIdExt;
}
export interface liteServer_getOneTransaction {
    readonly kind: 'liteServer.getOneTransaction';
    readonly id: tonNode_blockIdExt;
    readonly account: liteServer_accountId;
    readonly lt: TLLong;
}
export interface liteServer_getTransactions {
    readonly kind: 'liteServer.getTransactions';
    readonly count: TLFlag;
    readonly account: liteServer_accountId;
    readonly lt: TLLong;
    readonly hash: TLInt256;
}
export interface liteServer_lookupBlock {
    readonly kind: 'liteServer.lookupBlock';
    readonly mode: TLFlag;
    readonly id: tonNode_blockId;
    readonly lt: TLLong | null;
    readonly utime: TLInt | null;
}
export interface liteServer_listBlockTransactions {
    readonly kind: 'liteServer.listBlockTransactions';
    readonly id: tonNode_blockIdExt;
    readonly mode: TLFlag;
    readonly count: TLFlag;
    readonly after: liteServer_transactionId3 | null;
    readonly reverseOrder: TLBool | null;
    readonly wantProof: TLBool | null;
}
export interface liteServer_getBlockProof {
    readonly kind: 'liteServer.getBlockProof';
    readonly mode: TLFlag;
    readonly knownBlock: tonNode_blockIdExt;
    readonly targetBlock: tonNode_blockIdExt | null;
}
export interface liteServer_getConfigAll {
    readonly kind: 'liteServer.getConfigAll';
    readonly mode: TLFlag;
    readonly id: tonNode_blockIdExt;
}
export interface liteServer_getConfigParams {
    readonly kind: 'liteServer.getConfigParams';
    readonly mode: TLFlag;
    readonly id: tonNode_blockIdExt;
    readonly paramList: TLInt[];
}
export interface liteServer_getValidatorStats {
    readonly kind: 'liteServer.getValidatorStats';
    readonly mode: TLFlag;
    readonly id: tonNode_blockIdExt;
    readonly limit: TLInt;
    readonly startAfter: TLInt256 | null;
    readonly modifiedAfter: TLInt | null;
}
export interface liteServer_getLibraries {
    readonly kind: 'liteServer.getLibraries';
    readonly libraryList: TLInt256[];
}
export interface liteServer_getShardBlockProof {
    readonly kind: 'liteServer.getShardBlockProof';
    readonly id: tonNode_blockIdExt;
}
export interface liteServer_queryPrefix {
    readonly kind: 'liteServer.queryPrefix';
}
export interface liteServer_query {
    readonly kind: 'liteServer.query';
    readonly data: TLBytes;
}
export interface liteServer_waitMasterchainSeqno {
    readonly kind: 'liteServer.waitMasterchainSeqno';
    readonly seqno: TLInt;
    readonly timeoutMs: TLInt;
}
export declare const Functions: {
    liteServer_getMasterchainInfo: TLFunction<liteServer_getMasterchainInfo, liteServer_masterchainInfo>;
    liteServer_getMasterchainInfoExt: TLFunction<liteServer_getMasterchainInfoExt, liteServer_masterchainInfoExt>;
    liteServer_getTime: TLFunction<liteServer_getTime, liteServer_currentTime>;
    liteServer_getVersion: TLFunction<liteServer_getVersion, liteServer_version>;
    liteServer_getBlock: TLFunction<liteServer_getBlock, liteServer_blockData>;
    liteServer_getState: TLFunction<liteServer_getState, liteServer_blockState>;
    liteServer_getBlockHeader: TLFunction<liteServer_getBlockHeader, liteServer_blockHeader>;
    liteServer_sendMessage: TLFunction<liteServer_sendMessage, liteServer_sendMsgStatus>;
    liteServer_getAccountState: TLFunction<liteServer_getAccountState, liteServer_accountState>;
    liteServer_getAccountStatePrunned: TLFunction<liteServer_getAccountStatePrunned, liteServer_accountState>;
    liteServer_runSmcMethod: TLFunction<liteServer_runSmcMethod, liteServer_runMethodResult>;
    liteServer_getShardInfo: TLFunction<liteServer_getShardInfo, liteServer_shardInfo>;
    liteServer_getAllShardsInfo: TLFunction<liteServer_getAllShardsInfo, liteServer_allShardsInfo>;
    liteServer_getOneTransaction: TLFunction<liteServer_getOneTransaction, liteServer_transactionInfo>;
    liteServer_getTransactions: TLFunction<liteServer_getTransactions, liteServer_transactionList>;
    liteServer_lookupBlock: TLFunction<liteServer_lookupBlock, liteServer_blockHeader>;
    liteServer_listBlockTransactions: TLFunction<liteServer_listBlockTransactions, liteServer_blockTransactions>;
    liteServer_getBlockProof: TLFunction<liteServer_getBlockProof, liteServer_partialBlockProof>;
    liteServer_getConfigAll: TLFunction<liteServer_getConfigAll, liteServer_configInfo>;
    liteServer_getConfigParams: TLFunction<liteServer_getConfigParams, liteServer_configInfo>;
    liteServer_getValidatorStats: TLFunction<liteServer_getValidatorStats, liteServer_validatorStats>;
    liteServer_getLibraries: TLFunction<liteServer_getLibraries, liteServer_libraryResult>;
    liteServer_getShardBlockProof: TLFunction<liteServer_getShardBlockProof, liteServer_shardBlockProof>;
    liteServer_queryPrefix: TLFunction<liteServer_queryPrefix, Buffer>;
    liteServer_query: TLFunction<liteServer_query, Buffer>;
    liteServer_waitMasterchainSeqno: TLFunction<liteServer_waitMasterchainSeqno, Buffer>;
};
export declare const Codecs: {
    tonNode_blockId: TLCodec<tonNode_blockId>;
    tonNode_blockIdExt: TLCodec<tonNode_blockIdExt>;
    tonNode_zeroStateIdExt: TLCodec<tonNode_zeroStateIdExt>;
    adnl_message_query: TLCodec<adnl_message_query>;
    adnl_message_answer: TLCodec<adnl_message_answer>;
    liteServer_error: TLCodec<liteServer_error>;
    liteServer_accountId: TLCodec<liteServer_accountId>;
    liteServer_libraryEntry: TLCodec<liteServer_libraryEntry>;
    liteServer_masterchainInfo: TLCodec<liteServer_masterchainInfo>;
    liteServer_masterchainInfoExt: TLCodec<liteServer_masterchainInfoExt>;
    liteServer_currentTime: TLCodec<liteServer_currentTime>;
    liteServer_version: TLCodec<liteServer_version>;
    liteServer_blockData: TLCodec<liteServer_blockData>;
    liteServer_blockState: TLCodec<liteServer_blockState>;
    liteServer_blockHeader: TLCodec<liteServer_blockHeader>;
    liteServer_sendMsgStatus: TLCodec<liteServer_sendMsgStatus>;
    liteServer_accountState: TLCodec<liteServer_accountState>;
    liteServer_runMethodResult: TLCodec<liteServer_runMethodResult>;
    liteServer_shardInfo: TLCodec<liteServer_shardInfo>;
    liteServer_allShardsInfo: TLCodec<liteServer_allShardsInfo>;
    liteServer_transactionInfo: TLCodec<liteServer_transactionInfo>;
    liteServer_transactionList: TLCodec<liteServer_transactionList>;
    liteServer_transactionId: TLCodec<liteServer_transactionId>;
    liteServer_transactionId3: TLCodec<liteServer_transactionId3>;
    liteServer_blockTransactions: TLCodec<liteServer_blockTransactions>;
    liteServer_signature: TLCodec<liteServer_signature>;
    liteServer_signatureSet: TLCodec<liteServer_signatureSet>;
    liteServer_blockLinkBack: TLCodec<liteServer_blockLinkBack>;
    liteServer_blockLinkForward: TLCodec<liteServer_blockLinkForward>;
    liteServer_partialBlockProof: TLCodec<liteServer_partialBlockProof>;
    liteServer_configInfo: TLCodec<liteServer_configInfo>;
    liteServer_validatorStats: TLCodec<liteServer_validatorStats>;
    liteServer_libraryResult: TLCodec<liteServer_libraryResult>;
    liteServer_shardBlockLink: TLCodec<liteServer_shardBlockLink>;
    liteServer_shardBlockProof: TLCodec<liteServer_shardBlockProof>;
    liteServer_debug_verbosity: TLCodec<liteServer_debug_verbosity>;
    liteServer_getMasterchainInfo: TLCodec<liteServer_getMasterchainInfo>;
    liteServer_getMasterchainInfoExt: TLCodec<liteServer_getMasterchainInfoExt>;
    liteServer_getTime: TLCodec<liteServer_getTime>;
    liteServer_getVersion: TLCodec<liteServer_getVersion>;
    liteServer_getBlock: TLCodec<liteServer_getBlock>;
    liteServer_getState: TLCodec<liteServer_getState>;
    liteServer_getBlockHeader: TLCodec<liteServer_getBlockHeader>;
    liteServer_sendMessage: TLCodec<liteServer_sendMessage>;
    liteServer_getAccountState: TLCodec<liteServer_getAccountState>;
    liteServer_getAccountStatePrunned: TLCodec<liteServer_getAccountStatePrunned>;
    liteServer_runSmcMethod: TLCodec<liteServer_runSmcMethod>;
    liteServer_getShardInfo: TLCodec<liteServer_getShardInfo>;
    liteServer_getAllShardsInfo: TLCodec<liteServer_getAllShardsInfo>;
    liteServer_getOneTransaction: TLCodec<liteServer_getOneTransaction>;
    liteServer_getTransactions: TLCodec<liteServer_getTransactions>;
    liteServer_lookupBlock: TLCodec<liteServer_lookupBlock>;
    liteServer_listBlockTransactions: TLCodec<liteServer_listBlockTransactions>;
    liteServer_getBlockProof: TLCodec<liteServer_getBlockProof>;
    liteServer_getConfigAll: TLCodec<liteServer_getConfigAll>;
    liteServer_getConfigParams: TLCodec<liteServer_getConfigParams>;
    liteServer_getValidatorStats: TLCodec<liteServer_getValidatorStats>;
    liteServer_getLibraries: TLCodec<liteServer_getLibraries>;
    liteServer_getShardBlockProof: TLCodec<liteServer_getShardBlockProof>;
    liteServer_queryPrefix: TLCodec<liteServer_queryPrefix>;
    liteServer_query: TLCodec<liteServer_query>;
    liteServer_waitMasterchainSeqno: TLCodec<liteServer_waitMasterchainSeqno>;
    tonNode_BlockId: TLCodec<tonNode_blockId>;
    tonNode_BlockIdExt: TLCodec<tonNode_blockIdExt>;
    tonNode_ZeroStateIdExt: TLCodec<tonNode_zeroStateIdExt>;
    adnl_Message: TLCodec<adnl_Message>;
    liteServer_Error: TLCodec<liteServer_error>;
    liteServer_AccountId: TLCodec<liteServer_accountId>;
    liteServer_LibraryEntry: TLCodec<liteServer_libraryEntry>;
    liteServer_MasterchainInfo: TLCodec<liteServer_masterchainInfo>;
    liteServer_MasterchainInfoExt: TLCodec<liteServer_masterchainInfoExt>;
    liteServer_CurrentTime: TLCodec<liteServer_currentTime>;
    liteServer_Version: TLCodec<liteServer_version>;
    liteServer_BlockData: TLCodec<liteServer_blockData>;
    liteServer_BlockState: TLCodec<liteServer_blockState>;
    liteServer_BlockHeader: TLCodec<liteServer_blockHeader>;
    liteServer_SendMsgStatus: TLCodec<liteServer_sendMsgStatus>;
    liteServer_AccountState: TLCodec<liteServer_accountState>;
    liteServer_RunMethodResult: TLCodec<liteServer_runMethodResult>;
    liteServer_ShardInfo: TLCodec<liteServer_shardInfo>;
    liteServer_AllShardsInfo: TLCodec<liteServer_allShardsInfo>;
    liteServer_TransactionInfo: TLCodec<liteServer_transactionInfo>;
    liteServer_TransactionList: TLCodec<liteServer_transactionList>;
    liteServer_TransactionId: TLCodec<liteServer_transactionId>;
    liteServer_TransactionId3: TLCodec<liteServer_transactionId3>;
    liteServer_BlockTransactions: TLCodec<liteServer_blockTransactions>;
    liteServer_Signature: TLCodec<liteServer_signature>;
    liteServer_SignatureSet: TLCodec<liteServer_signatureSet>;
    liteServer_BlockLink: TLCodec<liteServer_BlockLink>;
    liteServer_PartialBlockProof: TLCodec<liteServer_partialBlockProof>;
    liteServer_ConfigInfo: TLCodec<liteServer_configInfo>;
    liteServer_ValidatorStats: TLCodec<liteServer_validatorStats>;
    liteServer_LibraryResult: TLCodec<liteServer_libraryResult>;
    liteServer_ShardBlockLink: TLCodec<liteServer_shardBlockLink>;
    liteServer_ShardBlockProof: TLCodec<liteServer_shardBlockProof>;
    liteServer_debug_Verbosity: TLCodec<liteServer_debug_verbosity>;
};
