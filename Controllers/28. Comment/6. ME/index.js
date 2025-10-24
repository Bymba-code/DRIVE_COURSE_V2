const prisma = require('../../../Middlewares/prisma')

const ME_COMMENT = async (req, res) => {
    try {
        const user = req.user;

        if (!user) {
            return res.status(401).json({
                success: false,
                data: [],
                message: "Хэрэглэгч олдсонгүй."
            });
        }

        const comments = await prisma.comment.findMany({
            where: {
                user: parseInt(user.id)
            }
        });

        return res.status(200).json({
            success: true,
            data: comments,
            message: "Амжилттай."
        });

    } catch(err) {

        return res.status(500).json({
            success: false,
            data: [],
            message: "Серверийн алдаа гарлаа."
        })
    }
}

module.exports = ME_COMMENT