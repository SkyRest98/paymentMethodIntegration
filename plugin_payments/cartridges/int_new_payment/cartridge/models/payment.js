'use strict';

var base = module.superModule;
var collections = require('*/cartridge/scripts/util/collections');

/**
 * Creates an array of objects containing selected payment information
 * @param {dw.util.ArrayList<dw.order.PaymentInstrument>} selectedPaymentInstruments - ArrayList
 *      of payment instruments that the user is using to pay for the current basket
 * @returns {Array} Array of objects that contain information about the selected payment instruments
 */
function getSelectedPaymentInstruments(selectedPaymentInstruments) {
    return collections.map(selectedPaymentInstruments, function (paymentInstrument) {
        var results = {
            paymentMethod: paymentInstrument.paymentMethod,
            amount: paymentInstrument.paymentTransaction.amount.value
        };
        if (paymentInstrument.paymentMethod === 'CREDIT_CARD') {
            results.lastFour = paymentInstrument.creditCardNumberLastDigits;
            results.owner = paymentInstrument.creditCardHolder;
            results.expirationYear = paymentInstrument.creditCardExpirationYear;
            results.type = paymentInstrument.creditCardType;
            results.maskedCreditCardNumber = paymentInstrument.maskedCreditCardNumber;
            results.expirationMonth = paymentInstrument.creditCardExpirationMonth;
        } else if (paymentInstrument.paymentMethod === 'GIFT_CERTIFICATE') {
            results.giftCertificateCode = paymentInstrument.giftCertificateCode;
            results.maskedGiftCertificateCode = paymentInstrument.maskedGiftCertificateCode;
        } else if(paymentInstrument.paymentMethod === 'NEW_PAYMENT') {
            results.lastFour = paymentInstrument.creditCardNumberLastDigits;
            results.owner = paymentInstrument.creditCardHolder;
            results.expirationYear = paymentInstrument.creditCardExpirationYear;
            results.type = paymentInstrument.creditCardType;
            results.maskedCreditCardNumber = paymentInstrument.maskedCreditCardNumber;
            results.expirationMonth = paymentInstrument.creditCardExpirationMonth;
        }

        return results;
    });
}

function Payment(currentBasket, currentCustomer, countryCode) {
    base.call(this, currentBasket, currentCustomer, countryCode);

    var paymentInstruments = currentBasket.paymentInstruments;

    this.selectedPaymentInstruments = paymentInstruments ?
        getSelectedPaymentInstruments(paymentInstruments) : null;
}

module.exports = Payment;
