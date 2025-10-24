const prisma = require("../../../Middlewares/prisma")

const UPDATE_CATEGORY = async (req , res) => {
    try 
    {
        const {id} = req.params;
        const {name} = req.body;

        if(!id)
        {
            return res.status(403).json({
                success:false,
                data:[],
                message: "Ангилалын ID байхгүй байна."
            })
        }
        if(!name)
        {
            return res.status(403).json({
                success:false,
                data:[],
                message:"Ангилалын шинэчлэх нэрийг оруулна уу."
            })
        }

        const resultOne = await prisma.category.findUnique({
            where: {
                id: parseInt(id)
            }
        })

        if(!resultOne)
        {
            return res.status(404).json({
                success:false,
                data: [],
                message: "Сонгосон ангилал устарсан эсвэл байхгүй байна."
            })
        }

        const resultTwo = await prisma.category.findFirst({
            where: {
                name: name
            }
        })

        if(resultTwo)
        {
            return res.status(403).json({
                success:false,
                data:[],
                message:`${name} нэртэй ангилал аль хэдийн нэмэгдсэн байна.`
            })
        }

        const resultThree = await prisma.category.update({
            where: {
                id:parseInt(id)
            },
            data: {
                name
            }
        })

        return res.status(200).json({
            success:true,
            data:[],
            message: "Амжилттай шинэчлэгдлээ."
        })

    }
    catch(err)
    {
        return res.status(500).json({
            success:false,
            data:[],
            message: "Серверийн алдаа гарлаа." + " " + err
        })
    }
}

module.exports = UPDATE_CATEGORY