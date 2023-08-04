/**
 * @since 2.10.0
 */
import { Alt1 } from './Alt'
import { Alternative1 } from './Alternative'
import { Applicative1 } from './Applicative'
import { Apply1 } from './Apply'
import { Chain1 } from './Chain'
import { Compactable1 } from './Compactable'
import { Either } from './Either'
import { Filterable1 } from './Filterable'
import { FromEither1 } from './FromEither'
import { FromIO1 } from './FromIO'
import { FromTask1 } from './FromTask'
import { Lazy } from './function'
import { Functor1 } from './Functor'
import { IO } from './IO'
import { Monad1 } from './Monad'
import { MonadIO1 } from './MonadIO'
import { MonadTask1 } from './MonadTask'
import * as O from './Option'
import { Pointed1 } from './Pointed'
import { Predicate } from './Predicate'
import { ReadonlyNonEmptyArray } from './ReadonlyNonEmptyArray'
import { Refinement } from './Refinement'
import { Separated } from './Separated'
import * as T from './Task'
import { TaskEither } from './TaskEither'
import { Zero1 } from './Zero'
import Task = T.Task
import Option = O.Option
/**
 * @category model
 * @since 2.10.0
 */
export interface TaskOption<A> extends Task<Option<A>> {}
/**
 * @category constructors
 * @since 2.10.0
 */
export declare const some: <A>(a: A) => TaskOption<A>
/**
 * @category lifting
 * @since 2.10.0
 */
export declare const fromPredicate: {
  <A, B extends A>(refinement: Refinement<A, B>): (a: A) => TaskOption<B>
  <A>(predicate: Predicate<A>): <B extends A>(b: B) => TaskOption<B>
  <A>(predicate: Predicate<A>): (a: A) => TaskOption<A>
}
/**
 * @category conversions
 * @since 2.10.0
 */
export declare const fromOption: <A>(fa: Option<A>) => TaskOption<A>
/**
 * @category conversions
 * @since 2.10.0
 */
export declare const fromEither: <A>(fa: Either<unknown, A>) => TaskOption<A>
/**
 * @category conversions
 * @since 2.10.0
 */
export declare const fromIO: <A>(fa: IO<A>) => TaskOption<A>
/**
 * @category conversions
 * @since 2.10.0
 */
export declare const fromTask: <A>(fa: Task<A>) => TaskOption<A>
/**
 * @category conversions
 * @since 2.11.0
 */
export declare const fromTaskEither: <A>(fa: TaskEither<unknown, A>) => TaskOption<A>
/**
 * @category pattern matching
 * @since 2.10.0
 */
export declare const match: <B, A>(onNone: () => B, onSome: (a: A) => B) => (ma: TaskOption<A>) => Task<B>
/**
 * Less strict version of [`match`](#match).
 *
 * The `W` suffix (short for **W**idening) means that the handler return types will be merged.
 *
 * @category pattern matching
 * @since 2.10.0
 */
export declare const matchW: <B, A, C>(onNone: () => B, onSome: (a: A) => C) => (ma: TaskOption<A>) => Task<B | C>
/**
 * The `E` suffix (short for **E**ffect) means that the handlers return an effect (`Task`).
 *
 * @category pattern matching
 * @since 2.10.0
 */
export declare const matchE: <B, A>(onNone: () => Task<B>, onSome: (a: A) => Task<B>) => (ma: TaskOption<A>) => Task<B>
/**
 * Alias of [`matchE`](#matche).
 *
 * @category pattern matching
 * @since 2.10.0
 */
export declare const fold: <B, A>(
  onNone: () => T.Task<B>,
  onSome: (a: A) => T.Task<B>
) => (ma: TaskOption<A>) => T.Task<B>
/**
 * Less strict version of [`matchE`](#matche).
 *
 * The `W` suffix (short for **W**idening) means that the handler return types will be merged.
 *
 * @category pattern matching
 * @since 2.10.0
 */
