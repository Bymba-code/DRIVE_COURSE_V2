const prisma = require("../../../Middlewares/prisma")

const GET_ALL_USER_CATEGORY = async (req , res) => {
    try 
    {
        const user = req.user;

        const data = await prisma.user_category.findMany({
            where:{
                user:parseInt(user?.id)
            },
            include:{
                user_category_payments_user_category_payments_user_categoryTouser_category:true
            }
        })

        if(data.length === 0)
        {
            return res.status(404).json({
                success:false,
                data: [],
                message: "Өгөгдөл олдсонгүй."
            })
        }

        return res.status(200).json({
            success:true,
            data:data,
            message:"Амжилттай"
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

module.exports = GET_ALL_USER_CATEGORY
