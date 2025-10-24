const prisma = require("../../../Middlewares/prisma");

const INSERT_COMMENT = async (req, res) => {
    try {
        const user = req.user;
        const {post, content } = req.body;

        if(!post)
        {
            return res.status(403).json({
                success:false,
                data:[],
                message: "Мэдээлэл дутуу байна."
            })
        }

        if(!content)
        {
            return res.status(403).json({
                success:false,
                data:[],
                message: "Юу бодож байна."
            })
        }

        const result = await prisma.comment.create({
            data: {
                user: parseInt(user?.id),
                post: parseInt(post),
                content:content,
                date: new Date()
            }
        })

        return res.status(200).json({
            success:true,
            data:result,
            message: "Амжилттай."
        })

    } catch (err) {
        return res.status(500).json({ success: false, message: "Серверийн алдаа гарлаа. " + err });
    }
};

module.exports = INSERT_COMMENT;
