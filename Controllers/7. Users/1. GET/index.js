
const prisma = require("../../../Middlewares/prisma")

const GET_ALL_USERS = async (req , res) => {
    try 
    {
        const {page, size, username} = req.query;
        const skip = (page - 1) * size
        const take = parseInt(size)

        let users;

        if(!page && !size)
        {
            users = await prisma.users.findMany({
                include: {
                    user_category: true
                }
            })
        }

        if(page && size)
        {
            users = await prisma.users.findMany({
                skip:parseInt(skip),
                take:take,
                include: {
                    user_category: true
                }
            })
        }


        if(page && size && username)
        {
            users = await prisma.users.findMany({
                skip:skip,
                take:take,
                include: {
                    user_category: {
                        include: {
                            category_user_category_categoryTocategory: true  
                        }
                    }
                },
                where: {
                    username: {
                        contains: username
                    }
                }
            }
            );
            
        }
        
        let totalCount ;

        if(username)
        {
            totalCount = await prisma.users.count({
                where: {
                    username: {
                        contains: username
                    }
                }
            })
        }


        if(!username)
        {
            totalCount = await prisma.users.count()
        }

        if(page && size)
        {
            return res.status(200).json({
                success:true,
                data: users,
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
            success:false,
            data:users,
            message: "Амжилттай."
        })
    }
    catch(err)
    {
        return res.status(500).json({
            success:false,
            data:[],
            message: "Серверийн алдаа гарлаа." + err
        })
    }
}

module.exports = GET_ALL_USERS