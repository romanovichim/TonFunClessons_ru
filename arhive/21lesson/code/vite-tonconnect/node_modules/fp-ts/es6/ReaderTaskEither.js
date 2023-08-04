import { getApplicativeMonoid } from './Applicative';
import { ap as ap_, apFirst as apFirst_, apS as apS_, apSecond as apSecond_, getApplySemigroup as getApplySemigroup_ } from './Apply';
import { bind as bind_, chainFirst as chainFirst_ } from './Chain';
import { compact as compact_, separate as separate_ } from './Compactable';
import * as E from './Either';
import * as ET from './EitherT';
import { filter as filter_, filterMap as filterMap_, partition as partition_, partitionMap as partitionMap_ } from './Filterable';
import { chainEitherK as chainEitherK_, chainFirstEitherK as chainFirstEitherK_, chainOptionK as chainOptionK_, filterOrElse as filterOrElse_, fromEitherK as fromEitherK_, fromOption as fromOption_, fromOptionK as fromOptionK_, fromPredicate as fromPredicate_ } from './FromEither';
import { chainFirstIOK as chainFirstIOK_, chainIOK as chainIOK_, fromIOK as fromIOK_ } from './FromIO';
import { ask as ask_, asks as asks_, chainFirstReaderK as chainFirstReaderK_, chainReaderK as chainReaderK_, fromReaderK as fromReaderK_ } from './FromReader';
import { chainFirstTaskK as chainFirstTaskK_, chainTaskK as chainTaskK_, fromTaskK as fromTaskK_ } from './FromTask';
import { flow, identity, pipe, SK } from './function';
import { bindTo as bindTo_, flap as flap_, let as let__ } from './Functor';
import * as _ from './internal';
import * as R from './Reader';
import * as RT from './ReaderTask';
import * as T from './Task';
import * as TE from './TaskEither';
// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------
/**
 * @category conversions
 * @since 2.0.0
 */
export var fromTaskEither = /*#__PURE__*/ R.of;
/**
 * @category constructors
 * @since 2.0.0
 */
export var left = /*#__PURE__*/ ET.left(RT.Pointed);
/**
 * @category constructors
 * @since 2.0.0
 */
export var right = /*#__PURE__*/ ET.right(RT.Pointed);
/**
 * @category constructors
 * @since 2.0.0
 */
export var rightTask = /*#__PURE__*/ flow(TE.rightTask, fromTaskEither);
/**
 * @category constructors
 * @since 2.0.0
 */
export var leftTask = /*#__PURE__*/ flow(TE.leftTask, fromTaskEither);
/**
 * @category constructors
 * @since 2.0.0
 */
export var rightReader = function (ma) {
    return flow(ma, TE.right);
};
/**
 * @category constructors
 * @since 2.0.0
 */
export var leftReader = function (me) {
    return flow(me, TE.left);
};
/**
 * @category constructors
 * @since 2.5.0
 */
export var rightReaderTask = 
/*#__PURE__*/ ET.rightF(RT.Functor);
/**
 * @category constructors
 * @since 2.5.0
 */
export var leftReaderTask = 
/*#__PURE__*/ ET.leftF(RT.Functor);
/**
 * @category constructors
 * @since 2.0.0
 */
export var rightIO = /*#__PURE__*/ flow(TE.rightIO, fromTaskEither);
/**
 * @category constructors
 * @since 2.0.0
 */
export var leftIO = /*#__PURE__*/ flow(TE.leftIO, fromTaskEither);
/**
 * @category constructors
 * @since 2.13.0
 */
export var rightReaderIO = /*#__PURE__*/ function (ma) { return flow(ma, TE.rightIO); };
/**
 * @category constructors
 * @since 2.13.0
 */
export var leftReaderIO = /*#__PURE__*/ function (me) { return flow(me, TE.leftIO); };
// -------------------------------------------------------------------------------------
// conversions
// -------------------------------------------------------------------------------------
/**
 * @category conversions
 * @since 2.0.0
 */
export var fromEither = RT.of;
/**
 * @category conversions
 * @since 2.11.0
 */
export var fromReader = rightReader;
/**
 * @category conversions
 * @since 2.0.0
 */
export var fromIO = rightIO;
/**
 * @category conversions
 * @since 2.0.0
 */
export var fromTask = rightTask;
/**
 * @category conversions
 * @since 2.0.0
 */
export var fromIOEither = /*#__PURE__*/ flow(TE.fromIOEither, fromTaskEither);
/**
 * @category conversions
 * @since 2.0.0
 */
export var fromReaderEither = function (ma) {
    return flow(ma, TE.fromEither);
};
/**
 * @category pattern matching
 * @since 2.10.0
 */
