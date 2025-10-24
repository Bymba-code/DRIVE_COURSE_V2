const prisma = require("../../../Middlewares/prisma")

const DELETE_EXAM = async (req , res) => {
    try 
    {
        const {id} = req.params;

        if(!id)
        {
            return res.status(403).json({
                success:false,
                data:[],
                message: "Устгах шалгалтын ID оруулна уу."
            })
        }

        const exam = await prisma.exam.findFirst({
            where: {
                id: parseInt(id)
            }
        })

        if(!exam)
        {
            return res.status(404).json({
                success:false,
                data:[],
                message: "Шалгалт устсан эсвэл байхгүй байна."
            })
        }

        if(req.user.role === "admin")
        {
            const result = await prisma.exam.delete({
                where: {
                    id: parseInt(id)
                }
            })
            
            return res.status(200).json({
                success:false,
                data:[],
                message: "Админы эрхээр амжилттай устгалаа"
            })
        }


        if(exam.user !== req.user.id)
        {
            return res.status(401).json({
                success:false,
                data:[],
                message: "Таны устгах эрх хүрэхгүй байна."
            })
        }

        const result = await prisma.exam.delete({
            where: {
                id:parseInt(id)
            }
        })

        return res.status(200).json({
            success:true,
            data:[],
            message: "Амжилттай устгалаа."
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

module.exports = DELETE_EXAM