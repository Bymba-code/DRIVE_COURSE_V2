const prisma = require("../../../Middlewares/prisma")

const UPDATE_TOPIC = async (req , res) => {
    try 
    {
       const {id} = req.params;
       const {name} = req.body;
    

       if(!id)
       {
            return res.status(404).json({
                success:false,
                data:[],
                message: "Устгах сэдвийн ID байхгүй байна."
            })
       }

       if(!name)
       {
            return res.status(404).json({
                success:false,
                data:[],
                message: "Шинэчлэх нэрийг оруулна уу."
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

       const checkName = await prisma.topic.findFirst({
            where: {
                name: name
            }
       })

       if(checkName)
       {
            return res.status(403).json({
                success:false,
                data:[],
                message: `${name}-нэртэй ангилал аль хэдийн нэмэгдсэн байна.`
            })
       }

       const result = await prisma.topic.update({
            where: {
                id:parseInt(id)
            },
            data: {
                name:name
            }
       })

       return res.status(200).json({
            sucess:true,
            data:[],
            message: "Амжилттай шинэчиллээ."
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

module.exports = UPDATE_TOPIC