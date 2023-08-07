"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.compareSliceForTest = exports.compareAddressForTest = exports.compareCellForTest = void 0;
function compareCellForTest(subject, cmp) {
    return {
        pass: cmp.equals(subject),
        posMessage: ((subject, cmp) => `Expected\n${subject}\nto equal\n${cmp}`).bind(undefined, subject, cmp),
        negMessage: ((subject, cmp) => `Expected\n${subject}\nNOT to equal\n${cmp}\nbut it does`).bind(undefined, subject, cmp),
    };
}
exports.compareCellForTest = compareCellForTest;
function compareAddressForTest(subject, cmp) {
    return {
        pass: cmp.equals(subject),
        posMessage: ((subject, cmp) => `Expected ${subject} to equal ${cmp}`).bind(undefined, subject, cmp),
        negMessage: ((subject, cmp) => `Expected ${subject} NOT to equal ${cmp}, but it does`).bind(undefined, subject, cmp),
    };
}
exports.compareAddressForTest = compareAddressForTest;
function compareSliceForTest(subject, cmp) {
    return {
        pass: cmp.asCell().equals(subject.asCell()),
        posMessage: ((subject, cmp) => `Expected\n${subject}\nto equal\n${cmp}`).bind(undefined, subject, cmp),
        negMessage: ((subject, cmp) => `Expected\n${subject}\nNOT to equal\n${cmp}\nbut it does`).bind(undefined, subject, cmp),
    };
}
exports.compareSliceForTest = compareSliceForTest;
