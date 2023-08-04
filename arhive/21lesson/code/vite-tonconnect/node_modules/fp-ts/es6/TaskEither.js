var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { getApplicativeMonoid } from './Applicative';
import { ap as ap_, apFirst as apFirst_, apS as apS_, apSecond as apSecond_, getApplySemigroup as getApplySemigroup_ } from './Apply';
import { bind as bind_, chainFirst as chainFirst_ } from './Chain';
import { compact as compact_, separate as separate_ } from './Compactable';
import * as E from './Either';
import * as ET from './EitherT';
import { filter as filter_, filterMap as filterMap_, partition as partition_, partitionMap as partitionMap_ } from './Filterable';
import { chainEitherK as chainEitherK_, chainFirstEitherK as chainFirstEitherK_, chainOptionK as chainOptionK_, filterOrElse as filterOrElse_, fromEitherK as fromEitherK_, fromOption as fromOption_, fromOptionK as fromOptionK_, fromPredicate as fromPredicate_ } from './FromEither';
import { chainFirstIOK as chainFirstIOK_, chainIOK as chainIOK_, fromIOK as fromIOK_ } from './FromIO';
import { chainFirstTaskK as chainFirstTaskK_, chainTaskK as chainTaskK_, fromTaskK as fromTaskK_ } from './FromTask';
import { flow, identity, pipe, SK } from './function';
import { bindTo as bindTo_, flap as flap_, let as let__ } from './Functor';
import * as _ from './internal';
import * as T from './Task';
// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------
/**
 * @category constructors
 * @since 2.0.0
 */
export var left = /*#__PURE__*/ ET.left(T.Pointed);
/**
 * @category constructors
 * @since 2.0.0
 */
export var right = /*#__PURE__*/ ET.right(T.Pointed);
/**
 * @category constructors
 * @since 2.0.0
 */
export var rightTask = /*#__PURE__*/ ET.rightF(T.Functor);
/**
 * @category constructors
 * @since 2.0.0
 */
export var leftTask = /*#__PURE__*/ ET.leftF(T.Functor);
/**
 * @category constructors
 * @since 2.0.0
 */
export var rightIO = /*#__PURE__*/ flow(T.fromIO, rightTask);
/**
 * @category constructors
 * @since 2.0.0
 */
export var leftIO = /*#__PURE__*/ flow(T.fromIO, leftTask);
// -------------------------------------------------------------------------------------
// conversions
// -------------------------------------------------------------------------------------
/**
 * @category conversions
 * @since 2.7.0
 */
export var fromIO = rightIO;
/**
 * @category conversions
 * @since 2.7.0
 */
export var fromTask = rightTask;
/**
 * @category conversions
 * @since 2.0.0
 */
export var fromEither = T.of;
/**
 * @category conversions
 * @since 2.0.0
 */
export var fromIOEither = T.fromIO;
/**
 * @category conversions
 * @since 2.11.0
 */
export var fromTaskOption = function (onNone) {
    return T.map(E.fromOption(onNone));
};
/**
 * @category pattern matching
 * @since 2.10.0
 */
export var match = 
/*#__PURE__*/ ET.match(T.Functor);
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
 * The `E` suffix (short for **E**ffect) means that the handlers return an effect (`Task`).
 *
 * @category pattern matching
 * @since 2.10.0
 */
export var matchE = /*#__PURE__*/ ET.matchE(T.Monad);
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
/*#__PURE__*/ ET.getOrElse(T.Monad);
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
 * Transforms a `Promise` that may reject to a `Promise` that never rejects and returns an `Either` instead.
 *
 * See also [`tryCatchK`](#trycatchk).
 *
 * @example
 * import { left, right } from 'fp-ts/Either'
 * import { tryCatch } from 'fp-ts/TaskEither'
 *
 * tryCatch(() => Promise.resolve(1), String)().then(result => {
 *   assert.deepStrictEqual(result, right(1))
 * })
 * tryCatch(() => Promise.reject('error'), String)().then(result => {
 *   assert.deepStrictEqual(result, left('error'))
 * })
 *
 * @category interop
 * @since 2.0.0
 */
export var tryCatch = function (f, onRejected) {
    return function () { return __awaiter(void 0, void 0, void 0, function () {
        var reason_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, f().then(_.right)];
                case 1: return [2 /*return*/, _a.sent()];
                case 2:
                    reason_1 = _a.sent();
                    return [2 /*return*/, _.left(onRejected(reason_1))];
                case 3: return [2 /*return*/];
            }
        });
    }); };
};
/**
 * Converts a function returning a `Promise` to one returning a `TaskEither`.
 *
 * @category interop
 * @since 2.5.0
 */
