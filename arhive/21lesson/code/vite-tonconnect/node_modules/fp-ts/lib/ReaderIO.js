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
exports.sequenceArray = exports.traverseArray = exports.traverseArrayWithIndex = exports.traverseReadonlyArrayWithIndex = exports.traverseReadonlyNonEmptyArrayWithIndex = exports.ApT = exports.apSW = exports.apS = exports.bindW = exports.bind = exports.bindTo = exports.Do = exports.chainFirstReaderKW = exports.chainFirstReaderK = exports.chainReaderKW = exports.chainReaderK = exports.fromReaderK = exports.asks = exports.ask = exports.FromReader = exports.chainFirstIOK = exports.chainIOK = exports.fromIOK = exports.FromIO = exports.chainFirstW = exports.chainFirst = exports.MonadIO = exports.Monad = exports.Chain = exports.Applicative = exports.apSecond = exports.apFirst = exports.Apply = exports.Pointed = exports.flap = exports.Functor = exports.URI = exports.flatten = exports.flattenW = exports.chainW = exports.chain = exports.of = exports.apW = exports.ap = exports.map = exports.asksReaderIO = exports.asksReaderIOW = exports.local = exports.fromIO = exports.fromReader = void 0;
var Apply_1 = require("./Apply");
var Chain_1 = require("./Chain");
var FromIO_1 = require("./FromIO");
var FromReader_1 = require("./FromReader");
var function_1 = require("./function");
var Functor_1 = require("./Functor");
var _ = __importStar(require("./internal"));
var I = __importStar(require("./IO"));
var R = __importStar(require("./Reader"));
var RT = __importStar(require("./ReaderT"));
// -------------------------------------------------------------------------------------
// conversions
// -------------------------------------------------------------------------------------
/**
 * @category conversions
 * @since 2.13.0
 */
exports.fromReader = RT.fromReader(I.Pointed);
/**
 * @category conversions
 * @since 2.13.0
 */
exports.fromIO = R.of;
// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------
/**
 * Changes the value of the local context during the execution of the action `ma` (similar to `Contravariant`'s
 * `contramap`).
 *
 * @since 2.13.0
 */
exports.local = R.local;
/**
 * Less strict version of [`asksReaderIO`](#asksreaderio).
 *
 * The `W` suffix (short for **W**idening) means that the environment types will be merged.
 *
 * @category constructors
 * @since 2.13.0
 */
exports.asksReaderIOW = R.asksReaderW;
/**
 * Effectfully accesses the environment.
 *
 * @category constructors
 * @since 2.13.0
 */
exports.asksReaderIO = exports.asksReaderIOW;
var _map = function (fa, f) { return (0, function_1.pipe)(fa, (0, exports.map)(f)); };
var _ap = function (fab, fa) { return (0, function_1.pipe)(fab, (0, exports.ap)(fa)); };
var _chain = function (ma, f) { return (0, function_1.pipe)(ma, (0, exports.chain)(f)); };
/**
 * `map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
 * use the type constructor `F` to represent some computational context.
 *
 * @category mapping
 * @since 2.13.0
 */
exports.map = RT.map(I.Functor);
/**
 * @since 2.13.0
 */
exports.ap = 
/*#__PURE__*/ RT.ap(I.Apply);
/**
 * Less strict version of [`ap`](#ap).
 *
 * The `W` suffix (short for **W**idening) means that the environment types will be merged.
 *
 * @since 2.13.0
 */
exports.apW = exports.ap;
/**
 * @category constructors
 * @since 2.13.0
 */
exports.of = RT.of(I.Pointed);
/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation.
 *
 * @category sequencing
 * @since 2.13.0
 */
exports.chain = 
/*#__PURE__*/ RT.chain(I.Monad);
/**
 * Less strict version of  [`chain`](#chain).
 *
 * The `W` suffix (short for **W**idening) means that the environment types will be merged.
 *
 * @category sequencing
 * @since 2.13.0
 */
exports.chainW = exports.chain;
/**
 * Less strict version of [`flatten`](#flatten).
 *
 * The `W` suffix (short for **W**idening) means that the environment types will be merged.
 *
 * @category sequencing
 * @since 2.13.0
 */
