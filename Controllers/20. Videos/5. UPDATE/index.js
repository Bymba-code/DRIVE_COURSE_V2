const prisma = require("../../../Middlewares/prisma");

const UPDATE_VIDEO = async (req, res) => {
  try {
    const { id } = req.params;
    const { category, topic, index, title, url } = req.body;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "ID параметр заавал шаардлагатай.",
      });
    }

    // 1️⃣ Бичлэг байгаа эсэхийг шалгах
    const existingVideo = await prisma.videos.findUnique({
      where: { id: parseInt(id) },
    });

    if (!existingVideo) {
      return res.status(404).json({
        success: false,
        message: "Ийм бичлэг олдсонгүй.",
      });
    }

    // 2️⃣ Шинэчлэх өгөгдөл бэлтгэх
    let updateData = {};

    if (category !== undefined) updateData.category = category;
    if (topic !== undefined) updateData.topic = topic;
    if (index !== undefined) updateData.order_index = parseInt(index);
    if (title !== undefined) updateData.title = title;
    if (url !== undefined) updateData.url = url;

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({
        success: false,
        message: "Шинэчлэх өгөгдөл илгээгдээгүй байна.",
      });
    }

    // 3️⃣ Prisma update хийх
    const updatedVideo = await prisma.videos.update({
      where: { id: parseInt(id) },
      data: updateData,
    });

    // 4️⃣ Амжилтын хариу буцаах
    return res.status(200).json({
      success: true,
      data: updatedVideo,
      message: "Видео амжилттай шинэчлэгдлээ.",
    });
  } catch (err) {
    console.error("UPDATE_VIDEO error:", err);
    return res.status(500).json({
      success: false,
      message: "Серверийн алдаа гарлаа: " + err.message,
    });
  }
};

module.exports = UPDATE_VIDEO;