export var tryCatchK = function (f, onRejected) {
    return function () {
        var a = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            a[_i] = arguments[_i];
        }
        return tryCatch(function () { return f.apply(void 0, a); }, onRejected);
    };
};
/**
 * @category conversions
 * @since 2.10.0
 */
export var toUnion = /*#__PURE__*/ ET.toUnion(T.Functor);
/**
 * @category conversions
 * @since 2.12.0
 */
export var fromNullable = /*#__PURE__*/ ET.fromNullable(T.Pointed);
/**
 * @category lifting
 * @since 2.12.0
 */
export var fromNullableK = /*#__PURE__*/ ET.fromNullableK(T.Pointed);
/**
 * @category sequencing
 * @since 2.12.0
 */
export var chainNullableK = 
/*#__PURE__*/ ET.chainNullableK(T.Monad);
// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------
/**
 * Returns `ma` if is a `Right` or the value returned by `onLeft` otherwise.
 *
 * See also [alt](#alt).
 *
 * @example
 * import * as E from 'fp-ts/Either'
 * import { pipe } from 'fp-ts/function'
 * import * as TE from 'fp-ts/TaskEither'
 *
 * async function test() {
 *   const errorHandler = TE.orElse((error: string) => TE.right(`recovering from ${error}...`))
 *   assert.deepStrictEqual(await pipe(TE.right('ok'), errorHandler)(), E.right('ok'))
 *   assert.deepStrictEqual(await pipe(TE.left('ko'), errorHandler)(), E.right('recovering from ko...'))
 * }
 *
 * test()
 *
 * @category error handling
 * @since 2.0.0
 */
export var orElse = 
/*#__PURE__*/ ET.orElse(T.Monad);
/**
 * Less strict version of [`orElse`](#orelse).
 *
 * The `W` suffix (short for **W**idening) means that the return types will be merged.
 *
 * @category error handling
 * @since 2.10.0
 */
export var orElseW = orElse;
/**
 * @category error handling
 * @since 2.11.0
 */
export var orElseFirst = 
/*#__PURE__*/ ET.orElseFirst(T.Monad);
/**
 * The `W` suffix (short for **W**idening) means that the error types will be merged.
 *
 * @category error handling
 * @since 2.11.0
 */
export var orElseFirstW = orElseFirst;
/**
 * @category error handling
 * @since 2.12.0
 */
export var orElseFirstIOK = function (onLeft) { return orElseFirst(fromIOK(onLeft)); };
/**
 * @category error handling
 * @since 2.12.0
 */
export var orElseFirstTaskK = function (onLeft) { return orElseFirst(fromTaskK(onLeft)); };
/**
 * @category error handling
 * @since 2.11.0
 */
export var orLeft = 
/*#__PURE__*/ ET.orLeft(T.Monad);
/**
 * @since 2.0.0
 */
export var swap = /*#__PURE__*/ ET.swap(T.Functor);
/**
 * @category lifting
 * @since 2.11.0
 */
export var fromTaskOptionK = function (onNone) {
    var from = fromTaskOption(onNone);
    return function (f) { return flow(f, from); };
};
/**
 * The `W` suffix (short for **W**idening) means that the error types will be merged.
 *
 * @category sequencing
 * @since 2.12.3
 */
export var chainTaskOptionKW = function (onNone) {
    return function (f) {
        return function (ma) {
            return pipe(ma, chain(fromTaskOptionK(onNone)(f)));
        };
    };
};
/**
 * @category sequencing
 * @since 2.11.0
 */
export var chainTaskOptionK = chainTaskOptionKW;
/**
 * @category lifting
 * @since 2.4.0
 */
export var fromIOEitherK = function (f) { return flow(f, fromIOEither); };
/**
 * Less strict version of [`chainIOEitherK`](#chainioeitherk).
 *
 * The `W` suffix (short for **W**idening) means that the error types will be merged.
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
var _map = function (fa, f) { return pipe(fa, map(f)); };
var _apPar = function (fab, fa) { return pipe(fab, ap(fa)); };
var _apSeq = function (fab, fa) {
    return pipe(fab, chain(function (f) { return pipe(fa, map(f)); }));
};
/* istanbul ignore next */
var _chain = function (ma, f) { return pipe(ma, chain(f)); };
/* istanbul ignore next */
var _bimap = function (fa, f, g) { return pipe(fa, bimap(f, g)); };
/* istanbul ignore next */
var _mapLeft = function (fa, f) { return pipe(fa, mapLeft(f)); };
/* istanbul ignore next */
var _alt = function (fa, that) { return pipe(fa, alt(that)); };
/**
 * `map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
 * use the type constructor `F` to represent some computational context.
 *
 * @category mapping
 * @since 2.0.0
 */
