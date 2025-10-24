const prisma = require('../../../Middlewares/prisma');
const StorePayGateway = require('../../../Services/storepayGateway');
const storePayGateway = new StorePayGateway();

const INSERT_INVOICES = async (req, res) => {
  try {

    const { amount, category, mobileNumber } = req.body 
    
    const payload = { 
      storeId:26421,
      mobileNumber: mobileNumber,
      description: "Нэхэмжлэлийн төлбөр",
      amount: parseInt(amount),
      
    }


      const externalInvoice = await storePayGateway.createInvoice(payload);

      

    return res.status(201).json({
      success: true,
      message: "Нэхэмжлэл амжилттай үүсгэгдлээ.",
    });

  } catch (err) {
    console.error("Invoice үүсгэхэд алдаа:", err);
    return res.status(500).json({
      success: false,
      message: "Серверийн алдаа гарлаа.",
      error: err.message,
    });
  }
};

module.exports = INSERT_INVOICES;
