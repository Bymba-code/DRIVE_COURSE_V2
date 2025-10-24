const prisma = require('../../../Middlewares/prisma')

const GET_ALL_SCHELUDE = async (req, res) => {
  try {
    const { page, size, teacher } = req.query;
    const pageNum = parseInt(page);
    const sizeNum = parseInt(size);

    const whereClause = {};

    if (teacher) {
      whereClause.teacher = parseInt(teacher); 
    }

    let schelude;
    let totalCount;

    if (pageNum && sizeNum) {
      const skip = (pageNum - 1) * sizeNum;
      
      schelude = await prisma.schelude.findMany({
        where: whereClause,
        skip,
        take: sizeNum,
        include:{
          user_schelude_user_schelude_scheludeToschelude:true,
          teacher_schelude_teacherToteacher:true,
          category_schelude_categoryTocategory:true
        },
      });

      totalCount = await prisma.schelude.count({
        where: whereClause,
      });
    } else {
      schelude = await prisma.schelude.findMany({
        include:{
          user_schelude_user_schelude_scheludeToschelude:true,
          teacher_schelude_teacherToteacher:true,
          category_schelude_categoryTocategory:true
        },
        where: whereClause,
        
      });

      totalCount = await prisma.schelude.count({
        
        where: whereClause,
        
      });
    }

    if (!schelude || schelude.length === 0) {
      return res.status(404).json({
        success: false,
        data: [],
        message: "Өгөгдөл олдсонгүй.",
      });
    }

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
      total: totalCount,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      data: [],
      message: "Серверийн алдаа гарлаа: " + err.message,
    });
  }
};

module.exports = GET_ALL_SCHELUDE;