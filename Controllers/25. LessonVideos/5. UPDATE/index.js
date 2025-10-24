const prisma = require("../../../Middlewares/prisma");

const UPDATE_LESSON_VIDEOS = async (req, res) => {
  try {
    const { id } = req.params;
    const { title , index, file} = req.body;


    if (!id) {
      return res.status(400).json({
        success: false,
        message: "ID параметр заавал шаардлагатай.",
      });
    }

    const existingVideo = await prisma.lesson_videos.findUnique({
      where: { id: parseInt(id) },
    });

    if (!existingVideo) {
      return res.status(404).json({
        success: false,
        message: "Өгөгдөл олдсонгүй.",
      });
    }

    let updateData = {};

    if (title !== undefined) updateData.title = title;
    if (index !== undefined) updateData.index = index;
    if (file !== undefined) updateData.file = file;


    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({
        success: false,
        message: "Шинэчлэх өгөгдөл илгээгдээгүй байна.",
      });
    }

    const result = await prisma.lesson_videos.update({
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

module.exports = UPDATE_LESSON_VIDEOS;
