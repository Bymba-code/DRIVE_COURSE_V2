const prisma = require('../../../Middlewares/prisma')

const GET_ALL_CONTRACT = async (req, res) => {
    try 
    {
        const {page, size, student} = req.query;
        const skip = (page - 1) * size
        const take = parseInt(size)

        let contracts;

        if(!page && !size && !student)
        {
            contracts = await prisma.contract.findMany({
                include:{
                    users:{
                        include: {
                            user_category:true
                        }
                    }
                }
            })
        }
        if(page && size)
        {
            contracts = await prisma.contract.findMany({
                skip:skip,
                take:take,
                include:{
                    users:{
                        include: {
                            user_category:true
                        }
                    }
                }
            })
        }
        if(page && size && student)
        {
            contracts = await prisma.contract.findMany({
                skip:skip,
                take:take,
                where: {
                    user:parseInt(student)
                },
                include:{
                    users:{
                        include: {
                            user_category:true
                        }
                    }
                }
            })
        }
        if(!page && !size && student)
        {
            contracts = await prisma.users.findMany({
                where: {
                    user: parseInt(student)
                },
                include:{
                    users:{
                        include: {
                            user_category:true
                        }
                    }
                }
            })
        }

        if(contracts.length === 0)
        {
            return res.status(404).json({
                success:false,
                data:[],
                message: "Өгөгдөл олдсонгүй."
            })
        }

        let totalCount;

        if(student)
        {
            totalCount = await prisma.contract.count({
                where: {
                    user:parseInt(student)
                }
            })
        }

        if(!student)
        {
            totalCount = await prisma.contract.count()
        }

        if(page && size)
            {
              return res.status(200).json({
                success:true,
                data: contracts,
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
            data:contracts,
            message: "Амжилттай"
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

module.exports = GET_ALL_CONTRACT