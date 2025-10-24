const prisma = require("../../../Middlewares/prisma")

const GET_ALL_TOPIC = async (req , res) => {
    try 
    {
        const {page, size, category} = req.query;
        const skip = (page - 1) * size
        const take = parseInt(size)

        let topic;

        if(!page && !size && category)
        {
            topic = await prisma.topic.findMany({
                include: {
                    category_topic_categoryTocategory:true,
                    test_test_topicTotopic:true

                },
                where: {
                    category: parseInt(category)
                }
            })
        }

        if(!page && !size && !category)
        {
            topic = await prisma.topic.findMany({
                include: {
                    category_topic_categoryTocategory:true,
                    test_test_topicTotopic:true

                },
            })
        }

        if(page && size)
        {
            topic = await prisma.topic.findMany({
                skip:skip,
                take:take,
                include: {
                    category_topic_categoryTocategory:true,
                    test_test_topicTotopic:true

                },
            })
        }

        if(page && size && category)
        {
            topic = await prisma.topic.findMany({
                skip:skip,
                take:take,
                include: {
                    category_topic_categoryTocategory:true,
                    test_test_topicTotopic:true
                },
                where: {
                    category: parseInt(category)
                }
            })
        }

        if(topic.length === 0)
        {
            return res.status(404).json({
                success:false,
                data:[],
                message: "Өгөгдөл олдсонгүй."
            })
        }

        let totalCount;
        
        if(category)
        {
            totalCount = await prisma.topic.count({
                where:
                {
                    category: parseInt(category)
                }
            })
        }

        if(!category)
        {
            totalCount = await prisma.topic.count()
        }

        if(page && size)
        {
            return res.status(200).json({
                success:true,
                data: topic,
                message: "Амжилттай.",
                pagination: {
                    page: parseInt(page),
                    size: parseInt(size),
                    total: totalCount,
                    pages: Math.ceil(totalCount / size),
                },
        })}

        
        return res.status(200).json({
            success:true,
            data:topic,
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

module.exports = GET_ALL_TOPIC