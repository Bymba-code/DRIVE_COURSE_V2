const prisma = require('../../../Middlewares/prisma');

const INSERT_PAYMENT = async (req, res) => {
  try {
    const { invoice_code,  } = req.body;

    const invoice = await prisma.invoices.findFirst({
      where: {
        invoice_code: invoice_code
      }
    })

    if(!invoice)
    {
      return res.status(404).json({
        success:false,
        data:[],
        message: "Нэхэмжлэл олдсонгүй."
      })
    }

    

  } catch (err) {
    console.error("Invoice үүсгэхэд алдаа:", err);
    return res.status(500).json({
      success: false,
      message: "Серверийн алдаа гарлаа.",
      error: err.message,
    });
  }
};

module.exports = INSERT_PAYMENT;
