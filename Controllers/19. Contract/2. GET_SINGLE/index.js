const prisma = require('../../../Middlewares/prisma')

const GET_SINGLE_CONTRACT = async (req, res) => {
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

        const contract = await prisma.contract.findUnique({
            where:
            {
                id: parseInt(id)
            },
            include:{
                users:true
            }
        })
        
        if(!contract)
        {
            return res.status(404).json({
                success:false,
                data:[],
                message: "Өгөгдөл олдсонгүй."
            })
        }
        
        return res.status(200).json({
            success:true,
            data:contract,
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

module.exports = GET_SINGLE_CONTRACT