export var map = /*#__PURE__*/ ET.map(T.Functor);
/**
 * Map a pair of functions over the two type arguments of the bifunctor.
 *
 * @category mapping
 * @since 2.0.0
 */
export var bimap = 
/*#__PURE__*/ ET.bimap(T.Functor);
/**
 * Map a function over the first type argument of a bifunctor.
 *
 * @category error handling
 * @since 2.0.0
 */
export var mapLeft = 
/*#__PURE__*/ ET.mapLeft(T.Functor);
/**
 * @since 2.0.0
 */
export var ap = 
/*#__PURE__*/ ET.ap(T.ApplyPar);
/**
 * Less strict version of [`ap`](#ap).
 *
 * The `W` suffix (short for **W**idening) means that the error types will be merged.
 *
 * @since 2.8.0
 */
export var apW = ap;
/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation.
 *
 * @category sequencing
 * @since 2.0.0
 */
export var chain = 
/*#__PURE__*/ ET.chain(T.Monad);
/**
 * Less strict version of [`chain`](#chain).
 *
 * The `W` suffix (short for **W**idening) means that the error types will be merged.
 *
 * @category sequencing
 * @since 2.6.0
 */
export var chainW = chain;
/**
 * Less strict version of [`flatten`](#flatten).
 *
 * The `W` suffix (short for **W**idening) means that the error types will be merged.
 *
 * @category sequencing
 * @since 2.11.0
 */
export var flattenW = 
/*#__PURE__*/ chainW(identity);
/**
 * @category sequencing
 * @since 2.0.0
 */
export var flatten = flattenW;
/**
 * Identifies an associative operation on a type constructor. It is similar to `Semigroup`, except that it applies to
 * types of kind `* -> *`.
 *
 * In case of `TaskEither` returns `fa` if is a `Right` or the value returned by `that` otherwise.
 *
 * See also [orElse](#orelse).
 *
 * @example
 * import * as E from 'fp-ts/Either'
 * import { pipe } from 'fp-ts/function'
 * import * as TE from 'fp-ts/TaskEither'
 *
 * async function test() {
 *   assert.deepStrictEqual(
 *     await pipe(
 *       TE.right(1),
 *       TE.alt(() => TE.right(2))
 *     )(),
 *     E.right(1)
 *   )
 *   assert.deepStrictEqual(
 *     await pipe(
 *       TE.left('a'),
 *       TE.alt(() => TE.right(2))
 *     )(),
 *     E.right(2)
 *   )
 *   assert.deepStrictEqual(
 *     await pipe(
 *       TE.left('a'),
 *       TE.alt(() => TE.left('b'))
 *     )(),
 *     E.left('b')
 *   )
 * }
 *
 * test()
 *
 * @category error handling
 * @since 2.0.0
 */
export var alt = 
/*#__PURE__*/ ET.alt(T.Monad);
/**
 * Less strict version of [`alt`](#alt).
 *
 * The `W` suffix (short for **W**idening) means that the error and the return types will be merged.
 *
 * @category error handling
 * @since 2.9.0
 */
export var altW = alt;
/**
 * @category constructors
 * @since 2.0.0
 */
export var of = right;
/**
 * @since 2.7.0
 */
export var throwError = left;
/**
 * @category type lambdas
 * @since 2.0.0
 */
