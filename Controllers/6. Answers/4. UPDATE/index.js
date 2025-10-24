const prisma = require('../../../Middlewares/prisma')

const UPDATE_ANSWERS = async (req, res) => {
    try 
    {
        const {id} = req.params;
        const {title, isSuccess} = req.body;


        if(!id || isNaN(id) || id === undefined)
        {
            return res.status(403).json({
                success:false,
                data:[],
                message: "Хариултын ID байхгүй эсвэл буруу байна."
            })
        }

        const isTest = await prisma.test_answers.findMany({
            where: {
                id: parseInt(id)
            }
        })

        if(isTest.length === 0)
        {
            return res.status(404).json({
                success:false,
                data:[],
                message: "Өгөгдөл олдсонгүй."
            })
        }

        

        let updateData = {}

        if(title)
        {
            updateData.title = title;
        }
        if(isSuccess)
        {
            updateData.isSuccess = parseInt(isSuccess)
        }

        if (Object.keys(updateData).length === 0) {
            return res.status(400).json({
                success: false,
                data: [],
                message: "Шинэчлэх өгөгдөл байхгүй байна."  
            });
        }

        
        const result = await prisma.test_answers.update({
            where: {
                id:parseInt(id)
            },
            data: updateData
        })

        return res.status(200).json({
            success:true,
            data:[],
            message: "Амжилттай шинэчиллээ"
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

module.exports = UPDATE_ANSWERS