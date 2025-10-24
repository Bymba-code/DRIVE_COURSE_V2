const prisma = require("../../../Middlewares/prisma");

const UPDATE_PROGRESS = async (req, res) => {
  try {
    const user = req.user;
    const { video, isTopic, topicProgress, correct, wrong } = req.body;


    const existingProgress = await prisma.user_progress.findFirst({
      where: { 
        user:parseInt(user?.id),
        video: parseInt(video)
      },
    });

    if (!existingProgress) {
      return res.status(404).json({
        success: false,
        message: "Ийм progress бичлэг олдсонгүй.",
      });
    }

    let updateData = {};
    if (isTopic !== undefined) updateData.isTopic = parseInt(isTopic);
    if (topicProgress !== undefined) updateData.topicProgress = parseInt(topicProgress);
    if (correct !== undefined) updateData.correct = parseInt(correct);
    if (wrong !== undefined) updateData.wrong = parseInt(wrong);
    updateData.updated_at = new Date();

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({
        success: false,
        message: "Шинэчлэх өгөгдөл илгээгдээгүй байна.",
      });
    }

    const updatedProgress = await prisma.user_progress.update({
      where: { id: parseInt(existingProgress.id) },
      data: updateData,
    });

    return res.status(200).json({
      success: true,
      data: updatedProgress,
      message: "Progress амжилттай шинэчлэгдлээ.",
    });
  } catch (err) {
    console.error("UPDATE_PROGRESS error:", err);
    return res.status(500).json({
      success: false,
      message: "Серверийн алдаа гарлаа: " + err.message,
    });
  }
};

module.exports = UPDATE_PROGRESS;
