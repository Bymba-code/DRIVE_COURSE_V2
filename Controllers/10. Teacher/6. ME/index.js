const prisma = require('../../../Middlewares/prisma')

const ME_TEACHER = async (req, res) => {
    try 
    {
        const teacher = req.user;

        const data = await prisma.teacher.findUnique({
            where: {
                id: parseInt(teacher.id)
            }
        })

        if(!data)
        {
            return res.status(404).json({
                success:false,
                data:[],
                message: "Багшийн мэдээлэл олдсонгүй."
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

module.exports = ME_TEACHER