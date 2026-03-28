const prisma = require("../../../Middlewares/prisma")

const DELETE_DISTRICT = async (req , res) => {
    try 
    {
       const {id} = req.params;

       if(!id)
       {
            return res.status(403).json({
                success:false,
                data: [],
                message: "Хүсэлтийн мэдээлэл дутуу эсвэл буруу байна."
            })
       }

       const data = await prisma.district.findUnique({
            where: {
                id: parseInt(id)
            }
       })

       if(!data)
       {
            return res.status(404).json({
                success:false,
                data:[],
                message: "Өгөгдөл олдсонгүй."
            })
       }

       const result = await prisma.district.delete({
            where:{
                id: parseInt(id)
            }
       })

       return res.status(200).json({
            success:true,
            data:result,
            message:"Амжилттай."
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

module.exports = DELETE_DISTRICT