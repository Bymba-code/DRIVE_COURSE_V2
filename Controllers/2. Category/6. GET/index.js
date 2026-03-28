const prisma = require("../../../Middlewares/prisma")

const GET_ALL_CATEGORIES = async (req , res) => {
    try 
    {
        const {page, size} = req.query;
        const skip = (page - 1) * size
        const take = parseInt(size)

        const data = await prisma.category.findMany({})

        return res.status(200).json({
            success:false,
            data:data,
            message: "Амжилттай."
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

module.exports = GET_ALL_CATEGORIES