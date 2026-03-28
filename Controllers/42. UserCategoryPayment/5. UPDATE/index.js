const prisma = require("../../../Middlewares/prisma");
const axios = require("axios")

const UPDATE_USER_CATEGORY_PAYMENTS = async (req, res) => {
  try {
    const { id } = req.params;
   
    if(!id || isNaN(id))
    {
      return res.status(403).json({
        success:false,
        data:[],
        message: "Хүсэлтийн мэдээлэл дутуу эсвэл буруу байна."
      })
    }
    
    const data = await prisma.user_category_payments.findUnique({
      where:{
        id:parseInt(id)
      }
    })

    if(data.status === "paid")
    {
      return res.status(400).json({
        success:false,
        data:[],
        message: "Төлбөр төлөгдсөн байна."
      })
    }

     const checkResponse = await axios.get(`https://byl.mn/api/v1/projects/${process.env.BYL_PROJECT_ID}/invoices/${data?.invoice_id}`,{
                headers: {
                    Authorization: `Bearer ${process.env.BYL_TOKEN}`
                }
            })
    
    if(checkResponse?.data?.data?.status === 'open')
    {
        return res.status(400).json({
          success:false,
            data:[],
            message: "Төлбөр төлөгдөөгүй байна."
          })
    }

    if(checkResponse?.data?.data?.status === 'paid')
            {
                const result = await prisma.user_category_payments.update({
                    where: {
                        id:parseInt(id)
                    },
                    data: {
                        status: "paid"
                    }
                })
                return res.status(200).json({
                    success:true,
                    data:result,
                    message: "Төлбөр амжилттай төлөгдлөө."
                })
            }

    
  } catch (err) {
    console.error("UPDATE_VIDEO error:", err);
    return res.status(500).json({
      success: false,
      message: "Серверийн алдаа гарлаа: " + err.message,
    });
  }
};

module.exports = UPDATE_USER_CATEGORY_PAYMENTS;
