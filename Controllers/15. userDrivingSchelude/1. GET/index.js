const prisma = require('../../../Middlewares/prisma')

const GET_ALL_DRIVE_SCHELUDE = async (req, res) => {
    try 
    {
        const data = await prisma.user_driving_schelude.findMany()

        if(data.length === 0)
        {
            return res.status(404).json({
                success:false,
                data:[],
                message: "Мэдээлэл олдсонгүй."
            })
        }

        return res.status(200).json({
            success:true,
            data:data,
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

module.exports = GET_ALL_DRIVE_SCHELUDE