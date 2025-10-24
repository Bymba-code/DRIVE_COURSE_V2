const prisma = require("../../../Middlewares/prisma")
const bcrypt = require("bcrypt")

const INSERT_USERS = async (req , res) => {
    try 
    {
        const {firstName, lastName, register, username, password, role, endDate} = req.body;   

        if(!firstName)
        {
            return res.status(403).json({
                success:false,
                data:[],
                message: "Овог нэр оруулна уу."
            })
        }
        if(!lastName)
        {
            return res.status(403).json({
                success:false,
                data:[],
                message: "Нэрийг оруулна уу."
            })
        }
        if(!register)
        {
            return res.status(403).json({
                success:false,
                data:[],
                message: "Регистерийг дугаарыг оруулна уу."
            })
        }
        if(!username)
        {
            return res.status(403).json({
                success:false,
                data:[],
                message:"Нэвтрэх нэрийг оруулна уу."
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
        if(!role)
        {
            return res.status(403).json({
                success:false,
                data:[],
                message:"Хандах эрхийг оруулна уу."
            })
        }

        if(!endDate)
        {
            return res.status(403).json({
                success:false,
                data:[],
                message:"Хэрэглэгчийн ашиглах хугацааг оруулна уу."
            })
        }

        const isRegister = await prisma.users.findMany({
            where: {
                register: register
            }
        })

        if(isRegister.length > 0)
        {
            return res.status(402).json({
                success:false,
                data:[],
                message: "Хэрэглэгчийн регистер бүртгэлтэй байна."
            })
        }

        const isUsername = await prisma.users.findMany({
            where: {
                username:username
            }
        })

        if(isUsername.length > 0)
        {
            return res.status(402).json({
                success:false,
                data: [],
                message:"Хэрэглэгчийн нэвтрэх нэр бүртгэлтэй байна."
            })
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const result = await prisma.users.create({
            data: {
                first_name:firstName,
                last_name:lastName,
                register:register,
                username:username,
                password:hashedPassword,
                role: role,
                create_date: new Date(),
                end_date: endDate
            }
        })
            

        return res.status(200).json({
            success:true,
            data:[],
            message:"Хэрэглэгчийн бүртгэлийг амжилттай нэмлээ."
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

module.exports = INSERT_USERS