export var match = /*#__PURE__*/ ET.match(RT.Functor);
/**
 * Less strict version of [`match`](#match).
 *
 * The `W` suffix (short for **W**idening) means that the handler return types will be merged.
 *
 * @category pattern matching
 * @since 2.10.0
 */
export var matchW = match;
/**
 * The `E` suffix (short for **E**ffect) means that the handlers return an effect (`ReaderTask`).
 *
 * @category pattern matching
 * @since 2.10.0
 */
export var matchE = /*#__PURE__*/ ET.matchE(RT.Chain);
/**
 * Alias of [`matchE`](#matche).
 *
 * @category pattern matching
 * @since 2.0.0
 */
export var fold = matchE;
/**
 * Less strict version of [`matchE`](#matche).
 *
 * The `W` suffix (short for **W**idening) means that the handler return types will be merged.
 *
 * @category pattern matching
 * @since 2.10.0
 */
export var matchEW = matchE;
/**
 * Alias of [`matchEW`](#matchew).
 *
 * @category pattern matching
 * @since 2.10.0
 */
export var foldW = matchEW;
/**
 * @category error handling
 * @since 2.0.0
 */
export var getOrElse = /*#__PURE__*/ ET.getOrElse(RT.Monad);
/**
 * Less strict version of [`getOrElse`](#getorelse).
 *
 * The `W` suffix (short for **W**idening) means that the handler return type will be merged.
 *
 * @category error handling
 * @since 2.6.0
 */
export var getOrElseW = getOrElse;
/**
 * @category conversions
 * @since 2.10.0
 */
export var toUnion = /*#__PURE__*/ ET.toUnion(RT.Functor);
/**
 * @category conversions
 * @since 2.12.0
 */
export var fromNullable = 
/*#__PURE__*/ ET.fromNullable(RT.Pointed);
/**
 * @category lifting
 * @since 2.12.0
 */
export var fromNullableK = /*#__PURE__*/ ET.fromNullableK(RT.Pointed);
/**
 * @category sequencing
 * @since 2.12.0
 */
export var chainNullableK = /*#__PURE__*/ ET.chainNullableK(RT.Monad);
// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------
/**
 * Changes the value of the local context during the execution of the action `ma` (similar to `Contravariant`'s
 * `contramap`).
 *
 * @since 2.0.0
 */
export var local = R.local;
/**
 * Less strict version of [`asksReaderTaskEither`](#asksreadertaskeither).
 *
 * The `W` suffix (short for **W**idening) means that the environment types will be merged.
 *
 * @category constructors
 * @since 2.11.0
 */
export var asksReaderTaskEitherW = R.asksReaderW;
/**
 * Effectfully accesses the environment.
 *
 * @category constructors
 * @since 2.11.0
 */
export var asksReaderTaskEither = asksReaderTaskEitherW;
/**
 * @category error handling
 * @since 2.0.0
 */
export var orElse = /*#__PURE__*/ ET.orElse(RT.Monad);
/**
 * Less strict version of [`orElse`](#orelse).
 *
 * The `W` suffix (short for **W**idening) means that the environment types and the return types will be merged.
 *
 * @category error handling
 * @since 2.10.0
 */
export var orElseW = orElse;
/**
 * @category error handling
 * @since 2.11.0
 */
export var orElseFirst = /*#__PURE__*/ ET.orElseFirst(RT.Monad);
/**
 * The `W` suffix (short for **W**idening) means that the environment types and the return types will be merged.
 *
 * @category error handling
 * @since 2.11.0
 */
export var orElseFirstW = orElseFirst;
/**
 * @category error handling
 * @since 2.11.0
 */
export var orLeft = /*#__PURE__*/ ET.orLeft(RT.Monad);
/**
 * @since 2.0.0
 */
export var swap = /*#__PURE__*/ ET.swap(RT.Functor);
/**
 * @category lifting
 * @since 2.4.0
 */
export var fromIOEitherK = function (f) { return flow(f, fromIOEither); };
/**
 * Less strict version of [`chainIOEitherK`](#chainioeitherk).
 *
 * The `W` suffix (short for **W**idening) means that the environment types and the error types will be merged.
 *
 * @category sequencing
 * @since 2.6.1
 */
export var chainIOEitherKW = function (f) { return chainW(fromIOEitherK(f)); };
/**
 * @category sequencing
 * @since 2.4.0
 */
export var chainIOEitherK = chainIOEitherKW;
/**
 * @category lifting
 * @since 2.4.0
 */
