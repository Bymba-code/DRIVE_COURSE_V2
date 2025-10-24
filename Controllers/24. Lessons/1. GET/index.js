const prisma = require("../../../Middlewares/prisma")

const GET_ALL_LESSONS = async (req , res) => {
    try 
    {
        const {page, size} = req.query;
        const skip = (page - 1) * size
        const take = parseInt(size)

        let lessons;

        if(page && size)
        {
            lessons = await prisma.lessons.findMany({
                skip:skip,
                take:take,
            })
        }

        if(!page && !size)
        {
            lessons = await prisma.lessons.findMany({
               
            })
        }


        if(lessons.length === 0)
        {
            return res.status(404).json({
                success:false,
                data: [],
                message: "Өгөгдөл олдсонгүй."
            })
        }

        let totalCount;

        totalCount = await prisma.lessons.count()
        


        if(page && size)
        {
            return res.status(200).json({
                success:true,
                data: lessons,
                message: "Амжилттай.",
                pagination: {
                    page: parseInt(page),
                    size: parseInt(size),
                    total: totalCount,
                    pages: Math.ceil(totalCount / size),
                },
            })
        }


        return res.status(200).json({
            success:true,
            data:lessons,
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

module.exports = GET_ALL_LESSONS
