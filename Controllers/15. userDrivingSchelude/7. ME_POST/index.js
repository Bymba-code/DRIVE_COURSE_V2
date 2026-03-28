const prisma = require('../../../Middlewares/prisma')
const bcrypt = require("bcrypt")

const ME_INSERT_STUDENT_DRIVING_SCHELUDE = async (req, res) => {
    try 
    {
        const userData = req.user; 

        const {schelude} = req.body;

        if(!schelude)
        {
            return res.status(403).json({
                success:false,
                data:[],
                message: "Хичээл сонгоно уу."
            })
        }

        const exist = await prisma.user_driving_schelude.findFirst({
            where: {
                user:parseInt(userData.id),
                schelude: parseInt(schelude)
            }
        })

        if(exist)
        {
            return res.status(400).json({
                success:false,
                data:[],
                message: "Та бүртгэгдсэн байна."
            })
        }

        const data = await prisma.driving_schelude.findUnique({
            where:{
                id: parseInt(schelude)
            },
            include:{
                user_driving_schelude:true
            }
        })

        if(data.user_driving_schelude.length >= 4)
        {
            return res.status(400).json({
                success:false,
                data:[],
                message: "Багтаамж дүүрсэн байна."
            })
        }


        

        const result = await prisma.user_driving_schelude.create({
            data: {
                schelude:parseInt(schelude),
                user: parseInt(userData.id),
                attendance:1,
                date: new Date(),
            },
            include:{
                users:true
            }
        })

        return res.status(200).json({
            success:true,
            data:result,
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

module.exports = ME_INSERT_STUDENT_DRIVING_SCHELUDE