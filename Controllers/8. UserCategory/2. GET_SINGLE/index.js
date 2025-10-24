const prisma = require("../../../Middlewares/prisma")

const GET_SINGLE_USER_CATEGORY = async (req , res) => {
    try 
    {
        const {id} = req.params;

        if(!id || isNaN(id) || id === undefined)
        {
            return res.status(403).json({
                success:false,
                data:[],
                message: "Хэрэглэгчийн ID буруу эсвэл байхгүй байна."
            })
        }

        const isUser = await prisma.users.findUnique({
            where: {
                id:parseInt(id)
            }
        })

        if(!isUser)
        {
            return res.status(404).json({
                success:false,
                data:[],
                message: "Хэрэглэгч олдсонгүй."
            })
        }

        const userCategories = await prisma.user_category.findMany({
            include: {
                category_user_category_categoryTocategory: {
                    select: {
                        id: true,
                        name: true,
                    }
                }
            },
            where: {
                user: parseInt(id)
            }
        })

        if(!userCategories)
        {
            return res.status(404).json({
                success:false,
                data:[],
                message: "хэрэглэгч ямар нэгэн ангилалд хамааралгүй байна."
            })
        }

        return res.status(200).json({
            success:false,
            data:userCategories,
            message: "Амжилттай"
        })
    }
    catch(err)
    {
        return res.status(500).json({
            success:false,
            data:[],
            message: "Серверийн алдаа гарлаа." + err
        })
    }
}

module.exports = GET_SINGLE_USER_CATEGORY