const prisma = require('../../../Middlewares/prisma')

const DELETE_ANSWERS = async (req, res) => {
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
        })}
        
        
        const result = await prisma.test_answers.delete({
            where: {
                id:parseInt(id)
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

module.exports = DELETE_ANSWERS