export declare const matchEW: <B, C, A>(
  onNone: () => Task<B>,
  onSome: (a: A) => Task<C>
) => (ma: TaskOption<A>) => Task<B | C>
/**
 * Alias of [`matchEW`](#matchew).
 *
 * @category pattern matching
 * @since 2.10.0
 */
export declare const foldW: <B, C, A>(
  onNone: () => T.Task<B>,
  onSome: (a: A) => T.Task<C>
) => (ma: TaskOption<A>) => T.Task<B | C>
/**
 * @category error handling
 * @since 2.10.0
 */
export declare const getOrElse: <A>(onNone: Lazy<Task<A>>) => (fa: TaskOption<A>) => Task<A>
/**
 * Less strict version of [`getOrElse`](#getorelse).
 *
 * The `W` suffix (short for **W**idening) means that the handler return type will be merged.
 *
 * @category error handling
 * @since 2.10.0
 */
export declare const getOrElseW: <B>(onNone: Lazy<Task<B>>) => <A>(ma: TaskOption<A>) => Task<A | B>
/**
 * @category conversions
 * @since 2.10.0
 */
export declare const fromNullable: <A>(a: A) => TaskOption<NonNullable<A>>
/**
 * Transforms a `Promise` that may reject to a `Promise` that never rejects and returns an `Option` instead.
 *
 * See also [`tryCatchK`](#trycatchk).
 *
 * @category interop
 * @since 2.10.0
 */
export declare const tryCatch: <A>(f: Lazy<Promise<A>>) => TaskOption<A>
/**
 * Converts a function returning a `Promise` to one returning a `TaskOption`.
 *
 * @category interop
 * @since 2.10.0
 */
export declare const tryCatchK: <A extends readonly unknown[], B>(
  f: (...a: A) => Promise<B>
) => (...a: A) => TaskOption<B>
/**
 * @category lifting
 * @since 2.10.0
 */
export declare const fromNullableK: <A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => B | null | undefined
) => (...a: A) => TaskOption<NonNullable<B>>
/**
 * @category sequencing
 * @since 2.10.0
 */
export declare const chainNullableK: <A, B>(
  f: (a: A) => B | null | undefined
) => (ma: TaskOption<A>) => TaskOption<NonNullable<B>>
/**
 * @category lifting
 * @since 2.10.0
 */
export declare const fromOptionK: <A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => Option<B>
) => (...a: A) => TaskOption<B>
/**
 * @category sequencing
 * @since 2.10.0
 */
export declare const chainOptionK: <A, B>(f: (a: A) => Option<B>) => (ma: TaskOption<A>) => TaskOption<B>
/**
 * `map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
 * use the type constructor `F` to represent some computational context.
 *
 * @category mapping
 * @since 2.10.0
 */
export declare const map: <A, B>(f: (a: A) => B) => (fa: TaskOption<A>) => TaskOption<B>
/**
 * @since 2.10.0
 */
export declare const ap: <A>(fa: TaskOption<A>) => <B>(fab: TaskOption<(a: A) => B>) => TaskOption<B>
/**
 * @category constructors
 * @since 2.10.0
 */
export declare const of: <A>(a: A) => TaskOption<A>
/**
 * @category sequencing
 * @since 2.10.0
 */
export declare const chain: <A, B>(f: (a: A) => TaskOption<B>) => (ma: TaskOption<A>) => TaskOption<B>
/**
 * @category sequencing
 * @since 2.10.0
 */
export declare const flatten: <A>(mma: TaskOption<TaskOption<A>>) => TaskOption<A>
/**
 * @category error handling
 * @since 2.10.0
 */
export declare const alt: <A>(second: Lazy<TaskOption<A>>) => (first: TaskOption<A>) => TaskOption<A>
/**
 * Less strict version of [`alt`](#alt).
 *
 * The `W` suffix (short for **W**idening) means that the return types will be merged.
 *
 * @category error handling
 * @since 2.10.0
 */