exports.flattenW = 
/*#__PURE__*/ (0, exports.chainW)(function_1.identity);
/**
 * @category sequencing
 * @since 2.13.0
 */
exports.flatten = exports.flattenW;
/**
 * @category type lambdas
 * @since 2.13.0
 */
exports.URI = 'ReaderIO';
/**
 * @category instances
 * @since 2.13.0
 */
exports.Functor = {
    URI: exports.URI,
    map: _map
};
/**
 * @category mapping
 * @since 2.13.0
 */
exports.flap = (0, Functor_1.flap)(exports.Functor);
/**
 * @category instances
 * @since 2.13.0
 */
exports.Pointed = {
    URI: exports.URI,
    of: exports.of
};
/**
 * @category instances
 * @since 2.13.0
 */
exports.Apply = {
    URI: exports.URI,
    map: _map,
    ap: _ap
};
/**
 * Combine two effectful actions, keeping only the result of the first.
 *
 * @since 2.13.0
 */
exports.apFirst = (0, Apply_1.apFirst)(exports.Apply);
/**
 * Combine two effectful actions, keeping only the result of the second.
 *
 * @since 2.13.0
 */
exports.apSecond = (0, Apply_1.apSecond)(exports.Apply);
/**
 * @category instances
 * @since 2.13.0
 */
exports.Applicative = {
    URI: exports.URI,
    map: _map,
    ap: _ap,
    of: exports.of
};
/**
 * @category instances
 * @since 2.13.0
 */
exports.Chain = {
    URI: exports.URI,
    map: _map,
    ap: _ap,
    chain: _chain
};
/**
 * @category instances
 * @since 2.13.0
 */
exports.Monad = {
    URI: exports.URI,
    map: _map,
    of: exports.of,
    ap: _ap,
    chain: _chain
};
/**
 * @category instances
 * @since 2.13.0
 */
exports.MonadIO = {
    URI: exports.URI,
    map: _map,
    of: exports.of,
    ap: _ap,
    chain: _chain,
    fromIO: exports.fromIO
};
/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation and
 * keeping only the result of the first.
 *
 * @category sequencing
 * @since 2.13.0
 */
exports.chainFirst = 
/*#__PURE__*/ (0, Chain_1.chainFirst)(exports.Chain);
/**
 * Less strict version of [`chainFirst`](#chainfirst).
 *
 * The `W` suffix (short for **W**idening) means that the environment types will be merged.
 *
 * @category sequencing
 * @since 2.13.0
 */
exports.chainFirstW = exports.chainFirst;
/**
 * @category instances
 * @since 2.13.0
 */
exports.FromIO = {
    URI: exports.URI,
    fromIO: exports.fromIO
};
/**
 * @category lifting
 * @since 2.13.0
 */
exports.fromIOK = (0, FromIO_1.fromIOK)(exports.FromIO);
/**
 * @category sequencing
 * @since 2.13.0
 */
exports.chainIOK = 
/*#__PURE__*/ (0, FromIO_1.chainIOK)(exports.FromIO, exports.Chain);
/**
 * @category sequencing
 * @since 2.13.0
 */
exports.chainFirstIOK = 
/*#__PURE__*/ (0, FromIO_1.chainFirstIOK)(exports.FromIO, exports.Chain);
/**
 * @category instances
 * @since 2.13.0
 */
exports.FromReader = {
    URI: exports.URI,
    fromReader: exports.fromReader
};
/**
 * Reads the current context.
 *
 * @category constructors
 * @since 2.13.0
 */
exports.ask = (0, FromReader_1.ask)(exports.FromReader);
/**
 * Projects a value from the global context in a `ReaderIO`.
 *
 * @category constructors
 * @since 2.13.0
 */
exports.asks = (0, FromReader_1.asks)(exports.FromReader);
/**
 * @category lifting
 * @since 2.13.0
 */
exports.fromReaderK = (0, FromReader_1.fromReaderK)(exports.FromReader);
/**
 * @category sequencing
 * @since 2.13.0
 */
