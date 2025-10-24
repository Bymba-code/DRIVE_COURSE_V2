const prisma = require('../../../Middlewares/prisma');
const path = require('path');

const INSERT_CONTRACT = async (req, res) => {
    try {
        const { user } = req.body;
        const file = req.file;

        if (!user) {
            return res.status(403).json({
                success: false,
                data: [],
                message: "Хэрэглэгчийн мэдээлэл оруулна уу."
            });
        }

        if (!file) {
            return res.status(400).json({
                success: false,
                data: [],
                message: "Гэрээний файл оруулна уу."
            });
        }

        const isExist = await prisma.contract.findFirst({
            where: {
                user: parseInt(user)
            }
        });

        if (isExist) {
            return res.status(409).json({
                success: false,
                data: [],
                message: "Тухайн хэрэглэгч аль хэдийн гэрээ хийсэн байна."
            });
        }

        const filePath = `/uploads/contracts/${file.filename}`;

        const result = await prisma.contract.create({
            data: {
                file_path: filePath,
                sign_date: new Date(),
                users: {
                connect: { id: parseInt(user) }, 
                }
            }
        });

        return res.status(200).json({
            success: true,
            data: result,
            message: "Гэрээ амжилттай хадгалагдлаа."
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

module.exports = INSERT_CONTRACT;
