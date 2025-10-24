const prisma = require("../../../Middlewares/prisma")

const DELETE_USERS_CATEGORY = async (req , res) => {
    try 
    {
        const {id} = req.params;

        if(!id || isNaN(id) || id === undefined)
        {
            return res.status(403).json({
                success:false,
                data:[],
                message: "Буруу хүсэлт ID байхгүй эсвэл буруу байна."
            })
        }

        const isAvailable = await prisma.user_category.findUnique({
            where: {
                id:parseInt(id)
            }
        })
        if(!isAvailable)
        {
            return res.status(404).json({
                success:false,
                data:[],
                message:"Өгөгдөл олдсонгүй."
            })
        }

        const result = await prisma.user_category.delete({
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

module.exports = DELETE_USERS_CATEGORY