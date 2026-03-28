const prisma = require('../../../Middlewares/prisma')
const bcrypt = require("bcrypt")

const INSERT_TEACHER = async (req, res) => {
    try 
    {
        const {firstName, lastName, register, kode, password} = req.body;

        if(!firstName)
        {
            return res.status(403).json({
                success:false,
                data:[],
                message:"Овог нэр оруулна уу."
            })
        }
        if(!lastName)
        {
            return res.status(403).json({
                success:false,
                data:[],
                message: "Багшийн нэр оруулна уу."
            })
        }
        if(!register)
        {
            return res.status(403).json({
                success:false,
                data:[],
                message: "Регистерийн дугаар оруулна уу."
            })
        }
        if(!kode)
        {
            return res.status(403).json({
                success:false,
                data:[],
                message: "Нэвтрэх код оруулна уу."
            })
        }
        if(!password)
        {
            return res.status(403).json({
                success:false,
                data:[],
                message: "Нууц үг оруулна уу."
            })
        }


        const checkExist = await prisma.teacher.findFirst({
            where: {
                kode: kode
            }
        })

        if(checkExist)
        {
            return res.status(402).json({
                success:false,
                data:[],
                message: "Багшийн код давхардаж байна."
            })
        }

        const salt = await bcrypt.genSalt(10)
        const hashed = await bcrypt.hash(password, salt)

        const result = await prisma.teacher.create({
            data:{
                firstname:firstName,
                lastname:lastName,
                register:register,
                kode:kode,
                password:hashed,
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

module.exports = INSERT_TEACHER