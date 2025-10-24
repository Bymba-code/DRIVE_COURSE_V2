const prisma = require('../../../Middlewares/prisma')

const UPDATE_SCHELUDE = async (req, res) => {
  try {
    const { id } = req.params;
    const { 
      user, 
      category, 
      teacher, 
      schelude_date, 
      start_time, 
      end_time, 
      location, 
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

    const existingSchelude = await prisma.schelude.findUnique({
      where: { id: parseInt(id) },
    });

    if (!existingSchelude) {
      return res.status(404).json({
        success: false,
        data: [],
        message: "Өгөгдөл олдсонгүй.",
      });
    }

    let updateData = {};

    if (user) updateData.user = parseInt(user);
    if (category) updateData.category = parseInt(category);
    if (teacher) updateData.teacher = parseInt(teacher);
    if (schelude_date) updateData.schelude_date = new Date(schelude_date);
    if (start_time) updateData.start_time = new Date(start_time);
    if (end_time) updateData.end_time = new Date(end_time);
    if (location) updateData.location = location;
    if (note) updateData.note = note;

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({
        success: false,
        data: [],
        message: "Шинэчлэх өгөгдөл илгээгдсэнгүй.",
      });
    }

    // ✅ 4. Update хийх
    const result = await prisma.schelude.update({
      where: { id: parseInt(id) },
      data: updateData,
    });

    // ✅ 5. Амжилттай хариу
    return res.status(200).json({
      success: true,
      data: result,
      message: "Амжилттай шинэчиллээ.",
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      data: [],
      message: "Серверийн алдаа гарлаа: " + err.message,
    });
  }
};

module.exports = UPDATE_SCHELUDE;
