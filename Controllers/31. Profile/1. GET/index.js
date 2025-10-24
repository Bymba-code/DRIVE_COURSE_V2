const prisma = require("../../../Middlewares/prisma")

const GET_USER_PROFILE = async (req , res) => {
    try 
    {
        const { user } = req.query;

        if(!user)
        {
            return res.status(403).json({
                success:false,
                data:[],
                message: "Хэрэглэгчийн бүртгэл олдсонгүй."
            })
        }

        const userDB = await prisma.users.findUnique({
            where: {
                id: parseInt(user)
            },
            include: {
                user_category:true,
                exam:{
                    include:{
                        examTest:true
                    }
                },
                post:{
                    include: {
                        comment_comment_postTopost:{
                            include:
                            {
                                replies_replies_commentTocomment:{
                                    include:{ 
                                        users:true
                                    }
                                }
                            }
                        },
                        comment_reactions_comment_reactions_postTopost:true
                    },
                    
                },
                lesson_progress:{
                    include: {
                        lesson_videos:true
                    }
                },
            }
        })

        if(!userDB)
        {
            return res.status(404).json({
                success:false,
                data:[],
                message: "Хэрэглэгчийг бүртгэл олдсонгүй."
            })
        }

        return res.status(200).json({
            success:true,
            data:userDB,
            message: "Амжилттай."
        })

    }
    catch(err)
    {
        return res.status(500).json({
            success:false,
            data: [],
            message: "Серверийн алдаа гарлаа." + " " + err
        })
    }
}

module.exports = GET_USER_PROFILE