export declare const altW: <B>(second: Lazy<TaskOption<B>>) => <A>(first: TaskOption<A>) => TaskOption<A | B>
/**
 * @since 2.10.0
 */
export declare const zero: <A>() => TaskOption<A>
/**
 * @category constructors
 * @since 2.10.0
 */
export declare const none: TaskOption<never>
/**
 * @category filtering
 * @since 2.10.0
 */
export declare const compact: Compactable1<URI>['compact']
/**
 * @category filtering
 * @since 2.10.0
 */
export declare const separate: Compactable1<URI>['separate']
/**
 * @category filtering
 * @since 2.10.0
 */
export declare const filter: {
  <A, B extends A>(refinement: Refinement<A, B>): (fb: TaskOption<A>) => TaskOption<B>
  <A>(predicate: Predicate<A>): <B extends A>(fb: TaskOption<B>) => TaskOption<B>
  <A>(predicate: Predicate<A>): (fa: TaskOption<A>) => TaskOption<A>
}
/**
 * @category filtering
 * @since 2.10.0
 */
export declare const filterMap: <A, B>(f: (a: A) => Option<B>) => (fga: TaskOption<A>) => TaskOption<B>
/**
 * @category filtering
 * @since 2.10.0
 */
export declare const partition: {
  <A, B extends A>(refinement: Refinement<A, B>): (fb: TaskOption<A>) => Separated<TaskOption<A>, TaskOption<B>>
  <A>(predicate: Predicate<A>): <B extends A>(fb: TaskOption<B>) => Separated<TaskOption<B>, TaskOption<B>>
  <A>(predicate: Predicate<A>): (fa: TaskOption<A>) => Separated<TaskOption<A>, TaskOption<A>>
}
/**
 * @category filtering
 * @since 2.10.0
 */
export declare const partitionMap: <A, B, C>(
  f: (a: A) => Either<B, C>
) => (fa: TaskOption<A>) => Separated<TaskOption<B>, TaskOption<C>>
/**
 * @category type lambdas
 * @since 2.10.0
 */
export declare const URI = 'TaskOption'
/**
 * @category type lambdas
 * @since 2.10.0
 */
export declare type URI = typeof URI
declare module './HKT' {
  interface URItoKind<A> {
    readonly [URI]: TaskOption<A>
  }
}
/**
 * @category instances
 * @since 2.10.0
 */
export declare const Functor: Functor1<URI>
/**
 * @category mapping
 * @since 2.10.0
 */
export declare const flap: <A>(a: A) => <B>(fab: TaskOption<(a: A) => B>) => TaskOption<B>
/**
 * @category instances
 * @since 2.10.0
 */
export declare const Pointed: Pointed1<URI>
/**
 * Runs computations in parallel.
 *
 * @category instances
 * @since 2.10.0
 */
export declare const ApplyPar: Apply1<URI>
/**
 * Combine two effectful actions, keeping only the result of the first.
 *
 * @since 2.10.0
 */
export declare const apFirst: <B>(second: TaskOption<B>) => <A>(first: TaskOption<A>) => TaskOption<A>
/**
 * Combine two effectful actions, keeping only the result of the second.
 *
 * @since 2.10.0
 */
export declare const apSecond: <B>(second: TaskOption<B>) => <A>(first: TaskOption<A>) => TaskOption<B>
/**
 * Runs computations in parallel.
 *
 * @category instances
 * @since 2.10.0
 */
export declare const ApplicativePar: Applicative1<URI>
/**
 * Runs computations sequentially.
 *
 * @category instances
 * @since 2.10.0
 */
export declare const ApplySeq: Apply1<URI>
/**
 * Runs computations sequentially.
 *
 * @category instances
 * @since 2.10.0
 */
export declare const ApplicativeSeq: Applicative1<URI>
/**
 * @category instances
 * @since 2.10.0
 */
export declare const Chain: Chain1<URI>
/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation and
 * keeping only the result of the first.
 *
 * @category sequencing
 * @since 2.10.0
 */
