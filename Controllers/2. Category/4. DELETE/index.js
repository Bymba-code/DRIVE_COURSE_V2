const prisma = require("../../../Middlewares/prisma")

const DELETE_CATEGORY = async (req , res) => {
    try 
    {
        const {id} = req.params;

        if(!id)
        {
            return res.status(404).json({
                success:false,
                data: [],
                message: "Сонгосон ангилалын ID хоосон байна."
            })
        }

        const category = await prisma.category.findUnique({
            where: {
                id: parseInt(id)
            }
        })

        if(!category)
        {
            return res.status(404).json({
                success:false,
                data: [],
                message: `Ангилал устсан эсвэл байхгүй байна.`
            })
        }

        const result = await prisma.category.delete({
            where: {
                id: parseInt(id)
            }
        })

        return res.status(200).json({
            success:true,
            data: [],
            message: `Ангилалыг амжилттай устгалаа`
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

module.exports = DELETE_CATEGORY