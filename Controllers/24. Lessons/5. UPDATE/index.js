const prisma = require("../../../Middlewares/prisma");

const UPDATE_LESSONS = async (req, res) => {
  try {
    const { id } = req.params;
    const { name , index} = req.body;


    if (!id) {
      return res.status(400).json({
        success: false,
        message: "ID параметр заавал шаардлагатай.",
      });
    }

    const existingLesson = await prisma.lessons.findUnique({
      where: { id: parseInt(id) },
    });

    if (!existingLesson) {
      return res.status(404).json({
        success: false,
        message: "Өгөгдөл олдсонгүй.",
      });
    }

    let updateData = {};

    if (name !== undefined) updateData.name = name;
    if (index !== undefined) updateData.index = index;

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({
        success: false,
        message: "Шинэчлэх өгөгдөл илгээгдээгүй байна.",
      });
    }

    const result = await prisma.lessons.update({
      where: { id: parseInt(id) },
      data: updateData,
    });

    return res.status(200).json({
      success: true,
      data: result,
      message: "Амжилттай шинэчлэгдлээ.",
    });
  } catch (err) {
    console.error("UPDATE_VIDEO error:", err);
    return res.status(500).json({
      success: false,
      message: "Серверийн алдаа гарлаа: " + err.message,
    });
  }
};

module.exports = UPDATE_LESSONS;
