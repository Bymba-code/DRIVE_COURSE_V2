const prisma = require('../../../Middlewares/prisma')

const DELETE_DRIVING_SCHELUDE = async (req, res) => {
    try 
    {
        const {id} = req.params;
        
        if(!id || isNaN(id) || id === undefined)
        {
            return res.status(403).json({
                success:false,
                data:[],
                message: "Хүсэлтийн мэдээлэл дутуу байна эсвэл буруу байна."
            })
        }

        const schelude = await prisma.driving_schelude.findFirst({
            where: {
                id: parseInt(id)
            }
        })

        if(!schelude)
        {
            return res.status(404).json({
                success:false,
                data:[],
                message: "Өгөгдөл олдсонгүй."
        })}
        
        
        const result = await prisma.driving_schelude.delete({
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

module.exports = DELETE_DRIVING_SCHELUDE