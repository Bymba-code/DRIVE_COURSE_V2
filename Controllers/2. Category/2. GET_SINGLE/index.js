const prisma = require("../../../Middlewares/prisma");

const GET_SINGLE_CATEGORY = async (req , res) => {
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
                id:parseInt(id)
            }
        })

        if(!category)
        {
            return res.status(404).json({
                success:false,
                data: [],
                message: "Сонгосон ангилал байхгүй эсвэл устсан байна."
            })
        }

        return res.status(200).json({
            success:true,
            data: category,
            message: "Амжилттай"
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

module.exports = GET_SINGLE_CATEGORY