export var fromTaskEitherK = function (f) { return flow(f, fromTaskEither); };
/**
 * Less strict version of [`chainTaskEitherK`](#chaintaskeitherk).
 *
 * The `W` suffix (short for **W**idening) means that the environment types and the error types will be merged.
 *
 * @category sequencing
 * @since 2.6.1
 */
export var chainTaskEitherKW = function (f) { return chainW(fromTaskEitherK(f)); };
/**
 * @category sequencing
 * @since 2.4.0
 */
export var chainTaskEitherK = chainTaskEitherKW;
/**
 * Less strict version of [`chainFirstTaskEitherK`](#chainfirsttaskeitherk).
 *
 * The `W` suffix (short for **W**idening) means that the environment types and the error types will be merged.
 *
 * @category sequencing
 * @since 2.11.0
 */
export var chainFirstTaskEitherKW = function (f) { return chainFirstW(fromTaskEitherK(f)); };
/**
 * @category sequencing
 * @since 2.11.0
 */
export var chainFirstTaskEitherK = chainFirstTaskEitherKW;
/**
 * @category lifting
 * @since 2.11.0
 */
export var fromReaderEitherK = function (f) { return flow(f, fromReaderEither); };
/**
 * Less strict version of [`chainReaderEitherK`](#chainreadereitherk).
 *
 * The `W` suffix (short for **W**idening) means that the environment types and the error types will be merged.
 *
 * @category sequencing
 * @since 2.11.0
 */
export var chainReaderEitherKW = function (f) {
    return chainW(fromReaderEitherK(f));
};
/**
 * @category sequencing
 * @since 2.11.0
 */
export var chainReaderEitherK = chainReaderEitherKW;
/**
 * Less strict version of [`chainFirstReaderEitherK`](#chainfirstreadereitherk).
 *
 * The `W` suffix (short for **W**idening) means that the environment types and the error types will be merged.
 *
 * @category sequencing
 * @since 2.11.0
 */
export var chainFirstReaderEitherKW = function (f) {
    return chainFirstW(fromReaderEitherK(f));
};
/**
 * @category sequencing
 * @since 2.11.0
 */
export var chainFirstReaderEitherK = chainFirstReaderEitherKW;
var _map = function (fa, f) { return pipe(fa, map(f)); };
var _apPar = function (fab, fa) { return pipe(fab, ap(fa)); };
var _apSeq = function (fab, fa) {
    return pipe(fab, chain(function (f) { return pipe(fa, map(f)); }));
};
/* istanbul ignore next */
var _chain = function (ma, f) { return pipe(ma, chain(f)); };
/* istanbul ignore next */
var _alt = function (fa, that) { return pipe(fa, alt(that)); };
/* istanbul ignore next */
var _bimap = function (fa, f, g) { return pipe(fa, bimap(f, g)); };
/* istanbul ignore next */
var _mapLeft = function (fa, f) { return pipe(fa, mapLeft(f)); };
/**
 * `map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
 * use the type constructor `F` to represent some computational context.
 *
 * @category mapping
 * @since 2.0.0
 */
export var map = 
/*#__PURE__*/ ET.map(RT.Functor);
/**
 * Map a pair of functions over the two last type arguments of the bifunctor.
 *
 * @category mapping
 * @since 2.0.0
 */
export var bimap = /*#__PURE__*/ ET.bimap(RT.Functor);
/**
 * Map a function over the second type argument of a bifunctor.
 *
 * @category error handling
 * @since 2.0.0
 */
export var mapLeft = 
/*#__PURE__*/ ET.mapLeft(RT.Functor);
/**
 * @since 2.0.0
 */
export var ap = /*#__PURE__*/ ET.ap(RT.ApplyPar);
/**
 * Less strict version of [`ap`](#ap).
 *
 * The `W` suffix (short for **W**idening) means that the environment types and the error types will be merged.
 *
 * @since 2.8.0
 */
export var apW = ap;
/**
 * @category constructors
 * @since 2.7.0
 */
export var of = right;
/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation.
 *
 * @category sequencing
 * @since 2.0.0
 */
export var chain = /*#__PURE__*/ ET.chain(RT.Monad);
/**
 * Less strict version of [`chain`](#chain).
 *
 * The `W` suffix (short for **W**idening) means that the environment types and the error types will be merged.
 *
 * @category sequencing
 * @since 2.6.0
 */
export var chainW = chain;
/**
 * Less strict version of [`flatten`](#flatten).
 *
 * The `W` suffix (short for **W**idening) means that the environment types and the error types will be merged.
 *
 * @category sequencing
 * @since 2.11.0
 */
export var flattenW = /*#__PURE__*/ chainW(identity);
/**
 * @category sequencing
 * @since 2.0.0
 */
