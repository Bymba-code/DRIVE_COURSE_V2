const prisma = require('../../../Middlewares/prisma')

const UPDATE_DRIVING_SCHELUDE = async (req, res) => {
  try {
    const { id } = req.params;
    const { 
      category, 
      teacher, 
      vechile, 
      area, 
      schelude_date, 
      start_time, 
      end_time, 
      note 
    } = req.body;

    // ✅ 1. ID шалгах
    if (!id || isNaN(id)) {
      return res.status(400).json({
        success: false,
        data: [],
        message: "ID буруу эсвэл байхгүй байна.",
      });
    }

    // ✅ 2. Өгөгдөл байгаа эсэхийг шалгах
    const existingSchelude = await prisma.driving_schelude.findUnique({
      where: { id: parseInt(id) },
    });

    if (!existingSchelude) {
      return res.status(404).json({
        success: false,
        data: [],
        message: "Жолооны хуваарь олдсонгүй.",
      });
    }

    // ✅ 3. Шинэчлэх өгөгдлийг цуглуулах
    let updateData = {};

    if (category) updateData.category = parseInt(category);
    if (teacher) updateData.teacher = parseInt(teacher);
    if (vechile) updateData.vechile = vechile;
    if (area) updateData.area = area;
    if (schelude_date) updateData.schelude_date = new Date(schelude_date);
    if (start_time) updateData.start_time = new Date(start_time);
    if (end_time) updateData.end_time = new Date(end_time);
    if (note) updateData.note = note;

    // ✅ Хоосон update шалгах
    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({
        success: false,
        data: [],
        message: "Шинэчлэх өгөгдөл илгээгдсэнгүй.",
      });
    }

    // ✅ 4. Update хийх
    const result = await prisma.driving_schelude.update({
      where: { id: parseInt(id) },
      data: updateData,
    });

    // ✅ 5. Амжилттай хариу буцаах
    return res.status(200).json({
      success: true,
      data: result,
      message: "Жолооны хуваарь амжилттай шинэчлэгдлээ.",
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      data: [],
      message: "Серверийн алдаа гарлаа: " + err.message,
    });
  }
};

module.exports = UPDATE_DRIVING_SCHELUDE;
