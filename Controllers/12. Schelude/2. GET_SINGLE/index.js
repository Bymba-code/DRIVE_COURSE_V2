const prisma = require('../../../Middlewares/prisma')

const GET_SINGLE_SCHELUDE = async (req, res) => {
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

        const data = await prisma.schelude.findUnique({
            where:
            {
                id: parseInt(id)
            },
            include: {
                teacher_schelude_teacherToteacher:true,
                category_schelude_categoryTocategory:true,
                user_schelude_user_schelude_scheludeToschelude:{
                    include: {
                        users:true
                    }
                }
            }
        })
        
        if(!data)
        {
            return res.status(404).json({
                success:false,
                data:[],
                message: "Мэдээлэл олдсонгүй."
            })
        }
        
        return res.status(200).json({
            success:true,
            data:data,
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

module.exports = GET_SINGLE_SCHELUDE