export var flatten = flattenW;
/**
 * Identifies an associative operation on a type constructor. It is similar to `Semigroup`, except that it applies to
 * types of kind `* -> *`.
 *
 * @category error handling
 * @since 2.0.0
 */
export var alt = /*#__PURE__*/ ET.alt(RT.Monad);
/**
 * Less strict version of [`alt`](#alt).
 *
 * The `W` suffix (short for **W**idening) means that the environment, the error and the return types will be merged.
 *
 * @category error handling
 * @since 2.9.0
 */
export var altW = alt;
/**
 * @since 2.0.0
 */
export var throwError = left;
/**
 * @category type lambdas
 * @since 2.0.0
 */
export var URI = 'ReaderTaskEither';
/**
 * @category filtering
 * @since 2.10.0
 */
export var getCompactable = function (M) {
    var C = E.getCompactable(M);
    return {
        URI: URI,
        _E: undefined,
        compact: compact_(RT.Functor, C),
        separate: separate_(RT.Functor, C, E.Functor)
    };
};
/**
 * @category filtering
 * @since 2.10.0
 */
export function getFilterable(M) {
    var F = E.getFilterable(M);
    var C = getCompactable(M);
    var filter = filter_(RT.Functor, F);
    var filterMap = filterMap_(RT.Functor, F);
    var partition = partition_(RT.Functor, F);
    var partitionMap = partitionMap_(RT.Functor, F);
    return {
        URI: URI,
        _E: undefined,
        map: _map,
        compact: C.compact,
        separate: C.separate,
        filter: function (fa, predicate) { return pipe(fa, filter(predicate)); },
        filterMap: function (fa, f) { return pipe(fa, filterMap(f)); },
        partition: function (fa, predicate) { return pipe(fa, partition(predicate)); },
        partitionMap: function (fa, f) { return pipe(fa, partitionMap(f)); }
    };
}
/**
 * The default [`ApplicativePar`](#applicativepar) instance returns the first error, if you want to
 * get all errors you need to provide a way to concatenate them via a `Semigroup`.
 *
 * See [`getApplicativeValidation`](./Either.ts.html#getapplicativevalidation).
 *
 * @category error handling
 * @since 2.7.0
 */
export function getApplicativeReaderTaskValidation(A, S) {
    var ap = ap_(R.Apply, TE.getApplicativeTaskValidation(A, S));
    return {
        URI: URI,
        _E: undefined,
        map: _map,
        ap: function (fab, fa) { return pipe(fab, ap(fa)); },
        of: of
    };
}
/**
 * The default [`Alt`](#alt) instance returns the last error, if you want to
 * get all errors you need to provide a way to concatenate them via a `Semigroup`.
 *
 * See [`getAltValidation`](./Either.ts.html#getaltvalidation).
 *
 * @category error handling
 * @since 2.7.0
 */
export function getAltReaderTaskValidation(S) {
    var alt = ET.altValidation(RT.Monad, S);
    return {
        URI: URI,
        _E: undefined,
        map: _map,
        alt: function (fa, that) { return pipe(fa, alt(that)); }
    };
}
/**
 * @category instances
 * @since 2.7.0
 */
export var Functor = {
    URI: URI,
    map: _map
};
/**
 * @category mapping
 * @since 2.10.0
 */
export var flap = /*#__PURE__*/ flap_(Functor);
/**
 * @category instances
 * @since 2.10.0
 */
export var Pointed = {
    URI: URI,
    of: of
};
/**
 * Runs computations in parallel.
 *
 * @category instances
 * @since 2.10.0
 */
export var ApplyPar = {
    URI: URI,
    map: _map,
    ap: _apPar
};
/**
 * Combine two effectful actions, keeping only the result of the first.
 *
 * @since 2.0.0
 */
export var apFirst = /*#__PURE__*/ apFirst_(ApplyPar);
/**
 * Less strict version of [`apFirst`](#apfirst).
 *
 * The `W` suffix (short for **W**idening) means that the environment types and the error types will be merged.
 *
 * @since 2.12.0
 */
export var apFirstW = apFirst;
/**
 * Combine two effectful actions, keeping only the result of the second.
 *
 * @since 2.0.0
 */
export var apSecond = /*#__PURE__*/ apSecond_(ApplyPar);
/**
 * Less strict version of [`apSecond`](#apsecond).
 *
 * The `W` suffix (short for **W**idening) means that the environment types and the error types will be merged.
 *
 * @since 2.12.0
 */
export var apSecondW = apSecond;
/**
 * Runs computations in parallel.
 *
 * @category instances
 * @since 2.7.0
 */
