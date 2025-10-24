const prisma = require("../../../Middlewares/prisma");

const INSERT_REPLIES = async (req, res) => {
    try {
        const user = req.user;
        const { comment, content } = req.body;

        if(!comment)
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

        const result = await prisma.replies.create({
            data: {
                comment: parseInt(comment),
                user: parseInt(user?.id),
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

module.exports = INSERT_REPLIES;
