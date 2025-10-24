const prisma = require('../../../Middlewares/prisma')

const INSERT_ANSWERS = async (req, res) => {
    try 
    {
        const {test, title, isSuccess} = req.body;

        if(!test)
        {
            return res.status(403).json({
                success:false,
                data:[],
                message:"Хариултын холбогдох тест-ыг оруулна уу."
            })
        }
        if(!title)
        {
            return res.status(403).json({
                success:false,
                data:[],
                message: "Хариулт оруулна уу."
            })
        }
        if(!isSuccess)
        {
            return res.status(403).json({
                success:false,
                data:[],
                message: "Хариултын зөв эсэхийг оруулна уу."
            })
        }


        const isTest = await prisma.test_answers.findMany({
            where: {
                title: title,
                test: parseInt(test)
            }
        })

        if(isTest.length > 0)
        {
            return res.status(402).json({
                success:false,
                data:[],
                message: "Хариулт аль хэдийн нэмэгдсэн байна."
            })
        }

        const result = await prisma.test_answers.create({
            data:{
                test:parseInt(test),
                title: title,
                isSuccess:parseInt(isSuccess)
            }
        })

        return res.status(200).json({
            success:true,
            data:[],
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

module.exports = INSERT_ANSWERS