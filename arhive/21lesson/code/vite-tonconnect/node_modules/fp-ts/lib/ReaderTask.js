"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fromTaskK = exports.FromTask = exports.chainFirstReaderIOK = exports.chainFirstReaderIOKW = exports.chainReaderIOK = exports.chainReaderIOKW = exports.fromReaderIOK = exports.chainFirstReaderKW = exports.chainFirstReaderK = exports.chainReaderKW = exports.chainReaderK = exports.fromReaderK = exports.asks = exports.ask = exports.FromReader = exports.chainFirstIOK = exports.chainIOK = exports.fromIOK = exports.FromIO = exports.chainFirstW = exports.chainFirst = exports.MonadTask = exports.MonadIO = exports.Monad = exports.Chain = exports.ApplicativeSeq = exports.ApplySeq = exports.ApplicativePar = exports.apSecond = exports.apFirst = exports.ApplyPar = exports.Pointed = exports.flap = exports.Functor = exports.URI = exports.flatten = exports.flattenW = exports.chainW = exports.chain = exports.of = exports.apW = exports.ap = exports.map = exports.asksReaderTask = exports.asksReaderTaskW = exports.local = exports.fromReaderIO = exports.fromIO = exports.fromTask = exports.fromReader = void 0;
exports.run = exports.getMonoid = exports.getSemigroup = exports.readerTaskSeq = exports.readerTask = exports.sequenceSeqArray = exports.traverseSeqArray = exports.traverseSeqArrayWithIndex = exports.sequenceArray = exports.traverseArray = exports.traverseArrayWithIndex = exports.traverseReadonlyArrayWithIndexSeq = exports.traverseReadonlyNonEmptyArrayWithIndexSeq = exports.traverseReadonlyArrayWithIndex = exports.traverseReadonlyNonEmptyArrayWithIndex = exports.ApT = exports.apSW = exports.apS = exports.bindW = exports.bind = exports.let = exports.bindTo = exports.Do = exports.chainFirstTaskK = exports.chainTaskK = void 0;
/**
 * @since 2.3.0
 */
var Applicative_1 = require("./Applicative");
var Apply_1 = require("./Apply");
var Chain_1 = require("./Chain");
var FromIO_1 = require("./FromIO");
var FromReader_1 = require("./FromReader");
var FromTask_1 = require("./FromTask");
var function_1 = require("./function");
var Functor_1 = require("./Functor");
var _ = __importStar(require("./internal"));
var R = __importStar(require("./Reader"));
var RT = __importStar(require("./ReaderT"));
var T = __importStar(require("./Task"));
// -------------------------------------------------------------------------------------
// conversions
// -------------------------------------------------------------------------------------
/**
 * @category conversions
 * @since 2.3.0
 */
exports.fromReader = RT.fromReader(T.Pointed);
/**
 * @category conversions
 * @since 2.3.0
 */
exports.fromTask = R.of;
/**
 * @category conversions
 * @since 2.3.0
 */
exports.fromIO = (0, function_1.flow)(T.fromIO, exports.fromTask);
/**
 * @category conversions
 * @since 2.13.0
 */
exports.fromReaderIO = R.map(T.fromIO);
// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------
/**
 * Changes the value of the local context during the execution of the action `ma` (similar to `Contravariant`'s
 * `contramap`).
 *
 * @since 2.3.0
 */
exports.local = R.local;
/**
 * Less strict version of [`asksReaderTask`](#asksreadertask).
 *
 * The `W` suffix (short for **W**idening) means that the environment types will be merged.
 *
 * @category constructors
 * @since 2.11.0
 */
exports.asksReaderTaskW = R.asksReaderW;
/**
 * Effectfully accesses the environment.
 *
 * @category constructors
 * @since 2.11.0
 */
exports.asksReaderTask = exports.asksReaderTaskW;
var _map = function (fa, f) { return (0, function_1.pipe)(fa, (0, exports.map)(f)); };
var _apPar = function (fab, fa) { return (0, function_1.pipe)(fab, (0, exports.ap)(fa)); };
var _apSeq = function (fab, fa) {
    return (0, function_1.pipe)(fab, (0, exports.chain)(function (f) { return (0, function_1.pipe)(fa, (0, exports.map)(f)); }));
};
var _chain = function (ma, f) { return (0, function_1.pipe)(ma, (0, exports.chain)(f)); };
/**
 * `map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
 * use the type constructor `F` to represent some computational context.
 *
 * @category mapping
 * @since 2.3.0
 */
