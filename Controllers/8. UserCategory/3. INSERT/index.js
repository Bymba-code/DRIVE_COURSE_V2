const prisma = require("../../../Middlewares/prisma")

const INSERT_USER_CATEGORY = async (req , res) => {
    try 
    {
        const {user, category} = req.body;

        if(!user)
        {
            return res.status(403).json({
                success:false,
                data:[],
                message:"Хэрэглэгчийг оруулна уу."
            })
        }
        if(!category)
        {
            return res.status(403).json({
                success:false,
                data:[],
                message:"Хамаарах ангилал-ыг оруулна уу."
            })
        }

        const isCategory = await prisma.category.findUnique({
            where: {
                id:parseInt(category)
            }
        })

        if(!isCategory)
        {
            return res.status(404).json({
                success:false,
                data:[],
                message:"Ангилал олдсонгүй."
            })
        }

        const isUser = await prisma.users.findUnique({
            where: {
                id:parseInt(user)
            }
        })
        if(!isUser)
        {
            return res.status(404).json({
                success:false,
                data:[],
                message:"Хэрэглэгч олдсонгүй."
            })
        }

        const isAvailable = await prisma.user_category.findMany({
            where: {
                user:parseInt(user),
                category:parseInt(category)
            }
        })
        if(isAvailable.length > 0)
            {
                return res.status(404).json({
                    success:false,
                    data:[],
                    message:"Ангилал аль хэдийн нэмэгдсэн байна."
                })
            }
        
            

        const result = await prisma.user_category.create({
            data: {
                user:parseInt(user),
                category:parseInt(category),
                date: new Date()
            }
        })
        
        return res.status(200).json({
            success:true,
            data:[],
            message: "Амжилттай."
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

module.exports = INSERT_USER_CATEGORY