export declare const chainFirst: <A, B>(f: (a: A) => TaskOption<B>) => (first: TaskOption<A>) => TaskOption<A>
/**
 * @category instances
 * @since 2.10.0
 */
export declare const Alt: Alt1<URI>
/**
 * @category instances
 * @since 2.11.0
 */
export declare const Zero: Zero1<URI>
/**
 * @category do notation
 * @since 2.11.0
 */
export declare const guard: (b: boolean) => TaskOption<void>
/**
 * @category instances
 * @since 2.10.0
 */
export declare const Alternative: Alternative1<URI>
/**
 * @category instances
 * @since 2.10.0
 */
export declare const Monad: Monad1<URI>
/**
 * @category instances
 * @since 2.10.0
 */
export declare const MonadIO: MonadIO1<URI>
/**
 * @category instances
 * @since 2.10.0
 */
export declare const MonadTask: MonadTask1<URI>
/**
 * @category instances
 * @since 2.10.0
 */
export declare const Compactable: Compactable1<URI>
/**
 * @category instances
 * @since 2.10.0
 */
export declare const Filterable: Filterable1<URI>
/**
 * @category instances
 * @since 2.10.0
 */
export declare const FromIO: FromIO1<URI>
/**
 * @category lifting
 * @since 2.10.0
 */
export declare const fromIOK: <A extends ReadonlyArray<unknown>, B>(f: (...a: A) => IO<B>) => (...a: A) => TaskOption<B>
/**
 * @category sequencing
 * @since 2.10.0
 */
export declare const chainIOK: <A, B>(f: (a: A) => IO<B>) => (first: TaskOption<A>) => TaskOption<B>
/**
 * @category sequencing
 * @since 2.10.0
 */
export declare const chainFirstIOK: <A, B>(f: (a: A) => IO<B>) => (first: TaskOption<A>) => TaskOption<A>
/**
 * @category instances
 * @since 2.11.0
 */
export declare const FromEither: FromEither1<URI>
/**
 * @category lifting
 * @since 2.12.0
 */
export declare const fromEitherK: <E, A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => Either<E, B>
) => (...a: A) => TaskOption<B>
/**
 * @category sequencing
 * @since 2.12.0
 */
export declare const chainEitherK: <E, A, B>(f: (a: A) => Either<E, B>) => (ma: TaskOption<A>) => TaskOption<B>
/**
 * @category sequencing
 * @since 2.12.0
 */
export declare const chainFirstEitherK: <E, A, B>(f: (a: A) => Either<E, B>) => (ma: TaskOption<A>) => TaskOption<A>
/**
 * @category instances
 * @since 2.10.0
 */
export declare const FromTask: FromTask1<URI>
/**
 * @category lifting
 * @since 2.10.0
 */
export declare const fromTaskK: <A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => T.Task<B>
) => (...a: A) => TaskOption<B>
/**
 * @category sequencing
 * @since 2.10.0
 */
export declare const chainTaskK: <A, B>(f: (a: A) => T.Task<B>) => (first: TaskOption<A>) => TaskOption<B>
/**
 * @category sequencing
 * @since 2.10.0
 */
export declare const chainFirstTaskK: <A, B>(f: (a: A) => T.Task<B>) => (first: TaskOption<A>) => TaskOption<A>
/**
 * @category do notation
 * @since 2.10.0
 */
export declare const Do: TaskOption<{}>
/**
 * @category do notation
 * @since 2.10.0
 */
