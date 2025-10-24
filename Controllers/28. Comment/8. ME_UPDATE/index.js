const prisma = require('../../../Middlewares/prisma');

const ME_COMMENT_UPDATE = async (req, res) => {
    try {
        const user = req.user;
        const { id } = req.params;
        const { content } = req.body;

        if (!id || isNaN(id)) {
            return res.status(403).json({
                success: false,
                data: [],
                message: "Хүсэлтийн мэдээлэл дутуу эсвэл буруу байна."
            });
        }

        if (!user) {
            return res.status(401).json({
                success: false,
                data: [],
                message: "Хэрэглэгч олдсонгүй."
            });
        }

        if (!content || content.trim() === "") {
            return res.status(400).json({
                success: false,
                data: [],
                message: "Шинэ агуулга хоосон байна."
            });
        }

        const data = await prisma.comment.findUnique({
            where: {
                id: parseInt(id)
            }
        });

        if (!data) {
            return res.status(404).json({
                success: false,
                data: [],
                message: "Өгөгдөл олдсонгүй."
            });
        }

        if (parseInt(data.user) !== parseInt(user.id)) {
            return res.status(403).json({
                success: false,
                data: [],
                message: "Та хандах өгөгдөл биш байна."
            });
        }

        const result = await prisma.comment.update({
            where: {
                id: parseInt(id)
            },
            data: {
                content: content.trim(),
            }
        });

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
            message: "Серверийн алдаа гарлаа."
        });
    }
};

module.exports = ME_COMMENT_UPDATE;
