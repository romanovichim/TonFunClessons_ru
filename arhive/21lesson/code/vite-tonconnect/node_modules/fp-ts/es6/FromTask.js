/**
 * Lift a computation from the `Task` monad
 *
 * @since 2.10.0
 */
import { chainFirst } from './Chain';
import { flow } from './function';
export function fromTaskK(F) {
    return function (f) { return flow(f, F.fromTask); };
}
export function chainTaskK(F, M) {
    return function (f) {
        var g = flow(f, F.fromTask);
        return function (first) { return M.chain(first, g); };
    };
}
export function chainFirstTaskK(F, M) {
    var chainFirstM = chainFirst(M);
    return function (f) { return chainFirstM(flow(f, F.fromTask)); };
}
