const prisma = require("../../../Middlewares/prisma");

const INSERT_DISTRICT = async (req, res) => {
  try 
  {
    const { name, city} = req.body;

    if(!city)
    {
      return res.status(400).json({
        success:false,
        data:[],
        message: "Хот / Аймагийн сонгоно уу."
      })
    }
    if(!name)
    {
      return res.status(400).json({
        success:false,
        data:[],
        message: "Дүүрэг / Сумын нэр оруулна уу."
      })
    }

    const dataExist = await prisma.district.findFirst({
      where: {
        name,
        city: parseInt(city)
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

    const result = await prisma.district.create({
      data: {
        name,
        city: parseInt(city)
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

module.exports = INSERT_DISTRICT;
