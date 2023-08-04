import { apFirst as apFirst_, apS as apS_, apSecond as apSecond_ } from './Apply';
import { bind as bind_, chainFirst as chainFirst_ } from './Chain';
import { compact as compact_, separate as separate_ } from './Compactable';
import { filter as filter_, filterMap as filterMap_, partition as partition_, partitionMap as partitionMap_ } from './Filterable';
import { chainEitherK as chainEitherK_, chainFirstEitherK as chainFirstEitherK_, fromEitherK as fromEitherK_ } from './FromEither';
import { chainFirstIOK as chainFirstIOK_, chainIOK as chainIOK_, fromIOK as fromIOK_ } from './FromIO';
import { flow, identity, pipe, SK } from './function';
import { let as let__, bindTo as bindTo_, flap as flap_ } from './Functor';
import * as _ from './internal';
import * as O from './Option';
import * as OT from './OptionT';
import * as I from './IO';
import { guard as guard_ } from './Zero';
// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------
/**
 * @category constructors
 * @since 2.12.0
 */
export var some = /*#__PURE__*/ OT.some(I.Pointed);
/**
 * @category lifting
 * @since 2.12.0
 */
export var fromPredicate = /*#__PURE__*/ OT.fromPredicate(I.Pointed);
// -------------------------------------------------------------------------------------
// conversions
// -------------------------------------------------------------------------------------
/**
 * @category conversions
 * @since 2.12.0
 */
export var fromOption = I.of;
/**
 * @category conversions
 * @since 2.12.0
 */
export var fromEither = /*#__PURE__*/ OT.fromEither(I.Pointed);
/**
 * @category conversions
 * @since 2.12.0
 */
export var fromIO = /*#__PURE__*/ OT.fromF(I.Functor);
/**
 * @category conversions
 * @since 2.12.0
 */
export var fromIOEither = /*#__PURE__*/ I.map(O.fromEither);
/**
 * @category pattern matching
 * @since 2.12.0
 */
export var match = /*#__PURE__*/ OT.match(I.Functor);
/**
 * Less strict version of [`match`](#match).
 *
 * The `W` suffix (short for **W**idening) means that the handler return types will be merged.
 *
 * @category pattern matching
 * @since 2.12.0
 */
export var matchW = match;
/**
 * The `E` suffix (short for **E**ffect) means that the handlers return an effect (`IO`).
 *
 * @category pattern matching
 * @since 2.12.0
 */
export var matchE = 
/*#__PURE__*/ OT.matchE(I.Chain);
/**
 * Alias of [`matchE`](#matche).
 *
 * @category pattern matching
 * @since 2.12.0
 */
export var fold = matchE;
/**
 * Less strict version of [`matchE`](#matche).
 *
 * The `W` suffix (short for **W**idening) means that the handler return types will be merged.
 *
 * @category pattern matching
 * @since 2.12.0
 */
export var matchEW = matchE;
/**
 * @category error handling
 * @since 2.12.0
 */
export var getOrElse = /*#__PURE__*/ OT.getOrElse(I.Monad);
/**
 * Less strict version of [`getOrElse`](#getorelse).
 *
 * The `W` suffix (short for **W**idening) means that the handler return type will be merged.
 *
 * @category error handling
 * @since 2.12.0
 */
export var getOrElseW = getOrElse;
/**
 * @category conversions
 * @since 2.12.0
 */
export var toUndefined = I.map(O.toUndefined);
/**
 * @category conversions
 * @since 2.12.0
 */
export var toNullable = I.map(O.toNullable);
/**
 * @category conversions
 * @since 2.12.0
 */
export var fromNullable = /*#__PURE__*/ OT.fromNullable(I.Pointed);
/**
 * @category lifting
 * @since 2.12.0
 */
export var fromNullableK = /*#__PURE__*/ OT.fromNullableK(I.Pointed);
/**
 * @category sequencing
 * @since 2.12.0
 */
export var chainNullableK = /*#__PURE__*/ OT.chainNullableK(I.Monad);
// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------
/**
 * @category lifting
 * @since 2.12.0
 */
export var fromOptionK = 
/*#__PURE__*/ OT.fromOptionK(I.Pointed);
/**
 * @category sequencing
 * @since 2.12.0
 */
export var chainOptionK = 
/*#__PURE__*/ OT.chainOptionK(I.Monad);
/**
 * `map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
 * use the type constructor `F` to represent some computational context.
 *
 * @category mapping
 * @since 2.12.0
 */