exports.map = RT.map(T.Functor);
/**
 * @since 2.3.0
 */
exports.ap = 
/*#__PURE__*/ RT.ap(T.ApplyPar);
/**
 * Less strict version of [`ap`](#ap).
 *
 * The `W` suffix (short for **W**idening) means that the environment types will be merged.
 *
 * @since 2.8.0
 */
exports.apW = exports.ap;
/**
 * @category constructors
 * @since 2.3.0
 */
exports.of = RT.of(T.Pointed);
/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation.
 *
 * @category sequencing
 * @since 2.3.0
 */
exports.chain = 
/*#__PURE__*/ RT.chain(T.Monad);
/**
 * Less strict version of  [`chain`](#chain).
 *
 * The `W` suffix (short for **W**idening) means that the environment types will be merged.
 *
 * @category sequencing
 * @since 2.6.7
 */
exports.chainW = exports.chain;
/**
 * Less strict version of [`flatten`](#flatten).
 *
 * The `W` suffix (short for **W**idening) means that the environment types will be merged.
 *
 * @category sequencing
 * @since 2.11.0
 */
exports.flattenW = 
/*#__PURE__*/ (0, exports.chainW)(function_1.identity);
/**
 * @category sequencing
 * @since 2.3.0
 */
exports.flatten = exports.flattenW;
/**
 * @category type lambdas
 * @since 2.3.0
 */
exports.URI = 'ReaderTask';
/**
 * @category instances
 * @since 2.7.0
 */
exports.Functor = {
    URI: exports.URI,
    map: _map
};
/**
 * @category mapping
 * @since 2.10.0
 */
exports.flap = (0, Functor_1.flap)(exports.Functor);
/**
 * @category instances
 * @since 2.10.0
 */
exports.Pointed = {
    URI: exports.URI,
    of: exports.of
};
/**
 * Runs computations in parallel.
 *
 * @category instances
 * @since 2.10.0
 */
exports.ApplyPar = {
    URI: exports.URI,
    map: _map,
    ap: _apPar
};
/**
 * Combine two effectful actions, keeping only the result of the first.
 *
 * @since 2.3.0
 */
exports.apFirst = (0, Apply_1.apFirst)(exports.ApplyPar);
/**
 * Combine two effectful actions, keeping only the result of the second.
 *
 * @since 2.3.0
 */
exports.apSecond = (0, Apply_1.apSecond)(exports.ApplyPar);
/**
 * Runs computations in parallel.
 *
 * @category instances
 * @since 2.7.0
 */
exports.ApplicativePar = {
    URI: exports.URI,
    map: _map,
    ap: _apPar,
    of: exports.of
};
/**
 * Runs computations sequentially.
 *
 * @category instances
 * @since 2.10.0
 */
exports.ApplySeq = {
    URI: exports.URI,
    map: _map,
    ap: _apSeq
};
/**
 * Runs computations sequentially.
 *
 * @category instances
 * @since 2.7.0
 */
exports.ApplicativeSeq = {
    URI: exports.URI,
    map: _map,
    ap: _apSeq,
    of: exports.of
};
/**
 * @category instances
 * @since 2.10.0
 */
exports.Chain = {
    URI: exports.URI,
    map: _map,
    ap: _apPar,
    chain: _chain
};
/**
 * @category instances
 * @since 2.10.0
 */
exports.Monad = {
    URI: exports.URI,
    map: _map,
    of: exports.of,
    ap: _apPar,
    chain: _chain
};
/**
 * @category instances
 * @since 2.10.0
 */
exports.MonadIO = {
    URI: exports.URI,
    map: _map,
    of: exports.of,
    ap: _apPar,
    chain: _chain,
    fromIO: exports.fromIO
};
/**
 * @category instances
 * @since 2.10.0
 */
