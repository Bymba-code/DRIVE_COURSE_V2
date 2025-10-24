const prisma = require("../../../Middlewares/prisma");

const INSERT_LESSON_VIDEOS = async (req, res) => {
    try {
        const { lesson, title , index, file} = req.body;

        if(!lesson)
        {
            return res.status(403).json({
                success:false,
                data:[],
                message: "Хамаарах хичээлийг сонгоно уу."
            })
        }
        if(!title)
        {
            return res.status(403).json({
                success:false,
                data:[],
                message: "Гарчиг оруулна уу."
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
        if(!file)
        {
            return res.status(403).json({
                success:false,
                data:[],
                message: "Бичлэгний URL оруулна уу."
            })
        }

        const result = await prisma.lesson_videos.create({
            data: {
                lesson: parseInt(lesson),
                title: title,
                index: parseInt(index),
                file: file
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

module.exports = INSERT_LESSON_VIDEOS;
