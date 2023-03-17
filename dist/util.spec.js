"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("./util");
const chai_1 = require("chai");
util_1.allCouriers.map((courier) => {
    describe(courier.name, () => {
        courier.tracking_numbers.map(trackingNumber => {
            describe(trackingNumber.name, () => {
                it('Choses the correct courier', done => {
                    trackingNumber.test_numbers.valid.map(n => {
                        (0, chai_1.expect)((0, util_1.getTracking)(n).courier.code).to.eq(courier.courier_code);
                    });
                    done();
                });
                it('Does not find a courier for invalid tracking numbers', done => {
                    trackingNumber.test_numbers.invalid.map(n => {
                        const tracking = (0, util_1.getTracking)(n);
                        tracking
                            ? (0, chai_1.expect)(tracking.courier.code).to.not.eq(courier.courier_code)
                            : (0, chai_1.expect)(tracking).to.be.undefined;
                    });
                    done();
                });
            });
        });
    });
});
describe('getTracking', () => {
    it('Uses all couriers when none are specified', done => {
        (0, chai_1.expect)((0, util_1.getTracking)('9400111202555842332669')).to.not.be.undefined;
        done();
    });
    it('Uses only supplied couriers when specified', done => {
        (0, chai_1.expect)((0, util_1.getTracking)('9400111202555842332669', [util_1.fedex])).to.be.undefined;
        done();
    });
});
describe('Tracking Search', () => {
    it('Finds valid tracking codes in text', done => {
        const text = 'USPS tracking number: 9400111202555842332669, but 9261292700768711948020 is bad and '
            + '7112 3456 7891 2345 6787 is good and this is a dupe 94001 11202 55584 2332669';
        (0, chai_1.expect)((0, util_1.findTracking)(text)).to.have.length(2);
        done();
    });
    it('Treats new lines correctly', done => {
        (0, chai_1.expect)((0, util_1.findTracking)('254899580324\n254899580324')).to.have.length(1);
        (0, chai_1.expect)((0, util_1.findTracking)('254899580324\r254899580324')).to.have.length(1);
        (0, chai_1.expect)((0, util_1.findTracking)('254899580324\r\n254899580324')).to.have.length(1);
        (0, chai_1.expect)((0, util_1.findTracking)('254899580324\n\n254899580324')).to.have.length(1);
        done();
    });
});
//# sourceMappingURL=util.spec.js.map