export var map = /*#__PURE__*/ OT.map(I.Functor);
/**
 * @since 2.12.0
 */
export var ap = /*#__PURE__*/ OT.ap(I.Apply);
/**
 * @category constructors
 * @since 2.12.0
 */
export var of = some;
/**
 * @category sequencing
 * @since 2.12.0
 */
export var chain = /*#__PURE__*/ OT.chain(I.Monad);
/**
 * @category sequencing
 * @since 2.12.0
 */
export var flatten = /*#__PURE__*/ chain(identity);
/**
 * @category error handling
 * @since 2.12.0
 */
export var alt = /*#__PURE__*/ OT.alt(I.Monad);
/**
 * Less strict version of [`alt`](#alt).
 *
 * The `W` suffix (short for **W**idening) means that the return types will be merged.
 *
 * @category error handling
 * @since 2.12.0
 */
export var altW = alt;
/**
 * @since 2.12.0
 */
export var zero = /*#__PURE__*/ OT.zero(I.Pointed);
/**
 * @category constructors
 * @since 2.12.0
 */
export var none = /*#__PURE__*/ zero();
/**
 * @category filtering
 * @since 2.12.0
 */
export var compact = /*#__PURE__*/ compact_(I.Functor, O.Compactable);
/**
 * @category filtering
 * @since 2.12.0
 */
export var separate = /*#__PURE__*/ separate_(I.Functor, O.Compactable, O.Functor);
/**
 * @category filtering
 * @since 2.12.0
 */
export var filter = /*#__PURE__*/ filter_(I.Functor, O.Filterable);
/**
 * @category filtering
 * @since 2.12.0
 */
export var filterMap = /*#__PURE__*/ filterMap_(I.Functor, O.Filterable);
/**
 * @category filtering
 * @since 2.12.0
 */
export var partition = /*#__PURE__*/ partition_(I.Functor, O.Filterable);
/**
 * @category filtering
 * @since 2.12.0
 */
export var partitionMap = /*#__PURE__*/ partitionMap_(I.Functor, O.Filterable);
// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------
var _map = function (fa, f) { return pipe(fa, map(f)); };
/* istanbul ignore next */
var _ap = function (fab, fa) { return pipe(fab, ap(fa)); };
/* istanbul ignore next */
var _chain = function (ma, f) { return pipe(ma, chain(f)); };
/* istanbul ignore next */
var _alt = function (fa, that) { return pipe(fa, alt(that)); };
/* istanbul ignore next */
var _filter = function (fa, predicate) { return pipe(fa, filter(predicate)); };
/* istanbul ignore next */
var _filterMap = function (fa, f) { return pipe(fa, filterMap(f)); };
/* istanbul ignore next */
var _partition = function (fa, predicate) {
    return pipe(fa, partition(predicate));
};
/* istanbul ignore next */
var _partitionMap = function (fa, f) { return pipe(fa, partitionMap(f)); };
/**
 * @category type lambdas
 * @since 2.12.0
 */
export var URI = 'IOOption';
/**
 * @category instances
 * @since 2.12.0
 */
export var Functor = {
    URI: URI,
    map: _map
};
/**
 * @category mapping
 * @since 2.12.0
 */
export var flap = /*#__PURE__*/ flap_(Functor);
/**
 * @category instances
 * @since 2.12.0
 */
export var Pointed = {
    URI: URI,
    of: of
};
/**
 * @category instances
 * @since 2.12.0
 */
export var Apply = {
    URI: URI,
    map: _map,
    ap: _ap
};
/**
 * Combine two effectful actions, keeping only the result of the first.
 *
 * @since 2.12.0
 */
export var apFirst = /*#__PURE__*/ apFirst_(Apply);
/**
 * Combine two effectful actions, keeping only the result of the second.
 *
 * @since 2.12.0
 */
export var apSecond = /*#__PURE__*/ apSecond_(Apply);
/**
 * @category instances
 * @since 2.12.0
 */
export var Applicative = {
    URI: URI,
    map: _map,
    ap: _ap,
    of: of
};
/**
 * @category instances
 * @since 2.12.0
 */
export var Chain = {
    URI: URI,
    map: _map,
    ap: _ap,
    chain: _chain
};
/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation and
 * keeping only the result of the first.
 *
 * @category sequencing
 * @since 2.12.0
 */
