const prisma = require("../../../Middlewares/prisma");

const UPDATE_CARS = async (req, res) => {
  try {
    const { id } = req.params;
    const { vechile, number } = req.body;

    if(!id || isNaN(id))
    {
      return res.status(403).json({
        success:false,
        data:[],
        message: "Хүсэлтийн мэдээлэл дутуу эсвэл буруу байна."
      })
    }
    
    const data = await prisma.cars.findUnique({
      where: { id: parseInt(id) },
    });

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Өгөгдөл олдсонгүй.",
      });
    }

    let updateData = {};

    if (vechile !== undefined) updateData.vechile = vechile;
    if (number !== undefined) updateData.number = number;

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({
        success: false,
        message: "Шинэчлэх өгөгдөл илгээгдээгүй байна.",
      });
    }

    const result = await prisma.cars.update({
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

module.exports = UPDATE_CARS;
