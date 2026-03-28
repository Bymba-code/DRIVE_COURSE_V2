const prisma = require("../../../Middlewares/prisma");

const INSERT_WARDS = async (req, res) => {
  try 
  {
    const { name, district} = req.body;

    if(!district)
    {
      return res.status(400).json({
        success:false,
        data:[],
        message: "Дүүрэг / Сум сонгоно уу."
      })
    }
    if(!name)
    {
      return res.status(400).json({
        success:false,
        data:[],
        message: "Хороо / Баг нэр оруулна уу."
      })
    }

    const dataExist = await prisma.wards.findFirst({
      where: {
        name,
        district: parseInt(district)
      }
    })

    if(dataExist)
    {
      return res.status(400).json({
        success:false,
        data:[],
        message: "Тухайн Дүүрэг / Сум нэмэгдсэн байна."
      })
    }

    const result = await prisma.wards.create({
      data: {
        name,
        district: parseInt(district)
      }
    })

    return res.status(200).json({
      success:true,
      data:result,
      message: "Амжилттай."
    })
  } 
  catch (err) 
  {
    return res.status(500).json({
      success: false,
      message: "Серверийн алдаа гарлаа. " + err
    });
  }
};

module.exports = INSERT_WARDS;