export var ApplicativePar = {
    URI: URI,
    map: _map,
    ap: _apPar,
    of: of
};
/**
 * Runs computations sequentially.
 *
 * @category instances
 * @since 2.10.0
 */
export var ApplySeq = {
    URI: URI,
    map: _map,
    ap: _apSeq
};
/**
 * Runs computations sequentially.
 *
 * @category instances
 * @since 2.7.0
 */
export var ApplicativeSeq = {
    URI: URI,
    map: _map,
    ap: _apSeq,
    of: of
};
/**
 * @category instances
 * @since 2.10.0
 */
export var Chain = {
    URI: URI,
    map: _map,
    ap: _apPar,
    chain: _chain
};
/**
 * @category instances
 * @since 2.10.0
 */
export var Monad = {
    URI: URI,
    map: _map,
    ap: _apPar,
    chain: _chain,
    of: of
};
/**
 * @category instances
 * @since 2.10.0
 */
export var MonadIO = {
    URI: URI,
    map: _map,
    ap: _apPar,
    chain: _chain,
    of: of,
    fromIO: fromIO
};
/**
 * @category instances
 * @since 2.10.0
 */
export var MonadTask = {
    URI: URI,
    map: _map,
    ap: _apPar,
    chain: _chain,
    of: of,
    fromIO: fromIO,
    fromTask: fromTask
};
/**
 * @category instances
 * @since 2.10.0
 */
export var MonadThrow = {
    URI: URI,
    map: _map,
    ap: _apPar,
    chain: _chain,
    of: of,
    throwError: throwError
};
/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation and
 * keeping only the result of the first.
 *
 * @category sequencing
 * @since 2.0.0
 */
export var chainFirst = /*#__PURE__*/ chainFirst_(Chain);
/**
 * Less strict version of [`chainFirst`](#chainfirst).
 *
 * The `W` suffix (short for **W**idening) means that the environment types and the error types will be merged.
 *
 * @category sequencing
 * @since 2.8.0
 */
export var chainFirstW = chainFirst;
/**
 * @category instances
 * @since 2.7.0
 */
export var Bifunctor = {
    URI: URI,
    bimap: _bimap,
    mapLeft: _mapLeft
};
/**
 * @category instances
 * @since 2.7.0
 */
export var Alt = {
    URI: URI,
    map: _map,
    alt: _alt
};
/**
 * @category instances
 * @since 2.11.0
 */
export var FromReader = {
    URI: URI,
    fromReader: fromReader
};
/**
 * Reads the current context.
 *
 * @category constructors
 * @since 2.0.0
 */
export var ask = /*#__PURE__*/ ask_(FromReader);
/**
 * Projects a value from the global context in a `ReaderEither`.
 *
 * @category constructors
 * @since 2.0.0
 */
export var asks = /*#__PURE__*/ asks_(FromReader);
/**
 * @category lifting
 * @since 2.11.0
 */
export var fromReaderK = /*#__PURE__*/ fromReaderK_(FromReader);
/**
 * @category sequencing
 * @since 2.11.0
 */
export var chainReaderK = /*#__PURE__*/ chainReaderK_(FromReader, Chain);
/**
 * Less strict version of [`chainReaderK`](#chainreaderk).
 *
 * The `W` suffix (short for **W**idening) means that the environment types and the error types will be merged.
 *
 * @category sequencing
 * @since 2.11.0
 */
export var chainReaderKW = chainReaderK;
/**
 * @category sequencing
 * @since 2.11.0
 */
export var chainFirstReaderK = /*#__PURE__*/ chainFirstReaderK_(FromReader, Chain);
/**
 * Less strict version of [`chainFirstReaderK`](#chainfirstreaderk).
 *
 * The `W` suffix (short for **W**idening) means that the environment types and the error types will be merged.
 *
 * @category sequencing
 * @since 2.11.0
 */
export var chainFirstReaderKW = chainFirstReaderK;
/**
 * @category lifting
 * @since 2.11.0
 */
export var fromReaderTaskK = function (f) {
    return function () {
        var a = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            a[_i] = arguments[_i];
        }
        return rightReaderTask(f.apply(void 0, a));
    };
};
/**
 * Less strict version of [`chainReaderTaskK`](#chainreadertaskk).
 *
 * The `W` suffix (short for **W**idening) means that the environment types and the error types will be merged.
 *
 * @category sequencing
 * @since 2.11.0
 */
export var chainReaderTaskKW = function (f) { return chainW(fromReaderTaskK(f)); };
/**
 * @category sequencing
 * @since 2.11.0
 */
