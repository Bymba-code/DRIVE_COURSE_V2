const prisma = require("../../../Middlewares/prisma")

const GET_SINGLE_TEST = async (req , res) => {
    try 
    {
        const {id} = req.params

        if(!id || isNaN(id))
        {
            return res.status(403).json({
                success:false,
                data:[],
                message: "Сонгосон тестийн ID байхгүй байна."
            })
        }

        const test = await prisma.test.findFirst({
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
            where: {
                id: parseInt(id)
            },
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

module.exports = GET_SINGLE_TEST
