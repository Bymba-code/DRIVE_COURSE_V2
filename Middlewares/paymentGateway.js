class PaymentGateway {
  async createInvoice(payload) {
    throw new Error("Not implemented");
  }

  async checkInvoiceStatus(invoiceId) {
    throw new Error("Not implemented");
  }
}

module.exports = PaymentGateway;