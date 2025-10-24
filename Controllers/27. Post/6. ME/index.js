const prisma = require('../../../Middlewares/prisma')

const ME_POST = async (req, res) => {
    try {
        const user = req.user;

        if (!user) {
            return res.status(401).json({
                success: false,
                data: [],
                message: "Хэрэглэгч олдсонгүй."
            });
        }

        const posts = await prisma.post.findMany({
            include: {
                comment_comment_postTopost:true,
                comment_reactions_comment_reactions_postTopost:true,
            }
        });

        return res.status(200).json({
            success: true,
            data: posts,
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

module.exports = ME_POST