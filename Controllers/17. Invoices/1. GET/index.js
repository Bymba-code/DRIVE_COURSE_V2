const prisma = require("../../../Middlewares/prisma");

const GET_ALL_INVOICE = async (req, res) => {
  try {
    const page = parseInt(req.query.page);
    const size = parseInt(req.query.size);

    let invoices = [];
    let totalCount = 0;

    if (!isNaN(page) && !isNaN(size)) {
      const skip = (page - 1) * size;

      totalCount = await prisma.invoices.count();

      invoices = await prisma.invoices.findMany({
        skip: skip,
        take: size,
        include: {
            users: true,
            payments:true
        },
        orderBy: {
          created_at: 'desc', 
        },
      });

      return res.status(200).json({
        success: true,
        data: invoices,
        message: "Амжилттай.",
        pagination: {
          page: page,
          size: size,
          total: totalCount,
          pages: Math.ceil(totalCount / size),
        },
      });
    }

    // Хэрвээ page, size ирээгүй бол бүгдийг буцаана
    invoices = await prisma.invoices.findMany({
      include: {
        users: true,
        payments:true
      },
      orderBy: {
        created_at: 'desc',
      },
    });

    if (!invoices.length) {
      return res.status(404).json({
        success: false,
        data: [],
        message: "Өгөгдөл олдсонгүй.",
      });
    }

    return res.status(200).json({
      success: true,
      data: invoices,
      message: "Амжилттай.",
    });
  } catch (err) {
    console.error("Invoice авахад алдаа гарлаа:", err);
    return res.status(500).json({
      success: false,
      data: [],
      message: "Серверийн алдаа гарлаа.",
      error: err.message || err,
    });
  }
};

module.exports = GET_ALL_INVOICE;
