const prisma = require("../../../Middlewares/prisma");

const INSERT_CARS = async (req, res) => {
  try 
  {
    const { vechile, number } = req.body;

    if(!vechile)
    {
      return res.status(400).json({
        success:false,
        data:[],
        message: "Автомашины нэршил оруулна уу."
      })
    }
    if(!number)
    {
      return res.status(400).json({
        success:false,
        data:[],
        message: "Машины дугаар оруулна уу."
      })
    }

    const vechileExist = await prisma.cars.findFirst({
      where: {
        vechile, 
        number
      }
    })

    if(vechileExist)
    {
      return res.status(400).json({
        success:false,
        data:[],
        message: "Тухайн автомашин нэмэгдсэн байна."
      })
    }

    const result = await prisma.cars.create({
      data: {
        vechile, 
        number
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

module.exports = INSERT_CARS;
