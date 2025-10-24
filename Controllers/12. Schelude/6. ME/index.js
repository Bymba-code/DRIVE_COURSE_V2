const prisma = require('../../../Middlewares/prisma')

const ME_SCHELUDE = async (req, res) => {
    try 
    {
        const data = req.user;

        let schelude;

        // if(data?.role === "student")
        // {
        //     schelude = await prisma.schelude.findMany({
        //         where: {
        //             user: parseInt(data?.id)
        //         },
        //         include: {
        //             teacher_schelude_teacherToteacher:true,
        //             users:true,
        //             category_schelude_categoryTocategory:true
        //         }
        //     })
        // }

        if(data?.role === "teacher")
        {
            schelude = await prisma.schelude.findMany({
                where: {
                    teacher: parseInt(data?.id)
                },
                include: {
                    teacher_schelude_teacherToteacher:true,
                    user_schelude_user_schelude_scheludeToschelude:true,
                    category_schelude_categoryTocategory:true
                }
            })
        }

        
        
        return res.status(200).json({
            success:true,
            data:schelude,
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

module.exports = ME_SCHELUDE