export var chainReaderTaskK = chainReaderTaskKW;
/**
 * Less strict version of [`chainFirstReaderTaskK`](#chainfirstreadertaskk).
 *
 * The `W` suffix (short for **W**idening) means that the environment types and the error types will be merged.
 *
 * @category sequencing
 * @since 2.11.0
 */
export var chainFirstReaderTaskKW = function (f) { return chainFirstW(fromReaderTaskK(f)); };
/**
 * @category sequencing
 * @since 2.11.0
 */
export var chainFirstReaderTaskK = chainFirstReaderTaskKW;
/**
 * @category lifting
 * @since 2.13.0
 */
export var fromReaderIOK = function (f) {
    return function () {
        var a = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            a[_i] = arguments[_i];
        }
        return rightReaderIO(f.apply(void 0, a));
    };
};
/**
 * Less strict version of [`chainReaderIOK`](#chainreaderiok).
 *
 * @category sequencing
 * @since 2.13.0
 */
export var chainReaderIOKW = function (f) { return chainW(fromReaderIOK(f)); };
/**
 * @category sequencing
 * @since 2.13.0
 */
export var chainReaderIOK = chainReaderIOKW;
/**
 * Less strict version of [`chainFirstReaderIOK`](#chainfirstreaderiok).
 *
 * @category sequencing
 * @since 2.13.0
 */
export var chainFirstReaderIOKW = function (f) { return chainFirstW(fromReaderIOK(f)); };
/**
 * @category sequencing
 * @since 2.13.0
 */
export var chainFirstReaderIOK = chainFirstReaderIOKW;
/**
 * @category instances
 * @since 2.10.0
 */
export var FromEither = {
    URI: URI,
    fromEither: fromEither
};
/**
 * @category conversions
 * @since 2.0.0
 */
export var fromOption = 
/*#__PURE__*/ fromOption_(FromEither);
/**
 * @category lifting
 * @since 2.10.0
 */
export var fromOptionK = /*#__PURE__*/ fromOptionK_(FromEither);
/**
 * @category sequencing
 * @since 2.10.0
 */
export var chainOptionK = 
/*#__PURE__*/ chainOptionK_(FromEither, Chain);
/**
 * @category sequencing
 * @since 2.4.0
 */
export var chainEitherK = /*#__PURE__*/ chainEitherK_(FromEither, Chain);
/**
 * Less strict version of [`chainEitherK`](#chaineitherk).
 *
 * The `W` suffix (short for **W**idening) means that the environment types and the error types will be merged.
 *
 * @category sequencing
 * @since 2.6.1
 */
export var chainEitherKW = chainEitherK;
/**
 * @category sequencing
 * @since 2.12.0
 */
export var chainFirstEitherK = /*#__PURE__*/ chainFirstEitherK_(FromEither, Chain);
/**
 * Less strict version of [`chainFirstEitherK`](#chainfirsteitherk).
 *
 * The `W` suffix (short for **W**idening) means that the environment types and the error types will be merged.
 *
 * @category sequencing
 * @since 2.12.0
 */
export var chainFirstEitherKW = chainFirstEitherK;
/**
 * @category lifting
 * @since 2.0.0
 */
export var fromPredicate = /*#__PURE__*/ fromPredicate_(FromEither);
/**
 * @category filtering
 * @since 2.0.0
 */
export var filterOrElse = /*#__PURE__*/ filterOrElse_(FromEither, Chain);
/**
 * Less strict version of [`filterOrElse`](#filterorelse).
 *
 * The `W` suffix (short for **W**idening) means that the error types will be merged.
 *
 * @category filtering
 * @since 2.9.0
 */
export var filterOrElseW = filterOrElse;
/**
 * @category lifting
 * @since 2.4.0
 */
export var fromEitherK = /*#__PURE__*/ fromEitherK_(FromEither);
/**
 * @category instances
 * @since 2.10.0
 */
export var FromIO = {
    URI: URI,
    fromIO: fromIO
};
/**
 * @category lifting
 * @since 2.10.0
 */
export var fromIOK = /*#__PURE__*/ fromIOK_(FromIO);
/**
 * @category sequencing
 * @since 2.10.0
 */
export var chainIOK = /*#__PURE__*/ chainIOK_(FromIO, Chain);
/**
 * @category sequencing
 * @since 2.10.0
 */
export var chainFirstIOK = /*#__PURE__*/ chainFirstIOK_(FromIO, Chain);
/**
 * @category instances
 * @since 2.10.0
 */
export var FromTask = {
    URI: URI,
    fromIO: fromIO,
    fromTask: fromTask
};
/**
 * @category lifting
 * @since 2.10.0
 */
export var fromTaskK = /*#__PURE__*/ fromTaskK_(FromTask);
/**
 * @category sequencing
 * @since 2.10.0
 */
