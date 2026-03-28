const { default: axios } = require("axios");
const prisma = require("../../../Middlewares/prisma");
const bcrypt = require("bcrypt");

async function generateUsername() {
  const PREFIX = "AZ01D";

  try {
    const lastUser = await prisma.users.findFirst({
      where: {
        username: { startsWith: PREFIX }
      },
      orderBy: { id: "desc" },
      select: { username: true }
    });

    if (!lastUser) {
      return PREFIX + "001";
    }

    const match = lastUser.username.match(/(\d{3})$/);
    const lastNumber = match ? parseInt(match[1], 10) : 0;
    const nextNumber = (lastNumber + 1).toString().padStart(3, "0");
    
    return PREFIX + nextNumber;
  } catch (error) {
    console.error("Username үүсгэхэд алдаа:", error);
    throw new Error("Username үүсгэх боломжгүй");
  }
}

const UPDATE_INVOICE = async (req, res) => {
  try {
    const { id } = req.params;

    let invoice;
    try {
      invoice = await prisma.invoices.findUnique({
        where: {
          id: parseInt(id)
        }
      });
    } catch (error) {
      console.error("Invoice татахад алдаа:", error);
      return res.status(500).json({
        success: false,
        data: [],
        message: "Өгөгдлийн санд хандахад алдаа гарлаа."
      });
    }

    if(!invoice) {
      return res.status(404).json({
        success: false,
        data: [],
        message: "Нэхэмжлэлийн мэдээлэл олдсонгүй."
      });
    }

    if (invoice.status === 'paid') {
      return res.status(400).json({
        success: false,
        data: [],
        message: "Төлбөр төлөгдсөн байна."
      });
    }

    let response;
    try {
      response = await axios.get(
        `https://byl.mn/api/v1/projects/${process.env.BYL_PROJECT_ID}/invoices/${invoice.invoice_id}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.BYL_TOKEN}`,
            Accept: "application/json"
          },
          timeout: 10000
        }
      );
    } catch (error) {
      console.error("BYL API дуудахад алдаа:", error.message);
      return res.status(503).json({
        success: false,
        data: [],
        message: "Төлбөрийн систем руу холбогдож чадсангүй."
      });
    }

    const invoiceStatus = response?.data?.data?.status;

    if (invoiceStatus === 'open') {
      return res.status(400).json({
        success: false,
        data: [],
        message: "Төлбөр төлөгдөөгүй байна."
      });
    }

    if (invoiceStatus === 'paid') {
      try {
        // Invoice статус шинэчлэх
        await prisma.invoices.update({
          where: {
            id: parseInt(id)
          },
          data: {
            status: 'paid',
            updated_at: new Date()
          }
        });
      } catch (error) {
        console.error("Invoice шинэчлэхэд алдаа:", error);
        return res.status(500).json({
          success: false,
          data: [],
          message: "Нэхэмжлэлийн статус шинэчлэхэд алдаа гарлаа."
        });
      }

      // Username үүсгэх
      let username;
      try {
        username = await generateUsername();
        console.log("Үүсгэсэн username:", username);
      } catch (error) {
        console.error("Username үүсгэхэд алдаа:", error);
        return res.status(500).json({
          success: false,
          data: [],
          message: "Нэвтрэх код үүсгэхэд алдаа гарлаа."
        });
      }

      // Password hash
      let hashedPassword;
      try {
        const salt = await bcrypt.genSalt(10);
        hashedPassword = await bcrypt.hash(username, salt);
      } catch (error) {
        console.error("Password hash хийхэд алдаа:", error);
        return res.status(500).json({
          success: false,
          data: [],
          message: "Нууц үг үүсгэхэд алдаа гарлаа."
        });
      }

      // Дуусах огноо
      const endDate = new Date();
      endDate.setMonth(endDate.getMonth() + 6);

      // Оюутан үүсгэх
      let newStudent;
      try {
        newStudent = await prisma.users.create({
          data: {
            familyname: invoice.familyname,
            first_name: invoice.firstname,
            last_name: invoice.lastname,
            birthdate: new Date(invoice.birthdate),
            register: invoice.register,
            gender: parseInt(invoice.gender),
            blood_type: parseInt(invoice.blood_type),
            city: invoice.city,
            district: invoice.district,
            hayg: invoice.hayg,
            facebook: invoice.facebook,
            phone: invoice.phone,
            phonetwo: invoice.phoneTwo,
            medeelel_awsan: parseInt(invoice.medeelel),
            password: hashedPassword,
            username: username,
            create_date: new Date(),
            role: "student",
            end_date: endDate
          }
        });
      } catch (error) {
        console.error("Оюутан үүсгэхэд алдаа:", error);
        return res.status(500).json({
          success: false,
          data: [],
          message: "Оюутны бүртгэл үүсгэхэд алдаа гарлаа."
        });
      }

      try {
        await prisma.user_invoice.create({
          data: {
            user: parseInt(newStudent.id),
            invoice: parseInt(id)
          }
        });
      } catch (error) {
        console.error("User-Invoice холбоос үүсгэхэд алдаа:", error);
      }

      try {
        await prisma.user_category.create({
          data: {
            user: parseInt(newStudent.id),
            category: parseInt(invoice.category),
            date: new Date()
          }
        });
      } catch (error) {
        console.error("User-Category холбоос үүсгэхэд алдаа:", error);
        // Оюутан үүссэн тул үргэлжлүүлэх
      }

      return res.status(200).json({
        success: true,
        data: {
          id: newStudent.id,
          username: newStudent.username,
          first_name: newStudent.first_name,
          last_name: newStudent.last_name,
          phone: newStudent.phone
        },
        message: "Бүртгэл амжилттай үүслээ."
      });
    }

    return res.status(400).json({
      success: false,
      data: [],
      message: "Төлбөрийн төлөв тодорхойгүй байна."
    });

  } catch (err) {
    console.error("UPDATE_INVOICE алдаа:", err);
    return res.status(500).json({
      success: false,
      data: [],
      message: "Серверийн алдаа гарлаа."
    });
  }
};

module.exports = UPDATE_INVOICE;