exports.MonadTask = {
    URI: exports.URI,
    map: _map,
    of: exports.of,
    ap: _apPar,
    chain: _chain,
    fromIO: exports.fromIO,
    fromTask: exports.fromTask
};
/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation and
 * keeping only the result of the first.
 *
 * @category sequencing
 * @since 2.3.0
 */
exports.chainFirst = 
/*#__PURE__*/ (0, Chain_1.chainFirst)(exports.Chain);
/**
 * Less strict version of [`chainFirst`](#chainfirst).
 *
 * The `W` suffix (short for **W**idening) means that the environment types will be merged.
 *
 * @category sequencing
 * @since 2.11.0
 */
exports.chainFirstW = exports.chainFirst;
/**
 * @category instances
 * @since 2.10.0
 */
exports.FromIO = {
    URI: exports.URI,
    fromIO: exports.fromIO
};
/**
 * @category lifting
 * @since 2.4.0
 */
exports.fromIOK = (0, FromIO_1.fromIOK)(exports.FromIO);
/**
 * @category sequencing
 * @since 2.4.0
 */
exports.chainIOK = 
/*#__PURE__*/ (0, FromIO_1.chainIOK)(exports.FromIO, exports.Chain);
/**
 * @category sequencing
 * @since 2.10.0
 */
exports.chainFirstIOK = 
/*#__PURE__*/ (0, FromIO_1.chainFirstIOK)(exports.FromIO, exports.Chain);
/**
 * @category instances
 * @since 2.11.0
 */
exports.FromReader = {
    URI: exports.URI,
    fromReader: exports.fromReader
};
/**
 * Reads the current context.
 *
 * @category constructors
 * @since 2.3.0
 */
exports.ask = (0, FromReader_1.ask)(exports.FromReader);
/**
 * Projects a value from the global context in a `ReaderTask`.
 *
 * @category constructors
 * @since 2.3.0
 */
exports.asks = (0, FromReader_1.asks)(exports.FromReader);
/**
 * @category lifting
 * @since 2.11.0
 */
exports.fromReaderK = (0, FromReader_1.fromReaderK)(exports.FromReader);
/**
 * @category sequencing
 * @since 2.11.0
 */
exports.chainReaderK = 
/*#__PURE__*/ (0, FromReader_1.chainReaderK)(exports.FromReader, exports.Chain);
/**
 * Less strict version of [`chainReaderK`](#chainreaderk).
 *
 * The `W` suffix (short for **W**idening) means that the environment types will be merged.
 *
 * @category sequencing
 * @since 2.11.0
 */
exports.chainReaderKW = exports.chainReaderK;
/**
 * @category sequencing
 * @since 2.11.0
 */
exports.chainFirstReaderK = 
/*#__PURE__*/ (0, FromReader_1.chainFirstReaderK)(exports.FromReader, exports.Chain);
/**
 * Less strict version of [`chainFirstReaderK`](#chainfirstreaderk).
 *
 * The `W` suffix (short for **W**idening) means that the environment types will be merged.
 *
 * @category sequencing
 * @since 2.11.0
 */
exports.chainFirstReaderKW = exports.chainFirstReaderK;
/**
 * @category lifting
 * @since 2.13.0
 */
var fromReaderIOK = function (f) {
    return function () {
        var a = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            a[_i] = arguments[_i];
        }
        return (0, exports.fromReaderIO)(f.apply(void 0, a));
    };
};
exports.fromReaderIOK = fromReaderIOK;
/**
 * Less strict version of [`chainReaderIOK`](#chainreaderiok).
 *
 * @category sequencing
 * @since 2.13.0
 */
var chainReaderIOKW = function (f) { return (0, exports.chainW)((0, exports.fromReaderIOK)(f)); };
exports.chainReaderIOKW = chainReaderIOKW;
/**
 * @category sequencing
 * @since 2.13.0
 */
exports.chainReaderIOK = exports.chainReaderIOKW;
/**
 * Less strict version of [`chainFirstReaderIOK`](#chainfirstreaderiok).
 *
 * @category sequencing
 * @since 2.13.0
 */
var chainFirstReaderIOKW = function (f) { return (0, exports.chainFirstW)((0, exports.fromReaderIOK)(f)); };
exports.chainFirstReaderIOKW = chainFirstReaderIOKW;
/**
 * @category sequencing
 * @since 2.13.0
 */
