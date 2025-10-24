const prisma = require('../../../Middlewares/prisma')

const INSERT_TEACHER_CATEGORY = async (req, res) => {
    try 
    {
        const {teacher, category} = req.body;

        if(!teacher)
        {
            return res.status(403).json({
                success:false,
                data:[],
                message:"Ангилал нэмэх багш сонгоно уу."
            })
        }
        if(!category)
        {
            return res.status(403).json({
                success:false,
                data:[],
                message: "Ангилал сонгоно уу."
            })
        }   

        const teacherDB = await prisma.teacher.findUnique({
            where: {
                id: parseInt(teacher)
            }
        })

        const categoryDB = await prisma.category.findUnique({
            where: {
                id: parseInt(category)
            }
        })

        if(!teacherDB)
        {
            return res.status(404).json({
                success:false,
                data:[],
                message: "Багшийн мэдээлэл олдсонгүй."
            })
        }
        
        if(!categoryDB)
        {
            return res.status(404).json({
                success:false,
                data:[],
                message: "Ангилалийн мэдээлэл олдсонгүй."
            })
        }


        const result = await prisma.teacher_category.create({
            data:{
                teacher:parseInt(teacher),
                category: parseInt(category),
                date: new Date()
            }
        })

        return res.status(200).json({
            success:true,
            data:result,
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

module.exports = INSERT_TEACHER_CATEGORY