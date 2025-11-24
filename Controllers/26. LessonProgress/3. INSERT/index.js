const prisma = require("../../../Middlewares/prisma");

const INSERT_LESSON_VIDEOS_PROGRESS = async (req, res) => {
    try {
        const user = req.user;


        const { lesson, video} = req.body;

        if(!lesson)
        {
            return res.status(403).json({
                success:false,
                data:[],
                message: "Хамаарах хичээлийг оруулна уу."
            })
        }
        if(!video)
        {
            return res.status(403).json({
                success:false,
                data:[],
                message: "Бичлэг оруулна уу."
            })
        }

        const result = await prisma.lesson_progress.create({
        data: {
            user: parseInt(user.id),
            lesson:parseInt(lesson),
            video:parseInt(video),
            progress:100,
            completed:1,
            updated_at: new Date()
        }
        })

        return res.status(200).json({
            success:true,
            data:[],
            message: "Амжилттай."
        })

    } catch (err) {
        return res.status(500).json({ success: false, message: "Серверийн алдаа гарлаа. " + err });
    }
};

module.exports = INSERT_LESSON_VIDEOS_PROGRESS;
