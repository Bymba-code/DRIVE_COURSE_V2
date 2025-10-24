const prisma = require('../../../Middlewares/prisma');
const bcrypt = require('bcrypt'); // 🔒 bcrypt ашиглана

const UPDATE_STUDENT_DRIVING_SCHELUDE = async (req, res) => {
    try {
        const { id } = req.params;
        const {attendace, note} = req.body;


        if (!id || isNaN(id)) {
            return res.status(400).json({
                success: false,
                data: [],
                message: "Хүсэлтийн мэдээлэл дутуу байна эсвэл буруу байна."
            });
        }

        // 🔍 Багш байгаа эсэхийг шалгах
        const student_schelude = await prisma.user_driving_schelude.findUnique({
            where: { id: parseInt(id) }
        });

        if (!student_schelude) {
            return res.status(404).json({
                success: false,
                data: [],
                message: "Хуваарийн мэдээлэл олдсонгүй."
            });
        }

        const updateData = {};

        if (attendace) updateData.attendace = parseInt(attendace);
        if (note) updateData.note = note;
        updateData.update_date = new Date()

        // 🚫 Хоосон update шалгах
        if (Object.keys(updateData).length === 0) {
            return res.status(400).json({
                success: false,
                data: [],
                message: "Шинэчлэх өгөгдөл байхгүй байна."
            });
        }

        // 💾 Мэдээллийг шинэчлэх
        const result = await prisma.user_driving_schelude.update({
            where: { id: parseInt(id) },
            data: updateData
        });

        // ✅ Амжилттай хариу
        return res.status(200).json({
            success: true,
            data: result,
            message: "Амжилттай."
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            data: [],
            message: "Серверийн алдаа гарлаа. " + err.message
        });
    }
};

module.exports = UPDATE_STUDENT_DRIVING_SCHELUDE;
