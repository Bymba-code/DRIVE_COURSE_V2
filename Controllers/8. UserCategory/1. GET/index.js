const prisma = require("../../../Middlewares/prisma")

const GET_ALL_USERS_CATEGORY = async (req , res) => {
    try 
    {
        const {page, size, user, category} = req.query;
        const skip = (page - 1) * size
        const take = parseInt(size)

        let userCategories;

        if(!page && !size)
        {
            userCategories = await prisma.user_category.findMany({
                include: {
                    category_user_category_categoryTocategory: {
                        select: {
                            id: true,
                            name: true,
                        }
                    }
                }
            })
        }
        if(page && size)
        {
            userCategories = await prisma.user_category.findMany({
                skip:skip,
                take:take,
                include: {
                    category_user_category_categoryTocategory: {
                        select: {
                            id: true,
                            name: true,
                        }
                    }
                }
            })
        }

        if(!page && !size && user)
        {
            userCategories = await prisma.user_category.findMany({
                include: {
                    category_user_category_categoryTocategory: {
                        select: {
                            id: true,
                            name: true,
                        }
                    }
                },
                where: {
                    user: parseInt(user)
                }
            })
        }

        if(!page && !size && !user && category)
        {
            userCategories = await prisma.user_category.findMany({
                include: {
                    category_user_category_categoryTocategory: {
                        select: {
                            id: true,
                            name: true,
                        }
                    }
                },
                where: {
                    category: parseInt(category)
                }
            })
        }

        if(page && size && user && !category)
            {
                userCategories = await prisma.user_category.findMany({
                    skip:skip,
                    take:take,
                    include: {
                        category_user_category_categoryTocategory: {
                            select: {
                                id: true,
                                name: true,
                            }
                        }
                    },
                    where: {
                        user: parseInt(user)
                    }
                })
        }

        if(page && size && !user && category)
            {
                userCategories = await prisma.user_category.findMany({
                    skip:skip,
                    take:take,
                    include: {
                        category_user_category_categoryTocategory: {
                            select: {
                                id: true,
                                name: true,
                            }
                        }
                    },
                    where: {
                        category: parseInt(category)
                    }
                })
        }

        if(!page && size && !user && !category)
            {
                userCategories = await prisma.user_category.findMany({
                    take:take,
                    include: {
                        category_user_category_categoryTocategory: {
                            select: {
                                id: true,
                                name: true,
                            }
                        }
                    },
                })
        }

        let totalCount;

        if(!user && !category)
        {
            totalCount = await prisma.user_category.count()
        }

        if(user && !category)
        {
            totalCount = await prisma.user_category.count({
                where:{
                    user:parseInt(user)
                }
            })
        }

        if(!user && category)
        {
            totalCount = await prisma.user_category.count({
                where:{
                    category:parseInt(category)
                }
            })
        }

        if(user && category)
            {
                totalCount = await prisma.user_category.count({
                    where:{
                        category:parseInt(category),
                        user:parseInt(user)
                    }
                })
            }


        if(page && size)
        {
            return res.status(200).json({
                success:true,
                data: userCategories,
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
            data: userCategories,
            message: "Амжилттай",
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

module.exports = GET_ALL_USERS_CATEGORY