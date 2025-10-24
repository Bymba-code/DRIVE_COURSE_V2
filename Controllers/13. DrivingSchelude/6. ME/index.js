const prisma = require('../../../Middlewares/prisma');

const ME_DRIVING_SCHELUDE = async (req, res) => {
    try {
        const user = req.user;

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

        const progress = await prisma.lesson_progress.findMany({
            where: { user: parseInt(user.id) }
        });

        if (progress.length < 2) {
            return res.status(403).json({
                success: false,
                data: [],
                message: "Эхний хоёр хичээлийг үзсэнээр хотын жолоонд гарах хувиар сонгоно."
            });
        }

            // const now = new Date();
            // const hours = now.getHours();

            // if (hours < 21 || hours >= 24) {
            //     // 21:00–24:00 цагийн хооронд биш бол ямар ч өгөгдөл буцаахгүй
            //     return res.status(200).json({
            //         success: true,
            //         data: [],
            //         message: "Одоогийн цаг нь 21:00–24:00 хооронд биш байна."
            //     });
            // }

        const schelude = await prisma.driving_schelude.findMany({
            include: {
                teacher_driving_schelude_teacherToteacher: true,
                category_driving_schelude_categoryTocategory: true,
                user_driving_schelude: true
            }
        });

        return res.status(200).json({
            success: true,
            data: schelude,
            message: "Амжилттай"
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
