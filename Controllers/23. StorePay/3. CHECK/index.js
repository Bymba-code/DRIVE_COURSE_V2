require("dotenv").config();
const axios = require("axios");
const prisma = require("../../../Middlewares/prisma");
const StorePayGateway = require('../../../Services/storepayGateway');
const storePayGateway = new StorePayGateway();

const STOREPAY_INVOICE_CHECK = async (req, res) => {
  try 
  {
    const { invoice_id } = req.body;
    
    const checkInvoiceData = await storePayGateway.checkInvoiceStatus(invoice_id)

    return res.status(200).json({
      success:true,
      data:checkInvoiceData,
      message: "Амжилттай."
    })
  } 
  catch(err) 
  {
   return res.status(500).json({
    success:false,
    data:[],
    message: err.message
   })
  }
};

module.exports = STOREPAY_INVOICE_CHECK;