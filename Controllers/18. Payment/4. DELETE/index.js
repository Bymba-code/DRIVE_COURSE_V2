const prisma = require("../../../Middlewares/prisma")

const DELETE_INVOICE = async (req , res) => {
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

       const isTest = await prisma.invoices.findFirst({
            where: {
                id: parseInt(id)
            }
       })

       if(!isTest)
       {
            return res.status(404).json({
                success:false,
                data:[],
                message: "Өгөгдөл олдсонгүй."
            })
       }

       const result = await prisma.invoices.delete({
            where:{
                id: parseInt(id)
            }
       })

       return res.status(200).json({
            success:true,
            data:[],
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

module.exports = DELETE_INVOICE