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

        const {
            familyName,
            firstname,
            lastname,
            birthdate,
            register,
            gender,
            blood_type,
            city,
            district,
            hayg,
            facebook,
            phone,
            phoneTwo,
            password,
            role,
            endDate
        } = req.body;

        let updateData = {}

        if(familyName)
        {
            updateData.family_name = familyName
        }
        if(firstname)
        {
            updateData.first_name = firstname
        }
        if(lastname)
        {
            updateData.last_name = lastname
        }
        if(birthdate)
        {
            updateData.birthdate = new Date(birthdate)
        }
        if(register)
        {
            updateData.register = register
        }
        if(gender)
        {
            updateData.gender = gender
        }
        if(blood_type)
        {
            updateData.blood_type = blood_type
        }
        if(city)
        {
            updateData.city = city
        }
        if(district)
        {
            updateData.district = district
        }
        if(hayg)
        {
            updateData.address = hayg
        }
        if(facebook)
        {
            updateData.facebook = facebook
        }
        if(phone)
        {
            updateData.phone = phone
        }
        if(phoneTwo)
        {
            updateData.phone_two = phoneTwo
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
            updateData.end_date = new Date(endDate)
        }

        if (Object.keys(updateData).length === 0) {
            return res.status(400).json({
                success: false,
                data: [],
                message: "Шинэчлэх өгөгдөл байхгүй байна."  
            });
        }

        const updatedUser = await prisma.users.update({
            where: {
                id:parseInt(id)
            },
            data: updateData,
        })

        return res.status(200).json({
            success:true,
            data: updatedUser,
            message: "Амжилттай шинэчиллээ"
        })
    }
    catch(err)
    {
        console.error("UPDATE_USERS Error:", err)
        return res.status(500).json({
            success:false,
            data:[],
            message: "Серверийн алдаа гарлаа: " + err.message
        })
    }
}

module.exports = UPDATE_USERS