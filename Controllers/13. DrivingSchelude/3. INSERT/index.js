const prisma = require('../../../Middlewares/prisma')

const INSERT_DRIVING_SCHELUDE = async (req, res) => {
    try 
    {
        const { category, teacher, car, area, schelude_date, start_time, note} = req.body;


        if(!category)
        {
            return res.status(403).json({
                success:false,
                data:[],
                message: "Ангилал сонгоно уу."
            })
        }
        if(!teacher)
        {
            return res.status(403).json({
                success:false,
                data:[],
                message: "Багш сонгоно уу."
            })
        }
        if(!car)
        {
            return res.status(403).json({
                success:false,
                data:[],
                message: "Жолооны машин сонгоно уу."
            })
        }
        if(!area)
        {
            return res.status(403).json({
                success:false,
                data:[],
                message: "Байршил оруулна уу."
            })
        }
        if(!schelude_date)
        {
            return res.status(403).json({
                success:false,
                data:[],
                message: "Хичээл эхлэх өдрийг оруулна уу."
            })
        }
        if(!start_time)
        {
            return res.status(403).json({
                success:false,
                data:[],
                message: "Эхлэх цаг оруулна уу."
            })
        }


        const existData = await prisma.driving_schelude.findFirst({
            where:{
                schelude_date:new Date(schelude_date),
                start_time: new Date(start_time),
            }
        })

        if(existData)
        {
            return res.status(400).json({
                success:false,
                data:[],
                message: "Автомашины цаг давхцаж байна."
            })
        }

        const result = await prisma.driving_schelude.create({
            data: {
                category: parseInt(category),
                teacher: parseInt(teacher),
                car: parseInt(car),
                area: area,
                schelude_date: new Date(schelude_date),
                start_time: new Date(start_time),
                note: note ? note : "Байхгүй.",
                add_date: new Date()
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

module.exports = INSERT_DRIVING_SCHELUDE