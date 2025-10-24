const prisma = require("../../../Middlewares/prisma")

const GET_ALL_TEST = async (req , res) => {
    try 
    {
        const {page, size, topic} = req.query;
        const skip = (page - 1) * size
        const take = parseInt(size)

        let test;

        if(page && size)
        {
            test = await prisma.test.findMany({
                skip:skip,
                take:take,
                select: {
                    id:true, 
                    name: true,
                    angilal: {
                        select:{
                            name:true
                        }
                    },
                    relTopic: {
                        select: {
                            name:true
                            
                        }
                    },
                    testAnswers: {
                        select: {
                            id:true,
                            title:true,
                            isSuccess:true
                        }
                    }
                },
            })
        }

        if(page && size && topic)
        {
            test = await prisma.test.findMany({
                skip: skip,
                take:take,
                select: {
                    id:true, 
                    name: true,
                    img:true,
                    angilal: {
                        select:{
                            name:true
                        }
                    },
                    relTopic: {
                        select: {
                            name:true
                            
                        }
                    },
                    testAnswers: {
                        select: {
                            id:true,
                            title:true,
                            isSuccess:true
                        }
                    }
                },
                where: 
                {
                    topic: parseInt(topic)
                }
            })
        }

        if(!page && !size && topic)
        {
            test = await prisma.test.findMany({
                select: {
                    id:true, 
                    name: true,
                    img:true,
                    angilal: {
                        select:{
                            name:true
                        }
                    },
                    relTopic: {
                        select: {
                            name:true
                            
                        }
                    },
                    testAnswers: {
                        select: {
                            id:true,
                            title:true,
                            isSuccess:true
                        }
                    }
                },
                where: 
                {
                    topic: parseInt(topic)
                },

            })
        }

        if(!page && !size && !topic)
        {
            test = await prisma.test.findMany({
                select: {
                    id:true, 
                    name: true,
                    img:true,
                    angilal: {
                        select:{
                            name:true
                        }
                    },
                    relTopic: {
                        select: {
                            name:true
                            
                        }
                    },
                    testAnswers: {
                        select: {
                            id:true,
                            title:true,
                            isSuccess:true
                        }
                    }
                }
            })
        }


        if(test.length === 0)
        {
            return res.status(404).json({
                success:false,
                data: [],
                message: "Өгөгдөл олдсонгүй."
            })
        }

        let totalCount;

        if(topic)
        {
            totalCount = await prisma.test.count({
                where: 
                {
                    topic:parseInt(topic)
                }
            })
        }
        
        if(!topic)
        {
            totalCount = await prisma.test.count()
        }


        if(page && size)
        {
            return res.status(200).json({
                success:true,
                data: test,
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
            data:test,
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

module.exports = GET_ALL_TEST
