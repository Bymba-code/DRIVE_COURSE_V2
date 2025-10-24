const prisma = require('../../../Middlewares/prisma')

const GET_ALL_TEACHER_CATEGORY = async (req, res) => {
    try 
    {
        
        const data = await prisma.teacher_category.findMany({})

        if(data.length === 0)
        {
            return res.status(404).json({
                success:false,
                data:[],
                message: "Мэдээлэл олдсонгүй."
            })
        }

        return res.status(200).json({
            success:false,
            data:data,
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

module.exports = GET_ALL_TEACHER_CATEGORY