export var chainFirst = 
/*#__PURE__*/ chainFirst_(Chain);
/**
 * @category instances
 * @since 2.12.0
 */
export var Alt = {
    URI: URI,
    map: _map,
    alt: _alt
};
/**
 * @category instances
 * @since 2.12.0
 */
export var Zero = {
    URI: URI,
    zero: zero
};
/**
 * @category do notation
 * @since 2.12.0
 */
export var guard = /*#__PURE__*/ guard_(Zero, Pointed);
/**
 * @category instances
 * @since 2.12.0
 */
export var Alternative = {
    URI: URI,
    map: _map,
    ap: _ap,
    of: of,
    alt: _alt,
    zero: zero
};
/**
 * @category instances
 * @since 2.12.0
 */
export var Monad = {
    URI: URI,
    map: _map,
    ap: _ap,
    of: of,
    chain: _chain
};
/**
 * @category instances
 * @since 2.12.0
 */
export var MonadIO = {
    URI: URI,
    map: _map,
    ap: _ap,
    of: of,
    chain: _chain,
    fromIO: fromIO
};
/**
 * @category instances
 * @since 2.12.0
 */
export var Compactable = {
    URI: URI,
    compact: compact,
    separate: separate
};
/**
 * @category instances
 * @since 2.12.0
 */
export var Filterable = {
    URI: URI,
    map: _map,
    compact: compact,
    separate: separate,
    filter: _filter,
    filterMap: _filterMap,
    partition: _partition,
    partitionMap: _partitionMap
};
/**
 * @category instances
 * @since 2.12.0
 */
export var FromIO = {
    URI: URI,
    fromIO: fromIO
};
/**
 * @category lifting
 * @since 2.12.0
 */
export var fromIOK = 
/*#__PURE__*/ fromIOK_(FromIO);
/**
 * @category sequencing
 * @since 2.12.0
 */
export var chainIOK = /*#__PURE__*/ chainIOK_(FromIO, Chain);
/**
 * @category sequencing
 * @since 2.12.0
 */
export var chainFirstIOK = 
/*#__PURE__*/ chainFirstIOK_(FromIO, Chain);
/**
 * @category instances
 * @since 2.12.0
 */
export var FromEither = {
    URI: URI,
    fromEither: fromEither
};
/**
 * @category lifting
 * @since 2.12.0
 */
export var fromEitherK = /*#__PURE__*/ fromEitherK_(FromEither);
/**
 * @category sequencing
 * @since 2.12.0
 */
export var chainEitherK = 
/*#__PURE__*/ chainEitherK_(FromEither, Chain);
/**
 * @category sequencing
 * @since 2.12.0
 */
export var chainFirstEitherK = 
/*#__PURE__*/ chainFirstEitherK_(FromEither, Chain);
// -------------------------------------------------------------------------------------
// do notation
// -------------------------------------------------------------------------------------
/**
 * @category do notation
 * @since 2.12.0
 */
export var Do = /*#__PURE__*/ of(_.emptyRecord);
/**
 * @category do notation
 * @since 2.12.0
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
 * @since 2.12.0
 */
export var bind = /*#__PURE__*/ bind_(Chain);
/**
 * @category do notation
 * @since 2.12.0
 */
export var apS = /*#__PURE__*/ apS_(Apply);
/**
 * @since 2.12.0
 */
export var ApT = /*#__PURE__*/ of(_.emptyReadonlyArray);
// -------------------------------------------------------------------------------------
// array utils
// -------------------------------------------------------------------------------------
/**
 * Equivalent to `ReadonlyNonEmptyArray#traverseWithIndex(Applicative)`.
 *
 * @category traversing
 * @since 2.12.0
 */
export var traverseReadonlyNonEmptyArrayWithIndex = function (f) {
    return flow(I.traverseReadonlyNonEmptyArrayWithIndex(f), I.map(O.traverseReadonlyNonEmptyArrayWithIndex(SK)));
};
/**
 * Equivalent to `ReadonlyArray#traverseWithIndex(Applicative)`.
 *
 * @category traversing
 * @since 2.12.0
 */
export var traverseReadonlyArrayWithIndex = function (f) {
    var g = traverseReadonlyNonEmptyArrayWithIndex(f);
    return function (as) { return (_.isNonEmpty(as) ? g(as) : ApT); };
};
