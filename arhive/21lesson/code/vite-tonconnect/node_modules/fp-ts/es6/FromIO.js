/**
 * Lift a computation from the `IO` monad
 *
 * @since 2.10.0
 */
import { chainFirst } from './Chain';
import { flow } from './function';
export function fromIOK(F) {
    return function (f) { return flow(f, F.fromIO); };
}
export function chainIOK(F, M) {
    return function (f) {
        var g = flow(f, F.fromIO);
        return function (first) { return M.chain(first, g); };
    };
}
export function chainFirstIOK(F, M) {
    var chainFirstM = chainFirst(M);
    return function (f) { return chainFirstM(flow(f, F.fromIO)); };
}
