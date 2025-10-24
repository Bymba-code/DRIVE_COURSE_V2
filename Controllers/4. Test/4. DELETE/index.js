const prisma = require("../../../Middlewares/prisma")

const DELETE_TEST = async (req , res) => {
    try 
    {
       const {id} = req.params;

       if(!id)
       {
            return res.status(403).json({
                success:false,
                data: [],
                message: "Устгах тестийн ID байхгүй байна."
            })
       }

       const isTest = await prisma.test.findFirst({
            where: {
                id: parseInt(id)
            }
       })

       if(!isTest)
       {
            return res.status(404).json({
                success:false,
                data:[],
                message: "Тест байхгүй эсвэл устсан байна."
            })
       }

       const result = await prisma.test.delete({
            where:{
                id: parseInt(id)
            }
       })

       return res.status(200).json({
            success:true,
            data:[],
            message:"Сонгосон тестийг амжилттай устгалаа."
       })




    }
    catch(err)
    {
        return res.status(500).json({
            success:false,
            data: [],
            message: "Серверийн алдаа гарлаа." + " " + err
        })
    }
}

module.exports = DELETE_TEST