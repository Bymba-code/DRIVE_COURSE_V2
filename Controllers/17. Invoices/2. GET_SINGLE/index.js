const prisma = require("../../../Middlewares/prisma")

const GET_SINGLE_INVOICE = async (req , res) => {
    try 
    {
        const {id} = req.params

        if(!id || isNaN(id))
        {
            return res.status(403).json({
                success:false,
                data:[],
                message: "Хүсэлтийн мэдээлэл дутуу эсвэл буруу байна."
            })
        }

        const test = await prisma.invoices.findFirst({
            where: {
                id: parseInt(id)
            },
            include: {
                users:true,
                payments:true
            }
        })

        if(!test)
        {
            return res.status(404).json({
                success:false,
                data:[],
                message: "Өгөгдөл олдсонгүй."
            })
        }
        
        return res.status(200).json({
            success:true,
            data:test,
            message: "Амжилттай"
        })

    }
    catch(err)
    {
        return res.status(500).json({
            success:false,
            data: [],
            message: "Серверийн алдаа гарлаа."
        })
    }
}

module.exports = GET_SINGLE_INVOICE
