const prisma = require("../../../Middlewares/prisma");

const UPDATE_GENDER = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    if(!id || isNaN(id))
    {
      return res.status(403).json({
        success:false,
        data:[],
        message: "Хүсэлтийн мэдээлэл дутуу эсвэл буруу байна."
      })
    }
    
    const data = await prisma.gender.findUnique({
      where: { id: parseInt(id) },
    });

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Өгөгдөл олдсонгүй.",
      });
    }

    let updateData = {};

    if (name !== undefined) updateData.name = name;

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({
        success: false,
        message: "Шинэчлэх өгөгдөл илгээгдээгүй байна.",
      });
    }

    const result = await prisma.gender.update({
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

module.exports = UPDATE_GENDER;