export declare const bindTo: <N extends string>(
  name: N
) => <A>(fa: TaskOption<A>) => TaskOption<{ readonly [K in N]: A }>
declare const let_: <N extends string, A, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => B
) => (fa: TaskOption<A>) => TaskOption<{ readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
export {
  /**
   * @category do notation
   * @since 2.13.0
   */
  let_ as let
}
/**
 * @category do notation
 * @since 2.10.0
 */
export declare const bind: <N extends string, A, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => TaskOption<B>
) => (ma: TaskOption<A>) => TaskOption<{ readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
/**
 * @category do notation
 * @since 2.10.0
 */
export declare const apS: <N extends string, A, B>(
  name: Exclude<N, keyof A>,
  fb: TaskOption<B>
) => (fa: TaskOption<A>) => TaskOption<{ readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
/**
 * @since 2.11.0
 */
export declare const ApT: TaskOption<readonly []>
/**
 * Equivalent to `ReadonlyNonEmptyArray#traverseWithIndex(ApplicativePar)`.
 *
 * @category traversing
 * @since 2.11.0
 */
export declare const traverseReadonlyNonEmptyArrayWithIndex: <A, B>(
  f: (index: number, a: A) => TaskOption<B>
) => (as: ReadonlyNonEmptyArray<A>) => TaskOption<ReadonlyNonEmptyArray<B>>
/**
 * Equivalent to `ReadonlyArray#traverseWithIndex(ApplicativePar)`.
 *
 * @category traversing
 * @since 2.11.0
 */
export declare const traverseReadonlyArrayWithIndex: <A, B>(
  f: (index: number, a: A) => TaskOption<B>
) => (as: readonly A[]) => TaskOption<readonly B[]>
/**
 * Equivalent to `ReadonlyNonEmptyArray#traverseWithIndex(ApplicativeSeq)`.
 *
 * @category traversing
 * @since 2.11.0
 */
export declare const traverseReadonlyNonEmptyArrayWithIndexSeq: <A, B>(
  f: (index: number, a: A) => TaskOption<B>
) => (as: ReadonlyNonEmptyArray<A>) => TaskOption<ReadonlyNonEmptyArray<B>>
/**
 * Equivalent to `ReadonlyArray#traverseWithIndex(ApplicativeSeq)`.
 *
 * @category traversing
 * @since 2.11.0
 */
export declare const traverseReadonlyArrayWithIndexSeq: <A, B>(
  f: (index: number, a: A) => TaskOption<B>
) => (as: readonly A[]) => TaskOption<readonly B[]>
/**
 * Equivalent to `ReadonlyArray#traverseWithIndex(Applicative)`.
 *
 * @category traversing
 * @since 2.10.0
 */
export declare const traverseArrayWithIndex: <A, B>(
  f: (index: number, a: A) => TaskOption<B>
) => (as: ReadonlyArray<A>) => TaskOption<ReadonlyArray<B>>
/**
 * Equivalent to `ReadonlyArray#traverse(Applicative)`.
 *
 * @category traversing
 * @since 2.10.0
 */
export declare const traverseArray: <A, B>(
  f: (a: A) => TaskOption<B>
) => (as: ReadonlyArray<A>) => TaskOption<ReadonlyArray<B>>
/**
 * Equivalent to `ReadonlyArray#sequence(Applicative)`.
 *
 * @category traversing
 * @since 2.10.0
 */
export declare const sequenceArray: <A>(as: ReadonlyArray<TaskOption<A>>) => TaskOption<ReadonlyArray<A>>
/**
 * Equivalent to `ReadonlyArray#traverseWithIndex(ApplicativeSeq)`.
 *
 * @category traversing
 * @since 2.10.0
 */
export declare const traverseSeqArrayWithIndex: <A, B>(
  f: (index: number, a: A) => TaskOption<B>
) => (as: ReadonlyArray<A>) => TaskOption<ReadonlyArray<B>>
/**
 * Equivalent to `ReadonlyArray#traverse(ApplicativeSeq)`.
 *
 * @category traversing
 * @since 2.10.0
 */
export declare const traverseSeqArray: <A, B>(
  f: (a: A) => TaskOption<B>
) => (as: ReadonlyArray<A>) => TaskOption<ReadonlyArray<B>>
/**
 * Equivalent to `ReadonlyArray#sequence(ApplicativeSeq)`.
 *
 * @category traversing
 * @since 2.10.0
 */
export declare const sequenceSeqArray: <A>(as: ReadonlyArray<TaskOption<A>>) => TaskOption<ReadonlyArray<A>>
