const prisma = require("../../../Middlewares/prisma");

const INSERT_BLOODTYPE = async (req, res) => {
  try 
  {
    const { name } = req.body;

    if(!name)
    {
      return res.status(400).json({
        success:false,
        data:[],
        message: "Цусны бүлэг оруулна уу."
      })
    }

    const dataExist = await prisma.bloodtype.findFirst({
      where: {
        name,
      }
    })

    if(dataExist)
    {
      return res.status(400).json({
        success:false,
        data:[],
        message: "Тухайн мэдээлэл бүртгэгдсэн байна."
      })
    }

    const result = await prisma.bloodtype.create({
      data: {
        name
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

module.exports = INSERT_BLOODTYPE;
