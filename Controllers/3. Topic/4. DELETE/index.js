const prisma = require("../../../Middlewares/prisma")

const DELETE_TOPIC = async (req , res) => {
    try 
    {
        const {id} = req.params;

        if(!id)
        {
            return res.status(404).json({
                success:false,
                data:[],
                message: "Устгах сэдвийн ID байхгүй байна."
            })
        }

        const topic = await prisma.topic.findFirst({
            where: {
                id: parseInt(id)
            }
        })
        
        if(!topic)
        {
            return res.status(404).json({
                success:false,
                data:[],
                message: "Сонгосон сэдэв устсан эсвэл байхгүй байна."
            })
        }

        const result = await prisma.topic.delete({
            where:{ 
                id: parseInt(id)
            }
        })

        return res.status(200).json({
            success:true,
            data:[],
            message: "Сонгосон сэдвийг амжилттай устгалаа."
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

module.exports = DELETE_TOPIC