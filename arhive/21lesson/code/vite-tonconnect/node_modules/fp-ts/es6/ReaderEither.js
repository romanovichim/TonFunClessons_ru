import { getApplicativeMonoid } from './Applicative';
import { ap as ap_, apFirst as apFirst_, apS as apS_, apSecond as apSecond_, getApplySemigroup as getApplySemigroup_ } from './Apply';
import { bind as bind_, chainFirst as chainFirst_ } from './Chain';
import { compact as compact_, separate as separate_ } from './Compactable';
import * as E from './Either';
import * as ET from './EitherT';
import { filter as filter_, filterMap as filterMap_, partition as partition_, partitionMap as partitionMap_ } from './Filterable';
import { chainEitherK as chainEitherK_, chainOptionK as chainOptionK_, filterOrElse as filterOrElse_, fromEitherK as fromEitherK_, fromOption as fromOption_, fromOptionK as fromOptionK_, fromPredicate as fromPredicate_, chainFirstEitherK as chainFirstEitherK_ } from './FromEither';
import { ask as ask_, asks as asks_, chainFirstReaderK as chainFirstReaderK_, chainReaderK as chainReaderK_, fromReaderK as fromReaderK_ } from './FromReader';
import { flow, identity, pipe, SK } from './function';
import { let as let__, bindTo as bindTo_, flap as flap_ } from './Functor';
import * as _ from './internal';
import * as R from './Reader';
// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------
/**
 * @category constructors
 * @since 2.0.0
 */
export var left = /*#__PURE__*/ ET.left(R.Pointed);
/**
 * @category constructors
 * @since 2.0.0
 */
export var right = /*#__PURE__*/ ET.right(R.Pointed);
/**
 * @category constructors
 * @since 2.0.0
 */
export var rightReader = 
/*#__PURE__*/ ET.rightF(R.Functor);
/**
 * @category constructors
 * @since 2.0.0
 */
export var leftReader = /*#__PURE__*/ ET.leftF(R.Functor);
// -------------------------------------------------------------------------------------
// conversions
// -------------------------------------------------------------------------------------
/**
 * @category conversions
 * @since 2.0.0
 */
export var fromEither = R.of;
/**
 * @category conversions
 * @since 2.11.0
 */
export var fromReader = rightReader;
/**
 * @category pattern matching
 * @since 2.10.0
 */
export var match = /*#__PURE__*/ ET.match(R.Functor);
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
 * The `E` suffix (short for **E**ffect) means that the handlers return an effect (`Reader`).
 *
 * @category pattern matching
 * @since 2.10.0
 */