export var chainTaskK = /*#__PURE__*/ chainTaskK_(FromTask, Chain);
/**
 * @category sequencing
 * @since 2.10.0
 */
export var chainFirstTaskK = /*#__PURE__*/ chainFirstTaskK_(FromTask, Chain);
// -------------------------------------------------------------------------------------
// utils
// -------------------------------------------------------------------------------------
/**
 * Make sure that a resource is cleaned up in the event of an exception (\*). The release action is called regardless of
 * whether the body action throws (\*) or returns.
 *
 * (\*) i.e. returns a `Left`
 *
 * @since 2.0.4
 */
export function bracket(acquire, use, release) {
    return bracketW(acquire, use, release);
}
/**
 * Less strict version of [`bracket`](#bracket).
 *
 * @since 2.12.0
 */
export function bracketW(acquire, use, release) {
    return function (r) {
        return TE.bracketW(acquire(r), function (a) { return use(a)(r); }, function (a, e) { return release(a, e)(r); });
    };
}
// -------------------------------------------------------------------------------------
// do notation
// -------------------------------------------------------------------------------------
/**
 * @category do notation
 * @since 2.9.0
 */
export var Do = /*#__PURE__*/ of(_.emptyRecord);
/**
 * @category do notation
 * @since 2.8.0
 */
export var bindTo = /*#__PURE__*/ bindTo_(Functor);
var let_ = /*#__PURE__*/ let__(Functor);
export { 
/**
 * @category do notation
 * @since 2.13.0
 */
let_ as let };
/**
 * @category do notation
 * @since 2.8.0
 */
export var bind = /*#__PURE__*/ bind_(Chain);
/**
 * The `W` suffix (short for **W**idening) means that the environment types and the error types will be merged.
 *
 * @category do notation
 * @since 2.8.0
 */
export var bindW = bind;
/**
 * @category do notation
 * @since 2.8.0
 */
export var apS = /*#__PURE__*/ apS_(ApplyPar);
/**
 * Less strict version of [`apS`](#aps).
 *
 * The `W` suffix (short for **W**idening) means that the environment types and the error types will be merged.
 *
 * @category do notation
 * @since 2.8.0
 */
export var apSW = apS;
/**
 * @since 2.11.0
 */
export var ApT = /*#__PURE__*/ of(_.emptyReadonlyArray);
// -------------------------------------------------------------------------------------
// array utils
// -------------------------------------------------------------------------------------
/**
 * Equivalent to `ReadonlyNonEmptyArray#traverseWithIndex(ApplicativePar)`.
 *
 * @category traversing
 * @since 2.11.0
 */
export var traverseReadonlyNonEmptyArrayWithIndex = function (f) {
    return flow(R.traverseReadonlyNonEmptyArrayWithIndex(f), R.map(TE.traverseReadonlyNonEmptyArrayWithIndex(SK)));
};
/**
 * Equivalent to `ReadonlyArray#traverseWithIndex(ApplicativePar)`.
 *
 * @category traversing
 * @since 2.11.0
 */
export var traverseReadonlyArrayWithIndex = function (f) {
    var g = traverseReadonlyNonEmptyArrayWithIndex(f);
    return function (as) { return (_.isNonEmpty(as) ? g(as) : ApT); };
};
/**
 * Equivalent to `ReadonlyNonEmptyArray#traverseWithIndex(ApplicativeSeq)`.
 *
 * @category traversing
 * @since 2.11.0
 */
export var traverseReadonlyNonEmptyArrayWithIndexSeq = function (f) {
    return flow(R.traverseReadonlyNonEmptyArrayWithIndex(f), R.map(TE.traverseReadonlyNonEmptyArrayWithIndexSeq(SK)));
};
/**
 * Equivalent to `ReadonlyArray#traverseWithIndex(ApplicativeSeq)`.
 *
 * @category traversing
 * @since 2.11.0
 */
export var traverseReadonlyArrayWithIndexSeq = function (f) {
    var g = traverseReadonlyNonEmptyArrayWithIndexSeq(f);
    return function (as) { return (_.isNonEmpty(as) ? g(as) : ApT); };
};
/**
 * Equivalent to `ReadonlyArray#traverseWithIndex(Applicative)`.
 *
 * @category traversing
 * @since 2.9.0
 */
export var traverseArrayWithIndex = traverseReadonlyArrayWithIndex;
/**
 * Equivalent to `ReadonlyArray#traverse(Applicative)`.
 *
 * @category traversing
 * @since 2.9.0
 */
