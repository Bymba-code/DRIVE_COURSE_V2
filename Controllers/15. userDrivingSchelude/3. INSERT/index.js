const prisma = require('../../../Middlewares/prisma')
const bcrypt = require("bcrypt")

const INSERT_STUDENT_DRIVING_SCHELUDE = async (req, res) => {
    try 
    {
        const {schelude, user} = req.body;

        if(!schelude)
        {
            return res.status(403).json({
                success:false,
                data:[],
                message: "Хичээл сонгоно уу."
            })
        }
        if(!user)
        {
            return res.status(403).json({
                success:false,
                data:[],
                message: "Суралцагч сонгоно уу."
            })
        }


        const result = await prisma.user_driving_schelude.create({
            data: {
                schelude:parseInt(schelude),
                user: parseInt(user),
                attendance:0,
                date: new Date(),
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

module.exports = INSERT_STUDENT_DRIVING_SCHELUDE