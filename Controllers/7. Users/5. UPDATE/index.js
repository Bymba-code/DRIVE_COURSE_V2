const prisma = require("../../../Middlewares/prisma")
const bcrypt = require("bcrypt")

const UPDATE_USERS = async (req , res) => {
    try 
    {
        const {id} = req.params;

        if(!id || isNaN(id) || id === undefined)
        {
            return res.status(403).json({
                success:false,
                data:[],
                message: "Хэрэглэгчийн ID буруу эсвэл байхгүй байна."
            })
        }

        const user = await prisma.users.findUnique({
            include:{
                user_category:true
            },
            where: {
                id:parseInt(id)
            }
        })

        if(!user)
        {
            return res.status(404).json({
                success:false,
                data:[],
                message: "Хэрэглэгч олдсонгүй. "
            })
        }

        const {firstName, lastName, register, username, password, role, endDate} = req.body;


        console.log(req.body)

        let updateData = {}

        if(firstName)
        {
            updateData.first_name = firstName
        }
        if(lastName)
        {
            updateData.last_name = lastName
        }
        if(register)
        {
            updateData.register = register
        }
        if(username)
        {
            updateData.username = username
        }
        if(password)
        {
            const salt = await bcrypt.genSalt(10)
            const hashed = await bcrypt.hash(password, salt)
            updateData.password = hashed
        }
        if(role)
        {
            updateData.role = role
        }
        if(endDate)
        {
            updateData.end_date = endDate
        }

        if (Object.keys(updateData).length === 0) {
            return res.status(400).json({
                success: false,
                data: [],
                message: "Шинэчлэх өгөгдөл байхгүй байна."  
            });
        }

        if(updateData && updateData.username)
        {
            const result = await prisma.users.findMany({
                where:{
                    username: username
                }
            })
            if(result.length > 0)
            {
                return res.status(403).json({
                    success:false,
                    data:[],
                    message: "Хэрэглэгчийн нэр бүртгэгдсэн байна."
                })
            }
        }

        const result = await prisma.users.update({
            where: {
                id:parseInt(id)
            },
            data: updateData
        })

        return res.status(200).json({
            success:true,
            data:[],
            message: "Амжилттай шинэчиллээ"
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

module.exports = UPDATE_USERS