exports.chainReaderK = 
/*#__PURE__*/ (0, FromReader_1.chainReaderK)(exports.FromReader, exports.Chain);
/**
 * Less strict version of [`chainReaderK`](#chainreaderk).
 *
 * The `W` suffix (short for **W**idening) means that the environment types will be merged.
 *
 * @category sequencing
 * @since 2.13.0
 */
exports.chainReaderKW = exports.chainReaderK;
/**
 * @category sequencing
 * @since 2.13.0
 */
exports.chainFirstReaderK = 
/*#__PURE__*/ (0, FromReader_1.chainFirstReaderK)(exports.FromReader, exports.Chain);
/**
 * Less strict version of [`chainFirstReaderK`](#chainfirstreaderk).
 *
 * The `W` suffix (short for **W**idening) means that the environment types will be merged.
 *
 * @category sequencing
 * @since 2.13.0
 */
exports.chainFirstReaderKW = exports.chainFirstReaderK;
// -------------------------------------------------------------------------------------
// do notation
// -------------------------------------------------------------------------------------
/**
 * @category do notation
 * @since 2.13.0
 */
exports.Do = (0, exports.of)(_.emptyRecord);
/**
 * @category do notation
 * @since 2.13.0
 */
exports.bindTo = (0, Functor_1.bindTo)(exports.Functor);
/**
 * @category do notation
 * @since 2.13.0
 */
exports.bind = (0, Chain_1.bind)(exports.Chain);
/**
 * The `W` suffix (short for **W**idening) means that the environment types will be merged.
 *
 * @category do notation
 * @since 2.13.0
 */
exports.bindW = exports.bind;
/**
 * @category do notation
 * @since 2.13.0
 */
exports.apS = (0, Apply_1.apS)(exports.Apply);
/**
 * Less strict version of [`apS`](#aps).
 *
 * The `W` suffix (short for **W**idening) means that the environment types will be merged.
 *
 * @category do notation
 * @since 2.13.0
 */
exports.apSW = exports.apS;
/**
 * @since 2.13.0
 */
exports.ApT = (0, exports.of)(_.emptyReadonlyArray);
// -------------------------------------------------------------------------------------
// array utils
// -------------------------------------------------------------------------------------
/**
 * Equivalent to `ReadonlyNonEmptyArray#traverseWithIndex(Applicative)`.
 *
 * @category traversing
 * @since 2.13.0
 */
var traverseReadonlyNonEmptyArrayWithIndex = function (f) {
    return (0, function_1.flow)(R.traverseReadonlyNonEmptyArrayWithIndex(f), R.map(I.traverseReadonlyNonEmptyArrayWithIndex(function_1.SK)));
};
exports.traverseReadonlyNonEmptyArrayWithIndex = traverseReadonlyNonEmptyArrayWithIndex;
/**
 * Equivalent to `ReadonlyArray#traverseWithIndex(Applicative)`.
 *
 * @category traversing
 * @since 2.13.0
 */
var traverseReadonlyArrayWithIndex = function (f) {
    var g = (0, exports.traverseReadonlyNonEmptyArrayWithIndex)(f);
    return function (as) { return (_.isNonEmpty(as) ? g(as) : exports.ApT); };
};
exports.traverseReadonlyArrayWithIndex = traverseReadonlyArrayWithIndex;
/**
 * Equivalent to `ReadonlyArray#traverseWithIndex(Applicative)`.
 *
 * @category traversing
 * @since 2.13.0
 */
exports.traverseArrayWithIndex = exports.traverseReadonlyArrayWithIndex;
/**
 * Equivalent to `ReadonlyArray#traverse(Applicative)`.
 *
 * @category traversing
 * @since 2.13.0
 */
var traverseArray = function (f) { return (0, exports.traverseReadonlyArrayWithIndex)(function (_, a) { return f(a); }); };
exports.traverseArray = traverseArray;
/**
 * Equivalent to `ReadonlyArray#sequence(Applicative)`.
 *
 * @category traversing
 * @since 2.13.0
 */
exports.sequenceArray = 
/*#__PURE__*/ (0, exports.traverseArray)(function_1.identity);
