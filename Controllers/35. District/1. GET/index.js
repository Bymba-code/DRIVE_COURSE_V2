const prisma = require("../../../Middlewares/prisma")

const GET_ALL_DISTRICT = async (req , res) => {
    try 
    {
        const data = await prisma.district.findMany({})

        if(data.length === 0)
        {
            return res.status(404).json({
                success:false,
                data: [],
                message: "Өгөгдөл олдсонгүй."
            })
        }

        return res.status(200).json({
            success:true,
            data:data,
            message:"Амжилттай"
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

module.exports = GET_ALL_DISTRICT
