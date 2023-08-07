"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const comparisons_1 = require("./comparisons");
const transaction_1 = require("./transaction");
function wrapComparer(comparer) {
    return function (cmp) {
        const result = comparer(this._obj, cmp);
        this.assert(result.pass, result.posMessage(), result.negMessage());
    };
}
try {
    const chai = require("chai");
    if (chai)
        chai.use((chai) => {
            const Assertion = chai.Assertion;
            Assertion.addMethod('transaction', wrapComparer(transaction_1.compareTransactionForTest));
            Assertion.addMethod('equalCell', wrapComparer(comparisons_1.compareCellForTest));
            Assertion.addMethod('equalAddress', wrapComparer(comparisons_1.compareAddressForTest));
            Assertion.addMethod('equalSlice', wrapComparer(comparisons_1.compareSliceForTest));
        });
}
catch (e) { }
