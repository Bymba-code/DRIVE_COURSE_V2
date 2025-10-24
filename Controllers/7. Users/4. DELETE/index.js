const prisma = require("../../../Middlewares/prisma")

const DELETE_USERS = async (req , res) => {
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

        const result = await prisma.users.delete({
            where: {
                id:parseInt(id)
            }
        })
        
        return res.status(200).json({
            success:true,
            data:[],
            message:"Амжилттай"
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

module.exports = DELETE_USERS
