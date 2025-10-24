const prisma = require('../../../Middlewares/prisma')

const GET_STUDENT_STAT = async (req, res) => {
    try 
    {
        const {id} = req.params;

        if(!id)
        {
            return res.status(404).json({
                success:false,
                data: [],
                message: "Хүсэлтийн мэдээлэл дутуу эсвэл буруу байнаы."
            })
        }

        const student = await prisma.users.findUnique({
            where: {
                id: parseInt(id)
            }
        })

        const exams = await prisma.exam.findMany({
            where: {
                user: parseInt(id)
            }
        })

        return res.status(200).json({
            success:true,
            data:exams,
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

module.exports = GET_STUDENT_STAT