export var URI = 'TaskEither';
/**
 * The default [`ApplicativePar`](#applicativepar) instance returns the first error, if you want to
 * get all errors you need to provide a way to concatenate them via a `Semigroup`.
 *
 * @example
 * import * as E from 'fp-ts/Either'
 * import { pipe } from 'fp-ts/function'
 * import * as RA from 'fp-ts/ReadonlyArray'
 * import * as S from 'fp-ts/Semigroup'
 * import * as string from 'fp-ts/string'
 * import * as T from 'fp-ts/Task'
 * import * as TE from 'fp-ts/TaskEither'
 *
 * interface User {
 *   readonly id: string
 *   readonly name: string
 * }
 *
 * const remoteDatabase: ReadonlyArray<User> = [
 *   { id: 'id1', name: 'John' },
 *   { id: 'id2', name: 'Mary' },
 *   { id: 'id3', name: 'Joey' }
 * ]
 *
 * const fetchUser = (id: string): TE.TaskEither<string, User> =>
 *   pipe(
 *     remoteDatabase,
 *     RA.findFirst((user) => user.id === id),
 *     TE.fromOption(() => `${id} not found`)
 *   )
 *
 * async function test() {
 *   assert.deepStrictEqual(
 *     await pipe(['id4', 'id5'], RA.traverse(TE.ApplicativePar)(fetchUser))(),
 *     E.left('id4 not found') // <= first error
 *   )
 *
 *   const Applicative = TE.getApplicativeTaskValidation(
 *     T.ApplyPar,
 *     pipe(string.Semigroup, S.intercalate(', '))
 *   )
 *
 *   assert.deepStrictEqual(
 *     await pipe(['id4', 'id5'], RA.traverse(Applicative)(fetchUser))(),
 *     E.left('id4 not found, id5 not found') // <= all errors
 *   )
 * }
 *
 * test()
 *
 * @category error handling
 * @since 2.7.0
 */
