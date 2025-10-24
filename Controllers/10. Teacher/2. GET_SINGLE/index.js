const prisma = require('../../../Middlewares/prisma')

const GET_SINGLE_TEACHER = async (req, res) => {
    try 
    {
        const {id} = req.params;

        if(!id || isNaN(id) || id === undefined)
        {
            return res.status(403).json({
                success:false,
                data:[],
                message: "Хүсэлтийн мэдээлэл дутуу байна эсвэл буруу байна."
            })
        }

        const testAnswer = await prisma.teacher.findUnique({
            where:
            {
                id: parseInt(id)
            },
            include:{
                teacher_category_teacher_category_teacherToteacher:true,
                schelude_schelude_teacherToteacher:true,
                driving_schelude_driving_schelude_teacherToteacher:true
            }
        })
        
        if(!testAnswer)
        {
            return res.status(404).json({
                success:false,
                data:[],
                message: "Өгөгдөл олдсонгүй."
            })
        }
        
        return res.status(200).json({
            success:true,
            data:testAnswer,
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

module.exports = GET_SINGLE_TEACHER