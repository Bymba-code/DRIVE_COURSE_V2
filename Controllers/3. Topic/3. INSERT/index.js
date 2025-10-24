const prisma = require("../../../Middlewares/prisma")

const INSERT_TOPIC = async (req , res) => {
    try 
    {
        const {name, category} = req.body;

        if(!name)
        {
            return res.status(403).json({
                success:false,
                data:[],
                message:"Сэдэвийн нэр хоосон байна."
            })
        }
        if(!category)
        {
            return res.status(403).json({
                success:false,
                data:[],
                message: "Сэдвийн хамаарах ангилал хоосон байна."
            })
        }

        const result = await prisma.topic.create({
            data: {
                name:name,
                category:parseInt(category),
                date: new Date()
            }
        })

        return res.status(200).json({
            success:true,
            data:[],
            message: "Сэдвийг амжилттай нэмлээ."
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

module.exports = INSERT_TOPIC