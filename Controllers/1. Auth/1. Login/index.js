const prisma = require("../../../Middlewares/prisma")
const bcrypt = require("bcrypt")
require("dotenv").config()
const jwt = require("jsonwebtoken")

const LOGIN = async (req, res) => {
    try 
    {
        const {username, password} = req.body;

        // 1. Талбар шалгах
        if(!username)
        {
            return res.status(400).json({  // ✅ 404 → 400 засав
                success: false,
                data: [],
                message: "Хэрэглэгчийн нэр оруулна уу."
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
        const user = await prisma.users.findFirst({
            where: {
              username: username,
            },
        });

        if(!user)
        {
            return res.status(404).json({
                success: false,
                data: [],
                message: "Хэрэглэгчийн бүртгэл олдсонгүй."
            })
        }

        // 3. Хэрэглэгчийн хандах хугацааг шалгах
        const today = new Date()

        // ✅ end_date байгаа эсэхийг эхлээд шалгах
        if(user.end_date && user.end_date <= today)
        {
            return res.status(403).json({
                success: false,
                data: [],
                message: "Таны ашиглах хугацаа дууссан байна."
            })
        }

        // 4. Нууц үгийг шалгах
        const checkPassword = await bcrypt.compare(password, user.password)

        if(!checkPassword)
        {
            return res.status(403).json({
                success: false,
                data: [],
                message: "Хэрэглэгчийн нууц үг буруу байна."
            })
        }

        // 5. Токен бэлтгэх
        const key = process.env.TOKEN_SECRET
        const expiresIn = "12h"

        const data = {
            id: user.id,
            role: user.role,
            username: user.username,
        }

        const token = jwt.sign(data, key, {expiresIn: expiresIn})

        // 6. Cookie тохиргоо
        const cookieOptions = {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',  
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
        console.error("Login error:", err)  // ✅ Console log нэмсэн
        return res.status(500).json({
            success: false,
            data: [],
            message: "Серверийн алдаа гарлаа. " + err.message  // ✅ err.message
        })
    }
} 

module.exports = LOGIN