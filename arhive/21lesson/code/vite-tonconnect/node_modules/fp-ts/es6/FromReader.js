/**
 * Lift a computation from the `Reader` monad.
 *
 * @since 2.11.0
 */
import { chainFirst } from './Chain';
import { flow } from './function';
import * as R from './Reader';
export function ask(F) {
    return function () { return F.fromReader(R.ask()); };
}
export function asks(F) {
    return F.fromReader;
}
export function fromReaderK(F) {
    return function (f) { return flow(f, F.fromReader); };
}
export function chainReaderK(F, M) {
    var fromReaderKF = fromReaderK(F);
    return function (f) { return function (ma) { return M.chain(ma, fromReaderKF(f)); }; };
}
export function chainFirstReaderK(F, M) {
    return flow(fromReaderK(F), chainFirst(M));
}
