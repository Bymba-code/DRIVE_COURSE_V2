const prisma = require('../../../Middlewares/prisma')

const GET_SINGLE_ANSWERS = async (req, res) => {
    try 
    {
        const {id} = req.params;

        if(!id || isNaN(id) || id === undefined)
        {
            return res.status(403).json({
                success:false,
                data:[],
                message: "Хариултын ID байхгүй эсвэл буруу байна."
            })
        }

        const testAnswer = await prisma.test_answers.findUnique({
            where:
            {
                id: parseInt(id)
            }
        })
        
        if(!testAnswer)
        {
            return res.status(404).json({
                success:false,
                data:[],
                message: "Өгөгдөл олдсонгүй."
            })
        }
        
        return res.status(200).json({
            success:true,
            data:testAnswer,
            message:"Амжилттай"
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

module.exports = GET_SINGLE_ANSWERS