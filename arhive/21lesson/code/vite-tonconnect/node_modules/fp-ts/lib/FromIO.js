"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chainFirstIOK = exports.chainIOK = exports.fromIOK = void 0;
/**
 * Lift a computation from the `IO` monad
 *
 * @since 2.10.0
 */
var Chain_1 = require("./Chain");
var function_1 = require("./function");
function fromIOK(F) {
    return function (f) { return (0, function_1.flow)(f, F.fromIO); };
}
exports.fromIOK = fromIOK;
function chainIOK(F, M) {
    return function (f) {
        var g = (0, function_1.flow)(f, F.fromIO);
        return function (first) { return M.chain(first, g); };
    };
}
exports.chainIOK = chainIOK;
function chainFirstIOK(F, M) {
    var chainFirstM = (0, Chain_1.chainFirst)(M);
    return function (f) { return chainFirstM((0, function_1.flow)(f, F.fromIO)); };
}
exports.chainFirstIOK = chainFirstIOK;
