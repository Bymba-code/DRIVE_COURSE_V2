
const prisma = require("../../../Middlewares/prisma")

const GET_SINGLE_USERS = async (req , res) => {
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

        const user = await prisma.users.findUnique({
            include: {
                user_category: {
                    include: {
                        category_user_category_categoryTocategory: {
                            select: {
                                id: true,
                                name: true,
                                // Any other category fields you want to include
                            }
                        }
                    }
                }
            },
            where: {
                id:parseInt(id)
            }
        })

        if(!user)
        {
            return res.status(404).json({
                success:false,
                data:[],
                message: "Хэрэглэгч олдсонгүй. "
            })
        }

        return res.status(200).json({
            success:false,
            data:user,
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

module.exports = GET_SINGLE_USERS