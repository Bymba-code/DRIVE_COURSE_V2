const prisma = require('../../../Middlewares/prisma');

const ME_POST_UPDATE = async (req, res) => {
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
                message: "Та хандах өгөгдөл биш байна."
            });
        }

        const updatedPost = await prisma.post.update({
            where: {
                id: parseInt(id)
            },
            data: {
                content: content.trim(),
            }
        });

        return res.status(200).json({
            success: true,
            data: updatedPost,
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

module.exports = ME_POST_UPDATE;
