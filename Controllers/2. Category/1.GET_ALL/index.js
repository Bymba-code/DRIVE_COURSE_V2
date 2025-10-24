const prisma = require("../../../Middlewares/prisma")

const GET_ALL_CATEGORY = async (req , res) => {
    try 
    {
        const {page, size} = req.query;
        const skip = (page - 1) * size
        const take = parseInt(size)

        if(req.user.role === "admin")
        {
            let categories;

            if(page && size)
            {
                categories = await prisma.category.findMany({
                    skip:parseInt(skip),
                    take:take
                })
            }
            if(!page && !size)
            {
                categories = await prisma.category.findMany()
            }
    
            if(categories.length === 0)
            {
                return res.status(404).json({
                    success:false,
                    data:[],
                    message: "Ангилал хоосон байна."
                })
            }
    
            const totalCount = await prisma.category.count();
    
            if(page && size)
            {
                return res.status(200).json({
                    success:true,
                    data: categories,
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
                data:categories,
                message: "Амжилттай"
            })
        }
        
        if(req.user.role === "student")
        {
            const userCategoryId = await prisma.user_category.findMany({
                where: {
                    user: req.user.id
                }
            })

            let categoryIds = [];
            userCategoryId.forEach((e) => {
                categoryIds.push(e.category);
            });
            

            const categories = await prisma.category.findMany({
                where: {
                    id: { in: categoryIds }
                }
            });


            return res.status(200).json({
                success:true,
                data: categories,
                message: "Амжилттай"
            })
        }
    }
    catch(err)
    {
        return res.status(500).json({
            success:false,
            data:[],
            message: "Серверийн алдаа гарлаа." + " " + err
        })
    }
}

module.exports = GET_ALL_CATEGORY