export var matchE = /*#__PURE__*/ ET.matchE(R.Monad);
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
export var getOrElse = 
/*#__PURE__*/ ET.getOrElse(R.Monad);
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
export var toUnion = /*#__PURE__*/ ET.toUnion(R.Functor);
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
 * Less strict version of [`asksReaderEither`](#asksreadereither).
 *
 * The `W` suffix (short for **W**idening) means that the environment types will be merged.
 *
 * @category constructors
 * @since 2.11.0
 */
export var asksReaderEitherW = R.asksReaderW;
/**
 * Effectfully accesses the environment.
 *
 * @category constructors
 * @since 2.11.0
 */
export var asksReaderEither = asksReaderEitherW;
/**
 * @category error handling
 * @since 2.0.0
 */
export var orElse = /*#__PURE__*/ ET.orElse(R.Monad);
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
export var orElseFirst = /*#__PURE__*/ ET.orElseFirst(R.Monad);
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
export var orLeft = /*#__PURE__*/ ET.orLeft(R.Monad);
/**
 * @since 2.0.0
 */
export var swap = /*#__PURE__*/ ET.swap(R.Functor);
/* istanbul ignore next */
var _map = function (fa, f) { return pipe(fa, map(f)); };
/* istanbul ignore next */
var _bimap = function (fa, f, g) { return pipe(fa, bimap(f, g)); };
/* istanbul ignore next */
var _mapLeft = function (fa, f) { return pipe(fa, mapLeft(f)); };
/* istanbul ignore next */
var _ap = function (fab, fa) { return pipe(fab, ap(fa)); };
/* istanbul ignore next */
var _chain = function (ma, f) { return pipe(ma, chain(f)); };
/* istanbul ignore next */
var _alt = function (fa, that) { return pipe(fa, alt(that)); };
/**
 * `map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
 * use the type constructor `F` to represent some computational context.
 *
 * @category mapping
 * @since 2.0.0
 */
export var map = 
/*#__PURE__*/ ET.map(R.Functor);
/**
 * Map a pair of functions over the two last type arguments of the bifunctor.
 *
 * @category mapping
 * @since 2.0.0
 */
export var bimap = /*#__PURE__*/ ET.bimap(R.Functor);
/**
 * Map a function over the second type argument of a bifunctor.
 *
 * @category error handling
 * @since 2.0.0
 */
export var mapLeft = 
/*#__PURE__*/ ET.mapLeft(R.Functor);
/**
 * @since 2.0.0
 */
export var ap = /*#__PURE__*/ ET.ap(R.Apply);
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
 * @since 2.8.5
 */
export var of = right;
/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation.
 *
 * @category sequencing
 * @since 2.0.0
 */
export var chain = /*#__PURE__*/ ET.chain(R.Monad);
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
export var alt = 
/*#__PURE__*/ ET.alt(R.Monad);
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
 * @since 2.7.0
 */
export var throwError = left;
/**
 * @category type lambdas
 * @since 2.0.0
 */
export var URI = 'ReaderEither';
/**
 * @category filtering
 * @since 2.10.0
 */
export var getCompactable = function (M) {
    var C = E.getCompactable(M);
    return {
        URI: URI,
        _E: undefined,
        compact: compact_(R.Functor, C),
        separate: separate_(R.Functor, C, E.Functor)
    };
};
/**
 * @category filtering
 * @since 2.10.0
 */
export function getFilterable(M) {
    var F = E.getFilterable(M);
    var C = getCompactable(M);
    var filter = filter_(R.Functor, F);
    var filterMap = filterMap_(R.Functor, F);
    var partition = partition_(R.Functor, F);
    var partitionMap = partitionMap_(R.Functor, F);
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
 * The default [`Applicative`](#applicative) instance returns the first error, if you want to
 * get all errors you need to provide a way to concatenate them via a `Semigroup`.
 *
 * See [`getApplicativeValidation`](./Either.ts.html#getapplicativevalidation).
 *
 * @category error handling
 * @since 2.7.0
 */
export function getApplicativeReaderValidation(S) {
    var ap = ap_(R.Apply, E.getApplicativeValidation(S));
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
export function getAltReaderValidation(S) {
    var alt = ET.altValidation(R.Monad, S);
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
 * @category instances
 * @since 2.10.0
 */
export var Apply = {
    URI: URI,
    map: _map,
    ap: _ap
};
/**
 * Combine two effectful actions, keeping only the result of the first.
 *
 * @since 2.0.0
 */
export var apFirst = /*#__PURE__*/ apFirst_(Apply);
/**
 * Less strict version of [`apFirst`](#apfirst)
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
export var apSecond = /*#__PURE__*/ apSecond_(Apply);
/**
 * Less strict version of [`apSecond`](#apsecond)
 *
 * The `W` suffix (short for **W**idening) means that the environment types and the error types will be merged.
 *
 * @since 2.12.0
 */
export var apSecondW = apSecond;
/**
 * @category instances
 * @since 2.7.0
 */
export var Applicative = {
    URI: URI,
    map: _map,
    ap: _ap,
    of: of
};
/**
 * @category instances
 * @since 2.10.0
 */
export var Chain = {
    URI: URI,
    map: _map,
    ap: _ap,
    chain: _chain
};
/**
 * @category instances
 * @since 2.7.0
 */
export var Monad = {
    URI: URI,
    map: _map,
    ap: _ap,
    of: of,
    chain: _chain
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
 * Less strict version of [`chainFirst`](#chainfirst)
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
 * The `W` suffix (short for **W**idening) means that the environment types will be merged.
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
 * Less strict version of [`chainReaderK`](#chainreaderk).
 *
 * The `W` suffix (short for **W**idening) means that the environment types will be merged.
 *
 * @category sequencing
 * @since 2.11.0
 */
export var chainFirstReaderKW = chainFirstReaderK;
/**
 * @category instances
 * @since 2.7.0
 */
export var MonadThrow = {
    URI: URI,
    map: _map,
    ap: _ap,
    of: of,
    chain: _chain,
    throwError: throwError
};
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
 * The `W` suffix (short for **W**idening) means that the error types will be merged.
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
 * The `W` suffix (short for **W**idening) means that the environment types will be merged.
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
export var apS = /*#__PURE__*/ apS_(Apply);
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
 * Equivalent to `ReadonlyNonEmptyArray#traverseWithIndex(Applicative)`.
 *
 * @category traversing
 * @since 2.11.0
 */
export var traverseReadonlyNonEmptyArrayWithIndex = function (f) {
    return flow(R.traverseReadonlyNonEmptyArrayWithIndex(f), R.map(E.traverseReadonlyNonEmptyArrayWithIndex(SK)));
};
/**
 * Equivalent to `ReadonlyArray#traverseWithIndex(Applicative)`.
 *
 * @category traversing
 * @since 2.11.0
 */
export var traverseReadonlyArrayWithIndex = function (f) {
    var g = traverseReadonlyNonEmptyArrayWithIndex(f);
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
export var traverseArray = function (f) { return traverseReadonlyArrayWithIndex(function (_, a) { return f(a); }); };
/**
 * Equivalent to `ReadonlyArray#sequence(Applicative)`.
 *
 * @category traversing
 * @since 2.9.0
 */
export var sequenceArray = /*#__PURE__*/ traverseArray(identity);
// -------------------------------------------------------------------------------------
// deprecated
// -------------------------------------------------------------------------------------
/**
 * This instance is deprecated, use small, specific instances instead.
 * For example if a function needs a `Functor` instance, pass `RE.Functor` instead of `RE.readerEither`
 * (where `R` is from `import R from 'fp-ts/ReaderEither'`)
 *
 * @category zone of death
 * @since 2.0.0
 * @deprecated
 */
export var readerEither = {
    URI: URI,
    bimap: _bimap,
    mapLeft: _mapLeft,
    map: _map,
    of: of,
    ap: _ap,
    chain: _chain,
    alt: _alt,
    throwError: left
};
/**
 * Use [`getApplySemigroup`](./Apply.ts.html#getapplysemigroup) instead.
 *
 * @category zone of death
 * @since 2.0.0
 * @deprecated
 */
export var getApplySemigroup = 
/*#__PURE__*/ getApplySemigroup_(Apply);
/**
 * Use [`getApplicativeMonoid`](./Applicative.ts.html#getapplicativemonoid) instead.
 *
 * @category zone of death
 * @since 2.0.0
 * @deprecated
 */
export var getApplyMonoid = 
/*#__PURE__*/ getApplicativeMonoid(Applicative);
/**
 * Use [`getApplySemigroup`](./Apply.ts.html#getapplysemigroup) instead.
 *
 * @category zone of death
 * @since 2.0.0
 * @deprecated
 */
export var getSemigroup = function (S) {
    return getApplySemigroup_(R.Apply)(E.getSemigroup(S));
};
/**
 * Use [`getApplicativeReaderValidation`](#getapplicativereadervalidation) and [`getAltReaderValidation`](#getaltreadervalidation) instead.
 *
 * @category zone of death
 * @since 2.3.0
 * @deprecated
 */
export function getReaderValidation(SE) {
    var applicativeReaderValidation = getApplicativeReaderValidation(SE);
    var altReaderValidation = getAltReaderValidation(SE);
    return {
        URI: URI,
        _E: undefined,
        map: _map,
        ap: applicativeReaderValidation.ap,
        of: of,
        chain: _chain,
        bimap: _bimap,
        mapLeft: _mapLeft,
        alt: altReaderValidation.alt,
        throwError: throwError
    };
}
