const prisma = require("../../../Middlewares/prisma");

const INSERT_PROGRESS = async (req, res) => {
    try {

        const user = req.user;

        const { video } = req.body;

        if(!video)
        {
            return res.status(403).json({
                success:false,
                data:[],
                message: "Бичлэгний ID оруулна уу."
            })
        }

        const isExist = await prisma.user_progress.findFirst({
            where: {
                user: parseInt(user.id),
                video: parseInt(video)
            }
        })

        let result;

        if(isExist)
        {
             result = await prisma.user_progress.update({
                data: {
                    updated_at: new Date()
                },
                where: {
                    id: parseInt(isExist.id)
                }
            })
        }

        result = await prisma.user_progress.create({
            data: {
                user:parseInt(user.id),
                video: parseInt(video),
                progress:1,
                completed:1,
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

module.exports = INSERT_PROGRESS;
