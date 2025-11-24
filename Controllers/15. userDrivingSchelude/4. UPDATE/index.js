const prisma = require('../../../Middlewares/prisma');
const bcrypt = require('bcrypt'); // 🔒 bcrypt ашиглана

const UPDATE_STUDENT_DRIVING_SCHELUDE = async (req, res) => {
    try {
        const { id } = req.params;
        const { attendace, attendance, note } = req.body; // Хоёуланг нь авах

        // Аль нэг байвал ашиглах
        const finalAttendance = attendace || attendance;

        const updateData = {};

        if (finalAttendance) updateData.attendance = parseInt(finalAttendance); // Schema-тай тохируулах
        if (note !== undefined) updateData.note = note;
        updateData.update_date = new Date();

        const result = await prisma.user_driving_schelude.update({
            where: { id: parseInt(id) },
            data: updateData
        });

        return res.status(200).json({
            success: true,
            data: result,
            message: "Амжилттай шинэчиллээ."
        });

    } catch (err) {
        console.error('UPDATE алдаа:', err);
        return res.status(500).json({
            success: false,
            data: [],
            message: "Серверийн алдаа: " + err.message
        });
    }
};

module.exports = UPDATE_STUDENT_DRIVING_SCHELUDE