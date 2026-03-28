const { default: axios } = require('axios');
const prisma = require('../../../Middlewares/prisma');
require("dotenv").config()
const INSERT_INVOICES = async (req, res) => {
  try {
    const {
            familyName,
            firstname,
            lastname,
            birthdate,
            register,
            gender,
            blood_type,
            city,
            district,
            hayg,
            facebook,
            phone,
            medeelel,
            phoneTwo,
            category
        } = req.body;
    


        let price;

        if(category === 11) price = 50
        if(category === 12) price = 50
        if(category === 25) price = 50
        if(category === 27) price = 50
        if(category === 28) price = 50
        if(category === 29) price = 50
        if(category === 30) price = 50

        if (!familyName) {
            return res.status(400).json({ success: false, message: "Ургийн овог оруулна уу." });
        }

        if (!firstname) {
            return res.status(400).json({ success: false, message: "Овог нэр оруулна уу." });
        }

        if (!lastname) {
            return res.status(400).json({ success: false, message: "Өөрийн нэр оруулна уу." });
        }

        if (!birthdate) {
            return res.status(400).json({ success: false, message: "Төрсөн огноо оруулна уу." });
        }

        if (!register) {
            return res.status(400).json({ success: false, message: "Регистрийн дугаар оруулна уу." });
        }

        if (!gender) {
            return res.status(400).json({ success: false, message: "Хүйс сонгоно уу." });
        }

        if (!blood_type) {
            return res.status(400).json({ success: false, message: "Цусны бүлэг сонгоно уу." });
        }

        if (!city) {
            return res.status(400).json({ success: false, message: "Амьдарч буй байршил сонгоно уу." });
        }

        if (!district) {
            return res.status(400).json({ success: false, message: "Дүүрэг сонгоно уу." });
        }

        if (!hayg) {
            return res.status(400).json({ success: false, message: "Хаяг оруулна уу." });
        }

        if (!facebook) {
            return res.status(400).json({ success: false, message: "Facebook хаяг оруулна уу." });
        }

        if (!phone) {
            return res.status(400).json({ success: false, message: "Холбоо барих утасны дугаар оруулна уу." });
        }

        if (!phoneTwo) {
            return res.status(400).json({ success: false, message: "Яаралтай үед холбоо барих утасны дугаар оруулна уу." });
        }

        if (!medeelel) {
            return res.status(400).json({ success: false, message: "Мэдээлэл хаанаас авсан бэ?" });
        }

        
        if(!category)
        {
          return res.status(400).json({
            success:false,
            data:[],
            message: "Ангилал сонгоно уу."
         })
        }

         const response = await axios.post(
            `https://byl.mn/api/v1/projects/${process.env.BYL_PROJECT_ID}/invoices`,
            {
              amount: parseInt(price),
              description: `${phone} БҮРТГЭЛ`,
              auto_advance: true
            },
            {
              headers: {
                Authorization: `Bearer ${process.env.BYL_TOKEN}`,
                Accept: "application/json",
                "Content-Type": "application/json"
              }
            }
          );

        const result = await prisma.invoices.create({
          data:{
            invoice_id:response?.data?.data?.id,
            status:response?.data?.data?.status,
            amount: response?.data?.data?.amount,
            description:response?.data?.data?.description,
            number: response?.data?.data?.number,
            url:response?.data?.data?.url,
            due_date:response?.data?.data?.due_date,
            created_at:response?.data?.data?.created_at,
            updated_at:response?.data?.data?.updated_at,
            familyname:familyName,
            firstname:firstname,
            lastname:lastname,
            birthdate: new Date(birthdate),
            register:register,
            gender: parseInt(gender),
            blood_type: parseInt(blood_type),
            city:city,
            district: district,
            hayg:hayg,
            facebook:facebook,
            phone:phone,
            medeelel:medeelel,
            phoneTwo:phoneTwo,
            category: parseInt(category)
          }
        })

        return res.status(200).json({
          success:true,
          data:result,
          message: "Амжилттай."
        })


  } catch (err) {
    console.error("Invoice үүсгэхэд алдаа:", err);
    return res.status(500).json({
      success: false,
      message: "Серверийн алдаа гарлаа.",
      error: err.message,
    });
  }
};

module.exports = INSERT_INVOICES;
