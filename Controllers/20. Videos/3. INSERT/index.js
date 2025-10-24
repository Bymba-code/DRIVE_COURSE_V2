const prisma = require("../../../Middlewares/prisma");

const INSERT_VIDEO = async (req, res) => {
    try {
        const { category , topic, index, title, url} = req.body;

        if(!category)
        {
            return res.status(403).json({
                success:false,
                data:[],
                message: "Ангилал сонгоно уу."
            })
        }
        if(!topic)
        {
            return res.status(403).json({
                success:false,
                data:[],
                message: "Сэдэв сонгоно уу."
            })
        }
        if(!index)
        {
            return res.status(403).json({
                success:false,
                data:[],
                message: "Дараалал оруулна уу."
            })
        }
        if(!title)
        {
            return res.status(403).json({
                success:false,
                data:[],
                message: "Гарчиг оруулна уу."
            })
        }
        if(!url)
        {
            return res.status(403).json({
                success:false,
                data:[],
                message: "URL хаяг оруулна уу."
            })
        }

        const result = await prisma.videos.create({
            data: {
                category: parseInt(category),
                topic: parseInt(topic),
                index: parseInt(index),
                title: title,
                url:url
            }
        })

        return res.status(403).json({
            success:true,
            data:result,
            message: "Амжилттай."
        })

    } catch (err) {
        return res.status(500).json({ success: false, message: "Серверийн алдаа гарлаа. " + err });
    }
};

module.exports = INSERT_VIDEO;
