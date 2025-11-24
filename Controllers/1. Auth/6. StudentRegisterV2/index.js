const prisma = require("../../../Middlewares/prisma");
const bcrypt = require("bcrypt");

async function generateUsername() {
  const PREFIX = "AZ01D";

  const lastUser = await prisma.users.findFirst({
    where: {
      username: { startsWith: PREFIX }
    },
    orderBy: { id: "desc" },
    select: { username: true }
  });

  // Хэрэв ийм форматаар эхэлсэн хэрэглэгч байхгүй бол:
  if (!lastUser) {
    return PREFIX + "001";   // Эхний хэрэглэгч
  }

  // Хэрэв байгаа бол дугаар авна
  const match = lastUser.username.match(/(\d{3})$/);
  const lastNumber = match ? parseInt(match[1], 10) : 0;

  const nextNumber = (lastNumber + 1).toString().padStart(3, "0");
  return PREFIX + nextNumber;
}

const STUDENT_REGISTER_V2 = async (req, res) => {
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

        const existingStudent = await prisma.users.findFirst({
            where: { 
                register: register
             },
        });

        if (existingStudent) {
            return res.status(409).json({
                success: false,
                message: "Регистрийн дугаар бүртгэгдсэн байна.",
            });
        }

        const kode = await generateUsername()
        console.log(kode)

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(kode, salt)

        const endDate = new Date();
        endDate.setMonth(endDate.getMonth() + 3); 



        const newStudent = await prisma.users.create({
            data: {
                familyname: familyName,
                first_name: firstname,
                last_name: lastname,
                birthdate: new Date(birthdate),
                register,
                gender: parseInt(gender),
                blood_type:parseInt(blood_type),
                city,
                district,
                hayg,
                facebook,
                phone,
                phonetwo: phoneTwo,
                medeelel_awsan: parseInt(medeelel),
                password: hashedPassword,
                username:kode,
                create_date: new Date(),
                role:"student",
                end_date: new Date(endDate)
                
            },
        });


        const addCategory = await prisma.user_category.create({
            data: {
                user: parseInt(newStudent.id),
                category: parseInt(category),
                date: new Date()
            }
        })

        return res.status(201).json({
            success: true,
            message: "Оюутан амжилттай бүртгэгдлээ.",
            data: newStudent,
        });

    } catch (err) {
        console.error("Оюутан бүртгэхэд алдаа гарлаа:", err);
        return res.status(500).json({
            success: false,
            message: "Серверийн алдаа гарлаа.",
            error: err.message || err,
        });
    }
};

module.exports = STUDENT_REGISTER_V2;