exports.chainFirstReaderIOK = exports.chainFirstReaderIOKW;
/**
 * @category instances
 * @since 2.10.0
 */
exports.FromTask = {
    URI: exports.URI,
    fromIO: exports.fromIO,
    fromTask: exports.fromTask
};
/**
 * @category lifting
 * @since 2.4.0
 */
exports.fromTaskK = (0, FromTask_1.fromTaskK)(exports.FromTask);
/**
 * @category sequencing
 * @since 2.4.0
 */
exports.chainTaskK = 
/*#__PURE__*/ (0, FromTask_1.chainTaskK)(exports.FromTask, exports.Chain);
/**
 * @category sequencing
 * @since 2.10.0
 */
exports.chainFirstTaskK = 
/*#__PURE__*/ (0, FromTask_1.chainFirstTaskK)(exports.FromTask, exports.Chain);
// -------------------------------------------------------------------------------------
// do notation
// -------------------------------------------------------------------------------------
/**
 * @category do notation
 * @since 2.9.0
 */
exports.Do = (0, exports.of)(_.emptyRecord);
/**
 * @category do notation
 * @since 2.8.0
 */
exports.bindTo = (0, Functor_1.bindTo)(exports.Functor);
var let_ = /*#__PURE__*/ (0, Functor_1.let)(exports.Functor);
exports.let = let_;
/**
 * @category do notation
 * @since 2.8.0
 */
exports.bind = (0, Chain_1.bind)(exports.Chain);
/**
 * The `W` suffix (short for **W**idening) means that the environment types will be merged.
 *
 * @category do notation
 * @since 2.8.0
 */
exports.bindW = exports.bind;
/**
 * @category do notation
 * @since 2.8.0
 */
exports.apS = (0, Apply_1.apS)(exports.ApplyPar);
/**
 * Less strict version of [`apS`](#aps).
 *
 * The `W` suffix (short for **W**idening) means that the environment types will be merged.
 *
 * @category do notation
 * @since 2.8.0
 */
exports.apSW = exports.apS;
/**
 * @since 2.11.0
 */
exports.ApT = (0, exports.of)(_.emptyReadonlyArray);
// -------------------------------------------------------------------------------------
// array utils
// -------------------------------------------------------------------------------------
/**
 * Equivalent to `ReadonlyNonEmptyArray#traverseWithIndex(Applicative)`.
 *
 * @category traversing
 * @since 2.11.0
 */
var traverseReadonlyNonEmptyArrayWithIndex = function (f) {
    return (0, function_1.flow)(R.traverseReadonlyNonEmptyArrayWithIndex(f), R.map(T.traverseReadonlyNonEmptyArrayWithIndex(function_1.SK)));
};
exports.traverseReadonlyNonEmptyArrayWithIndex = traverseReadonlyNonEmptyArrayWithIndex;
/**
 * Equivalent to `ReadonlyArray#traverseWithIndex(Applicative)`.
 *
 * @category traversing
 * @since 2.11.0
 */
var traverseReadonlyArrayWithIndex = function (f) {
    var g = (0, exports.traverseReadonlyNonEmptyArrayWithIndex)(f);
    return function (as) { return (_.isNonEmpty(as) ? g(as) : exports.ApT); };
};
exports.traverseReadonlyArrayWithIndex = traverseReadonlyArrayWithIndex;
/**
 * Equivalent to `ReadonlyNonEmptyArray#traverseWithIndex(ApplicativeSeq)`.
 *
 * @category traversing
 * @since 2.11.0
 */
var traverseReadonlyNonEmptyArrayWithIndexSeq = function (f) {
    return (0, function_1.flow)(R.traverseReadonlyNonEmptyArrayWithIndex(f), R.map(T.traverseReadonlyNonEmptyArrayWithIndexSeq(function_1.SK)));
};
exports.traverseReadonlyNonEmptyArrayWithIndexSeq = traverseReadonlyNonEmptyArrayWithIndexSeq;
/**
 * Equivalent to `ReadonlyArray#traverseWithIndex(ApplicativeSeq)`.
 *
 * @category traversing
 * @since 2.11.0
 */
