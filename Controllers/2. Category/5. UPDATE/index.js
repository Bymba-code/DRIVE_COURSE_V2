const prisma = require("../../../Middlewares/prisma")

const UPDATE_CATEGORY = async (req , res) => {
    try 
    {
        const {id} = req.params;
        const {name, price, salePrice} = req.body;

        if(!id)
        {
            return res.status(403).json({
                success:false,
                data:[],
                message: "Ангилалын ID байхгүй байна."
            })
        }

        let updateData = {}

        if(name) updateData.name = name
        if(price) updateData.price = parseInt(price)
        if(salePrice) updateData.salePrice = parseInt(salePrice) 

        const resultOne = await prisma.category.findUnique({
            where: {
                id: parseInt(id)
            }
        })

        if(!resultOne)
        {
            return res.status(404).json({
                success:false,
                data: [],
                message: "Сонгосон ангилал устарсан эсвэл байхгүй байна."
            })
        }

        const resultThree = await prisma.category.update({
            where: {
                id:parseInt(id)
            },
            data: updateData
        })

        return res.status(200).json({
            success:true,
            data:resultThree,
            message: "Амжилттай шинэчлэгдлээ."
        })

    }
    catch(err)
    {
        return res.status(500).json({
            success:false,
            data:[],
            message: "Серверийн алдаа гарлаа." + " " + err
        })
    }
}

module.exports = UPDATE_CATEGORY