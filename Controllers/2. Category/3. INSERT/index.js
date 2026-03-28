const prisma = require("../../../Middlewares/prisma");
const primsa = require("../../../Middlewares/prisma")

const INSERT_CATEGORY = async (req , res) => {
    try 
    {
        const {name, price, salePrice} = req.body;

        if(!name)
        {
            return res.status(404).json({
                success:false,
                data:[],
                message: "Ангилалын нэрийг оруулна уу."
            })
        }
        if(!price)
        {
            return res.status(400).json({
                success:false,
                data:[],
                message: "Ангилалын үнэ оруулна уу."
            })
        }

        const category = await prisma.category.findFirst({
            where: {
                name:name
            }
        })

        if(category)
        {
            return res.status(401).json({
                success:false,
                data:[],
                message:"Ангилал нэмэгдсэн байна."
            })
        }

        const result = await prisma.category.create({
            data:{
                name:name,
                price:parseInt(price),
                salePrice: salePrice ? parseInt(salePrice) : salePrice
            }
        })

        return res.status(200).json({
            success:true,
            data: [],
            message: "Ангилалыг амжилттай нэмлээ."
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

module.exports = INSERT_CATEGORY