const prisma = require('../../../Middlewares/prisma');

const ME_DELETE_REPLIES = async (req, res) => {
    try {
        const user = req.user;
        const { id } = req.params;

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

        const data = await prisma.replies.findUnique({
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
                message: "Таны хандах өгөгдөл биш байна."
            });
        }

        await prisma.replies.delete({
            where: {
                id: parseInt(id)
            }
        });

        return res.status(200).json({
            success: true,
            data: [],
            message: "Пост амжилттай устгагдлаа."
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

module.exports = ME_DELETE_REPLIES;
