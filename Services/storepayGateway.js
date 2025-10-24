const axios = require("axios");
const getStorepayAccessToken = require("./getStorepayAccessToken"); 
const PaymentGateway = require("../Middlewares/paymentGateway");
require("dotenv").config()

const systemUsername = process.env.SYSTEM_USERNAME;
    const systemPassword = process.env.SYSTEM_PASSWORD;
    const appUsername = process.env.APP_USERNAME;
    const appPassword = process.env.APP_PASSWORD;

class StorePayGateway extends PaymentGateway {

  async createInvoice(payload) {
    const token = await getStorepayAccessToken(systemUsername, systemPassword, appUsername, appPassword);

    const response = await axios.post(
      "https://service.storepay.mn/merchant/loan",
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  }

  async checkInvoiceStatus(invoiceId) {
    const token = await getStorepayAccessToken();
    const response = await axios.get(`https://service.storepay.mn/merchant/invoice/${invoiceId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  }
}

module.exports = StorePayGateway;
