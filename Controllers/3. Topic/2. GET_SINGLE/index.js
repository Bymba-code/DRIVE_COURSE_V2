const prisma = require("../../../Middlewares/prisma")

const GET_SINGLE_TOPIC = async (req , res) => {
    try 
    {
        const {id} = req.params

        const topic = await prisma.topic.findUnique({
            where: {
                id: parseInt(id)
            }
        })

        if(!topic)
        {
            return res.status(404).json({
                success:false,
                data:[],
                message: "Хайсан ангилал устсан эсвэл байхгүй байна"
            })
        }
        
        return res.status(200).json({
            success:true,
            data:topic,
            message: "Амжилттай"
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

module.exports = GET_SINGLE_TOPIC