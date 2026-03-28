const prisma = require("../../../Middlewares/prisma")
const bcrypt = require("bcrypt")
require("dotenv").config()
const jwt = require("jsonwebtoken")

const LOGIN_TEACHER = async (req, res) => {
    try 
    {
        const {kode, password} = req.body;

        // 1. Талбар шалгах
        if(!kode)
        {
            return res.status(400).json({ 
                success: false,
                data: [],
                message: "Багшийн код оруулна уу."
            })
        } 

        if(!password)
        {
            return res.status(400).json({
                success: false,
                data: [],
                message: "Нууц үг оруулна уу."
            })
        }

        // 2. Бүртгэлтэй хэрэглэгч эсэхийг шалгах
        const teacher = await prisma.teacher.findFirst({
            where: {
              kode: kode,
            },
        });

        if(!teacher)
        {
            return res.status(404).json({
                success: false,
                data: [],
                message: "Багшийн бүртгэл олдсонгүй."
            })
        }


        // 4. Нууц үгийг шалгах
        const checkPassword = await bcrypt.compare(password, teacher.password)

        if(!checkPassword)
        {
            return res.status(403).json({
                success: false,
                data: [],
                message: "Багшийн код эсвэл нууц үг буруу байна."
            })
        }

        // 5. Токен бэлтгэх
        const key = process.env.TOKEN_SECRET
        const expiresIn = "12h"

        const data = {
            id: teacher.id,
            kode: teacher.kode,
            role:"teacher"
        }

        const token = jwt.sign(data, key, {expiresIn: expiresIn})

        const cookieOptions = {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Production дээр л secure
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax', // Development дээр 'lax'
            maxAge: 12 * 60 * 60 * 1000,
            path: '/'
        }

        // 7. Cookie тавих
        res.cookie('auth_token', token, cookieOptions)

        // 8. Response буцаах
        return res.status(200).json({
            success: true,
            data: token,
            message: "Амжилттай нэвтэрлээ."
        })
    }
    catch(err)
    {
        console.error("Login error:", err)  
        return res.status(500).json({
            success: false,
            data: [],
            message: "Серверийн алдаа гарлаа. " + err.message  
        })
    }
} 

module.exports = LOGIN_TEACHER