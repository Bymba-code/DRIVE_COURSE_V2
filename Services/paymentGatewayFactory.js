const StorePayGateway = require("./storepayGateway");

function getPaymentGateway(type) {
  switch (parseInt(type)) {
    case 1: return new StorePayGateway();
    default: throw new Error("Unknown payment method: " + type);
  }
}

module.exports = getPaymentGateway;