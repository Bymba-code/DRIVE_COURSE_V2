const prisma = require("../../../Middlewares/prisma")

const GET_ALL_VIDEOS = async (req , res) => {
    try 
    {
        const {page, size} = req.query;
        const skip = (page - 1) * size
        const take = parseInt(size)

        let videos;

        if(page && size)
        {
            videos = await prisma.videos.findMany({
                skip:skip,
                take:take,
            })
        }

        if(!page && !size)
        {
            videos = await prisma.videos.findMany({
               
            })
        }


        if(videos.length === 0)
        {
            return res.status(404).json({
                success:false,
                data: [],
                message: "Өгөгдөл олдсонгүй."
            })
        }

        let totalCount;

        totalCount = await prisma.videos.count()
        


        if(page && size)
        {
            return res.status(200).json({
                success:true,
                data: videos,
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
            data:videos,
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

module.exports = GET_ALL_VIDEOS
