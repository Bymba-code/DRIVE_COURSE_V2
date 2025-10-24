const prisma = require('../../../Middlewares/prisma')

const DELETE_TEACHER = async (req, res) => {
    try 
    {
        const {id} = req.params;
        
        if (!id || isNaN(id)) {
            return res.status(400).json({
                success: false,
                data: [],
                message: "Хүсэлтийн мэдээлэл дутуу байна эсвэл буруу байна."
            });
        }

        const teacher = await prisma.teacher.findUnique({
            where: {
                id: parseInt(id)
            }
        })

        if(!teacher)
        {
            return res.status(404).json({
                success:false,
                data:[],
                message: "Багшийн мэдээлэл олдсонгүй."
        })}
        
        
        const result = await prisma.teacher.delete({
            where: {
                id:parseInt(id)
            }
        })
        
        return res.status(200).json({
            success:true,
            data:result,
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

module.exports = DELETE_TEACHER