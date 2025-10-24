const prisma = require("../../../Middlewares/prisma")

const GET_SINGLE_LESSONS = async (req , res) => {
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

        const lessons = await prisma.lessons.findFirst({
            where: {
                id: parseInt(id)
            },
        })

        if(!lessons)
        {
            return res.status(404).json({
                success:false,
                data:[],
                message: "Өгөгдөл олдсонгүй."
            })
        }
        
        return res.status(200).json({
            success:true,
            data:lessons,
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

module.exports = GET_SINGLE_LESSONS
