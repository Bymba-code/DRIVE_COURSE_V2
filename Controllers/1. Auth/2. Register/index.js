const prisma = require("../../../Middlewares/prisma")
const bcrypt = require("bcrypt")

const REGISTER = async (req , res) => {
    try 
    {
        const {username, password, role, end_date} = req.body;

        // 1. Талбар шалгах
        if(!username)
        {
            return res.status(403).json({
                success:false,
                data: [],
                message: "Хэрэглэгчийн нэрийг оруулна уу."
            })
        }
        if(!password)
        {
            return res.status(403).json({
                success:false,
                data: [],
                message: "Нууц үг оруулна уу."
            })
        }
        if(!role)
        {
            return res.status(403).json({
                success:false,
                data:[],
                message:"Хэрэглэгчийн эрхийг оруулна уу."
            })
        }
        if(!end_date)
        {
            return res.status(403).json({
                success:false,
                data:[],
                message:"Хэрэглэгчийн ашиглах хугацааг оруулна уу."
            })
        }

        // 2. Хэрэглэгчийн нэр давхцалыг шалгах
        const duplicateUser = await prisma.users.findFirst({
            where: {
                username: username
            }
        })

        if(duplicateUser)
        {
            return res.status(409).json({
                success: false,
                data: [],
                message: "Хэрэглэгчийн нэр бүртгэгдсэн байна.",
            });
        }

        // 3. Нууц үгийг шифэрлэх
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        // 4. Хэрэглэгчийн бүртгэлийн үүсгэх
        const user = await prisma.users.create({
            data: {
                username: username,
                password: hashedPassword,
                role: role,
                create_date: new Date(),
                end_date: new Date(end_date)
            }
        })

        return res.status(200).json({
            success:true,
            data: [],
            message: "Хэрэглэгчийн бүртгэлийг амжилттай үүсгэлээ."
        })

    }
    catch(err)
    {
        return res.status(500).json({
            success:false,
            data: [],
            message: "Серверийн алдаа гарлаа." + " " + err
        })
    }
}

module.exports = REGISTER