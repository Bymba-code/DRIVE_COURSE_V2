const prisma = require('../../../Middlewares/prisma')

const GET_ALL_ANSWERS = async (req, res) => {
    try 
    {
        const {page, size, test} = req.query;
        const skip = (page - 1) * size
        const take = parseInt(size)

        let testAnswers;

        if(!page && !size && !test)
        {
            testAnswers = await prisma.test_answers.findMany()
        }
        if(page && size)
        {
            testAnswers = await prisma.test_answers.findMany({
                skip:skip,
                take:take
            })
        }
        if(page && size && test)
        {
            testAnswers = await prisma.test_answers.findMany({
                skip:skip,
                take:take,
                where: {
                    test:parseInt(test)
                }
            })
        }

        if(!page && !size && test)
        {
            testAnswers = await prisma.test_answers.findMany({
                where: {
                    test: parseInt(test)
                }
            })
        }
        if(!page && size && !test)
        {
            testAnswers = await prisma.test_answers.findMany({
                take:take
            })
        }   

        if(testAnswers.length === 0)
        {
            return res.status(404).json({
                success:false,
                data:[],
                message: "Өгөгдөл олдсонгүй."
            })
        }

        let totalCount;

        if(test)
        {
            totalCount = await prisma.test_answers.count({
                where: {
                    test:parseInt(test)
                }
            })
        }

        if(!test)
        {
            totalCount = await prisma.test_answers.count()
        }

        if(page && size)
            {
              return res.status(200).json({
                success:true,
                data: testAnswers,
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
            data:testAnswers,
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

module.exports = GET_ALL_ANSWERS