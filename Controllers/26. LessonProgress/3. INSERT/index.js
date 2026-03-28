const prisma = require("../../../Middlewares/prisma");

const INSERT_LESSON_VIDEOS_PROGRESS = async (req, res) => {
    try {
        const user = req.user;
        const { lesson, video } = req.body;

        if(!lesson)
        {
            return res.status(403).json({
                success:false,
                data:[],
                message: "Хичээлийн ID олдсонгүй."
            })
        }
        if(!video)
        {
            return res.status(403).json({
                success:false,
                data:[],
                message: "Бичлэгний ID олдсонгүй."
            })
        }
        
        const isDataExist = await prisma.lesson_progress.findFirst({
            where: {
                lesson:parseInt(lesson),
                video:parseInt(video),
                user: user.id
            }
        })

        if(isDataExist)
        {
            const result = await prisma.lesson_progress.update({
                where: {
                    id: parseInt(isDataExist.id)
                },
                data: {
                    updated_at: new Date()
                }
            })

            return res.status(200).json({
                success:true,
                data:result,
                message: "Амжилттай."
            })
        }
    
        const result = await prisma.lesson_progress.create({
            data: {
                user:user.id,
                lesson:parseInt(lesson),
                video:parseInt(video),
                progress: 100,
                completed:1,
                date: new Date()
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

module.exports = INSERT_LESSON_VIDEOS_PROGRESS;