var traverseReadonlyArrayWithIndexSeq = function (f) {
    var g = (0, exports.traverseReadonlyNonEmptyArrayWithIndexSeq)(f);
    return function (as) { return (_.isNonEmpty(as) ? g(as) : exports.ApT); };
};
exports.traverseReadonlyArrayWithIndexSeq = traverseReadonlyArrayWithIndexSeq;
/**
 * Equivalent to `ReadonlyArray#traverseWithIndex(Applicative)`.
 *
 * @category traversing
 * @since 2.9.0
 */
exports.traverseArrayWithIndex = exports.traverseReadonlyArrayWithIndex;
/**
 * Equivalent to `ReadonlyArray#traverseWithIndex(Applicative)`.
 *
 * @category traversing
 * @since 2.9.0
 */
var traverseArray = function (f) { return (0, exports.traverseReadonlyArrayWithIndex)(function (_, a) { return f(a); }); };
exports.traverseArray = traverseArray;
/**
 * Equivalent to `ReadonlyArray#sequence(Applicative)`.
 *
 * @category traversing
 * @since 2.9.0
 */
exports.sequenceArray = 
/*#__PURE__*/ (0, exports.traverseArray)(function_1.identity);
/**
 * Equivalent to `ReadonlyArray#traverseWithIndex(ApplicativeSeq)`.
 *
 * @category traversing
 * @since 2.10.0
 */
exports.traverseSeqArrayWithIndex = exports.traverseReadonlyArrayWithIndexSeq;
/**
 * Equivalent to `ReadonlyArray#traverse(ApplicativeSeq)`.
 *
 * @category traversing
 * @since 2.10.0
 */
var traverseSeqArray = function (f) { return (0, exports.traverseReadonlyArrayWithIndexSeq)(function (_, a) { return f(a); }); };
exports.traverseSeqArray = traverseSeqArray;
// -------------------------------------------------------------------------------------
// deprecated
// -------------------------------------------------------------------------------------
/**
 * Use `traverseReadonlyArrayWithIndexSeq` instead.
 *
 * @category zone of death
 * @since 2.10.0
 * @deprecated
 */
exports.sequenceSeqArray = 
/*#__PURE__*/ (0, exports.traverseSeqArray)(function_1.identity);
/**
 * This instance is deprecated, use small, specific instances instead.
 * For example if a function needs a `Functor` instance, pass `RT.Functor` instead of `RT.readerTask`
 * (where `RT` is from `import RT from 'fp-ts/ReaderTask'`)
 *
 * @category zone of death
 * @since 2.3.0
 * @deprecated
 */
exports.readerTask = {
    URI: exports.URI,
    map: _map,
    of: exports.of,
    ap: _apPar,
    chain: _chain,
    fromIO: exports.fromIO,
    fromTask: exports.fromTask
};
/**
 * This instance is deprecated, use small, specific instances instead.
 * For example if a function needs a `Functor` instance, pass `RT.Functor` instead of `RT.readerTaskSeq`
 * (where `RT` is from `import RT from 'fp-ts/ReaderTask'`)
 *
 * @category zone of death
 * @since 2.3.0
 * @deprecated
 */
exports.readerTaskSeq = {
    URI: exports.URI,
    map: _map,
    of: exports.of,
    ap: _apSeq,
    chain: _chain,
    fromIO: exports.fromIO,
    fromTask: exports.fromTask
};
/**
 * Use [`getApplySemigroup`](./Apply.ts.html#getapplysemigroup) instead.
 *
 * @category zone of death
 * @since 2.3.0
 * @deprecated
 */
exports.getSemigroup = 
/*#__PURE__*/ (0, Apply_1.getApplySemigroup)(exports.ApplySeq);
/**
 * Use [`getApplicativeMonoid`](./Applicative.ts.html#getapplicativemonoid) instead.
 *
 * @category zone of death
 * @since 2.3.0
 * @deprecated
 */
exports.getMonoid = 
/*#__PURE__*/ (0, Applicative_1.getApplicativeMonoid)(exports.ApplicativeSeq);
/**
 * @category zone of death
 * @since 2.4.0
 * @deprecated
 */
/* istanbul ignore next */
function run(ma, r) {
    return ma(r)();
}
exports.run = run;
