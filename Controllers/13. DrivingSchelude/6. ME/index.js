const prisma = require('../../../Middlewares/prisma');

const ME_DRIVING_SCHELUDE = async (req, res) => {
    try {
        const user = req.user;

        // Хэрэглэгчийн мэдээлэл шалгах
        const data = await prisma.users.findUnique({
            where: { id: parseInt(user.id) }
        });

        if (!data) {
            return res.status(404).json({
                success: false,
                data: [],
                message: "Суралцагчийн мэдээлэл олдсонгүй."
            });
        }

        const lastProgress = await prisma.lesson_progress.findFirst({
            where: { user: parseInt(user.id) },
            orderBy: { id: 'desc' }
        });

        if (!lastProgress) {
            return res.status(403).json({
                success: false,
                data: [],
                message: "Жолооны хуваарь сонгохын тулд онлайн хичээл үзнэ үү."
            });
        }

        const progressCount = await prisma.lesson_progress.count({
            where: { user: parseInt(user.id) }
        });

        if (progressCount < 2) {
            return res.status(403).json({
                success: false,
                data: [],
                message: "Эхний хоёр хичээлийг үзсэнээр хотын жолоонд гарах хуваарь сонгоно."
            });
        }

        const takeScheduleTime = new Date(lastProgress.date);
        takeScheduleTime.setDate(takeScheduleTime.getDate() + 1);
        takeScheduleTime.setHours(23, 59, 59, 999);

        const now = new Date();

        if (now > takeScheduleTime) {
            return res.status(403).json({
                success: false,
                data: [],
                message: "Хуваарь сонгох хугацаа дууссан байна. Дахин хичээл үзнэ үү."
            });
        }

        const hours = now.getHours();
        if (hours < 21 || hours >= 24) {
            return res.status(403).json({
                success: false,
                data: [],
                message: "Хуваарь сонгох цаг 21:00-24:00 хооронд байна."
            });
        }

        const schelude = await prisma.driving_schelude.findMany({
            where: {
                schelude_date: {
                    gte: now 
                }
            },
            include: {
                teacher_driving_schelude_teacherToteacher: true,
                category_driving_schelude_categoryTocategory: true,
                user_driving_schelude: true,
                cars: true
            },
            orderBy: {
                schelude_date: "asc" 
            }
        });

        return res.status(200).json({
            success: true,
            data: schelude,
            message: "Амжилттай",
            canSelectUntil: takeScheduleTime 
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            data: [],
            message: "Серверийн алдаа гарлаа: " + err.message
        });
    }
};

module.exports = ME_DRIVING_SCHELUDE;