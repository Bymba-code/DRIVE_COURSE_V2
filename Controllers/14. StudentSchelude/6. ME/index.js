const prisma = require('../../../Middlewares/prisma')

const ME_STUDENT_SCHELUDE = async (req, res) => {
    try 
    {
        const userData = req.user; 

        const result = await prisma.user_schelude.findMany({
            where: {
                user: parseInt(userData.id)
            },
            include: {
                schelude_user_schelude_scheludeToschelude: {
                    include: {
                        teacher_schelude_teacherToteacher: true,
                        category_schelude_categoryTocategory: true
                    }
                },
                users: true
            },
            orderBy: {
                id: 'desc'
            }
        })

        if(!result || result.length === 0)
        {
            return res.status(404).json({
                success: false,
                data: [],
                message: "Хуваарийн мэдээлэл олдсонгүй."
            })
        }

        return res.status(200).json({
            success: true, // success:false гэж байсан, true болгох
            data: result,
            message: "Амжилттай"
        })
    }
    catch(err)
    {
        console.error('ME_STUDENT_SCHELUDE алдаа:', err)
        return res.status(500).json({
            success: false,
            data: [],
            message: "Серверийн алдаа гарлаа: " + err.message
        })
    }
}

module.exports = ME_STUDENT_SCHELUDE