const prisma = require('../../../Middlewares/prisma');
const bcrypt = require('bcrypt'); // 🔒 bcrypt ашиглана

const UPDATE_TEACHER = async (req, res) => {
    try {
        const { id } = req.params;
        const { firstName, lastName, register, kode, password } = req.body;

        // 🧩 ID шалгах
        if (!id || isNaN(id)) {
            return res.status(400).json({
                success: false,
                data: [],
                message: "Хүсэлтийн мэдээлэл дутуу байна эсвэл буруу байна."
            });
        }

        // 🔍 Багш байгаа эсэхийг шалгах
        const teacher = await prisma.teacher.findUnique({
            where: { id: parseInt(id) }
        });

        if (!teacher) {
            return res.status(404).json({
                success: false,
                data: [],
                message: "Багшийн мэдээлэл олдсонгүй."
            });
        }

        // 🔧 Шинэчлэх өгөгдлийг цуглуулах
        const updateData = {};

        if (firstName) updateData.firstname = firstName;
        if (lastName) updateData.lastname = lastName;
        if (register) updateData.register = register;
        if (kode) updateData.kode = kode;

        // 🔒 Нууц үгийг hash хийх
        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            updateData.password = hashedPassword;
        }

        // 🚫 Хоосон update шалгах
        if (Object.keys(updateData).length === 0) {
            return res.status(400).json({
                success: false,
                data: [],
                message: "Шинэчлэх өгөгдөл байхгүй байна."
            });
        }

        // 💾 Мэдээллийг шинэчлэх
        const result = await prisma.teacher.update({
            where: { id: parseInt(id) },
            data: updateData
        });

        // ✅ Амжилттай хариу
        return res.status(200).json({
            success: true,
            data: result,
            message: "Багшийн мэдээллийг амжилттай шинэчиллээ."
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

module.exports = UPDATE_TEACHER;
