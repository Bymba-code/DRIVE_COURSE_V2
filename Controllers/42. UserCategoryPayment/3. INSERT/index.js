const prisma = require("../../../Middlewares/prisma");
const axios = require("axios")
const prismaService = require("../../../Middlewares/prisma")

const INSERT_USER_CATEGORY_PAYMENT = async (req, res) => {
  try 
  {
    const user = req.user;
    const { user_category , amount} = req.body;

    console.log(user)

    if(!user_category)
    {
      return res.status(400).json({
        success:false,
        data:[],
        message: "Ангилал сонгоно уу."
      })
    }
    if(!amount)
    {
      return res.status(400).json({
        success:false,
        data:[],
        message: "Төлөх дүн оруулна уу."
      })
    }
    
    const responseByl = await axios.post(`https://byl.mn/api/v1/projects/${process.env.BYL_PROJECT_ID}/invoices`,
                    {
                        amount: parseInt(amount),
                        description: `${user?.username} төлбөр`,
                        auto_advance:true
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${process.env.BYL_TOKEN}`
                        }
                    }
        )


    const result = await prismaService.user_category_payments.create({
            data: {
                user_category:parseInt(user_category),
                invoice_id: parseInt(responseByl?.data?.data?.id),
                status: responseByl?.data?.data?.status,
                amount: responseByl?.data?.data?.amount,
                description: responseByl?.data?.data.description,
                number: responseByl?.data?.data?.number,
                url: responseByl?.data?.data?.url,
                due_date:responseByl?.data?.data?.due_date,
                created_at: responseByl?.data?.data?.created_at,
                updated_at: responseByl?.data?.data?.updated_at
            }
        })

    return res.status(200).json({
      success:true,
      data:result,
      message: "Амжилттай."
    })
  } 
  catch (err) 
  {
    console.log(err)
    return res.status(500).json({
      success: false,
      message: "Серверийн алдаа гарлаа. " + err
    });
  }
};

module.exports = INSERT_USER_CATEGORY_PAYMENT;
