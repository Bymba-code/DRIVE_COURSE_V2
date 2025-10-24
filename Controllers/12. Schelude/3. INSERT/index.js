const prisma = require('../../../Middlewares/prisma')

const INSERT_SCHELUDE = async (req, res) => {
    try 
    {
        const { category, teacher, schelude_date, start_time, end_time, location, note} = req.body;

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
        if(!end_time)
        {
            return res.status(403).json({
                success:false,
                data:[],
                message: "Дуусах цаг оруулна уу."
            })
        }
        if(!location)
        {
            return res.status(403).json({
                success:false,
                data:[],
                message: "Байршил оруулна уу."
            })
        }

        const result = await prisma.schelude.create({
            data: {
                category: parseInt(category),
                teacher: parseInt(teacher),
                schelude_date: new Date(schelude_date),
                start_time: new Date(start_time),
                end_time: new Date(end_time),
                location:location,
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

module.exports = INSERT_SCHELUDE