export var traverseArray = function (f) {
    return traverseReadonlyArrayWithIndex(function (_, a) { return f(a); });
};
/**
 * Equivalent to `ReadonlyArray#sequence(Applicative)`.
 *
 * @category traversing
 * @since 2.9.0
 */
export var sequenceArray = /*#__PURE__*/ traverseArray(identity);
/**
 * Equivalent to `ReadonlyArray#traverseWithIndex(ApplicativeSeq)`.
 *
 * @category traversing
 * @since 2.9.0
 */
export var traverseSeqArrayWithIndex = traverseReadonlyArrayWithIndexSeq;
/**
 * Equivalent to `ReadonlyArray#traverse(ApplicativeSeq)`.
 *
 * @category traversing
 * @since 2.9.0
 */
export var traverseSeqArray = function (f) {
    return traverseReadonlyArrayWithIndexSeq(function (_, a) { return f(a); });
};
/**
 * Equivalent to `ReadonlyArray#sequence(ApplicativeSeq)`.
 *
 * @category traversing
 * @since 2.9.0
 */
export var sequenceSeqArray = /*#__PURE__*/ traverseSeqArray(identity);
// -------------------------------------------------------------------------------------
// deprecated
// -------------------------------------------------------------------------------------
/**
 * This instance is deprecated, use small, specific instances instead.
 * For example if a function needs a `Functor` instance, pass `RTE.Functor` instead of `RTE.readerTaskEither`
 * (where `RTE` is from `import RTE from 'fp-ts/ReaderTaskEither'`)
 *
 * @category zone of death
 * @since 2.0.0
 * @deprecated
 */
export var readerTaskEither = {
    URI: URI,
    map: _map,
    of: of,
    ap: _apPar,
    chain: _chain,
    alt: _alt,
    bimap: _bimap,
    mapLeft: _mapLeft,
    fromIO: fromIO,
    fromTask: fromTask,
    throwError: throwError
};
/**
 * This instance is deprecated, use small, specific instances instead.
 * For example if a function needs a `Functor` instance, pass `RTE.Functor` instead of `RTE.readerTaskEitherSeq`
 * (where `RTE` is from `import RTE from 'fp-ts/ReaderTaskEither'`)
 *
 * @category zone of death
 * @since 2.0.0
 * @deprecated
 */
export var readerTaskEitherSeq = {
    URI: URI,
    map: _map,
    of: of,
    ap: _apSeq,
    chain: _chain,
    alt: _alt,
    bimap: _bimap,
    mapLeft: _mapLeft,
    fromIO: fromIO,
    fromTask: fromTask,
    throwError: throwError
};
/**
 * Use [`getApplySemigroup`](./Apply.ts.html#getapplysemigroup) instead.
 *
 * Semigroup returning the left-most `Left` value. If both operands are `Right`s then the inner values
 * are concatenated using the provided `Semigroup`
 *
 * @category zone of death
 * @since 2.0.0
 * @deprecated
 */
export var getApplySemigroup = 
/*#__PURE__*/ getApplySemigroup_(ApplySeq);
/**
 * Use [`getApplicativeMonoid`](./Applicative.ts.html#getapplicativemonoid) instead.
 *
 * @category zone of death
 * @since 2.0.0
 * @deprecated
 */
export var getApplyMonoid = 
/*#__PURE__*/ getApplicativeMonoid(ApplicativeSeq);
/**
 * Use [`getApplySemigroup`](./Apply.ts.html#getapplysemigroup) instead.
 *
 * @category zone of death
 * @since 2.0.0
 * @deprecated
 */
export var getSemigroup = function (S) {
    return getApplySemigroup_(RT.ApplySeq)(E.getSemigroup(S));
};
/**
 * Use [`getApplicativeReaderTaskValidation`](#getapplicativereadertaskvalidation) and [`getAltReaderTaskValidation`](#getaltreadertaskvalidation) instead.
 *
 * @category instances
 * @since 2.3.0
 * @deprecated
 */
export function getReaderTaskValidation(SE) {
    var applicativeReaderTaskValidation = getApplicativeReaderTaskValidation(T.ApplicativePar, SE);
    var altReaderTaskValidation = getAltReaderTaskValidation(SE);
    return {
        URI: URI,
        _E: undefined,
        map: _map,
        of: of,
        chain: _chain,
        bimap: _bimap,
        mapLeft: _mapLeft,
        ap: applicativeReaderTaskValidation.ap,
        alt: altReaderTaskValidation.alt,
        fromIO: fromIO,
        fromTask: fromTask,
        throwError: throwError
    };
}
/**
 * @category zone of death
 * @since 2.0.0
 * @deprecated
 */
/* istanbul ignore next */
export function run(ma, r) {
    return ma(r)();
}
