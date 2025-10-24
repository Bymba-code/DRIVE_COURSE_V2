const prisma = require('../../../Middlewares/prisma')

const GET_ALL_DRIVING_SCHELUDE = async (req, res) => {
  try {
    const { page, size } = req.query;
    const pageNum = parseInt(page);
    const sizeNum = parseInt(size);

    let schelude;

    if (pageNum && sizeNum) {
      const skip = (pageNum - 1) * sizeNum;
      schelude = await prisma.driving_schelude.findMany({
        skip,
        take: sizeNum,
        include: {
          teacher_driving_schelude_teacherToteacher:true,
          category_driving_schelude_categoryTocategory:true,
          user_driving_schelude:true
        }
      });
    } else {
      schelude = await prisma.driving_schelude.findMany({
        include:{
          teacher_driving_schelude_teacherToteacher:true,
          category_driving_schelude_categoryTocategory:true,
          user_driving_schelude:true
        }
      });
    }

    if (!schelude || schelude.length === 0) {
      return res.status(404).json({
        success: false,
        data: [],
        message: "Өгөгдөл олдсонгүй.",
      });
    }

    const totalCount = await prisma.driving_schelude.count();

    if (pageNum && sizeNum) {
      return res.status(200).json({
        success: true,
        data: schelude,
        message: "Амжилттай.",
        pagination: {
          page: pageNum,
          size: sizeNum,
          total: totalCount,
          pages: Math.ceil(totalCount / sizeNum),
        },
      });
    }

    return res.status(200).json({
      success: true,
      data: schelude,
      message: "Амжилттай.",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      data: [],
      message: "Серверийн алдаа гарлаа: " + err.message,
    });
  }
};

module.exports = GET_ALL_DRIVING_SCHELUDE;
