/**
 * The `FromEither` type class represents those data types which support errors.
 *
 * @since 2.10.0
 */
import { chainFirst } from './Chain';
import { flow } from './function';
import * as _ from './internal';
export function fromOption(F) {
    return function (onNone) { return function (ma) { return F.fromEither(_.isNone(ma) ? _.left(onNone()) : _.right(ma.value)); }; };
}
export function fromPredicate(F) {
    return function (predicate, onFalse) {
        return function (a) {
            return F.fromEither(predicate(a) ? _.right(a) : _.left(onFalse(a)));
        };
    };
}
export function fromOptionK(F) {
    var fromOptionF = fromOption(F);
    return function (onNone) {
        var from = fromOptionF(onNone);
        return function (f) { return flow(f, from); };
    };
}
export function chainOptionK(F, M) {
    var fromOptionKF = fromOptionK(F);
    return function (onNone) {
        var from = fromOptionKF(onNone);
        return function (f) { return function (ma) { return M.chain(ma, from(f)); }; };
    };
}
export function fromEitherK(F) {
    return function (f) { return flow(f, F.fromEither); };
}
export function chainEitherK(F, M) {
    var fromEitherKF = fromEitherK(F);
    return function (f) { return function (ma) { return M.chain(ma, fromEitherKF(f)); }; };
}
export function chainFirstEitherK(F, M) {
    return flow(fromEitherK(F), chainFirst(M));
}
export function filterOrElse(F, M) {
    return function (predicate, onFalse) {
        return function (ma) {
            return M.chain(ma, function (a) { return F.fromEither(predicate(a) ? _.right(a) : _.left(onFalse(a))); });
        };
    };
}
