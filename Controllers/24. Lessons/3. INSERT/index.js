const prisma = require("../../../Middlewares/prisma");

const INSERT_LESSONS = async (req, res) => {
    try {
        const { name , index} = req.body;

        if(!name)
        {
            return res.status(403).json({
                success:false,
                data:[],
                message: "Хичээлийн нэр оруулна уу."
            })
        }
        if(!index)
        {
            return res.status(403).json({
                success:false,
                data:[],
                message: "Хичээлийн дараалал оруулна уу."
            })
        }

        const result = await prisma.lessons.create({
            data: {
                name: name,
                index: parseInt(index)
            }
        })

        return res.status(403).json({
            success:true,
            data:result,
            message: "Амжилттай."
        })

    } catch (err) {
        return res.status(500).json({ success: false, message: "Серверийн алдаа гарлаа. " + err });
    }
};

module.exports = INSERT_LESSONS;
