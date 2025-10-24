const prisma = require('../../../Middlewares/prisma');

const ME_POST_DELETE = async (req, res) => {
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

        const post = await prisma.post.findUnique({
            where: {
                id: parseInt(id)
            }
        });

        if (!post) {
            return res.status(404).json({
                success: false,
                data: [],
                message: "Пост олдсонгүй."
            });
        }

        if (parseInt(post.user) !== parseInt(user.id)) {
            return res.status(403).json({
                success: false,
                data: [],
                message: "Таны хандах өгөгдөл биш байна."
            });
        }

        await prisma.post.delete({
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

module.exports = ME_POST_DELETE;
