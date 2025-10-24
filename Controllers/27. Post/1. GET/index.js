const prisma = require("../../../Middlewares/prisma")

const GET_ALL_POST = async (req , res) => {
    try 
    {
        const {page, size} = req.query;
        const skip = (page - 1) * size
        const take = parseInt(size)

        let posts;

        if(page && size)
        {
            posts = await prisma.post.findMany({
                skip:skip,
                take:take,
                include:{
                    users:{
                        include: {
                            user_category:true
                        }
                    },
                    comment_comment_postTopost:{
                        include: {
                            users:true,
                            replies_replies_commentTocomment:{
                                include: {
                                    users:true
                                }
                            }
                        }
                    },
                    comment_reactions_comment_reactions_postTopost: {
                        include: {
                            users:true
                        }
                    }
                }
            })
        }

        if(!page && !size)
        {
            posts = await prisma.post.findMany({
               include:{
                    users:{
                        include: {
                            user_category:true
                        }
                    },
                    comment_comment_postTopost:{
                        include: {
                            users:true,
                            replies_replies_commentTocomment:{
                                include: {
                                    users:true
                                }
                            }
                        }
                    },
                    comment_reactions_comment_reactions_postTopost: {
                        include: {
                            users:true
                        }
                    }
                }
            })
        }


        if(posts.length === 0)
        {
            return res.status(404).json({
                success:false,
                data: [],
                message: "Өгөгдөл олдсонгүй."
            })
        }

        let totalCount;

        totalCount = await prisma.post.count()
        
        if(page && size)
        {
            return res.status(200).json({
                success:true,
                data: posts,
                message: "Амжилттай.",
                pagination: {
                    page: parseInt(page),
                    size: parseInt(size),
                    total: totalCount,
                    pages: Math.ceil(totalCount / size),
                },
            })
        }


        return res.status(200).json({
            success:true,
            data:posts,
            message:"Амжилттай"
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

module.exports = GET_ALL_POST