export function getApplicativeTaskValidation(A, S) {
    var ap = ap_(A, E.getApplicativeValidation(S));
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
export function getAltTaskValidation(S) {
    var alt = ET.altValidation(T.Monad, S);
    return {
        URI: URI,
        _E: undefined,
        map: _map,
        alt: function (fa, that) { return pipe(fa, alt(that)); }
    };
}
/**
 * @category filtering
 * @since 2.10.0
 */
export var getCompactable = function (M) {
    var C = E.getCompactable(M);
    return {
        URI: URI,
        _E: undefined,
        compact: compact_(T.Functor, C),
        separate: separate_(T.Functor, C, E.Functor)
    };
};
/**
 * @category filtering
 * @since 2.1.0
 */
export function getFilterable(M) {
    var F = E.getFilterable(M);
    var C = getCompactable(M);
    var filter = filter_(T.Functor, F);
    var filterMap = filterMap_(T.Functor, F);
    var partition = partition_(T.Functor, F);
    var partitionMap = partitionMap_(T.Functor, F);
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
 * The `W` suffix (short for **W**idening) means that the error types will be merged.
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
 * The `W` suffix (short for **W**idening) means that the error types will be merged.
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
export var chainFirst = 
/*#__PURE__*/ chainFirst_(Chain);
/**
 * Less strict version of [`chainFirst`](#chainfirst).
 *
 * The `W` suffix (short for **W**idening) means that the error types will be merged.
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
export var fromOptionK = 
/*#__PURE__*/ fromOptionK_(FromEither);
/**
 * @category sequencing
 * @since 2.10.0
 */
export var chainOptionK = /*#__PURE__*/ chainOptionK_(FromEither, Chain);
/**
 * @category sequencing
 * @since 2.4.0
 */
export var chainEitherK = 
/*#__PURE__*/ chainEitherK_(FromEither, Chain);
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
export var chainFirstEitherK = 
/*#__PURE__*/ chainFirstEitherK_(FromEither, Chain);
/**
 * Less strict version of [`chainFirstEitherK`](#chainfirsteitherk).
 *
 * The `W` suffix (short for **W**idening) means that the error types will be merged.
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
export var chainIOK = 
/*#__PURE__*/ chainIOK_(FromIO, Chain);
/**
 * @category sequencing
 * @since 2.10.0
 */
export var chainFirstIOK = 
/*#__PURE__*/ chainFirstIOK_(FromIO, Chain);
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
export var chainTaskK = 
/*#__PURE__*/ chainTaskK_(FromTask, Chain);
/**
 * @category sequencing
 * @since 2.10.0
 */
export var chainFirstTaskK = 
/*#__PURE__*/ chainFirstTaskK_(FromTask, Chain);
export function taskify(f) {
    return function () {
        var args = Array.prototype.slice.call(arguments);
        return function () {
            return new Promise(function (resolve) {
                var cbResolver = function (e, r) { return (e != null ? resolve(_.left(e)) : resolve(_.right(r))); };
                f.apply(null, args.concat(cbResolver));
            });
        };
    };
}
/**
 * Make sure that a resource is cleaned up in the event of an exception (\*). The release action is called regardless of
 * whether the body action throws (\*) or returns.
 *
 * (\*) i.e. returns a `Left`
 *
 * @since 2.0.0
 */
export var bracket = function (acquire, use, release) { return bracketW(acquire, use, release); };
/**
 * Less strict version of [`bracket`](#bracket).
 *
 * The `W` suffix (short for **W**idening) means that the error types will be merged.
 *
 * @since 2.12.0
 */
export var bracketW = function (acquire, use, release) {
    return pipe(acquire, chainW(function (a) {
        return pipe(use(a), T.chain(function (e) {
            return pipe(release(a, e), chainW(function () { return T.of(e); }));
        }));
    }));
};
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
 * The `W` suffix (short for **W**idening) means that the error types will be merged.
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
 * The `W` suffix (short for **W**idening) means that the error types will be merged.
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
    return flow(T.traverseReadonlyNonEmptyArrayWithIndex(f), T.map(E.traverseReadonlyNonEmptyArrayWithIndex(SK)));
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
 * Equivalent to `ReadonlyArray#traverseWithIndex(ApplicativeSeq)`.
 *
 * @category traversing
 * @since 2.11.0
 */
export var traverseReadonlyNonEmptyArrayWithIndexSeq = function (f) {
    return function (as) {
        return function () {
            return _.tail(as).reduce(function (acc, a, i) {
                return acc.then(function (ebs) {
                    return _.isLeft(ebs)
                        ? acc
                        : f(i + 1, a)().then(function (eb) {
                            if (_.isLeft(eb)) {
                                return eb;
                            }
                            ebs.right.push(eb.right);
                            return ebs;
                        });
                });
            }, f(0, _.head(as))().then(E.map(_.singleton)));
        };
    };
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
export var traverseArray = function (f) { return traverseReadonlyArrayWithIndex(function (_, a) { return f(a); }); };
/**
 * Equivalent to `ReadonlyArray#sequence(Applicative)`.
 *
 * @category traversing
 * @since 2.9.0
 */
export var sequenceArray = 
/*#__PURE__*/ traverseArray(identity);
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
export var traverseSeqArray = function (f) { return traverseReadonlyArrayWithIndexSeq(function (_, a) { return f(a); }); };
/**
 * Equivalent to `ReadonlyArray#sequence(ApplicativeSeq)`.
 *
 * @category traversing
 * @since 2.9.0
 */
export var sequenceSeqArray = 
/*#__PURE__*/ traverseSeqArray(identity);
// -------------------------------------------------------------------------------------
// deprecated
// -------------------------------------------------------------------------------------
/**
 * This instance is deprecated, use small, specific instances instead.
 * For example if a function needs a `Functor` instance, pass `TE.Functor` instead of `TE.taskEither`
 * (where `TE` is from `import TE from 'fp-ts/TaskEither'`)
 *
 * @category zone of death
 * @since 2.0.0
 * @deprecated
 */
export var taskEither = {
    URI: URI,
    bimap: _bimap,
    mapLeft: _mapLeft,
    map: _map,
    of: of,
    ap: _apPar,
    chain: _chain,
    alt: _alt,
    fromIO: fromIO,
    fromTask: fromTask,
    throwError: throwError
};
/**
 * This instance is deprecated, use small, specific instances instead.
 * For example if a function needs a `Functor` instance, pass `TE.Functor` instead of `TE.taskEitherSeq`
 * (where `TE` is from `import TE from 'fp-ts/TaskEither'`)
 *
 * @category zone of death
 * @since 2.0.0
 * @deprecated
 */
export var taskEitherSeq = {
    URI: URI,
    bimap: _bimap,
    mapLeft: _mapLeft,
    map: _map,
    of: of,
    ap: _apSeq,
    chain: _chain,
    alt: _alt,
    fromIO: fromIO,
    fromTask: fromTask,
    throwError: throwError
};
/**
 * Use [`getApplySemigroup`](./Apply.ts.html#getapplysemigroup) instead.
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
    return getApplySemigroup_(T.ApplySeq)(E.getSemigroup(S));
};
/**
 * Use [`getApplicativeTaskValidation`](#getapplicativetaskvalidation) and [`getAltTaskValidation`](#getalttaskvalidation) instead.
 *
 * @category zone of death
 * @since 2.0.0
 * @deprecated
 */
export function getTaskValidation(SE) {
    var applicativeTaskValidation = getApplicativeTaskValidation(T.ApplicativePar, SE);
    var altTaskValidation = getAltTaskValidation(SE);
    return {
        URI: URI,
        _E: undefined,
        map: _map,
        ap: applicativeTaskValidation.ap,
        of: of,
        chain: _chain,
        bimap: _bimap,
        mapLeft: _mapLeft,
        alt: altTaskValidation.alt,
        fromIO: fromIO,
        fromTask: fromTask,
        throwError: throwError
    };
}
